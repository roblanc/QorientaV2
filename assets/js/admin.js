/**
 * Admin Dashboard Logic
 * Handles Authentication and Data Fetching
 */

const SUPABASE_URL = 'https://uwnwqwmdvudftjyysyww.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3bndxd21kdnVkZnRqeXlzeXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MDc0MTUsImV4cCI6MjA4NTI4MzQxNX0.ykoaJs5068mfy9fgG81vxusxQX8VeFsbMQMJbn1Gjzs';

let supabase;

document.addEventListener('DOMContentLoaded', async () => {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    // Check current session
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
        showDashboard(session.user);
    } else {
        showLogin();
    }

    // Handle Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Handle Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('login-error');
    const submitBtn = e.target.querySelector('button');

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Se verifică...';

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) throw error;

        // Alert success to verify we got here
        alert('Login success: ' + data.user.email);

        showDashboard(data.user);

    } catch (err) {
        console.error('Login failed:', err);
        // Explicit alert for the user to see what's wrong
        alert('Login failed: ' + (err.message || JSON.stringify(err)));

        errorMsg.textContent = 'Eroare: ' + (err.message || 'Email sau parolă incorectă');
        errorMsg.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Intră în cont';
    }
}

async function handleLogout() {
    await supabase.auth.signOut();
    location.reload();
}

function showLogin() {
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('dashboard-section').classList.add('hidden');
}

function showDashboard(user) {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('dashboard-section').classList.remove('hidden');
    document.getElementById('user-email').textContent = user.email;

    // Load data
    loadLeads();
    loadMessages();
}

async function loadLeads() {
    const tableBody = document.getElementById('leads-table-body');
    tableBody.innerHTML = '<tr><td colspan="5" class="py-4 text-center">Se încarcă...</td></tr>';

    const { data: leads, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching leads:', error);
        tableBody.innerHTML = '<tr><td colspan="5" class="py-4 text-center text-red-500">Eroare la încărcare</td></tr>';
        return;
    }

    if (leads.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="py-4 text-center text-slate-400">Niciun lead momentan</td></tr>';
        return;
    }

    tableBody.innerHTML = leads.map(lead => `
        <tr class="border-b border-slate-100 hover:bg-slate-50">
            <td class="py-3 px-4 text-sm text-slate-600">${new Date(lead.created_at).toLocaleDateString()}</td>
            <td class="py-3 px-4 text-sm font-medium text-slate-900">${lead.name || '-'}</td>
            <td class="py-3 px-4 text-sm text-slate-600">${lead.email}</td>
            <td class="py-3 px-4 text-sm text-slate-600 capitalize">${lead.quiz_result || '-'}</td>
            <td class="py-3 px-4 text-sm text-slate-400 text-xs">${lead.source}</td>
        </tr>
    `).join('');
}

async function loadMessages() {
    const tableBody = document.getElementById('messages-table-body');
    tableBody.innerHTML = '<tr><td colspan="4" class="py-4 text-center">Se încarcă...</td></tr>';

    const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching messages:', error);
        tableBody.innerHTML = '<tr><td colspan="4" class="py-4 text-center text-red-500">Eroare la încărcare</td></tr>';
        return;
    }

    if (messages.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" class="py-4 text-center text-slate-400">Niciun mesaj momentan</td></tr>';
        return;
    }

    tableBody.innerHTML = messages.map(msg => `
        <tr class="border-b border-slate-100 hover:bg-slate-50">
            <td class="py-3 px-4 text-sm text-slate-600">${new Date(msg.created_at).toLocaleDateString()}</td>
            <td class="py-3 px-4 text-sm font-medium text-slate-900">
                ${msg.name || 'Anonim'}<br>
                <span class="text-xs font-normal text-slate-500">${msg.email}</span>
            </td>
            <td class="py-3 px-4 text-sm text-slate-600 whitespace-pre-wrap">${msg.message}</td>
            <td class="py-3 px-4 text-sm">
                <span class="px-2 py-1 rounded-full text-xs font-bold ${msg.status === 'new' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}">
                    ${msg.status}
                </span>
            </td>
        </tr>
    `).join('');
}
