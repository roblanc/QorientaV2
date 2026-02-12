/**
 * Global Theme Manager for Orienta v2.
 * Prioritate client: Royal, Midnight, Ocean.
 */

const themes = {
    'Royal': {
        label: 'Royal',
        primary: '#6d28d9',
        primaryLight: '#8b5cf6',
        accent: '#d4a853',
        accentLight: '#f0dca0',
        bg: '#faf5ff',
        bgCard: '#f3e8ff',
        gradientEnd: '#d4a853',
        aurora1: 'rgba(109, 40, 217, 0.15)',
        aurora2: 'rgba(212, 168, 83, 0.12)',
        aurora3: 'rgba(139, 92, 246, 0.12)',
    },
    'Ocean': {
        label: 'Ocean',
        primary: '#1e40af',
        primaryLight: '#3b82f6',
        accent: '#06b6d4',
        accentLight: '#a5f3fc',
        bg: '#f0f9ff',
        bgCard: '#e0f2fe',
        gradientEnd: '#06b6d4',
        aurora1: 'rgba(30, 64, 175, 0.15)',
        aurora2: 'rgba(6, 182, 212, 0.12)',
        aurora3: 'rgba(59, 130, 246, 0.12)',
    },
    'Sunset': {
        label: 'Sunset',
        primary: '#c2410c',
        primaryLight: '#f97316',
        accent: '#e11d48',
        accentLight: '#fecdd3',
        bg: '#fff7ed',
        bgCard: '#ffedd5',
        gradientEnd: '#e11d48',
        aurora1: 'rgba(194, 65, 12, 0.15)',
        aurora2: 'rgba(225, 29, 72, 0.12)',
        aurora3: 'rgba(249, 115, 22, 0.12)',
    },
    'Forest': {
        label: 'Forest',
        primary: '#166534',
        primaryLight: '#16a34a',
        accent: '#65a30d',
        accentLight: '#d9f99d',
        bg: '#f0fdf4',
        bgCard: '#dcfce7',
        gradientEnd: '#65a30d',
        aurora1: 'rgba(22, 101, 52, 0.15)',
        aurora2: 'rgba(101, 163, 13, 0.12)',
        aurora3: 'rgba(22, 163, 74, 0.12)',
    },
    'Midnight': {
        label: 'Midnight',
        primary: '#312e81',
        primaryLight: '#4f46e5',
        accent: '#7c3aed',
        accentLight: '#c4b5fd',
        bg: '#f8fafc',
        bgCard: '#eef2ff',
        gradientEnd: '#7c3aed',
        aurora1: 'rgba(49, 46, 129, 0.15)',
        aurora2: 'rgba(124, 58, 237, 0.12)',
        aurora3: 'rgba(79, 70, 229, 0.12)',
    }
};

const THEME_KEY = 'qorienta_theme_v2';
const THEME_ORDER = ['Royal', 'Midnight', 'Ocean', 'Sunset', 'Forest'];

function applyTheme(themeName) {
    const theme = themes[themeName] || themes['Royal'];
    const root = document.documentElement;

    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-primary-light', theme.primaryLight);
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-accent-light', theme.accentLight);
    root.style.setProperty('--color-bg', theme.bg);
    root.style.setProperty('--color-bg-card', theme.bgCard);
    root.style.setProperty('--color-gradient-end', theme.gradientEnd);
    root.style.setProperty('--color-aurora-1', theme.aurora1);
    root.style.setProperty('--color-aurora-2', theme.aurora2);
    root.style.setProperty('--color-aurora-3', theme.aurora3);

    localStorage.setItem(THEME_KEY, themeName);
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { themeName, theme } }));
}

function getSavedTheme() {
    return localStorage.getItem(THEME_KEY) || 'Royal';
}

function renderThemeToggle(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const btn = document.createElement('button');
    btn.className = "flex items-center gap-2 text-slate-600 hover:text-primary transition-colors p-2 rounded-lg";
    btn.innerHTML = '<span class="material-symbols-rounded">palette</span>';
    btn.onclick = (e) => {
        e.stopPropagation();
        const dropdown = document.getElementById('theme-dropdown');
        dropdown.classList.toggle('hidden');
    };

    const dropdown = document.createElement('div');
    dropdown.id = 'theme-dropdown';
    dropdown.className = "hidden absolute top-full right-0 mt-2 w-52 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 p-2 z-[100] animate-[fadeIn_0.2s_ease-out]";

    const currentTheme = getSavedTheme();

    THEME_ORDER.filter(name => themes[name]).forEach(name => {
        const t = themes[name];
        const option = document.createElement('button');
        const isActive = name === currentTheme;
        option.className = `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left text-sm font-medium ${isActive ? 'bg-slate-100 text-slate-900' : 'hover:bg-slate-50 text-slate-700'}`;
        option.onclick = () => {
            applyTheme(name);
            document.getElementById('theme-dropdown').classList.add('hidden');
            // Update active state
            dropdown.querySelectorAll('button').forEach(b => {
                b.className = b.className.replace('bg-slate-100 text-slate-900', 'hover:bg-slate-50 text-slate-700');
            });
            option.className = option.className.replace('hover:bg-slate-50 text-slate-700', 'bg-slate-100 text-slate-900');
        };

        option.innerHTML = `
            <div class="flex gap-1">
                <div class="w-4 h-4 rounded-full shadow-sm border border-white/50" style="background: ${t.primary}"></div>
                <div class="w-4 h-4 rounded-full shadow-sm border border-white/50" style="background: ${t.accent}"></div>
            </div>
            <span>${t.label}</span>
            ${isActive ? '<span class="ml-auto text-xs text-slate-400">&#10003;</span>' : ''}
        `;
        dropdown.appendChild(option);
    });

    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });

    container.appendChild(btn);
    container.appendChild(dropdown);
}

// Init on load
(function () {
    const saved = getSavedTheme();
    applyTheme(saved);

    // Logo default logic removed to prevent persistent override. Default is handled by HTML.
})();
