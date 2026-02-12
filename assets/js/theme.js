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
    }
};

const archivedThemes = {
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
const THEME_ORDER = ['Royal'];

function applyTheme(themeName) {
    const theme = themes['Royal']; // Always Royal
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
}

function getSavedTheme() {
    return 'Royal';
}

function renderThemeToggle(containerId) {
    // Switcher disabled as per client request
    return;
}

// Init on load
(function () {
    applyTheme('Royal');
})();
