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

// Initialize Google Translate (hidden)
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: languages.map(l => l.code).join(','),
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
    
    // Wait for Google Translate to load, then hide it
    setTimeout(hideGoogleTranslateUI, 1000);
}

// Completely hide all Google Translate UI elements
function hideGoogleTranslateUI() {
    // Hide the top banner
    const banner = document.querySelector('.goog-te-banner-frame');
    if (banner) banner.style.display = 'none';
    
    // Remove body top padding that Google adds
    document.body.style.top = '0';
    document.body.style.position = 'static';
    
    // Hide the widget itself
    const widget = document.getElementById('google_translate_element');
    if (widget) {
        widget.style.display = 'none';
        widget.style.visibility = 'hidden';
        widget.style.opacity = '0';
        widget.style.position = 'absolute';
        widget.style.left = '-9999px';
    }
}

// Change language programmatically
function changeLanguage(langCode) {
    if (langCode === 'en') {
        // Reset to original English
        const select = document.querySelector('.goog-te-combo');
        if (select) {
            select.value = '';
            select.dispatchEvent(new Event('change'));
        }
        currentLanguage = 'en';
        updateDropdownButton();
        return;
    }
    
    // Change to selected language
    const select = document.querySelector('.goog-te-combo');
    if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
        currentLanguage = langCode;
        updateDropdownButton();
    }
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
    if (!navActions) return;
    
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
    
    // Add event listeners
    setupEventListeners();
}

// Setup all event listeners for the dropdown
function setupEventListeners() {
    const flagBtn = document.getElementById('langFlagBtn');
    const dropdownMenu = document.getElementById('langDropdownMenu');
    const searchInput = document.getElementById('langSearch');
    const resetBtn = document.getElementById('langResetBtn');
    
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
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    createLanguageDropdown();
    
    // Keep checking and hiding Google's UI elements
    setInterval(hideGoogleTranslateUI, 500);
}

// Make the init function available globally for Google Translate callback
window.googleTranslateElementInit = googleTranslateElementInit;
