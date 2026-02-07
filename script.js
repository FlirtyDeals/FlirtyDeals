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

    async function deleteStored(key) {
        try {
            if (storageAvailable('localStorage')) localStorage.removeItem(key);
        } catch (e) {}
        try {
            const db = await openIDB();
            if (db) await idbDelete(db, key);
        } catch (e) {}
        try {
            deleteCookie(key);
        } catch (e) {}
        try {
            if (storageAvailable('sessionStorage')) sessionStorage.removeItem(key);
        } catch (e) {}
    }

    // Helper: read a persistent flag
    async function getFlag(key) {
        const res = await getStored(key);
        return res.value === 'true';
    }

    // Helper: write a persistent flag
    async function saveFlag(key, value, days = 3650) {
        return await setStored(key, value ? 'true' : 'false');
    }

    document.addEventListener('DOMContentLoaded', async function() {

        const ageModal = document.getElementById('ageModal');
        const acceptAgeBtn = document.getElementById('acceptAge');
        const exitSiteBtn = document.getElementById('exitSite');

        // Check verification on page load
        const isVerified = await getFlag('ageVerified');
        console.info('age-verification: ageVerified =', isVerified);

        if (isVerified) {
            // Mark body as age-verified to unblur images
            document.body.classList.add('age-verified');
            
            if (ageModal) {
                ageModal.classList.remove('active');
            }
        } else {
            // show modal
            if (ageModal) {
                ageModal.classList.add('active');
            }
        }

        // Accept age
        if (acceptAgeBtn) {
            acceptAgeBtn.addEventListener('click', async function() {
                const res = await saveFlag('ageVerified', true);
                console.info('age-verification: saved ageVerified, success =', res.success, 'backend =', res.backend);

                // Mark body as age-verified
                document.body.classList.add('age-verified');

                if (ageModal) {
                    ageModal.classList.remove('active');
                }
            });
        }

        // Exit site
        function exitSite() {
            window.location.href = 'https://www.google.com';
        }

        if (exitSiteBtn) {
            exitSiteBtn.addEventListener('click', exitSite);
        }

        // Shemale card reveal toggling with persistence
function attachRevealListeners(cards) {
    if (!cards) return;
    
    cards.forEach(async card => {
        if (!card.classList.contains('shemale-card')) return;

        const dealImage = card.querySelector('.deal-image');
        if (!dealImage) return;

        // Check persisted state
        const wasRevealed = await getFlag('shemaleRevealed');
        if (wasRevealed) {
            dealImage.classList.add('revealed');
        }

        // For each card, clone the overlay to reset listeners
        const overlay = dealImage.querySelector('.deal-overlay');
        if (overlay) {
            const newOverlay = overlay.cloneNode(true);
            overlay.parentNode.replaceChild(newOverlay, overlay);
            
            newOverlay.addEventListener('click', async function() {
                const isCurrentlyRevealed = dealImage.classList.contains('revealed');

                // Toggle ALL shemale cards
                const allShemaleCards = document.querySelectorAll('.shemale-card');
                allShemaleCards.forEach(otherCard => {
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
        const clonedCards = [];
        dealCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (cardCategory === category) {
                const cardClone = card.cloneNode(true);
                cardClone.style.display = 'block';
                cardClone.style.opacity = '1';
                cardClone.style.transform = 'translateY(0px)';
                filteredGrid.appendChild(cardClone);
                clonedCards.push(cardClone);
            }
        });

        // Re-attach reveal listeners to cloned shemale cards
        attachRevealListeners(clonedCards);
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

        // Show all cards immediately without lazy loading
        function showAllCards() {
            dealCards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
        }

        // Initialize cards immediately
        showAllCards();

        // Attach shemale reveal listeners to initial cards
        attachRevealListeners(dealCards);

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

// Scroll to Top Button
        const scrollToTopBtn = document.getElementById('scrollToTop');
        
        if (scrollToTopBtn) {
            // Show/hide button based on scroll position
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    scrollToTopBtn.classList.add('show');
                } else {
                    scrollToTopBtn.classList.remove('show');
                }
            });

            // Scroll to top when clicked
            scrollToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Console Welcome Message
        console.log('%c🌸 FlirtyDeals.com 🌸', 'color: #d6006e; font-size: 24px; font-weight: bold;');
        console.log('%cWelcome to FlirtyDeals! Best Porn Discounts & Deals', 'color: #d6006e; font-size: 14px;');

    }); // end DOMContentLoaded

})();