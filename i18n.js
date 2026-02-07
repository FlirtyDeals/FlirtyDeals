/**
 * FlirtyDeals i18n (Internationalization) System
 * Handles automatic language detection, translation, and currency conversion
 */

(function() {
    'use strict';

    // Language configuration
    const LANGUAGES = {
        'en': { name: 'English', flag: '🇺🇸', currency: 'USD' },
        'zh': { name: '中文', flag: '🇨🇳', currency: 'CNY' },
        'hi': { name: 'हिन्दी', flag: '🇮🇳', currency: 'INR' },
        'es': { name: 'Español', flag: '🇪🇸', currency: 'EUR' },
        'ar': { name: 'العربية', flag: '🇸🇦', currency: 'AED', rtl: true },
        'bn': { name: 'বাংলা', flag: '🇧🇩', currency: 'BDT' },
        'pt': { name: 'Português', flag: '🇧🇷', currency: 'BRL' },
        'ru': { name: 'Русский', flag: '🇷🇺', currency: 'RUB' },
        'id': { name: 'Bahasa', flag: '🇮🇩', currency: 'IDR' },
        'ur': { name: 'اردو', flag: '🇵🇰', currency: 'PKR', rtl: true },
        'ja': { name: '日本語', flag: '🇯🇵', currency: 'JPY' },
        'pa': { name: 'ਪੰਜਾਬੀ', flag: '🇮🇳', currency: 'INR' },
        'fr': { name: 'Français', flag: '🇫🇷', currency: 'EUR' },
        'de': { name: 'Deutsch', flag: '🇩🇪', currency: 'EUR' }
    };

    const DEFAULT_LANG = 'en';
    const TRANSLATIONS_URL = '/translations.json';

    let currentLang = DEFAULT_LANG;
    let translations = {};
    let exchangeRates = {
        'USD': 1.0  // Base currency
    };

    /**
     * Detect current language from URL path
     */
    function detectLanguageFromPath() {
        const path = window.location.pathname;
        const match = path.match(/^\/([a-z]{2})\//);
        
        if (match && LANGUAGES[match[1]]) {
            return match[1];
        }
        
        // Root path = English
        if (path === '/' || path === '/index.html') {
            return 'en';
        }
        
        return null;
    }

    /**
     * Detect browser language
     */
    function detectBrowserLanguage() {
        const browserLang = (navigator.language || navigator.userLanguage).toLowerCase();
        
        // Try exact match first (e.g., 'en-us')
        const langCode = browserLang.split('-')[0];
        
        if (LANGUAGES[langCode]) {
            return langCode;
        }
        
        return DEFAULT_LANG;
    }

    /**
     * Get saved language preference
     */
    function getSavedLanguage() {
        try {
            return localStorage.getItem('flirtydeals_lang');
        } catch (e) {
            return null;
        }
    }

    /**
     * Save language preference
     */
    function saveLanguage(lang) {
        try {
            localStorage.setItem('flirtydeals_lang', lang);
        } catch (e) {
            console.warn('Could not save language preference');
        }
    }

    /**
     * Redirect to language-specific URL
     */
    function redirectToLanguage(lang) {
        if (lang === 'en') {
            window.location.href = '/';
        } else {
            window.location.href = `/${lang}/`;
        }
    }

    /**
     * Load translations from JSON file
     */
    async function loadTranslations() {
        try {
            const response = await fetch(TRANSLATIONS_URL);
            translations = await response.json();
            console.log('✅ Translations loaded');
            return true;
        } catch (error) {
            console.error('❌ Failed to load translations:', error);
            return false;
        }
    }

    /**
     * Fetch exchange rate for a specific currency from Hexarate API
     */
    async function fetchExchangeRate(targetCurrency) {
        // Skip if it's USD (base currency)
        if (targetCurrency === 'USD') {
            return 1.0;
        }

        const url = `https://hexarate.paikama.co/api/rates/latest/USD?target=${targetCurrency}`;
        
        try {
            console.log(`🔄 Fetching rate for ${targetCurrency}...`);
            const response = await fetch(url);
            
            if (!response.ok) {
                console.warn(`⚠️ API returned ${response.status} for ${targetCurrency}`);
                return null;
            }
            
            const data = await response.json();
            
            if (data && data.status_code === 200 && data.data && data.data.mid) {
                console.log(`✅ Got rate for ${targetCurrency}: ${data.data.mid}`);
                return data.data.mid;
            }
            
            console.warn(`⚠️ Invalid response format for ${targetCurrency}`);
            return null;
            
        } catch (error) {
            console.warn(`⚠️ Could not fetch rate for ${targetCurrency}:`, error.message);
            return null;
        }
    }

    /**
     * Load exchange rates from Hexarate API
     * Makes separate API calls for each currency needed
     */
    async function loadExchangeRates() {
        console.log('🔄 Loading exchange rates from Hexarate API...');
        
        // Fallback rates in case API fails
        const fallbackRates = {
            'USD': 1.0,
            'CNY': 7.2,
            'INR': 83.0,
            'EUR': 0.92,
            'AED': 3.67,
            'BDT': 110.0,
            'BRL': 5.6,
            'RUB': 90.0,
            'IDR': 16000.0,
            'PKR': 280.0,
            'JPY': 150.0
        };
        
        // Get unique currencies from all languages
        const currencies = [...new Set(Object.values(LANGUAGES).map(lang => lang.currency))];
        
        // Remove USD since it's the base currency
        const targetCurrencies = currencies.filter(curr => curr !== 'USD');
        
        // Try to fetch rates from API
        let apiSuccess = false;
        
        for (const currency of targetCurrencies) {
            const rate = await fetchExchangeRate(currency);
            
            if (rate !== null) {
                exchangeRates[currency] = rate;
                apiSuccess = true;
            } else if (fallbackRates[currency]) {
                // Use fallback if API failed
                exchangeRates[currency] = fallbackRates[currency];
                console.log(`📋 Using fallback rate for ${currency}: ${fallbackRates[currency]}`);
            }
        }
        
        if (apiSuccess) {
            console.log(`✅ Exchange rates loaded successfully`);
        } else {
            console.log(`⚠️ Using all fallback rates (API unavailable)`);
        }
        
        console.log('Current exchange rates:', exchangeRates);
        return true;
    }

    /**
     * Convert USD price to target currency
     */
    function convertPrice(usdPrice, targetCurrency) {
        if (targetCurrency === 'USD') {
            return `$${usdPrice.toFixed(2)}`;
        }
        
        const rate = exchangeRates[targetCurrency];
        if (!rate) {
            console.warn(`No exchange rate for ${targetCurrency}, using USD`);
            return `$${usdPrice.toFixed(2)}`;
        }
        
        const converted = usdPrice * rate;
        const symbol = getCurrencySymbol(targetCurrency);
        
        // Format based on currency (some don't use decimals)
        if (['JPY', 'IDR'].includes(targetCurrency)) {
            return `${symbol}${Math.round(converted).toLocaleString()}`;
        } else {
            return `${symbol}${converted.toFixed(2)}`;
        }
    }

    /**
     * Get currency symbol
     */
    function getCurrencySymbol(currency) {
        const symbols = {
            'USD': '$',
            'CNY': '¥',
            'INR': '₹',
            'EUR': '€',
            'AED': 'د.إ',
            'BDT': '৳',
            'BRL': 'R$',
            'RUB': '₽',
            'IDR': 'Rp',
            'PKR': '₨',
            'JPY': '¥'
        };
        
        return symbols[currency] || '$';
    }

    /**
     * Get translation value from nested key
     */
    function getTranslation(key, lang) {
        const keys = key.split('.');
        let value = translations[lang];
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`Missing translation: ${key} for ${lang}`);
                return null;
            }
        }
        
        return value;
    }

    /**
     * Apply translations to page
     */
    function applyTranslations() {
        const lang = currentLang;
        const langData = translations[lang];
        
        if (!langData) {
            console.error(`No translations for language: ${lang}`);
            return;
        }
        
        // Update HTML lang and dir attributes
        document.documentElement.setAttribute('lang', lang);
        
        // RTL language handling - ensure proper setup
        const isRTL = LANGUAGES[lang].rtl === true;
        
        if (isRTL) {
            document.documentElement.setAttribute('dir', 'rtl');
            document.body.classList.add('rtl');
            // Force reflow to ensure RTL styles apply correctly
            void document.body.offsetHeight;
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            document.body.classList.remove('rtl');
        }
        
        // Update canonical URL
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            const baseUrl = window.location.origin;
            if (lang === 'en') {
                canonical.setAttribute('href', baseUrl + '/');
            } else {
                canonical.setAttribute('href', baseUrl + '/' + lang + '/');
            }
        }
        
        // Update og:url
        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) {
            const baseUrl = window.location.origin;
            if (lang === 'en') {
                ogUrl.setAttribute('content', baseUrl + '/');
            } else {
                ogUrl.setAttribute('content', baseUrl + '/' + lang + '/');
            }
        }
        
        // Translate all elements with data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            let translation = getTranslation(key, lang);
            
            if (!translation) return;
            
            // Handle currency conversion for prices
            if (element.hasAttribute('data-i18n-currency')) {
                const usdMatch = translation.match(/\$(\d+\.?\d*)/);
                if (usdMatch) {
                    const usdAmount = parseFloat(usdMatch[1]);
                    const targetCurrency = LANGUAGES[lang].currency;
                    translation = convertPrice(usdAmount, targetCurrency);
                }
            }
            
            const tagName = element.tagName.toLowerCase();
            
            // Handle different element types
            if (tagName === 'meta') {
                element.setAttribute('content', translation);
            } else if (tagName === 'title') {
                element.textContent = translation;
            } else {
                // Support HTML in translations (like <br> tags)
                if (translation.includes('<br>') || translation.includes('<small>')) {
                    element.innerHTML = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Convert all prices with data-i18n-price attribute
        const priceElements = document.querySelectorAll('[data-i18n-price]');
        const targetCurrency = LANGUAGES[lang].currency;
        
        console.log(`💰 Converting ${priceElements.length} prices to ${targetCurrency}...`);
        
        priceElements.forEach(element => {
            const usdAmount = parseFloat(element.getAttribute('data-i18n-price'));
            if (!isNaN(usdAmount)) {
                const convertedPrice = convertPrice(usdAmount, targetCurrency);
                element.textContent = convertedPrice;
            }
        });
        
        console.log(`✅ Applied ${lang} translations and converted prices to ${targetCurrency}`);
    }

    /**
     * Create language switcher dropdown
     */
    function createLanguageSwitcher() {
        const navbar = document.querySelector('.nav-actions');
        if (!navbar) {
            console.warn('⚠️ Navigation not found, skipping language switcher');
            return;
        }
        
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <button class="lang-btn" id="langDropdownBtn">
                <span class="current-lang-flag">${LANGUAGES[currentLang].flag}</span>
                <span class="current-lang-name">${LANGUAGES[currentLang].name}</span>
                <i class="fa-solid fa-chevron-down"></i>
            </button>
            <div class="lang-dropdown" id="langDropdown">
                ${Object.keys(LANGUAGES).map(code => `
                    <a href="#" class="lang-option ${code === currentLang ? 'active' : ''}" data-lang="${code}">
                        <span class="lang-flag">${LANGUAGES[code].flag}</span>
                        <span class="lang-name">${LANGUAGES[code].name}</span>
                    </a>
                `).join('')}
            </div>
        `;
        
        navbar.insertBefore(switcher, navbar.firstChild);
        
        // Dropdown toggle
        const dropdownBtn = document.getElementById('langDropdownBtn');
        const dropdown = document.getElementById('langDropdown');
        
        dropdownBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = dropdown.classList.toggle('show');
            
            // Mobile specific handling
            if (window.innerWidth <= 480) {
                if (isOpen) {
                    // Add backdrop class
                    switcher.classList.add('dropdown-open');
                    // Reset scroll to top immediately when opening
                    setTimeout(() => {
                        dropdown.scrollTop = 0;
                    }, 0);
                    // Prevent body scroll
                    document.body.style.overflow = 'hidden';
                    document.body.style.position = 'fixed';
                    document.body.style.width = '100%';
                } else {
                    // Remove backdrop class
                    switcher.classList.remove('dropdown-open');
                    // Restore body scroll
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                }
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!switcher.contains(e.target)) {
                const wasOpen = dropdown.classList.contains('show');
                dropdown.classList.remove('show');
                switcher.classList.remove('dropdown-open');
                
                // Restore body scroll on mobile
                if (wasOpen && window.innerWidth <= 480) {
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                }
            }
        });
        
        // Language selection
        const langOptions = dropdown.querySelectorAll('.lang-option');
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const newLang = option.getAttribute('data-lang');
                
                if (newLang !== currentLang) {
                    // Restore body scroll before redirect
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                    
                    saveLanguage(newLang);
                    redirectToLanguage(newLang);
                }
            });
        });
    }

    /**
     * Handle first-time visitor redirect
     */
    function handleFirstVisit() {
        const pathLang = detectLanguageFromPath();
        const savedLang = getSavedLanguage();
        const browserLang = detectBrowserLanguage();
        
        // If user has saved preference, use it
        if (savedLang && savedLang !== pathLang) {
            redirectToLanguage(savedLang);
            return false;
        }
        
        // If first visit and browser lang doesn't match path, redirect
        if (!savedLang && browserLang !== pathLang) {
            saveLanguage(browserLang);
            redirectToLanguage(browserLang);
            return false;
        }
        
        return true;
    }

    /**
     * Initialize i18n system
     */
    async function init() {
        console.log('🌍 Initializing FlirtyDeals i18n system...');
        
        // Detect current language
        const pathLang = detectLanguageFromPath();
        currentLang = pathLang || DEFAULT_LANG;
        
        console.log(`📍 Current language: ${currentLang} (${LANGUAGES[currentLang].name})`);
        
        // Save current language
        saveLanguage(currentLang);
        
        // Load resources
        await loadTranslations();
        await loadExchangeRates();
        
        // Apply translations
        applyTranslations();
        
        // Create language switcher
        createLanguageSwitcher();
        
        console.log(`✅ i18n system initialized successfully for ${currentLang}`);
    }

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (handleFirstVisit()) {
                init();
            }
        });
    } else {
        if (handleFirstVisit()) {
            init();
        }
    }

})();