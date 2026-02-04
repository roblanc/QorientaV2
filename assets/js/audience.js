/**
 * Audience Segmentation for QOrienta
 * Toggle intre "student" (elevi + parinti) si "adult" (reconversie profesionala).
 * Persistat in localStorage, poate fi setat si via URL param: ?audience=adult
 */

const AUDIENCE_KEY = 'qorienta_audience';

function getAudience() {
    // 1. Check URL param
    const urlParams = new URLSearchParams(window.location.search);
    const urlAudience = urlParams.get('audience');
    if (urlAudience === 'student' || urlAudience === 'adult') {
        localStorage.setItem(AUDIENCE_KEY, urlAudience);
        return urlAudience;
    }
    // 2. Check localStorage
    return localStorage.getItem(AUDIENCE_KEY) || 'student';
}

function setAudience(type) {
    if (type !== 'student' && type !== 'adult') return;
    localStorage.setItem(AUDIENCE_KEY, type);
    applyAudience(type);
    window.dispatchEvent(new CustomEvent('audienceChanged', { detail: { audience: type } }));
}

function applyAudience(type) {
    document.querySelectorAll('[data-audience]').forEach(el => {
        if (el.dataset.audience === type) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });

    // Update toggle UI
    document.querySelectorAll('[data-audience-toggle]').forEach(btn => {
        const isActive = btn.dataset.audienceToggle === type;
        if (isActive) {
            btn.classList.add('bg-white', 'shadow-sm', 'text-primary', 'font-bold');
            btn.classList.remove('text-slate-500');
        } else {
            btn.classList.remove('bg-white', 'shadow-sm', 'text-primary', 'font-bold');
            btn.classList.add('text-slate-500');
        }
    });
}

/**
 * Render audience toggle component into a container.
 * HTML:
 *   <div id="audience-toggle"></div>
 * JS:
 *   renderAudienceToggle('audience-toggle');
 */
function renderAudienceToggle(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const current = getAudience();

    container.innerHTML = `
        <div class="inline-flex items-center bg-slate-100 rounded-xl p-1 gap-1 text-sm">
            <button data-audience-toggle="student"
                class="px-4 py-2 rounded-lg transition-all duration-200 ${current === 'student' ? 'bg-white shadow-sm text-primary font-bold' : 'text-slate-500'}"
                onclick="setAudience('student')">
                Elevi & Părinți
            </button>
            <button data-audience-toggle="adult"
                class="px-4 py-2 rounded-lg transition-all duration-200 ${current === 'adult' ? 'bg-white shadow-sm text-primary font-bold' : 'text-slate-500'}"
                onclick="setAudience('adult')">
                Reconversie Profesională
            </button>
        </div>
    `;
}

// Init on load
(function () {
    const audience = getAudience();
    // Apply on DOMContentLoaded to ensure elements exist
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => applyAudience(audience));
    } else {
        applyAudience(audience);
    }
})();
