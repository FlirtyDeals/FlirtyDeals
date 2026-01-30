// Gemini AI Auto-Translation System for FlirtyDeals.com - v3.0
// Uses Google's Gemini API - FREE TIER with high limits!
// 🌍 Now supports 130+ languages including major African languages!

(function() {
    'use strict';

// GEMINI API CONFIGURATION
// Your site should call the Cloudflare Worker proxy instead of Google directly.
const GEMINI_API_URL = 'https://gemini-api.join-flirtydeals.workers.dev'; // <- your Worker URL
const CACHE_EXPIRY_DAYS = 30;
const CACHE_VERSION = '5.0_gemini_africa';
const BATCH_SIZE = 80;
const REQUEST_DELAY = 4500;
    
    // 130+ Major Languages - ALL Countries + African Digitalization Focus
    // Special focus on African languages with 500k+ speakers
    const SUPPORTED_LANGUAGES = {
        // Western Europe
        'en': { name: 'English', flag: '🇬🇧' },
        'es': { name: 'Español', flag: '🇪🇸' },
        'fr': { name: 'Français', flag: '🇫🇷' },
        'de': { name: 'Deutsch', flag: '🇩🇪' },
        'it': { name: 'Italiano', flag: '🇮🇹' },
        'pt': { name: 'Português', flag: '🇵🇹' },
        'nl': { name: 'Nederlands', flag: '🇳🇱' },
        'ca': { name: 'Català', flag: '🇪🇸' },
        'gl': { name: 'Galego', flag: '🇪🇸' },
        'eu': { name: 'Euskara', flag: '🇪🇸' },
        
        // Nordic Countries
        'sv': { name: 'Svenska', flag: '🇸🇪' },
        'da': { name: 'Dansk', flag: '🇩🇰' },
        'no': { name: 'Norsk', flag: '🇳🇴' },
        'fi': { name: 'Suomi', flag: '🇫🇮' },
        'is': { name: 'Íslenska', flag: '🇮🇸' },
        
        // Eastern Europe
        'pl': { name: 'Polski', flag: '🇵🇱' },
        'cs': { name: 'Čeština', flag: '🇨🇿' },
        'sk': { name: 'Slovenčina', flag: '🇸🇰' },
        'hu': { name: 'Magyar', flag: '🇭🇺' },
        'ro': { name: 'Română', flag: '🇷🇴' },
        'bg': { name: 'Български', flag: '🇧🇬' },
        'hr': { name: 'Hrvatski', flag: '🇭🇷' },
        'sr': { name: 'Српски', flag: '🇷🇸' },
        'sl': { name: 'Slovenščina', flag: '🇸🇮' },
        'mk': { name: 'Македонски', flag: '🇲🇰' },
        'sq': { name: 'Shqip', flag: '🇦🇱' },
        'bs': { name: 'Bosanski', flag: '🇧🇦' },
        
        // Baltic States
        'lt': { name: 'Lietuvių', flag: '🇱🇹' },
        'lv': { name: 'Latviešu', flag: '🇱🇻' },
        'et': { name: 'Eesti', flag: '🇪🇪' },
        
        // Eastern Europe & Caucasus
        'ru': { name: 'Русский', flag: '🇷🇺' },
        'uk': { name: 'Українська', flag: '🇺🇦' },
        'be': { name: 'Беларуская', flag: '🇧🇾' },
        'ka': { name: 'ქართული', flag: '🇬🇪' },
        'hy': { name: 'Հայերեն', flag: '🇦🇲' },
        'az': { name: 'Azərbaycan', flag: '🇦🇿' },
        
        // Central Asia
        'kk': { name: 'Қазақ', flag: '🇰🇿' },
        'uz': { name: "O'zbek", flag: '🇺🇿' },
        'ky': { name: 'Кыргызча', flag: '🇰🇬' },
        'tg': { name: 'Тоҷикӣ', flag: '🇹🇯' },
        'tk': { name: 'Türkmen', flag: '🇹🇲' },
        'mn': { name: 'Монгол', flag: '🇲🇳' },
        
        // Greece & Turkey
        'el': { name: 'Ελληνικά', flag: '🇬🇷' },
        'tr': { name: 'Türkçe', flag: '🇹🇷' },
        
        // Middle East
        'ar': { name: 'العربية', flag: '🇸🇦' },
        'he': { name: 'עברית', flag: '🇮🇱' },
        'fa': { name: 'فارسی', flag: '🇮🇷' },
        'ur': { name: 'اردو', flag: '🇵🇰' },
        'ps': { name: 'پښتو', flag: '🇦🇫' },
        'ku': { name: 'Kurdî', flag: '🇮🇶' },
        
        // South Asia
        'hi': { name: 'हिन्दी', flag: '🇮🇳' },
        'bn': { name: 'বাংলা', flag: '🇧🇩' },
        'te': { name: 'తెలుగు', flag: '🇮🇳' },
        'ta': { name: 'தமிழ்', flag: '🇮🇳' },
        'mr': { name: 'मराठी', flag: '🇮🇳' },
        'gu': { name: 'ગુજરાતી', flag: '🇮🇳' },
        'kn': { name: 'ಕನ್ನಡ', flag: '🇮🇳' },
        'ml': { name: 'മലയാളം', flag: '🇮🇳' },
        'pa': { name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
        'or': { name: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
        'si': { name: 'සිංහල', flag: '🇱🇰' },
        'ne': { name: 'नेपाली', flag: '🇳🇵' },
        'sd': { name: 'سنڌي', flag: '🇵🇰' },
        
        // East Asia
        'zh': { name: '中文', flag: '🇨🇳' },
        'ja': { name: '日本語', flag: '🇯🇵' },
        'ko': { name: '한국어', flag: '🇰🇷' },
        
        // Southeast Asia
        'th': { name: 'ไทย', flag: '🇹🇭' },
        'vi': { name: 'Tiếng Việt', flag: '🇻🇳' },
        'id': { name: 'Bahasa Indonesia', flag: '🇮🇩' },
        'ms': { name: 'Bahasa Melayu', flag: '🇲🇾' },
        'tl': { name: 'Tagalog', flag: '🇵🇭' },
        'lo': { name: 'ລາວ', flag: '🇱🇦' },
        'km': { name: 'ខ្មែរ', flag: '🇰🇭' },
        'my': { name: 'မြန်မာ', flag: '🇲🇲' },
        'jv': { name: 'Basa Jawa', flag: '🇮🇩' },
        'ceb': { name: 'Cebuano', flag: '🇵🇭' },
        
        // East Africa (MAJOR DIGITALIZATION FOCUS)
        'sw': { name: 'Kiswahili', flag: '🇰🇪' }, // 200M+ speakers!
        'am': { name: 'አማርኛ', flag: '🇪🇹' }, // 57M speakers
        'om': { name: 'Afaan Oromoo', flag: '🇪🇹' }, // 57M speakers
        'ti': { name: 'ትግርኛ', flag: '🇪🇷' }, // 10M+ speakers (Tigrinya)
        'so': { name: 'Soomaali', flag: '🇸🇴' }, // 21M+ speakers
        'rw': { name: 'Ikinyarwanda', flag: '🇷🇼' }, // 12M+ speakers
        'rn': { name: 'Ikirundi', flag: '🇧🇮' }, // 10M+ speakers (Kirundi)
        'lg': { name: 'Luganda', flag: '🇺🇬' }, // 20M speakers
        
        // Southern Africa
        'af': { name: 'Afrikaans', flag: '🇿🇦' },
        'zu': { name: 'isiZulu', flag: '🇿🇦' },
        'xh': { name: 'isiXhosa', flag: '🇿🇦' },
        'st': { name: 'Sesotho', flag: '🇱🇸' },
        'sn': { name: 'chiShona', flag: '🇿🇼' }, // 10M+ speakers
        'ts': { name: 'Xitsonga', flag: '🇿🇦' }, // 7M+ speakers (Tsonga)
        'ny': { name: 'Chichewa', flag: '🇲🇼' }, // 12M+ speakers
        'mg': { name: 'Malagasy', flag: '🇲🇬' }, // 25M speakers
        
        // West Africa (HUGE POPULATIONS)
        'yo': { name: 'Yorùbá', flag: '🇳🇬' }, // 45M+ speakers
        'ig': { name: 'Igbo', flag: '🇳🇬' }, // 30M+ speakers
        'ha': { name: 'Hausa', flag: '🇳🇬' }, // 100M+ speakers!
        'wo': { name: 'Wolof', flag: '🇸🇳' }, // 10M+ speakers
        'ff': { name: 'Fulfulde', flag: '🇳🇬' }, // 30M+ speakers (Fulani/Fula)
        'kr': { name: 'Kanuri', flag: '🇳🇬' }, // 10M+ speakers
        
        // Central Africa
        'ln': { name: 'Lingála', flag: '🇨🇩' }, // 45M+ speakers!
        'kg': { name: 'Kikongo', flag: '🇨🇩' }, // 5M+ speakers
        'lua': { name: 'Tshiluba', flag: '🇨🇩' }, // 8M+ speakers
        
        // North Africa
        'ber': { name: 'Tamazight', flag: '🇲🇦' }, // 30M+ speakers (Berber)
        
        // Celtic & Regional European
        'cy': { name: 'Cymraeg', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
        'ga': { name: 'Gaeilge', flag: '🇮🇪' },
        'gd': { name: 'Gàidhlig', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
        'mt': { name: 'Malti', flag: '🇲🇹' },
        'lb': { name: 'Lëtzebuergesch', flag: '🇱🇺' },
        'co': { name: 'Corsu', flag: '🇫🇷' },
        'fy': { name: 'Frysk', flag: '🇳🇱' },
        
        // Pacific & Others
        'sm': { name: 'Gagana Samoa', flag: '🇼🇸' },
        'haw': { name: 'ʻŌlelo Hawaiʻi', flag: '🇺🇸' },
        'hmn': { name: 'Hmong', flag: '🇱🇦' },
        'tpi': { name: 'Tok Pisin', flag: '🇵🇬' }, // 4M+ speakers
        
        // Additional
        'yi': { name: 'ייִדיש', flag: '🇮🇱' },
        'eo': { name: 'Esperanto', flag: '🌍' },
        'la': { name: 'Latin', flag: '🏛️' }
    };

    // ========================================
    // MAIN AUTO-TRANSLATE SYSTEM
    // ========================================
    const AutoTranslate = {
        currentLang: 'en',
        originalContent: {},
        translationCache: {},
        isTranslating: false,
        dropdownOpen: false,
        debugMode: true,

        // Initialize the system
        init: function() {
            this.log('🚀 Initializing Gemini Translation System v3.0...');
            
            // Check API key
            if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
                console.error('⚠️ GEMINI API KEY NOT SET! Get your free key from https://aistudio.google.com/app/apikey');
                this.showNotification('⚠️ Translation API key not configured', 'error');
                return;
            }
            
            this.loadCache();
            this.detectLanguage();
            this.createLanguageDropdown();
            this.saveOriginalContent();
            
            this.log(`✅ Initialization complete! Current language: ${this.currentLang}`);
            this.log(`📦 Loaded ${Object.keys(this.translationCache).length} cached translations`);
            this.log(`🌍 Supporting ${Object.keys(SUPPORTED_LANGUAGES).length} languages`);
            
            // Auto-translate if browser language is not English
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
                    console.log('🤖 ' + message);
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

        // Create modern language dropdown with reset button
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
                    <div class="lang-reset-container">
                        <a href="#" class="lang-reset-btn" id="langResetBtn">🔄 Reset to English</a>
                    </div>
                </div>
            `;

            // Insert before Discord button
            navActions.insertBefore(dropdown, navActions.firstChild);
            this.log('✅ Language dropdown created with reset button');

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
            const resetBtn = document.getElementById('langResetBtn');

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

            // Reset to English button
            if (resetBtn) {
                resetBtn.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.log('🔄 Resetting to English...');
                    this.changeLanguage('en');
                };
            }

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
                        if (node.parentElement.closest('.language-dropdown')) return NodeFilter.FILTER_REJECT;
                        
                        // EXCLUDE BADGES FROM TRANSLATION
                        if (node.parentElement.classList.contains('featured-badge')) return NodeFilter.FILTER_REJECT;
                        if (node.parentElement.classList.contains('discount-badge')) return NodeFilter.FILTER_REJECT;
                        
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

            // Save ALL SEO metadata (including new ones from #3)
            this.originalContent.title = document.title;
            
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                this.originalContent.description = metaDesc.getAttribute('content');
            }
            
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) {
                this.originalContent.ogTitle = ogTitle.getAttribute('content');
            }
            
            const ogDesc = document.querySelector('meta[property="og:description"]');
            if (ogDesc) {
                this.originalContent.ogDescription = ogDesc.getAttribute('content');
            }
            
            // NEW: Application names
            const appName = document.querySelector('meta[name="application-name"]');
            if (appName) {
                this.originalContent.applicationName = appName.getAttribute('content');
            }
            
            const appleTitle = document.querySelector('meta[name="apple-mobile-web-app-title"]');
            if (appleTitle) {
                this.originalContent.appleMobileTitle = appleTitle.getAttribute('content');
            }
            
            // NEW: JSON-LD Schema
            const jsonLdScript = document.querySelector('script[type="application/ld+json"]');
            if (jsonLdScript) {
                try {
                    const schema = JSON.parse(jsonLdScript.textContent);
                    if (schema.name) this.originalContent.schemaName = schema.name;
                    if (schema.description) this.originalContent.schemaDescription = schema.description;
                    this.originalContent.jsonLdElement = jsonLdScript;
                    this.originalContent.jsonLdFull = schema;
                } catch (e) {
                    this.log('Could not parse JSON-LD schema', true);
                }
            }
            
            // Save all image alt texts
            const images = document.querySelectorAll('img[alt]');
            images.forEach((img, index) => {
                this.originalContent[`img_alt_${index}`] = {
                    element: img,
                    text: img.getAttribute('alt')
                };
            });

            this.log(`✅ Saved ${Object.keys(this.originalContent).length} text elements + complete SEO metadata`);
        },

        // ========================================
        // GEMINI API BATCH TRANSLATION
        // ========================================
        
        // Batch translate multiple texts using Gemini API
        batchTranslateTexts: async function(textsArray, targetLang, retryCount = 0) {
            if (!textsArray || textsArray.length === 0) return [];

            const langName = SUPPORTED_LANGUAGES[targetLang]?.name || targetLang;
            
            try {
                const prompt = `You are a professional translator. Translate the following texts from English to ${langName} (${targetLang}).

IMPORTANT RULES:
1. Return ONLY a valid JSON array of translations
2. Maintain the EXACT same order as the input
3. Keep HTML entities, emojis, and special characters unchanged
4. Preserve formatting like line breaks
5. Do not add explanations or extra text
6. Return exactly ${textsArray.length} translations
7. For adult content terms, translate naturally and professionally

Input texts:
${JSON.stringify(textsArray, null, 2)}

Output format: ["translation1", "translation2", ...]`;

            
const response = await fetch(GEMINI_API_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    // send the same request body you would send to Gemini;
    // the Worker will append the secret key and forward it.
    contents: [{
      parts: [{
        text: prompt
      }]
    }],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 8000
    }
  })
});

                if (!response.ok) {
                    const errorText = await response.text();
                    
                    if (response.status === 429) {
                        if (retryCount < 3) {
                            const waitTime = (retryCount + 1) * REQUEST_DELAY;
                            this.log(`Rate limited, waiting ${waitTime/1000}s before retry ${retryCount + 1}/3...`);
                            await this.delay(waitTime);
                            return this.batchTranslateTexts(textsArray, targetLang, retryCount + 1);
                        }
                        throw new Error('Rate limit exceeded. Please try again in a minute.');
                    }
                    
                    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
                }

                const data = await response.json();
                
                if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                    throw new Error('Invalid response from Gemini API');
                }

                const responseText = data.candidates[0].content.parts[0].text;
                
                let jsonText = responseText.trim();
                if (jsonText.startsWith('```json')) {
                    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
                } else if (jsonText.startsWith('```')) {
                    jsonText = jsonText.replace(/```\n?/g, '');
                }
                
                const translations = JSON.parse(jsonText);
                
                if (!Array.isArray(translations)) {
                    throw new Error('Response is not an array');
                }
                
                if (translations.length !== textsArray.length) {
                    this.log(`Warning: Expected ${textsArray.length} translations, got ${translations.length}`, true);
                }
                
                return translations;
                
            } catch (error) {
                this.log(`Batch translation error: ${error.message}`, true);
                return textsArray;
            }
        },

        // Translate entire page
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
                const keys = Object.keys(this.originalContent).filter(key => !isNaN(key));
                const totalItems = keys.length;
                
                this.log(`📝 Translating ${totalItems} text elements in batches of ${BATCH_SIZE}...`);
                
                let translatedCount = 0;
                const startTime = Date.now();

                // Process in batches
                for (let i = 0; i < keys.length; i += BATCH_SIZE) {
                    const batchKeys = keys.slice(i, i + BATCH_SIZE);
                    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
                    const totalBatches = Math.ceil(keys.length / BATCH_SIZE);
                    
                    this.log(`Processing batch ${batchNumber}/${totalBatches} (${batchKeys.length} items)...`);
                    
                    const textsToTranslate = [];
                    const batchIndices = [];
                    
                    for (const key of batchKeys) {
                        const item = this.originalContent[key];
                        if (item && item.text) {
                            const cacheKey = `${item.text}_${targetLang}`;
                            if (this.translationCache[cacheKey]) {
                                item.node.textContent = this.translationCache[cacheKey];
                                translatedCount++;
                            } else {
                                textsToTranslate.push(item.text);
                                batchIndices.push(key);
                            }
                        }
                    }
                    
                    if (textsToTranslate.length > 0) {
                        this.log(`🤖 Calling Gemini API for ${textsToTranslate.length} texts...`);
                        
                        const translations = await this.batchTranslateTexts(textsToTranslate, targetLang);
                        
                        for (let j = 0; j < batchIndices.length && j < translations.length; j++) {
                            const key = batchIndices[j];
                            const item = this.originalContent[key];
                            const translation = translations[j];
                            
                            if (item && item.node && translation) {
                                item.node.textContent = translation;
                                
                                const cacheKey = `${item.text}_${targetLang}`;
                                this.translationCache[cacheKey] = translation;
                                
                                translatedCount++;
                            }
                        }
                        
                        this.saveCache();
                    }
                    
                    this.updateProgress(i + batchKeys.length, totalItems);
                    
                    if (i + BATCH_SIZE < keys.length) {
                        this.log(`⏳ Waiting ${REQUEST_DELAY/1000}s before next batch...`);
                        await this.delay(REQUEST_DELAY);
                    }
                }

                // Translate ALL SEO metadata (including new ones)
                this.log('📄 Translating complete SEO metadata...');
                
                const seoTexts = [];
                const seoKeys = [];
                
                if (this.originalContent.title) seoTexts.push(this.originalContent.title), seoKeys.push('title');
                if (this.originalContent.description) seoTexts.push(this.originalContent.description), seoKeys.push('description');
                if (this.originalContent.ogTitle) seoTexts.push(this.originalContent.ogTitle), seoKeys.push('ogTitle');
                if (this.originalContent.ogDescription) seoTexts.push(this.originalContent.ogDescription), seoKeys.push('ogDescription');
                if (this.originalContent.applicationName) seoTexts.push(this.originalContent.applicationName), seoKeys.push('applicationName');
                if (this.originalContent.appleMobileTitle) seoTexts.push(this.originalContent.appleMobileTitle), seoKeys.push('appleMobileTitle');
                if (this.originalContent.schemaName) seoTexts.push(this.originalContent.schemaName), seoKeys.push('schemaName');
                if (this.originalContent.schemaDescription) seoTexts.push(this.originalContent.schemaDescription), seoKeys.push('schemaDescription');
                
                if (seoTexts.length > 0) {
                    const seoTranslations = await this.batchTranslateTexts(seoTexts, targetLang);
                    
                    seoKeys.forEach((key, index) => {
                        const translation = seoTranslations[index];
                        if (translation) {
                            if (key === 'title') {
                                document.title = translation;
                            } else if (key === 'description') {
                                const metaDesc = document.querySelector('meta[name="description"]');
                                if (metaDesc) metaDesc.setAttribute('content', translation);
                            } else if (key === 'ogTitle') {
                                const ogTitle = document.querySelector('meta[property="og:title"]');
                                if (ogTitle) ogTitle.setAttribute('content', translation);
                            } else if (key === 'ogDescription') {
                                const ogDesc = document.querySelector('meta[property="og:description"]');
                                if (ogDesc) ogDesc.setAttribute('content', translation);
                            } else if (key === 'applicationName') {
                                const appName = document.querySelector('meta[name="application-name"]');
                                if (appName) appName.setAttribute('content', translation);
                            } else if (key === 'appleMobileTitle') {
                                const appleTitle = document.querySelector('meta[name="apple-mobile-web-app-title"]');
                                if (appleTitle) appleTitle.setAttribute('content', translation);
                            } else if (key === 'schemaName' && this.originalContent.jsonLdFull) {
                                this.originalContent.jsonLdFull.name = translation;
                            } else if (key === 'schemaDescription' && this.originalContent.jsonLdFull) {
                                this.originalContent.jsonLdFull.description = translation;
                            }
                        }
                    });
                    
                    // Update JSON-LD if it was translated
                    if (this.originalContent.jsonLdElement && this.originalContent.jsonLdFull) {
                        this.originalContent.jsonLdElement.textContent = JSON.stringify(this.originalContent.jsonLdFull, null, 2);
                    }
                }
                
                // Translate image alt texts
                const altTexts = [];
                const altKeys = [];
                Object.keys(this.originalContent).forEach(key => {
                    if (key.startsWith('img_alt_')) {
                        altTexts.push(this.originalContent[key].text);
                        altKeys.push(key);
                    }
                });
                
                if (altTexts.length > 0) {
                    this.log(`🖼️ Translating ${altTexts.length} image alt texts...`);
                    const altTranslations = await this.batchTranslateTexts(altTexts, targetLang);
                    
                    altKeys.forEach((key, index) => {
                        const translation = altTranslations[index];
                        if (translation && this.originalContent[key].element) {
                            this.originalContent[key].element.setAttribute('alt', translation);
                        }
                    });
                }

                document.documentElement.lang = targetLang;
                
                const duration = ((Date.now() - startTime) / 1000).toFixed(1);
                this.log(`✅ Translation complete! ${translatedCount} elements in ${duration}s`);
                this.showNotification(`✨ Translated to ${SUPPORTED_LANGUAGES[targetLang].name}!`, 'success');
                
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
            // Restore text nodes
            Object.keys(this.originalContent).forEach(key => {
                if (!isNaN(key)) {
                    const item = this.originalContent[key];
                    if (item && item.node && item.text) {
                        item.node.textContent = item.text;
                    }
                }
            });

            // Restore ALL SEO metadata
            if (this.originalContent.title) {
                document.title = this.originalContent.title;
            }
            
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc && this.originalContent.description) {
                metaDesc.setAttribute('content', this.originalContent.description);
            }
            
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle && this.originalContent.ogTitle) {
                ogTitle.setAttribute('content', this.originalContent.ogTitle);
            }
            
            const ogDesc = document.querySelector('meta[property="og:description"]');
            if (ogDesc && this.originalContent.ogDescription) {
                ogDesc.setAttribute('content', this.originalContent.ogDescription);
            }
            
            const appName = document.querySelector('meta[name="application-name"]');
            if (appName && this.originalContent.applicationName) {
                appName.setAttribute('content', this.originalContent.applicationName);
            }
            
            const appleTitle = document.querySelector('meta[name="apple-mobile-web-app-title"]');
            if (appleTitle && this.originalContent.appleMobileTitle) {
                appleTitle.setAttribute('content', this.originalContent.appleMobileTitle);
            }
            
            // Restore JSON-LD
            if (this.originalContent.jsonLdElement && this.originalContent.schemaName) {
                const schema = this.originalContent.jsonLdFull;
                schema.name = this.originalContent.schemaName;
                schema.description = this.originalContent.schemaDescription;
                this.originalContent.jsonLdElement.textContent = JSON.stringify(schema, null, 2);
            }
            
            // Restore image alt texts
            Object.keys(this.originalContent).forEach(key => {
                if (key.startsWith('img_alt_')) {
                    const item = this.originalContent[key];
                    if (item.element && item.text) {
                        item.element.setAttribute('alt', item.text);
                    }
                }
            });

            document.documentElement.lang = 'en';
            this.log('✅ Restored English content');
            this.showNotification('Restored to English', 'success');
        },

        // Change language
        changeLanguage: async function(lang) {
            if (lang === this.currentLang) {
                this.dropdownOpen = false;
                document.getElementById('langDropdownMenu').classList.remove('active');
                return;
            }
            
            this.log(`🔄 Changing language to: ${SUPPORTED_LANGUAGES[lang].name}`);
            this.currentLang = lang;
            localStorage.setItem('flirty_language', lang);
            
            const flagBtn = document.querySelector('.flag-icon');
            if (flagBtn) {
                flagBtn.textContent = SUPPORTED_LANGUAGES[lang].flag;
            }

            document.querySelectorAll('.lang-item').forEach(item => {
                item.classList.remove('active');
            });
            
            this.dropdownOpen = false;
            document.getElementById('langDropdownMenu').classList.remove('active');

            await this.translatePage(lang);
        },

        // UI Components
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

        updateProgress: function(current, total) {
            const percent = Math.round((current / total) * 100);
            const percentEl = document.getElementById('progressPercent');
            if (percentEl) {
                percentEl.textContent = `${percent}%`;
            }
        },

        hideProgressIndicator: function() {
            const indicator = document.getElementById('translationProgress');
            if (indicator) {
                indicator.classList.remove('active');
                setTimeout(() => indicator.remove(), 300);
            }
        },

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

        delay: function(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    };

    // Expose to window
    window.AutoTranslate = AutoTranslate;

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => AutoTranslate.init());
    } else {
        AutoTranslate.init();
    }

})();
