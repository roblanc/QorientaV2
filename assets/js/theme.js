/**
 * Global Theme Manager for QOrienta
 * Handles color schemes using CSS variables and LocalStorage.
 */

const themes = {
    'Original': {
        primary: '#4f46e5', // Indigo-600
        primaryLight: '#818cf8', // Indigo-400
        secondary: '#0f172a' // Slate-900 (Used for some accents)
    },
    'Ocean': {
        primary: '#0ea5e9', // Sky-500
        primaryLight: '#38bdf8', // Sky-400
        secondary: '#0c4a6e' // Sky-900
    },
    'Sunset': {
        primary: '#f97316', // Orange-500
        primaryLight: '#fb923c', // Orange-400
        secondary: '#7c2d12' // Orange-900
    },
    'Berry': {
        primary: '#8b5cf6', // Violet-500
        primaryLight: '#a78bfa', // Violet-400
        secondary: '#4c1d95' // Violet-900
    },
    'Nature': {
        primary: '#16a34a', // Green-600
        primaryLight: '#4ade80', // Green-400
        secondary: '#14532d' // Green-900
    }
};

const THEME_KEY = 'qorienta_theme_v1';

// Function to apply theme
function applyTheme(themeName) {
    const theme = themes[themeName] || themes['Original'];
    const root = document.documentElement;

    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-primary-light', theme.primaryLight);
    // Add RGB variants for Tailwind opacity modifiers if needed, 
    // but for now simple hex replacement is easier via CSS var.
    // Note: Tailwind opacity with CSS vars usually requires the var to be "R G B" format.
    // We will stick to simple solid colors first for stability.

    localStorage.setItem(THEME_KEY, themeName);

    // Dispatch event for components to listen
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { themeName, theme } }));
}

// Function to get current theme
function getSavedTheme() {
    return localStorage.getItem(THEME_KEY) || 'Original';
}

// Function to render Toggle UI
function renderThemeToggle(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Create Dropdown HTML
    const currentTheme = getSavedTheme();

    // Button
    const btn = document.createElement('button');
    btn.className = "flex items-center gap-2 text-slate-600 hover:text-primary transition-colors p-2 rounded-lg";
    btn.innerHTML = `<span class="material-symbols-rounded">palette</span>`;
    btn.onclick = (e) => {
        e.stopPropagation();
        const dropdown = document.getElementById('theme-dropdown');
        dropdown.classList.toggle('hidden');
    };

    // Dropdown
    const dropdown = document.createElement('div');
    dropdown.id = 'theme-dropdown';
    dropdown.className = "hidden absolute top-full right-0 mt-2 w-48 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 p-2 z-[100] animate-[fadeIn_0.2s_ease-out]";

    // Generate Options
    Object.keys(themes).forEach(name => {
        const t = themes[name];
        const option = document.createElement('button');
        option.className = "w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors text-left text-sm font-medium text-slate-700";
        option.onclick = () => {
            applyTheme(name);
            document.getElementById('theme-dropdown').classList.add('hidden');
        };

        option.innerHTML = `
            <div class="w-4 h-4 rounded-full shadow-sm" style="background: ${t.primary}"></div>
            ${name}
        `;
        dropdown.appendChild(option);
    });

    // Close on outside click
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
    // 1. Load saved theme immediately to prevent flash
    const saved = getSavedTheme();
    applyTheme(saved);

    // 2. Set Default Logo (Bear V2) if none selected
    if (!localStorage.getItem('qorienta_selected_logo')) {
        localStorage.setItem('qorienta_selected_logo', 'assets/logos/generated/child_bear/child_bear_2.png');
    }
})();
