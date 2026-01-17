// FlirtyDeals.com - Main JavaScript File

(function() {
    'use strict';

// Age Verification - Using sessionStorage
    const ageModal = document.getElementById('ageModal');
    const acceptAgeBtn = document.getElementById('acceptAge');
    const exitSiteBtn = document.getElementById('exitSite');

    function checkAgeVerification() {
        const ageVerified = sessionStorage.getItem('ageVerified');
        if (ageVerified === 'true') {
            ageModal.classList.remove('active');
            document.body.classList.add('age-verified');
        } else {
            ageModal.classList.add('active');
            document.body.classList.remove('age-verified');
        }
    }

    function acceptAge() {
        sessionStorage.setItem('ageVerified', 'true');
        ageModal.classList.remove('active');
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
    const shemaleRevealed = sessionStorage.getItem('shemaleRevealed') === 'true';
    
    if (shemaleRevealed) {
        shemaleCards.forEach(card => {
            const dealImage = card.querySelector('.deal-image');
            dealImage.classList.add('revealed');
        });
    }
    
    shemaleCards.forEach(card => {
        const dealImage = card.querySelector('.deal-image');
        const overlay = dealImage.querySelector('.deal-overlay');
        
        if (overlay) {
            overlay.addEventListener('click', function() {
                const isCurrentlyRevealed = dealImage.classList.contains('revealed');
                
                // Toggle ALL shemale cards
                shemaleCards.forEach(otherCard => {
                    const otherImage = otherCard.querySelector('.deal-image');
                    if (isCurrentlyRevealed) {
                        otherImage.classList.remove('revealed');
                    } else {
                        otherImage.classList.add('revealed');
                    }
                });
                
                // Save state
                sessionStorage.setItem('shemaleRevealed', !isCurrentlyRevealed);
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
    clickedButton.classList.add('active');
    
    const filteredContainer = document.getElementById('filteredDealsContainer');
    const filteredGrid = document.getElementById('filteredGrid');
    
    if (category === 'all') {
        // Hide filtered container
        filteredContainer.style.display = 'none';
        
        // Show main container
        allDealsContainer.style.display = 'block';
        
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
        allDealsContainer.style.display = 'none';
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
                cardClone.style.transform = 'translateY(0px)'; // Reset transform!
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
        if (e.key === 'Escape' && ageModal.classList.contains('active')) {
            exitSite();
        }
        
        if (e.key === 'Enter' && ageModal.classList.contains('active')) {
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
        button.addEventListener('click', function() {
            const card = this.closest('.deal-card');
            const dealTitle = card.querySelector('.deal-title').textContent;
            const dealUrl = this.href;
            trackDealClick(dealTitle, dealUrl);
        });
    });

    // Console Welcome Message
    console.log('%c🌸 FlirtyDeals.com 🌸', 'color: #d6006e; font-size: 24px; font-weight: bold;');
    console.log('%cWelcome to FlirtyDeals! Best Porn Discounts & Deals', 'color: #d6006e; font-size: 14px;');

})();