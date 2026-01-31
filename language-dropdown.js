// Language Dropdown with Hidden Google Translate Integration
// This script creates a beautiful custom dropdown that controls Google Translate invisibly

const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh-CN', name: 'Chinese (Simplified)', flag: '🇨🇳' },
    { code: 'zh-TW', name: 'Chinese (Traditional)', flag: '🇹🇼' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
    { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
    { code: 'no', name: 'Norwegian', flag: '🇳🇴' },
    { code: 'da', name: 'Danish', flag: '🇩🇰' },
    { code: 'fi', name: 'Finnish', flag: '🇫🇮' },
    { code: 'pl', name: 'Polish', flag: '🇵🇱' },
    { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
    { code: 'th', name: 'Thai', flag: '🇹🇭' },
    { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
    { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
    { code: 'ms', name: 'Malay', flag: '🇲🇾' },
    { code: 'tl', name: 'Filipino', flag: '🇵🇭' },
    { code: 'he', name: 'Hebrew', flag: '🇮🇱' },
    { code: 'uk', name: 'Ukrainian', flag: '🇺🇦' },
    { code: 'cs', name: 'Czech', flag: '🇨🇿' },
    { code: 'ro', name: 'Romanian', flag: '🇷🇴' },
    { code: 'hu', name: 'Hungarian', flag: '🇭🇺' },
    { code: 'el', name: 'Greek', flag: '🇬🇷' },
    { code: 'bg', name: 'Bulgarian', flag: '🇧🇬' },
    { code: 'sr', name: 'Serbian', flag: '🇷🇸' },
    { code: 'hr', name: 'Croatian', flag: '🇭🇷' },
    { code: 'sk', name: 'Slovak', flag: '🇸🇰' },
    { code: 'sl', name: 'Slovenian', flag: '🇸🇮' },
    { code: 'lt', name: 'Lithuanian', flag: '🇱🇹' },
    { code: 'lv', name: 'Latvian', flag: '🇱🇻' },
    { code: 'et', name: 'Estonian', flag: '🇪🇪' }
];

let currentLanguage = 'en';
let googleTranslateReady = false;

// CRITICAL: Define this function BEFORE the Google Translate script loads
// This gets called automatically by Google Translate when it's ready
window.googleTranslateElementInit = function() {
    console.log('🔄 Initializing Google Translate...');
    
    // Create the Google Translate widget
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: languages.map(l => l.code).join(','),
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
    
    console.log('✅ Google Translate initialized, waiting for dropdown...');
    
    // Wait for the select element to be created
    waitForGoogleTranslate();
}

// Wait for Google Translate select element to be created
function waitForGoogleTranslate() {
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max
    
    const checkInterval = setInterval(() => {
        attempts++;
        const select = document.querySelector('.goog-te-combo');
        
        if (select) {
            console.log('✅ Google Translate dropdown found!', select.options.length, 'languages available');
            googleTranslateReady = true;
            hideGoogleTranslateUI();
            clearInterval(checkInterval);
        } else if (attempts >= maxAttempts) {
            console.error('❌ Google Translate failed to load after', attempts * 100, 'ms');
            clearInterval(checkInterval);
        }
    }, 100);
}

// Completely hide all Google Translate UI elements
function hideGoogleTranslateUI() {
    // Hide the widget itself
    const widget = document.getElementById('google_translate_element');
    if (widget) {
        widget.style.display = 'none';
        widget.style.visibility = 'hidden';
        widget.style.opacity = '0';
        widget.style.position = 'absolute';
        widget.style.left = '-9999px';
    }
    
    // Remove body top padding that Google adds
    document.body.style.top = '0 !important';
    document.body.style.position = 'static !important';
    
    // Hide the top banner if it appears
    const observer = new MutationObserver(() => {
        const banner = document.querySelector('.goog-te-banner-frame');
        if (banner && banner.style.display !== 'none') {
            banner.style.display = 'none';
            document.body.style.top = '0';
        }
        
        // Also hide any skiptranslate elements
        document.querySelectorAll('.skiptranslate').forEach(el => {
            if (el.id !== 'google_translate_element') {
                el.style.display = 'none';
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Change language programmatically
function changeLanguage(langCode) {
    console.log('🌍 Attempting to change language to:', langCode);
    
    if (!googleTranslateReady) {
        console.error('❌ Google Translate not ready yet. Please wait a moment and try again.');
        showNotification('Translation service loading, please wait...', 'info');
        return;
    }
    
    const select = document.querySelector('.goog-te-combo');
    if (!select) {
        console.error('❌ Google Translate select element not found.');
        showNotification('Translation service unavailable', 'error');
        return;
    }
    
    try {
        if (langCode === 'en') {
            // Reset to English
            select.value = '';
        } else {
            // Change to selected language
            select.value = langCode;
        }
        
        // Trigger the change event
        select.dispatchEvent(new Event('change'));
        
        // Update UI
        currentLanguage = langCode;
        updateDropdownButton();
        
        console.log('✅ Language changed to:', langCode);
        
        // Show notification
        const lang = languages.find(l => l.code === langCode);
        if (lang) {
            showNotification(`Translating to ${lang.name}...`, 'success');
        }
    } catch (error) {
        console.error('❌ Error changing language:', error);
        showNotification('Translation failed', 'error');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.translation-notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `translation-notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('active'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('active');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Update the dropdown button to show current language
function updateDropdownButton() {
    const currentLang = languages.find(l => l.code === currentLanguage);
    const flagIcon = document.querySelector('.flag-icon');
    if (flagIcon && currentLang) {
        flagIcon.textContent = currentLang.flag;
    }
    
    // Update active state in dropdown
    document.querySelectorAll('.lang-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.lang === currentLanguage) {
            item.classList.add('active');
        }
    });
}

// Create the custom language dropdown
function createLanguageDropdown() {
    const navActions = document.querySelector('.nav-actions');
    if (!navActions) {
        console.error('❌ Could not find .nav-actions element');
        return;
    }
    
    const dropdownHTML = `
        <div class="language-dropdown">
            <button class="lang-flag-btn" id="langFlagBtn">
                <span class="flag-icon">🇬🇧</span>
                <span class="dropdown-arrow">▼</span>
            </button>
            <div class="lang-dropdown-menu" id="langDropdownMenu">
                <div class="lang-search-container">
                    <input type="text" class="lang-search" id="langSearch" placeholder="Search languages...">
                </div>
                <div class="lang-list" id="langList">
                    ${languages.map(lang => `
                        <div class="lang-item ${lang.code === 'en' ? 'active' : ''}" data-lang="${lang.code}">
                            <span class="lang-flag">${lang.flag}</span>
                            <span class="lang-name">${lang.name}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="lang-reset-container">
                    <button class="lang-reset-btn" id="langResetBtn">Reset to English</button>
                </div>
            </div>
        </div>
    `;
    
    // Insert before Discord button
    const discordBtn = navActions.querySelector('a[href*="discord"]');
    if (discordBtn) {
        discordBtn.insertAdjacentHTML('beforebegin', dropdownHTML);
    } else {
        navActions.insertAdjacentHTML('afterbegin', dropdownHTML);
    }
    
    console.log('✅ Language dropdown created');
    
    // Add event listeners
    setupEventListeners();
}

// Setup all event listeners for the dropdown
function setupEventListeners() {
    const flagBtn = document.getElementById('langFlagBtn');
    const dropdownMenu = document.getElementById('langDropdownMenu');
    const searchInput = document.getElementById('langSearch');
    const resetBtn = document.getElementById('langResetBtn');
    
    if (!flagBtn || !dropdownMenu || !searchInput || !resetBtn) {
        console.error('❌ Could not find dropdown elements');
        return;
    }
    
    // Toggle dropdown
    flagBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.language-dropdown')) {
            dropdownMenu.classList.remove('active');
        }
    });
    
    // Language search
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        document.querySelectorAll('.lang-item').forEach(item => {
            const langName = item.querySelector('.lang-name').textContent.toLowerCase();
            if (langName.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    // Language selection
    document.querySelectorAll('.lang-item').forEach(item => {
        item.addEventListener('click', () => {
            const langCode = item.dataset.lang;
            changeLanguage(langCode);
            dropdownMenu.classList.remove('active');
            searchInput.value = '';
            // Reset search filter
            document.querySelectorAll('.lang-item').forEach(i => i.style.display = 'flex');
        });
    });
    
    // Reset button
    resetBtn.addEventListener('click', () => {
        changeLanguage('en');
        dropdownMenu.classList.remove('active');
    });
    
    console.log('✅ Event listeners attached');
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    console.log('🚀 Initializing language dropdown...');
    createLanguageDropdown();
    
    // Keep checking and hiding Google's UI elements
    setInterval(hideGoogleTranslateUI, 500);
}
