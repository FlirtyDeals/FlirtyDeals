// LibreTranslate Auto-Translation System for FlirtyDeals.com
// Automatically translates ALL content using LibreTranslate API
// 100% FREE • Unlimited translations • Smart caching • Non-blocking UI

(function() {
    'use strict';

    // LibreTranslate Configuration with multiple CORS proxies
    const LIBRETRANSLATE_API = 'https://libretranslate.com/translate';
    const CORS_PROXIES = [
        'https://corsproxy.io/?',
        'https://api.allorigins.win/raw?url=',
        '' // Direct (no proxy)
    ];
    
    let currentProxyIndex = 0;
    const CACHE_EXPIRY_DAYS = 30;
    const CACHE_VERSION = '2.0';
    
    // All 70+ supported languages from LibreTranslate
    const SUPPORTED_LANGUAGES = {
        'en': { name: 'English', flag: '🇬🇧' },
        'es': { name: 'Español', flag: '🇪🇸' },
        'fr': { name: 'Français', flag: '🇫🇷' },
        'de': { name: 'Deutsch', flag: '🇩🇪' },
        'it': { name: 'Italiano', flag: '🇮🇹' },
        'pt': { name: 'Português', flag: '🇵🇹' },
        'ru': { name: 'Русский', flag: '🇷🇺' },
        'zh': { name: '中文', flag: '🇨🇳' },
        'ja': { name: '日本語', flag: '🇯🇵' },
        'ko': { name: '한국어', flag: '🇰🇷' },
        'ar': { name: 'العربية', flag: '🇸🇦' },
        'hi': { name: 'हिन्दी', flag: '🇮🇳' },
        'nl': { name: 'Nederlands', flag: '🇳🇱' },
        'pl': { name: 'Polski', flag: '🇵🇱' },
        'tr': { name: 'Türkçe', flag: '🇹🇷' },
        'sv': { name: 'Svenska', flag: '🇸🇪' },
        'da': { name: 'Dansk', flag: '🇩🇰' },
        'no': { name: 'Norsk', flag: '🇳🇴' },
        'fi': { name: 'Suomi', flag: '🇫🇮' },
        'cs': { name: 'Čeština', flag: '🇨🇿' },
        'sk': { name: 'Slovenčina', flag: '🇸🇰' },
        'uk': { name: 'Українська', flag: '🇺🇦' },
        'el': { name: 'Ελληνικά', flag: '🇬🇷' },
        'he': { name: 'עברית', flag: '🇮🇱' },
        'hu': { name: 'Magyar', flag: '🇭🇺' },
        'ro': { name: 'Română', flag: '🇷🇴' },
        'bg': { name: 'Български', flag: '🇧🇬' },
        'hr': { name: 'Hrvatski', flag: '🇭🇷' },
        'sr': { name: 'Српски', flag: '🇷🇸' },
        'sl': { name: 'Slovenščina', flag: '🇸🇮' },
        'lt': { name: 'Lietuvių', flag: '🇱🇹' },
        'lv': { name: 'Latviešu', flag: '🇱🇻' },
        'et': { name: 'Eesti', flag: '🇪🇪' },
        'id': { name: 'Bahasa Indonesia', flag: '🇮🇩' },
        'ms': { name: 'Bahasa Melayu', flag: '🇲🇾' },
        'th': { name: 'ไทย', flag: '🇹🇭' },
        'vi': { name: 'Tiếng Việt', flag: '🇻🇳' },
        'fa': { name: 'فارسی', flag: '🇮🇷' },
        'bn': { name: 'বাংলা', flag: '🇧🇩' },
        'ur': { name: 'اردو', flag: '🇵🇰' },
        'te': { name: 'తెలుగు', flag: '🇮🇳' },
        'ta': { name: 'தமிழ்', flag: '🇮🇳' },
        'mr': { name: 'मराठी', flag: '🇮🇳' },
        'gu': { name: 'ગુજરાતી', flag: '🇮🇳' },
        'kn': { name: 'ಕನ್ನಡ', flag: '🇮🇳' },
        'ml': { name: 'മലയാളം', flag: '🇮🇳' },
        'pa': { name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
        'sw': { name: 'Kiswahili', flag: '🇰🇪' },
        'am': { name: 'አማርኛ', flag: '🇪🇹' },
        'af': { name: 'Afrikaans', flag: '🇿🇦' },
        'az': { name: 'Azərbaycan', flag: '🇦🇿' },
        'be': { name: 'Беларуская', flag: '🇧🇾' },
        'ca': { name: 'Català', flag: '🇪🇸' },
        'cy': { name: 'Cymraeg', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
        'eo': { name: 'Esperanto', flag: '🌍' },
        'eu': { name: 'Euskara', flag: '🇪🇸' },
        'ga': { name: 'Gaeilge', flag: '🇮🇪' },
        'gl': { name: 'Galego', flag: '🇪🇸' },
        'hy': { name: 'Հայերեն', flag: '🇦🇲' },
        'is': { name: 'Íslenska', flag: '🇮🇸' },
        'ka': { name: 'ქართული', flag: '🇬🇪' },
        'kk': { name: 'Қазақ', flag: '🇰🇿' },
        'km': { name: 'ខ្មែរ', flag: '🇰🇭' },
        'ky': { name: 'Кыргызча', flag: '🇰🇬' },
        'lo': { name: 'ລາວ', flag: '🇱🇦' },
        'lb': { name: 'Lëtzebuergesch', flag: '🇱🇺' },
        'mk': { name: 'Македонски', flag: '🇲🇰' },
        'mn': { name: 'Монгол', flag: '🇲🇳' },
        'my': { name: 'မြန်မာ', flag: '🇲🇲' },
        'ne': { name: 'नेपाली', flag: '🇳🇵' },
        'ps': { name: 'پښتو', flag: '🇦🇫' },
        'si': { name: 'සිංහල', flag: '🇱🇰' },
        'sq': { name: 'Shqip', flag: '🇦🇱' },
        'tg': { name: 'Тоҷикӣ', flag: '🇹🇯' },
        'tk': { name: 'Türkmen', flag: '🇹🇲' },
        'uz': { name: "O'zbek", flag: '🇺🇿' },
        'yi': { name: 'ייִדיש', flag: '🇮🇱' }
    };

    // Auto-translation system
    const AutoTranslate = {
        currentLang: 'en',
        originalContent: {},
        translationCache: {},
        isTranslating: false,
        translationQueue: [],
        dropdownOpen: false,
        debugMode: true, // Enable debug logging

        // Initialize the system
        init: function() {
            this.log('🚀 Initializing LibreTranslate System...');
            this.loadCache();
            this.detectLanguage();
            this.createLanguageDropdown();
            this.saveOriginalContent();
            
            this.log(`✅ Initialization complete! Current language: ${this.currentLang}`);
            this.log(`📦 Loaded ${Object.keys(this.translationCache).length} cached translations`);
            
            // Auto-translate if not English
            if (this.currentLang !== 'en') {
                this.log(`🌍 Auto-translating to ${SUPPORTED_LANGUAGES[this.currentLang].name}...`);
                setTimeout(() => this.translatePage(this.currentLang), 500);
            }
        },

        // Debug logging
        log: function(message, isError = false) {
            if (this.debugMode) {
                if (isError) {
                    console.error('🔴 ' + message);
                } else {
                    console.log('🌍 ' + message);
                }
            }
        },

        // Detect user's browser language
        detectLanguage: function() {
            const saved = localStorage.getItem('flirty_language');
            if (saved && SUPPORTED_LANGUAGES[saved]) {
                this.currentLang = saved;
                this.log(`Using saved language: ${SUPPORTED_LANGUAGES[saved].name}`);
                return;
            }

            const browserLang = (navigator.language || navigator.userLanguage).split('-')[0].toLowerCase();
            this.log(`Browser language detected: ${browserLang}`);
            
            if (SUPPORTED_LANGUAGES[browserLang]) {
                this.currentLang = browserLang;
                this.log(`Set language to: ${SUPPORTED_LANGUAGES[browserLang].name}`);
            } else {
                this.currentLang = 'en';
                this.log('Language not supported, defaulting to English');
            }
        },

        // Create modern language dropdown
        createLanguageDropdown: function() {
            const navActions = document.querySelector('.nav-actions');
            if (!navActions) {
                this.log('Nav actions not found!', true);
                return;
            }

            // Remove old selector if exists
            const oldSelector = document.querySelector('.language-selector, .language-dropdown');
            if (oldSelector) {
                oldSelector.remove();
            }

            // Create new dropdown container
            const dropdown = document.createElement('div');
            dropdown.className = 'language-dropdown';
            dropdown.innerHTML = `
                <button class="lang-flag-btn" id="langFlagBtn" title="Change Language">
                    <span class="flag-icon">${SUPPORTED_LANGUAGES[this.currentLang].flag}</span>
                    <span class="dropdown-arrow">▼</span>
                </button>
                <div class="lang-dropdown-menu" id="langDropdownMenu">
                    <div class="lang-search-container">
                        <input type="text" class="lang-search" placeholder="🔍 Search languages..." id="langSearch">
                    </div>
                    <div class="lang-list" id="langList"></div>
                </div>
            `;

            // Insert before Discord button
            navActions.insertBefore(dropdown, navActions.firstChild);
            this.log('✅ Language dropdown created');

            // Populate language list
            this.populateLanguageList();

            // Setup event listeners
            this.setupDropdownEvents();
        },

        // Populate the language list
        populateLanguageList: function() {
            const langList = document.getElementById('langList');
            if (!langList) return;

            langList.innerHTML = '';
            
            Object.keys(SUPPORTED_LANGUAGES).forEach(code => {
                const lang = SUPPORTED_LANGUAGES[code];
                const item = document.createElement('div');
                item.className = 'lang-item';
                if (code === this.currentLang) {
                    item.classList.add('active');
                }
                item.innerHTML = `
                    <span class="lang-flag">${lang.flag}</span>
                    <span class="lang-name">${lang.name}</span>
                `;
                item.onclick = () => this.changeLanguage(code);
                langList.appendChild(item);
            });
            
            this.log(`Added ${Object.keys(SUPPORTED_LANGUAGES).length} languages to dropdown`);
        },

        // Setup dropdown event listeners
        setupDropdownEvents: function() {
            const btn = document.getElementById('langFlagBtn');
            const menu = document.getElementById('langDropdownMenu');
            const search = document.getElementById('langSearch');

            if (!btn || !menu) return;

            // Toggle dropdown
            btn.onclick = (e) => {
                e.stopPropagation();
                this.dropdownOpen = !this.dropdownOpen;
                menu.classList.toggle('active', this.dropdownOpen);
                
                if (this.dropdownOpen) {
                    search.focus();
                    this.log('Dropdown opened');
                }
            };

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.language-dropdown')) {
                    this.dropdownOpen = false;
                    menu.classList.remove('active');
                }
            });

            // Search functionality
            search.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                const items = document.querySelectorAll('.lang-item');
                
                items.forEach(item => {
                    const name = item.querySelector('.lang-name').textContent.toLowerCase();
                    if (name.includes(query)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        },

        // Save original English content before translation
        saveOriginalContent: function() {
            this.log('Saving original content...');
            
            const walker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: function(node) {
                        if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
                        if (node.parentElement.tagName === 'SCRIPT') return NodeFilter.FILTER_REJECT;
                        if (node.parentElement.tagName === 'STYLE') return NodeFilter.FILTER_REJECT;
                        return NodeFilter.FILTER_ACCEPT;
                    }
                }
            );

            let nodeIndex = 0;
            while (walker.nextNode()) {
                const text = walker.currentNode.textContent.trim();
                if (text) {
                    this.originalContent[nodeIndex] = {
                        node: walker.currentNode,
                        text: text
                    };
                    nodeIndex++;
                }
            }

            // Save meta tags
            this.originalContent.title = document.title;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                this.originalContent.description = metaDesc.getAttribute('content');
            }

            this.log(`✅ Saved ${Object.keys(this.originalContent).length} text elements`);
        },

        // Translate text using LibreTranslate API with fallback proxies
        translateText: async function(text, targetLang) {
            if (!text || !text.trim()) return text;

            // Check cache first
            const cacheKey = `${text}_${targetLang}`;
            if (this.translationCache[cacheKey]) {
                return this.translationCache[cacheKey];
            }

            // Try with each proxy
            for (let i = 0; i < CORS_PROXIES.length; i++) {
                try {
                    const proxy = CORS_PROXIES[currentProxyIndex];
                    const apiUrl = proxy ? proxy + encodeURIComponent(LIBRETRANSLATE_API) : LIBRETRANSLATE_API;
                    
                    if (i === 0) {
                        this.log(`Translating with ${proxy ? 'proxy' : 'direct connection'}...`);
                    }
                    
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            q: text,
                            source: 'en',
                            target: targetLang,
                            format: 'text'
                        })
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }

                    const data = await response.json();
                    const translatedText = data.translatedText;

                    // Cache the translation
                    this.translationCache[cacheKey] = translatedText;
                    this.saveCache();

                    return translatedText;
                } catch (error) {
                    this.log(`Proxy ${currentProxyIndex} failed: ${error.message}`, true);
                    currentProxyIndex = (currentProxyIndex + 1) % CORS_PROXIES.length;
                    
                    // If we've tried all proxies, give up
                    if (i === CORS_PROXIES.length - 1) {
                        this.log(`All proxies failed for: "${text.substring(0, 30)}..."`, true);
                        return text;
                    }
                }
            }

            return text;
        },

        // Translate entire page (non-blocking)
        translatePage: async function(targetLang) {
            if (this.isTranslating) {
                this.log('Translation already in progress...', true);
                return;
            }

            if (targetLang === 'en') {
                this.log('Restoring English...');
                this.restoreOriginalContent();
                return;
            }

            this.isTranslating = true;
            this.showProgressIndicator();
            this.log(`🌍 Starting translation to ${SUPPORTED_LANGUAGES[targetLang].name}...`);

            try {
                // Translate all saved text nodes in batches
                const keys = Object.keys(this.originalContent).filter(key => !isNaN(key));
                const batchSize = 5; // Smaller batches for better stability
                let translated = 0;
                let failed = 0;
                
                this.log(`Translating ${keys.length} text elements...`);
                
                for (let i = 0; i < keys.length; i += batchSize) {
                    const batch = keys.slice(i, i + batchSize);
                    
                    await Promise.all(batch.map(async (key) => {
                        const item = this.originalContent[key];
                        if (item && item.node && item.text) {
                            const originalText = item.text;
                            const translatedText = await this.translateText(item.text, targetLang);
                            
                            if (translatedText !== originalText) {
                                item.node.textContent = translatedText;
                                translated++;
                            } else {
                                failed++;
                            }
                            
                            this.updateProgress(translated + failed, keys.length);
                        }
                    }));
                    
                    // Small delay between batches
                    await this.delay(200);
                }

                // Translate meta tags
                if (this.originalContent.title) {
                    const translatedTitle = await this.translateText(this.originalContent.title, targetLang);
                    document.title = translatedTitle;
                    this.log(`Title translated: "${translatedTitle}"`);
                }

                document.documentElement.lang = targetLang;
                
                this.log(`✅ Translation complete! ${translated} elements translated, ${failed} failed`);
                this.showNotification(`Translated to ${SUPPORTED_LANGUAGES[targetLang].name}! ✨`, 'success');
                
            } catch (error) {
                this.log(`Translation error: ${error.message}`, true);
                this.showNotification('Translation error. Please try again.', 'error');
            } finally {
                this.isTranslating = false;
                this.hideProgressIndicator();
            }
        },

        // Restore original English content
        restoreOriginalContent: function() {
            Object.keys(this.originalContent).forEach(key => {
                if (!isNaN(key)) {
                    const item = this.originalContent[key];
                    if (item && item.node && item.text) {
                        item.node.textContent = item.text;
                    }
                }
            });

            if (this.originalContent.title) {
                document.title = this.originalContent.title;
            }

            document.documentElement.lang = 'en';
            this.log('✅ Restored English content');
            this.showNotification('Restored to English', 'success');
        },

        // Change language manually
        changeLanguage: async function(lang) {
            if (lang === this.currentLang) {
                this.dropdownOpen = false;
                document.getElementById('langDropdownMenu').classList.remove('active');
                return;
            }
            
            this.log(`🔄 Changing language to: ${SUPPORTED_LANGUAGES[lang].name}`);
            this.currentLang = lang;
            localStorage.setItem('flirty_language', lang);
            
            // Update flag button
            const flagBtn = document.querySelector('.flag-icon');
            if (flagBtn) {
                flagBtn.textContent = SUPPORTED_LANGUAGES[lang].flag;
            }

            // Update active state in list
            document.querySelectorAll('.lang-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Close dropdown
            this.dropdownOpen = false;
            document.getElementById('langDropdownMenu').classList.remove('active');

            // Translate page
            await this.translatePage(lang);
        },

        // Show non-blocking progress indicator
        showProgressIndicator: function() {
            let indicator = document.getElementById('translationProgress');
            if (!indicator) {
                indicator = document.createElement('div');
                indicator.id = 'translationProgress';
                indicator.className = 'translation-progress';
                indicator.innerHTML = `
                    <div class="progress-content">
                        <div class="spinner-mini"></div>
                        <span class="progress-text">Translating... <span id="progressPercent">0%</span></span>
                    </div>
                `;
                document.body.appendChild(indicator);
            }
            setTimeout(() => indicator.classList.add('active'), 10);
        },

        // Update progress
        updateProgress: function(current, total) {
            const percent = Math.round((current / total) * 100);
            const percentEl = document.getElementById('progressPercent');
            if (percentEl) {
                percentEl.textContent = `${percent}%`;
            }
        },

        // Hide progress indicator
        hideProgressIndicator: function() {
            const indicator = document.getElementById('translationProgress');
            if (indicator) {
                indicator.classList.remove('active');
                setTimeout(() => indicator.remove(), 300);
            }
        },

        // Show notification
        showNotification: function(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('active');
            }, 10);
            
            setTimeout(() => {
                notification.classList.remove('active');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        },

        // Cache management
        loadCache: function() {
            try {
                const cached = localStorage.getItem('translation_cache');
                if (cached) {
                    const data = JSON.parse(cached);
                    if (data.version === CACHE_VERSION) {
                        this.translationCache = data.translations || {};
                    }
                }
            } catch (e) {
                this.log('Could not load cache: ' + e.message, true);
            }
        },

        saveCache: function() {
            try {
                localStorage.setItem('translation_cache', JSON.stringify({
                    version: CACHE_VERSION,
                    timestamp: Date.now(),
                    translations: this.translationCache
                }));
            } catch (e) {
                this.log('Could not save cache: ' + e.message, true);
            }
        },

        clearCache: function() {
            this.translationCache = {};
            localStorage.removeItem('translation_cache');
            this.log('Cache cleared');
        },

        // Utility delay function
        delay: function(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    };

    // Expose to window for manual control
    window.AutoTranslate = AutoTranslate;

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => AutoTranslate.init());
    } else {
        AutoTranslate.init();
    }

})();
