// FlirtyDeals.com - Main JavaScript File (fixed persistent age verification)

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

    // Unified storage getters/setters with fallback order: localStorage, sessionStorage, cookies
    function getStored(key) {
        if (storageAvailable('localStorage')) {
            return localStorage.getItem(key);
        }
        if (storageAvailable('sessionStorage')) {
            return sessionStorage.getItem(key);
        }
        return getCookie(key);
    }

    function setStored(key, value) {
        if (storageAvailable('localStorage')) {
            localStorage.setItem(key, value);
            return;
        }
        if (storageAvailable('sessionStorage')) {
            sessionStorage.setItem(key, value);
            return;
        }
        // fallback to cookie for ~10 years
        setCookie(key, value, 3650);
    }

    function removeStored(key) {
        if (storageAvailable('localStorage')) {
            localStorage.removeItem(key);
            return;
        }
        if (storageAvailable('sessionStorage')) {
            sessionStorage.removeItem(key);
            return;
        }
        // remove cookie by setting expiry in the past
        setCookie(key, '', -1);
    }

    // Run after DOM is ready
    document.addEventListener('DOMContentLoaded', function() {

        // Age Verification
        const ageModal = document.getElementById('ageModal');
        const acceptAgeBtn = document.getElementById('acceptAge');
        const exitSiteBtn = document.getElementById('exitSite');

        function checkAgeVerification() {
            const ageVerified = getStored('ageVerified');
            if (ageVerified === 'true') {
                if (ageModal) ageModal.classList.remove('active');
                document.body.classList.add('age-verified');
            } else {
                if (ageModal) ageModal.classList.add('active');
                document.body.classList.remove('age-verified');
            }
        }

        function acceptAge() {
            setStored('ageVerified', 'true');
            if (ageModal) ageModal.classList.remove('active');
            document.body.classList.add('age-verified');
        }

        function exitSite() {
            window.location.href = 'about:blank';
        }

        if (acceptAgeBtn) {
            acceptAgeBtn.addEventListener('click', acceptAge);
        }

        if (exitSiteBtn) {
            exitSiteBtn.addEventListener('click', exitSite);
        }

        checkAgeVerification();

        // Deal Card Reveal - ONLY FOR SHEMALE CARDS
        function setupDealReveals() {
            const shemaleCards = document.querySelectorAll('.shemale-card');

            // Check if shemale content was previously revealed
            const shemaleRevealed = getStored('shemaleRevealed') === 'true';

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
                    overlay.addEventListener('click', function() {
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

                        // Save state as string 'true' or 'false'
                        setStored('shemaleRevealed', isCurrentlyRevealed ? 'false' : 'true');
                    });
                }
            });
        }

        setupDealReveals();

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
                acceptAge();
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
                // If it's an anchor, prevent default only for tracking quick debug,
                // otherwise allow navigation to proceed. Here we only read values.
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
