/**
 * Contact Form Logic for Orienta
 * Sends messages to Supabase 'messages' table
 */

// Supabase Configuration (Public Key)
const SUPABASE_URL = 'https://uwnwqwmdvudftjyysyww.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3bndxd21kdnVkZnRqeXlzeXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MDc0MTUsImV4cCI6MjA4NTI4MzQxNX0.ykoaJs5068mfy9fgG81vxusxQX8VeFsbMQMJbn1Gjzs';

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
});

async function handleContactSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerText;

    // Get values
    const name = form.querySelector('[name="contact-name"]').value.trim();
    const email = form.querySelector('[name="contact-email"]').value.trim();
    const message = form.querySelector('[name="contact-message"]').value.trim();

    if (!email || !message) {
        alert('Te rugăm să completezi câmpurile obligatorii (Email și Mesaj).');
        return;
    }

    // UI Loading State
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="material-symbols-rounded animate-spin">refresh</span> Se trimite...';

    try {
        // Initialize Supabase
        const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

        // Insert into 'messages' table
        const { error } = await supabase
            .from('messages')
            .insert({
                name: name,
                email: email,
                message: message,
                status: 'new'
            });

        if (error) throw error;

        // Success UI
        showSuccessMessage(form);

    } catch (err) {
        console.error('Error sending message:', err);
        alert('A apărut o eroare. Te rugăm să încerci din nou sau să ne scrii direct la contact@qorienta.ro');

        // Reset Button
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
    }
}

function showSuccessMessage(form) {
    // Hide form content smoothly
    form.style.opacity = '0';
    form.style.transform = 'translateY(10px)';

    setTimeout(() => {
        form.style.display = 'none';

        // Find existing or create success message container
        let successDiv = document.getElementById('contact-success');
        if (!successDiv) {
            successDiv = document.createElement('div');
            successDiv.id = 'contact-success';
            successDiv.className = 'text-center py-10 animate-[fadeIn_0.5s_ease-out]';
            successDiv.innerHTML = `
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                    <span class="material-symbols-rounded text-3xl">check</span>
                </div>
                <h3 class="font-display text-2xl font-bold text-slate-900 mb-2">Mesaj trimis!</h3>
                <p class="text-slate-600">Îți mulțumim. Te vom contacta în scurt timp.</p>
                <button onclick="location.reload()" class="mt-8 text-primary font-bold hover:underline">Trimite un alt mesaj</button>
            `;
            form.parentNode.appendChild(successDiv);
        } else {
            successDiv.classList.remove('hidden');
        }

    }, 300);
}
