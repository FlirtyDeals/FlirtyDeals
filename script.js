// FlirtyDeals.com - Main JavaScript File (more robust persistent age verification + diagnostics)

(function() {
    'use strict';

    // Utility: detect storage availability
    function storageAvailable(type) {
        try {
            const storage = window[type];
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Cookie fallback functions
    function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
    }

    function getCookie(name) {
        return document.cookie.split('; ').reduce((r, v) => {
            const parts = v.split('=');
            return parts[0] === name ? decodeURIComponent(parts.slice(1).join('=')) : r;
        }, null);
    }

    function deleteCookie(name) {
        setCookie(name, '', -1);
    }

    // IndexedDB helpers, promise-based
    function openIDB() {
        return new Promise((resolve, reject) => {
            if (!('indexedDB' in window)) {
                resolve(null);
                return;
            }

            const req = indexedDB.open('flirty_deals_db', 1);

            req.onupgradeneeded = function(evt) {
                const db = evt.target.result;
                if (!db.objectStoreNames.contains('settings')) {
                    db.createObjectStore('settings', { keyPath: 'key' });
                }
            };

            req.onsuccess = function(evt) {
                resolve(evt.target.result);
            };

            req.onerror = function(evt) {
                resolve(null);
            };
        });
    }

    function idbGet(db, key) {
        return new Promise((resolve) => {
            if (!db) return resolve(null);
            try {
                const tx = db.transaction('settings', 'readonly');
                const store = tx.objectStore('settings');
                const req = store.get(key);
                req.onsuccess = function() {
                    resolve(req.result ? req.result.value : null);
                };
                req.onerror = function() {
                    resolve(null);
                };
            } catch (e) {
                resolve(null);
            }
        });
    }

    function idbSet(db, key, value) {
        return new Promise((resolve) => {
            if (!db) return resolve(false);
            try {
                const tx = db.transaction('settings', 'readwrite');
                const store = tx.objectStore('settings');
                store.put({ key: key, value: value });
                tx.oncomplete = function() {
                    resolve(true);
                };
                tx.onerror = function() {
                    resolve(false);
                };
            } catch (e) {
                resolve(false);
            }
        });
    }

    function idbDelete(db, key) {
        return new Promise((resolve) => {
            if (!db) return resolve(false);
            try {
                const tx = db.transaction('settings', 'readwrite');
                const store = tx.objectStore('settings');
                store.delete(key);
                tx.oncomplete = function() {
                    resolve(true);
                };
                tx.onerror = function() {
                    resolve(false);
                };
            } catch (e) {
                resolve(false);
            }
        });
    }

    // Unified storage getters/setters with fallback order: localStorage, indexedDB, cookies, sessionStorage
    async function getStored(key) {
        // 1) localStorage
        try {
            if (storageAvailable('localStorage')) {
                const v = localStorage.getItem(key);
                if (v !== null) {
                    console.info('storage: using localStorage for key', key);
                    return { value: v, backend: 'localStorage' };
                }
            }
        } catch (e) {
            console.warn('storage: localStorage access threw', e);
        }

        // 2) indexedDB
        try {
            const db = await openIDB();
            if (db) {
                const v = await idbGet(db, key);
                if (v !== null && v !== undefined) {
                    console.info('storage: using IndexedDB for key', key);
                    return { value: v, backend: 'indexedDB' };
                }
            }
        } catch (e) {
            console.warn('storage: IndexedDB access threw', e);
        }

        // 3) cookies
        try {
            const v = getCookie(key);
            if (v !== null && v !== undefined) {
                console.info('storage: using cookies for key', key);
                return { value: v, backend: 'cookie' };
            }
        } catch (e) {
            console.warn('storage: cookie access threw', e);
        }

        // 4) sessionStorage last resort
        try {
            if (storageAvailable('sessionStorage')) {
                const v = sessionStorage.getItem(key);
                if (v !== null) {
                    console.info('storage: using sessionStorage for key', key);
                    return { value: v, backend: 'sessionStorage' };
                }
            }
        } catch (e) {
            console.warn('storage: sessionStorage access threw', e);
        }

        return { value: null, backend: null };
    }

    async function setStored(key, value) {
        // store as string
        const str = String(value);

        // 1) localStorage
        try {
            if (storageAvailable('localStorage')) {
                localStorage.setItem(key, str);
                console.info('storage: wrote key to localStorage', key);
                return { success: true, backend: 'localStorage' };
            }
        } catch (e) {
            console.warn('storage: localStorage write threw', e);
        }

        // 2) indexedDB
        try {
            const db = await openIDB();
            if (db) {
                const ok = await idbSet(db, key, str);
                if (ok) {
                    console.info('storage: wrote key to IndexedDB', key);
                    return { success: true, backend: 'indexedDB' };
                }
            }
        } catch (e) {
            console.warn('storage: IndexedDB write threw', e);
        }

        // 3) cookie fallback for ~10 years
        try {
            setCookie(key, str, 3650);
            console.info('storage: wrote key to cookie', key);
            return { success: true, backend: 'cookie' };
        } catch (e) {
            console.warn('storage: cookie write threw', e);
        }

        // 4) sessionStorage last resort
        try {
            if (storageAvailable('sessionStorage')) {
                sessionStorage.setItem(key, str);
                console.info('storage: wrote key to sessionStorage', key);
                return { success: true, backend: 'sessionStorage' };
            }
        } catch (e) {
            console.warn('storage: sessionStorage write threw', e);
        }

        console.error('storage: failed to persist key', key);
        return { success: false, backend: null };
    }

    async function removeStored(key) {
        try {
            if (storageAvailable('localStorage')) {
                localStorage.removeItem(key);
                console.info('storage: removed key from localStorage', key);
            }
        } catch (e) {}

        try {
            const db = await openIDB();
            if (db) {
                await idbDelete(db, key);
                console.info('storage: removed key from IndexedDB', key);
            }
        } catch (e) {}

        try {
            deleteCookie(key);
            console.info('storage: removed key cookie', key);
        } catch (e) {}

        try {
            if (storageAvailable('sessionStorage')) {
                sessionStorage.removeItem(key);
                console.info('storage: removed key from sessionStorage', key);
            }
        } catch (e) {}
    }

    // Helper to save an object with timestamp and optional expiry days
    async function saveFlag(name, value, expireDays) {
        const payload = {
            value: value,
            savedAt: new Date().toISOString(),
            expiresAt: expireDays ? new Date(Date.now() + expireDays * 864e5).toISOString() : null
        };
        return await setStored(name, JSON.stringify(payload));
    }

    async function readFlag(name) {
        const got = await getStored(name);
        if (!got.value) return { exists: false, value: null, backend: got.backend };
        try {
            const parsed = JSON.parse(got.value);
            if (parsed && parsed.expiresAt) {
                if (new Date(parsed.expiresAt) <= new Date()) {
                    // expired
                    await removeStored(name);
                    console.info('storage: flag expired for', name);
                    return { exists: false, value: null, backend: got.backend };
                }
            }
            return { exists: true, value: parsed.value, backend: got.backend, meta: parsed };
        } catch (e) {
            // not JSON, return raw
            return { exists: true, value: got.value, backend: got.backend };
        }
    }

    // Run after DOM is ready
    document.addEventListener('DOMContentLoaded', function() {

// Age Verification
const ageModal = document.getElementById('ageModal');
const acceptAgeBtn = document.getElementById('acceptAge');
const exitSiteBtn = document.getElementById('exitSite');

async function checkAgeVerification() {
    const res = await readFlag('ageVerified');
    
    console.log('Age check result:', res); // DIAGNOSTIC
    
    if (res.exists && res.value === 'true') {
        if (ageModal) {
            ageModal.classList.remove('active');
            ageModal.style.display = 'none'; // ADD THIS
        }
        document.body.classList.add('age-verified');
        console.info('✓ Age verified from:', res.backend);
    } else {
        if (ageModal) {
            ageModal.classList.add('active');
            ageModal.style.display = 'flex'; // ADD THIS
        }
        document.body.classList.remove('age-verified');
        console.info('✗ No verification found');
    }
}

async function acceptAge() {
    const result = await saveFlag('ageVerified', 'true', 365);
    console.info('✓ Age verification saved:', result); // DIAGNOSTIC
    
    if (ageModal) {
        ageModal.classList.remove('active');
        ageModal.style.display = 'none'; // ADD THIS
    }
    document.body.classList.add('age-verified');
}

function exitSite() {
    // Don't save anything - just exit
    window.location.href = 'https://www.youtube.com/watch?v=kJa2kwoZ2a4&t=8s';
}

if (acceptAgeBtn) {
    acceptAgeBtn.addEventListener('click', acceptAge);
}

if (exitSiteBtn) {
    exitSiteBtn.addEventListener('click', exitSite);
}

// Run check immediately
checkAgeVerification().catch(err => {
    console.error('Age verification check failed:', err);
});

// Add this console log to see storage status
console.log('Storage diagnostics:', {
    localStorage: storageAvailable('localStorage'),
    sessionStorage: storageAvailable('sessionStorage'),
    cookiesEnabled: navigator.cookieEnabled
});

        // Deal Card Reveal - ONLY FOR SHEMALE CARDS
        async function setupDealReveals() {
            const shemaleCards = document.querySelectorAll('.shemale-card');

            // Check if shemale content was previously revealed
            const res = await readFlag('shemaleRevealed');
            const shemaleRevealed = res.exists && res.value === 'true';

            if (shemaleRevealed) {
                shemaleCards.forEach(card => {
                    const dealImage = card.querySelector('.deal-image');
                    if (dealImage) dealImage.classList.add('revealed');
                });
            }

            shemaleCards.forEach(card => {
                const dealImage = card.querySelector('.deal-image');
                if (!dealImage) return;
                const overlay = dealImage.querySelector('.deal-overlay');

                if (overlay) {
                    overlay.addEventListener('click', async function() {
                        const isCurrentlyRevealed = dealImage.classList.contains('revealed');

                        // Toggle ALL shemale cards
                        shemaleCards.forEach(otherCard => {
                            const otherImage = otherCard.querySelector('.deal-image');
                            if (!otherImage) return;
                            if (isCurrentlyRevealed) {
                                otherImage.classList.remove('revealed');
                            } else {
                                otherImage.classList.add('revealed');
                            }
                        });

                        // Save state
                        await saveFlag('shemaleRevealed', (!isCurrentlyRevealed).toString(), 365);
                    });
                }
            });
        }

        setupDealReveals().catch(e => console.warn('setupDealReveals failed', e));

        // Filter Functionality - Hide sections and show only filtered cards
        const filterButtons = document.querySelectorAll('.filter-btn');
        const dealCards = document.querySelectorAll('.deal-card');
        const allDealsContainer = document.getElementById('allDealsContainer');
        const heroSection = document.getElementById('heroSection');

        function filterDeals(category, clickedButton) {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            if (clickedButton) clickedButton.classList.add('active');

            const filteredContainer = document.getElementById('filteredDealsContainer');
            const filteredGrid = document.getElementById('filteredGrid');

            if (!filteredContainer || !filteredGrid) return;

            if (category === 'all') {
                // Hide filtered container
                filteredContainer.style.display = 'none';

                // Show main container
                if (allDealsContainer) allDealsContainer.style.display = 'block';

                // Show hero section
                if (heroSection) heroSection.style.display = 'block';

                // Show ALL section containers
                const allSections = document.querySelectorAll('.deals-container');
                allSections.forEach(section => {
                    section.style.display = 'block';
                });

                // Show ALL separators
                const separators = document.querySelectorAll('.separator');
                separators.forEach(sep => {
                    sep.style.display = 'block';
                });

                // Show ALL cards
                dealCards.forEach(card => {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                });
            } else {
                // Hide main container and hero
                if (allDealsContainer) allDealsContainer.style.display = 'none';
                if (heroSection) heroSection.style.display = 'none';

                // Show filtered container
                filteredContainer.style.display = 'block';

                // Clear filtered grid
                filteredGrid.innerHTML = '';

                // Clone matching cards into single grid
                dealCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === category) {
                        const cardClone = card.cloneNode(true);
                        cardClone.style.display = 'block';
                        cardClone.style.opacity = '1';
                        cardClone.style.transform = 'translateY(0px)'; // Reset transform
                        filteredGrid.appendChild(cardClone);
                    }
                });
            }
        }

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                filterDeals(filter, this);
            });
        });

        // Smooth Scroll
        function smoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }

        smoothScroll();

        // Intersection Observer for Animations
        function setupScrollAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            dealCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        }

        setupScrollAnimations();

        // Keyboard Navigation Support
        document.addEventListener('keydown', function(e) {
            if (ageModal && e.key === 'Escape' && ageModal.classList.contains('active')) {
                exitSite();
            }

            if (ageModal && e.key === 'Enter' && ageModal.classList.contains('active')) {
                // call the same async accept handler
                acceptAgeBtn && acceptAgeBtn.click();
            }
        });

        // Video Autoplay Fix for Mobile
        function fixVideoAutoplay() {
            const videos = document.querySelectorAll('video');

            videos.forEach(video => {
                const playPromise = video.play();

                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log('Video autoplay prevented:', error);
                    });
                }
            });
        }

        window.addEventListener('load', fixVideoAutoplay);
        window.addEventListener('orientationchange', fixVideoAutoplay);

        // Click Tracking
        function trackDealClick(dealName, dealUrl) {
            console.log('Deal clicked:', dealName, dealUrl);
        }

        const dealButtons = document.querySelectorAll('.deal-btn');
        dealButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                const card = this.closest('.deal-card');
                if (!card) return;
                const titleEl = card.querySelector('.deal-title');
                const dealTitle = titleEl ? titleEl.textContent : 'Unknown';
                const dealUrl = this.href || this.getAttribute('data-url') || '#';
                trackDealClick(dealTitle, dealUrl);
            });
        });

        // Console Welcome Message
        console.log('%c🌸 FlirtyDeals.com 🌸', 'color: #d6006e; font-size: 24px; font-weight: bold;');
        console.log('%cWelcome to FlirtyDeals! Best Porn Discounts & Deals', 'color: #d6006e; font-size: 14px;');

    }); // end DOMContentLoaded

})();
