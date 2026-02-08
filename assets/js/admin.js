/**
 * Admin Dashboard Logic
 * Handles Authentication, Data Fetching, Stats, Pagination, CSV Export
 */

const SUPABASE_URL = 'https://uwnwqwmdvudftjyysyww.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3bndxd21kdnVkZnRqeXlzeXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MDc0MTUsImV4cCI6MjA4NTI4MzQxNX0.ykoaJs5068mfy9fgG81vxusxQX8VeFsbMQMJbn1Gjzs';

let supabase;

// --- State ---
const PAGE_SIZE = 15;
let leadsPage = 0;
let messagesPage = 0;
let allLeads = [];
let allMessages = [];

// --- XSS Protection ---
function esc(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(String(str)));
    return div.innerHTML;
}

// --- Initialization ---
// Attach event listeners FIRST (synchronous), then do async Supabase work.
// This ensures the form always responds, even if Supabase is slow/down.
// --- Initialization ---
async function initAdmin() {
    try {
        // Initialize Supabase
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

        // Check for existing session
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            console.log("Admin: No session, redirecting to login.");
            window.location.href = 'login.html';
            return;
        }

        console.log("Admin: Session found.", session.user.email);
        showDashboard(session.user);
    } catch (err) {
        console.error('Supabase init error:', err);
        window.location.href = 'login.html';
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdmin);
} else {
    initAdmin();
}

// --- Auth ---
// Login logic is now handled in login.html inline script or separate file
// We only keep Logout here

async function handleLogout() {
    console.log("Logout initiated...");
    try {
        if (supabase) await supabase.auth.signOut();
    } catch (e) {
        console.error("Logout error", e);
    }
    // Hard reset all storage
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to login
    window.location.href = 'login.html';
}
window.handleLogout = handleLogout;
window.forceLogout = handleLogout; // Alias for safety

function showDashboard(user) {
    // Only dashboard logic remains
    // Remove login section toggles as they don't exist in new admin.html structure
    const userEmailEl = document.getElementById('user-email');
    if (userEmailEl) userEmailEl.textContent = user.email;

    loadLeads();
    loadMessages();
}

// --- Stats ---
function updateStats() {
    // Total leads
    const totalEl = document.getElementById('stat-total-leads');
    if (totalEl) totalEl.textContent = allLeads.length;

    // Leads today
    const todayEl = document.getElementById('stat-leads-today');
    if (todayEl) {
        const today = new Date().toISOString().slice(0, 10);
        const count = allLeads.filter(l => l.created_at && l.created_at.slice(0, 10) === today).length;
        todayEl.textContent = count;
    }

    // New messages
    const msgEl = document.getElementById('stat-new-messages');
    if (msgEl) {
        const count = allMessages.filter(m => m.status === 'new').length;
        msgEl.textContent = count;
    }

    // Quiz completed (leads with a quiz_result)
    const quizEl = document.getElementById('stat-quiz-completed');
    if (quizEl) {
        const count = allLeads.filter(l => l.quiz_result && l.quiz_result !== '-').length;
        quizEl.textContent = count;
    }
}

// --- Leads ---
async function loadLeads() {
    const tableBody = document.getElementById('leads-table-body');
    tableBody.innerHTML = '<tr><td colspan="5" class="py-4 text-center text-slate-400">Se încarcă...</td></tr>';

    const { data: leads, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching leads:', error);
        tableBody.innerHTML = '<tr><td colspan="5" class="py-4 text-center text-red-500">Eroare la încărcare</td></tr>';
        return;
    }

    allLeads = leads || [];
    leadsPage = 0;
    renderLeadsPage();
    updateStats();
}

function renderLeadsPage() {
    const tableBody = document.getElementById('leads-table-body');
    const start = leadsPage * PAGE_SIZE;
    const pageData = allLeads.slice(start, start + PAGE_SIZE);

    if (allLeads.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="py-4 text-center text-slate-400">Niciun lead momentan</td></tr>';
        renderPagination('leads', 0, 0);
        return;
    }

    tableBody.innerHTML = pageData.map(lead => `
        <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
            <td class="py-3 px-4 text-sm text-slate-600">${esc(lead.created_at ? new Date(lead.created_at).toLocaleDateString('ro-RO') : '-')}</td>
            <td class="py-3 px-4 text-sm font-medium text-slate-900">${esc(lead.name) || '<span class="text-slate-300">—</span>'}</td>
            <td class="py-3 px-4 text-sm text-slate-600">${esc(lead.email)}</td>
            <td class="py-3 px-4 text-sm text-slate-600 capitalize">
                <span class="px-2 py-0.5 rounded-full ${lead.audience_type === 'adult' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'} text-[10px] font-bold uppercase">
                    ${esc(lead.audience_type) || 'student'}
                </span>
            </td>
            <td class="py-3 px-4 text-sm text-slate-600 capitalize">${esc(lead.quiz_result) || '<span class="text-slate-300">—</span>'}</td>
            <td class="py-3 px-4"><span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">${esc(lead.source)}</span></td>
        </tr>
    `).join('');

    renderPagination('leads', allLeads.length, leadsPage);
}

