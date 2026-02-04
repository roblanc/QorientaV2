/**
 * Lead Capture for QOrienta
 * Captează email + nume din hero, oferă ebook gratuit,
 * apoi redirectionează spre quiz.
 */

const LEAD_CAPTURED_KEY = 'qorienta_lead_captured';
const LEADS_KEY = 'qorienta_leads';

// Supabase config (same as logos.html)
const LEAD_SUPABASE_URL = 'https://uwnwqwmdvudftjyysyww.supabase.co';
const LEAD_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3bndxd21kdnVkZnRqeXlzeXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MDc0MTUsImV4cCI6MjA4NTI4MzQxNX0.ykoaJs5068mfy9fgG81vxusxQX8VeFsbMQMJbn1Gjzs';

const PDF_URL_STUDENT = 'assets/docs/ghid_student_qorienta.pdf';
const PDF_URL_ADULT = 'assets/docs/ghid_adult_qorienta.pdf';

function isLeadCaptured() {
    return localStorage.getItem(LEAD_CAPTURED_KEY) === 'true';
}

function triggerDownload(pdfUrl) {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function saveLead(name, email, source) {
    const audience = typeof getAudience === 'function' ? getAudience() : 'student';

    // 1. Save to localStorage
    const leads = JSON.parse(localStorage.getItem(LEADS_KEY) || '[]');
    leads.push({
        date: new Date().toISOString(),
        name: name || '',
        email: email,
        audience_type: audience,
        source: source || 'hero',
        result: ''
    });
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    localStorage.setItem(LEAD_CAPTURED_KEY, 'true');

    // 2. Save to Supabase (fire and forget)
    if (typeof window.supabase !== 'undefined' && LEAD_SUPABASE_URL && LEAD_SUPABASE_KEY) {
        try {
            const sb = window.supabase.createClient(LEAD_SUPABASE_URL, LEAD_SUPABASE_KEY);
            sb.from('leads').insert({
                name: name || '',
                email: email,
                audience_type: audience,
                source: source || 'hero'
            }).then(({ error }) => {
                if (error) console.warn('Lead save to Supabase failed:', error);
            });
        } catch (e) {
            console.warn('Supabase lead save error:', e);
        }
    }

    // 3. Trigger Download
    const pdfPath = audience === 'adult' ? PDF_URL_ADULT : PDF_URL_STUDENT;
    triggerDownload(pdfPath);
}

function initLeadCaptureForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameInput = form.querySelector('[name="lead-name"]');
        const emailInput = form.querySelector('[name="lead-email"]');
        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';

        if (!email) return;

        saveLead(name, email, 'hero');

        // Show success state correctly for both forms
        const isAdult = formId.includes('adult');
        const successId = isAdult ? 'lead-capture-success-adult' : 'lead-capture-success';
        const formContainerId = isAdult ? 'lead-capture-form-adult' : 'lead-capture-form';

        const successEl = document.getElementById(successId);
        const formContainer = document.getElementById(formContainerId);

        if (formContainer) formContainer.classList.add('hidden');
        if (successEl) successEl.classList.remove('hidden');

        // Redirect to quiz after 3 seconds
        setTimeout(() => {
            window.location.href = isAdult ? 'quiz.html?type=adult' : 'quiz.html';
        }, 3000);
    });
}

/**
 * Update nav CTA based on lead capture status.
 * Call this at the end of page load.
 */
function updateNavCTA() {
    const navCTA = document.getElementById('nav-cta');
    if (!navCTA) return;

    if (isLeadCaptured()) {
        navCTA.textContent = 'Continuă Testul';
        navCTA.href = 'quiz.html';
    }
}

