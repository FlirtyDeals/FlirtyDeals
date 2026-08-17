// ============================================
// CONFIGURATION - CHANGE THIS!
// ============================================
const GA_MEASUREMENT_ID = 'G-MKQEWDMLP3'; // Replace with your Google Analytics ID

// ============================================
// Cookie Consent Manager
// ============================================

const CONSENT_KEY = 'cookie_consent';

// Check if user has already made a choice
function hasConsent() {
    return localStorage.getItem(CONSENT_KEY) !== null;
}

// Get current consent preferences
function getConsent() {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
        return { necessary: true, analytics: false };
    }
    return JSON.parse(stored);
}

// Save consent preferences
function saveConsent(preferences) {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(preferences));
    applyConsent(preferences);
}

// Apply consent (load/block scripts)
function applyConsent(preferences) {
    if (preferences.analytics) {
        loadGoogleAnalytics();
        loadCloudflareAnalytics();
    }
    // Add other tracking scripts here if needed
}

// Load Cloudflare Web Analytics
function loadCloudflareAnalytics() {
    // Check if already loaded
    if (document.getElementById('cf-beacon-script')) return;

    const script = document.createElement('script');
    script.id = 'cf-beacon-script';
    script.type = 'module';
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.setAttribute('data-cf-beacon', '{"token": "d92799592cda4446974d43ac1e1ff943"}');
    document.head.appendChild(script);

    console.log('✅ Cloudflare Web Analytics loaded');
}

// Load Google Analytics
function loadGoogleAnalytics() {
    // Check if already loaded
    if (window.gtag) return;
    
    // Create script tag
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
    
    console.log('✅ Google Analytics loaded');
}

// ============================================
// UI Functions
// ============================================

function showBanner() {
    document.getElementById('fd-notice').classList.add('show');
}

function hideBanner() {
    document.getElementById('fd-notice').classList.remove('show');
}

function showSettingsButton() {
    document.getElementById('fd-prefs-btn').classList.add('show');
}

function openSettings() {
    const consent = getConsent();
    document.getElementById('fd-analytics-toggle').checked = consent.analytics;
    document.getElementById('fd-prefs-modal').classList.add('show');
    hideBanner();
}

function closeSettings() {
    document.getElementById('fd-prefs-modal').classList.remove('show');
}

// ============================================
// User Actions
// ============================================

function acceptAllCookies() {
    saveConsent({ necessary: true, analytics: true });
    hideBanner();
    showSettingsButton();
}

function rejectCookies() {
    saveConsent({ necessary: true, analytics: false });
    hideBanner();
    showSettingsButton();
}

function acceptAllFromModal() {
    saveConsent({ necessary: true, analytics: true });
    closeSettings();
}

function savePreferences() {
    const analytics = document.getElementById('fd-analytics-toggle').checked;
    saveConsent({ necessary: true, analytics });
    closeSettings();
}

function updatePreferences() {
    // This is called when toggles change, but we don't auto-save
    // User must click "Save Preferences"
}

// Close modal when clicking outside
document.getElementById('fd-prefs-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeSettings();
    }
});

// ============================================
// Initialize on page load
// ============================================

window.addEventListener('load', function() {
    if (hasConsent()) {
        // User has already consented, apply their preferences
        const consent = getConsent();
        applyConsent(consent);
        showSettingsButton();
    } else {
        // First visit, show banner
        showBanner();
    }
});