// --- Messages ---
async function loadMessages() {
    const tableBody = document.getElementById('messages-table-body');
    tableBody.innerHTML = '<tr><td colspan="4" class="py-4 text-center text-slate-400">Se încarcă...</td></tr>';

    const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching messages:', error);
        tableBody.innerHTML = '<tr><td colspan="4" class="py-4 text-center text-red-500">Eroare la încărcare</td></tr>';
        return;
    }

    allMessages = messages || [];
    messagesPage = 0;
    renderMessagesPage();
    updateStats();
}

function renderMessagesPage() {
    const tableBody = document.getElementById('messages-table-body');
    const start = messagesPage * PAGE_SIZE;
    const pageData = allMessages.slice(start, start + PAGE_SIZE);

    if (allMessages.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" class="py-4 text-center text-slate-400">Niciun mesaj momentan</td></tr>';
        renderPagination('messages', 0, 0);
        return;
    }

    tableBody.innerHTML = pageData.map(msg => `
        <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
            <td class="py-3 px-4 text-sm text-slate-600">${esc(msg.created_at ? new Date(msg.created_at).toLocaleDateString('ro-RO') : '-')}</td>
            <td class="py-3 px-4 text-sm">
                <span class="font-medium text-slate-900">${esc(msg.name) || 'Anonim'}</span><br>
                <span class="text-xs text-slate-500">${esc(msg.email)}</span>
            </td>
            <td class="py-3 px-4 text-sm text-slate-600 max-w-xs truncate">${esc(msg.message)}</td>
            <td class="py-3 px-4 text-sm">
                <span class="px-2 py-1 rounded-full text-xs font-bold ${msg.status === 'new' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}">
                    ${esc(msg.status)}
                </span>
            </td>
        </tr>
    `).join('');

    renderPagination('messages', allMessages.length, messagesPage);
}

// --- Pagination ---
function renderPagination(type, total, currentPage) {
    const container = document.getElementById(`${type}-pagination`);
    if (!container) return;

    const totalPages = Math.ceil(total / PAGE_SIZE);

    if (totalPages <= 1) {
        container.innerHTML = `<span>${total} ${total === 1 ? 'înregistrare' : 'înregistrări'}</span><span></span>`;
        return;
    }

    const start = currentPage * PAGE_SIZE + 1;
    const end = Math.min((currentPage + 1) * PAGE_SIZE, total);

    container.innerHTML = `
        <span>${start}–${end} din ${total}</span>
        <div class="flex items-center gap-1">
            <button onclick="paginate('${type}', -1)" ${currentPage === 0 ? 'disabled' : ''}
                class="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <span class="material-symbols-rounded text-sm">chevron_left</span>
            </button>
            <span class="px-3 py-1 text-sm font-medium">${currentPage + 1} / ${totalPages}</span>
            <button onclick="paginate('${type}', 1)" ${currentPage >= totalPages - 1 ? 'disabled' : ''}
                class="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <span class="material-symbols-rounded text-sm">chevron_right</span>
            </button>
        </div>
    `;
}

function paginate(type, direction) {
    if (type === 'leads') {
        const maxPage = Math.ceil(allLeads.length / PAGE_SIZE) - 1;
        leadsPage = Math.max(0, Math.min(maxPage, leadsPage + direction));
        renderLeadsPage();
    } else {
        const maxPage = Math.ceil(allMessages.length / PAGE_SIZE) - 1;
        messagesPage = Math.max(0, Math.min(maxPage, messagesPage + direction));
        renderMessagesPage();
    }
}

// --- CSV Export ---
function exportCSV(type) {
    let rows, filename, headers;

    if (type === 'leads') {
        headers = ['Data', 'Nume', 'Email', 'Audiență', 'Rezultat Quiz', 'Sursa'];
        rows = allLeads.map(l => [
            l.created_at ? new Date(l.created_at).toLocaleDateString('ro-RO') : '',
            l.name || '',
            l.email || '',
            l.audience_type || 'student',
            l.quiz_result || '',
            l.source || ''
        ]);
        filename = 'qorienta_leads_' + new Date().toISOString().slice(0, 10) + '.csv';
    } else {
        headers = ['Data', 'Nume', 'Email', 'Mesaj', 'Status'];
        rows = allMessages.map(m => [
            m.created_at ? new Date(m.created_at).toLocaleDateString('ro-RO') : '',
            m.name || '',
            m.email || '',
            m.message || '',
            m.status || ''
        ]);
        filename = 'qorienta_mesaje_' + new Date().toISOString().slice(0, 10) + '.csv';
    }

    // BOM for Excel UTF-8 compatibility
    const bom = '\uFEFF';
    const csvContent = bom + [headers, ...rows]
        .map(row => row.map(cell => '"' + String(cell).replace(/"/g, '""') + '"').join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}
