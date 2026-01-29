        // Mobile Menu Logic
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const closeMenuBtn = document.getElementById('close-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        function toggleMobileMenu() {
            mobileMenu.classList.toggle('translate-x-full');
            document.body.classList.toggle('overflow-hidden');
        }

        if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMobileMenu);

        // Load votes from localStorage
        // ------------------------------------------------------------------
        // CONFIGURARE LIVE VOTING (SUPABASE)
        // ------------------------------------------------------------------
        const SUPABASE_URL = 'https://uwnwqwmdvudftjyysyww.supabase.co';
        const SUPABASE_KEY = 'sb_publishable_hVHeePUVdmJeEw3Ab1bQbg_FHyFrpZ3';

        // Stare Sistem
        let supabase = null;
        let isLive = false;
        let votes = {};

        // 1. Initializare Client Supabase
        if (SUPABASE_URL && SUPABASE_KEY) {
            try {
                if (typeof window.supabase !== 'undefined') {
                    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
                    isLive = true;
                    console.log('✅ Sistemul de vot este LIVE (Conectat la Supabase)');
                } else {
                    console.warn('⚠️ Biblioteca Supabase nu s-a încărcat corect din CDN.');
                }
            } catch (e) {
                console.warn('⚠️ Eroare config Supabase:', e);
            }
        }

        if (!isLive) {
            console.warn('⚠️ Mod Live inactiv (Lipsesc cheile). Se folosește stocare locală.');
            votes = JSON.parse(localStorage.getItem('qorienta_votes_v2')) || {};
        }

        // 2. Funcție pentru sincronizare (Se apelează la start)
        async function initLiveVoting() {
            if (!isLive) return;

            // A. Încarcă voturile existente
            const { data, error } = await supabase.from('logo_votes').select('*');
            if (data) {
                votes = {};
                data.forEach(row => votes[row.logo_id] = row.count);
                renderLeaderboard();
            }

            // B. Abonează-te la modificări în timp real (Realtime)
            supabase.channel('public:logo_votes')
                .on('postgres_changes', { event: '*', schema: 'public', table: 'logo_votes' }, payload => {
                    const newRow = payload.new;
                    if (newRow) {
                        votes[newRow.logo_id] = newRow.count;
                        renderLeaderboard();
                    }
                })
                .subscribe();
        }

        function setTheme(primary, secondary, name) {
            const root = document.documentElement;
            root.style.setProperty('--color-primary', primary);
            root.style.setProperty('--color-secondary', secondary);
        }

        // Helper to update the local header logo
        function updateHeaderLogo(logoPath) {
            const container = document.getElementById('header-logo-container');
            if (container) {
                if (logoPath) {
                    container.innerHTML = `<img src="${logoPath}" class="w-full h-full object-contain filter drop-shadow-sm">`;
                    container.classList.remove('hidden');
                    // Apply current color
                    setTimeout(() => setLogoColor(currentLogoColor), 0);
                } else {
                    container.innerHTML = '';
                    container.classList.add('hidden');
                }
            }
        }

        async function voteFor(id) {
            // 1. Actualizare Optimistă (Feedback instant)
            votes[id] = (votes[id] || 0) + 1;
            renderLeaderboard();
            document.getElementById('ranking').classList.remove('hidden');

            showToastMessage(isLive ? 'Vot Transmis Live!' : 'Vot Salvat Local!');

            // 2. Persistență
            if (isLive) {
                // Folosim RPC pentru a incrementa sigur
                const { error } = await supabase.rpc('increment_vote', { logo_slug: id });

                if (error) {
                    console.error("Eroare la vot (RPC):", error);
                    // Fallback la upsert simplu dacă RPC lipsește
                    if (error.code === '42883') {
                        const { data } = await supabase.from('logo_votes').select('count').eq('logo_id', id).single();
                        const current = (data?.count || 0);
                        await supabase.from('logo_votes').upsert({ logo_id: id, count: current + 1 });
                    }
                }
            } else {
                localStorage.setItem('qorienta_votes_v2', JSON.stringify(votes));
            }
        }

        function setSiteLogo(id, element) {
            if (element) {
                const img = element.closest('.group').querySelector('.aspect-square img'); // More robust selector
                if (img) {
                    // We need the raw source, not the one potentially modified by mask logic?
                    // Actually the img.src is constant. The mask logic hides it opacity-0.
                    // But we want the path.
                    const logoPath = img.getAttribute('src');
                    localStorage.setItem('qorienta_selected_logo', logoPath);
                    // Live update this page
                    updateHeaderLogo(logoPath);

                    showToastMessage('Logo Setat pe Site!');
                }
            }
        }

        // Backwards compatibility if needed, or cleanup.
        // We will update the HTML to call voteFor(id) and setSiteLogo(id, this).

        function renderLeaderboard() {
            const listObj = document.getElementById('leaderboard-list');
            listObj.innerHTML = '';

            const rankingSection = document.getElementById('ranking');

            // Always show the section
            rankingSection.classList.remove('hidden');

            // If no votes, show empty state
            if (Object.keys(votes).length === 0) {
                listObj.innerHTML = `
                    <div class="text-center py-8 flex flex-col items-center gap-2">
                        <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-2xl">🗳️</div>
                        <p class="text-slate-500 font-medium">Nu există voturi încă.</p>
                        <p class="text-slate-400 text-sm">Fii primul care alege un favorit!</p>
                    </div>
                `;
                return;
            }

            // Convert to array and sort
            const sorted = Object.entries(votes)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5); // Top 5

            if (sorted.length === 0) return;

            let maxVotes = sorted[0][1];

            sorted.forEach(([id, count], index) => {
                // Formatting name
                let displayName = id.replace('_', ' ').toUpperCase();
                // Map ID to better names if possible
                if (id === 'organic_v4') displayName = "ORGANIC V4: HARMONY (NOU)";

                // Construct Image Path
                let imgPath = '';
                if (id.startsWith('explorer_extracted_')) {
                    const num = id.split('_').pop();
                    imgPath = `assets/logos/generated/extracted/extracted_logo_${num}.png`;
                } else if (id.startsWith('explorer_limbo_v')) {
                    const num = id.split('_v').pop();
                    imgPath = `assets/logos/generated/explorer_limbo_${num}.png`;
                } else if (id.startsWith('explorer_new_')) {
                    const num = id.split('_').pop();
                    imgPath = `assets/logos/generated/explorer_new_${num}.png`;
                } else if (id.startsWith('organic_v')) {
                    imgPath = `assets/logos/generated/${id}.png`;
                } else if (id.startsWith('child_bear_')) {
                    imgPath = `assets/logos/generated/child_bear/${id}.png`;
                } else if (id.startsWith('creative_')) {
                    imgPath = `assets/logos/generated/creative/${id}.png`;
                }

                const percentage = maxVotes > 0 ? (count / maxVotes) * 100 : 0;
                const colors = ['bg-yellow-400', 'bg-slate-300', 'bg-orange-300', 'bg-slate-100', 'bg-slate-100'];
                const rankColor = colors[index] || 'bg-slate-100';

                listObj.innerHTML += `
                    <div class="flex items-center gap-4 group p-3 rounded-xl hover:bg-slate-50 transition-colors">
                        <div class="w-8 h-8 ${rankColor} rounded-lg flex items-center justify-center font-bold text-slate-700 shadow-sm text-sm shrink-0">
                            #${index + 1}
                        </div>
                        <div class="w-12 h-12 bg-white rounded-lg border border-slate-100 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                            <img src="${imgPath}" class="w-full h-full object-contain" onerror="this.src=''">
                        </div>
                        <div class="flex-1">
                            <div class="flex justify-between items-center mb-1">
                                <span class="font-bold text-slate-700 text-sm truncate pr-2">${displayName}</span>
                                <span class="font-bold text-primary text-sm whitespace-nowrap">${count} voturi</span>
                            </div>
                            <div class="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                <div class="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style="width: ${percentage}%"></div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        function showToast() {
            const toast = document.getElementById('toast');
            toast.classList.remove('translate-x-[200%]');
            setTimeout(() => {
                toast.classList.add('translate-x-[200%]');
            }, 3000);
        }

        let currentLogoColor = 'original';

        // Helper function to apply color mask to an image
        function applyMaskLogic(img, color) {
            let wrapper;
            if (img.parentElement.classList.contains('logo-wrapper')) {
                wrapper = img.parentElement;
            } else {
                wrapper = document.createElement('div');
                wrapper.className = 'logo-wrapper w-full h-full relative flex items-center justify-center';
                img.parentNode.insertBefore(wrapper, img);
                wrapper.appendChild(img);
            }

            let mask = wrapper.querySelector('.logo-mask-div');
            if (!mask) {
                mask = document.createElement('div');
                mask.className = 'logo-mask-div absolute inset-0 w-full h-full hidden';
                mask.style.webkitMaskSize = 'contain';
                mask.style.webkitMaskRepeat = 'no-repeat';
                mask.style.webkitMaskPosition = 'center';
                mask.style.maskSize = 'contain';
                mask.style.maskRepeat = 'no-repeat';
                mask.style.maskPosition = 'center';
                wrapper.appendChild(mask);
            }

            if (color === 'original') {
                img.style.opacity = '1';
                mask.classList.add('hidden');
            } else {
                img.style.opacity = '0';
                mask.classList.remove('hidden');
                mask.style.backgroundColor = color;
                mask.style.webkitMaskImage = `url("${img.src}")`;
                mask.style.maskImage = `url("${img.src}")`;
            }
        }
        function setLogoColor(color) {
            currentLogoColor = color;

            // 1. Grid Images
            const gridImages = document.querySelectorAll('.aspect-square img');
            gridImages.forEach(img => applyMaskLogic(img, color));

            // 2. Header Logo
            const headerContainer = document.getElementById('header-logo-container');
            if (headerContainer && !headerContainer.classList.contains('hidden')) {
                const img = headerContainer.querySelector('img');
                if (img) applyMaskLogic(img, color);
            }
        }

        // Leaderboard Controls
        function toggleLeaderboard() {
            const content = document.getElementById('leaderboard-content');
            const chevron = document.getElementById('leaderboard-chevron');

            if (content.style.maxHeight === '0px') {
                content.style.maxHeight = '1000px';
                chevron.style.transform = 'rotate(0deg)';
            } else {
                content.style.maxHeight = '0px';
                chevron.style.transform = 'rotate(180deg)';
            }
        }

        function resetLeaderboard(event) {
            event.stopPropagation();

            if (isLive) {
                alert("Resetarea este dezactivată în modul Live pentru a proteja datele comune.");
                return;
            }

            if (!confirm('Sigur vrei să resetezi clasamentul local?')) return;

            votes = {};
            localStorage.removeItem('qorienta_votes_v2');
            localStorage.removeItem('qorienta_selected_logo');

            renderLeaderboard();
            const headerContainer = document.getElementById('header-logo-container');
            if (headerContainer) {
                headerContainer.classList.add('hidden');
                headerContainer.innerHTML = '';
            }
            showToastMessage('S-a resetat cache-ul local!');
        }

        function showToastMessage(msg) {
            const toast = document.getElementById('toast');
            toast.querySelector('h4').textContent = msg;
            toast.querySelector('p').textContent = '';
            showToast();
        }

        // Init
        // Check for existing logo choice on load
        (function () {
            const savedLogo = localStorage.getItem('qorienta_selected_logo');
            if (savedLogo) {
                updateHeaderLogo(savedLogo);
            }

            renderLeaderboard();
            if (typeof initLiveVoting === 'function') initLiveVoting();

            // Init Theme Toggle
            if (typeof renderThemeToggle === 'function') {
                renderThemeToggle('nav-theme-toggle');
            }
        })();
