# FlirtyDeals Multi-Language Setup

## Quick Setup

### 1. Folder Structure
Create this folder structure on your website:

```
/                           (root)
├── index.html              ← Use "index.html" (RELATIVE paths)
├── translations.json
├── i18n.js
├── i18n.css
├── script.js
├── styles.css
├── cookie-consent.css
├── thumbnails/
├── favicon/
├── (other files...)
│
├── /zh/                    (Chinese)
│   └── index.html          ← Use "index-lang.html" (ABSOLUTE paths)
│
├── /de/                    (German)
│   └── index.html          ← Use "index-lang.html"
│
├── /fr/                    (French)
│   └── index.html          ← Use "index-lang.html"
│
├── /es/                    (Spanish)
│   └── index.html          ← Use "index-lang.html"
│
├── /hi/                    (Hindi)
│   └── index.html          ← Use "index-lang.html"
│
├── /ar/                    (Arabic)
│   └── index.html          ← Use "index-lang.html"
│
├── /bn/                    (Bengali)
│   └── index.html          ← Use "index-lang.html"
│
├── /pt/                    (Portuguese)
│   └── index.html          ← Use "index-lang.html"
│
├── /ru/                    (Russian)
│   └── index.html          ← Use "index-lang.html"
│
├── /id/                    (Indonesian)
│   └── index.html          ← Use "index-lang.html"
│
├── /ur/                    (Urdu)
│   └── index.html          ← Use "index-lang.html"
│
├── /ja/                    (Japanese)
│   └── index.html          ← Use "index-lang.html"
│
└── /pa/                    (Punjabi)
    └── index.html          ← Use "index-lang.html"
```

### 2. TWO Different HTML Files

**IMPORTANT:** You have TWO HTML files:

1. **index.html** - For ROOT directory only (has RELATIVE paths like `styles.css`)
2. **index-lang.html** - For ALL language folders (has ABSOLUTE paths like `/styles.css`)

**Why?**
- Root needs relative paths: `href="styles.css"` works from `/`
- Language folders need absolute paths: `href="/styles.css"` works from `/de/`, `/zh/`, etc.

**Setup:**
1. Upload `index.html` to root `/`
2. Rename `index-lang.html` to `index.html` 
3. Copy this renamed file to ALL language folders (/zh/, /de/, /fr/, etc.)
4. Upload `translations.json`, `i18n.js`, `i18n.css` to root `/` only
5. Keep ALL other files (CSS, JS, images) in root `/` only

### 3. Upload Everything

Upload your files to your web server using FTP/cPanel/etc.

**Step-by-Step Checklist:**

```
☐ 1. Upload to ROOT (/):
   ☐ index.html (the one with RELATIVE paths)
   ☐ translations.json
   ☐ i18n.js
   ☐ i18n.css
   ☐ styles.css
   ☐ script.js
   ☐ cookie-consent.js
   ☐ All other CSS/JS/image files

☐ 2. Create language folders:
   ☐ /zh/
   ☐ /de/
   ☐ /fr/
   ☐ /es/
   ☐ /hi/
   ☐ /ar/
   ☐ /bn/
   ☐ /pt/
   ☐ /ru/
   ☐ /id/
   ☐ /ur/
   ☐ /ja/
   ☐ /pa/

☐ 3. For EACH language folder:
   ☐ Rename index-lang.html to index.html
   ☐ Upload this file to the language folder
   ☐ DO NOT upload any other files (no CSS, no images)

☐ 4. Test:
   ☐ Visit yoursite.com - should load English
   ☐ Visit yoursite.com/de/ - should load German
   ☐ Visit yoursite.com/zh/ - should load Chinese
```

### 4. Done!

The system will automatically:
- ✅ Detect visitor's browser language
- ✅ Redirect them to the correct language
- ✅ Load real-time currency exchange rates
- ✅ Show a language switcher dropdown
- ✅ Remember their language choice

## How It Works

### Path Resolution (Critical!)
```
Website Structure:
/
├── index.html              ← RELATIVE paths (href="styles.css")
├── styles.css
├── i18n.js
├── thumbnails/
│
├── /de/
│   └── index.html          ← ABSOLUTE paths (href="/styles.css")
│
└── /zh/
    └── index.html          ← ABSOLUTE paths (href="/styles.css")

ROOT (/) uses index.html:
- <link href="styles.css">      → Loads /styles.css ✓
- <img src="thumbnails/img.jpg"> → Loads /thumbnails/img.jpg ✓

LANGUAGE FOLDERS use index-lang.html (renamed to index.html):
- /de/index.html with <link href="/styles.css">     → Loads /styles.css ✓
- /zh/index.html with <img src="/thumbnails/img.jpg"> → Loads /thumbnails/img.jpg ✓

Two different files, same result: both load from root!
```

### Auto Language Detection
1. **First Visit**: User visits `flirtydeals.com`
   - Script detects browser language (e.g., German)
   - Redirects to `/de/`
   - Saves preference in browser

2. **Return Visit**: User visits any URL
   - Script checks saved preference
   - Redirects to their preferred language
   - They can change it anytime with the dropdown

### Currency Conversion
- Fetches live exchange rates from hexarate.paikama.co API
- Converts all prices automatically
- Falls back to hardcoded rates if API fails
- Updates prices for each language

### Language Switcher
- Flag dropdown in the navbar
- Shows all 14 languages
- Click to switch instantly
- Preference saved in browser

## Editing Translations

### To change text:
1. Open `translations.json`
2. Find the language code (e.g., "de" for German)
3. Edit the text
4. Save and re-upload

### To change prices:
The system handles this automatically:
1. Prices are stored in USD in `translations.json`
2. JavaScript fetches live exchange rates
3. Prices are converted on-the-fly

## Language Codes

- **en** = English (root URL)
- **zh** = Chinese (Mandarin)
- **hi** = Hindi
- **es** = Spanish
- **ar** = Arabic (RTL)
- **bn** = Bengali
- **pt** = Portuguese
- **ru** = Russian
- **id** = Indonesian
- **ur** = Urdu (RTL)
- **ja** = Japanese
- **pa** = Punjabi
- **fr** = French
- **de** = German

## RTL (Right-to-Left) Languages

Arabic and Urdu automatically switch the entire layout to RTL mode.

## SEO Benefits

Each language has its own URL:
- English: `flirtydeals.com/`
- German: `flirtydeals.com/de/`
- Chinese: `flirtydeals.com/zh/`

Google can index all language versions separately for better international SEO!

## Troubleshooting

**Problem**: Root site broken, CSS not loading
- **Solution**: Make sure you're using `index.html` (RELATIVE paths) in the root, NOT `index-lang.html`
- Root should have `href="styles.css"` not `href="/styles.css"`

**Problem**: Language folders broken, CSS not loading  
- **Solution**: Make sure you renamed `index-lang.html` to `index.html` before uploading to language folders
- Language folders should have `href="/styles.css"` (with the `/`)

**Problem**: CSS/Images not loading in language folders
- **Solution**: All paths in index.html are now absolute (start with `/`)
- This means ALL assets must be in the root directory
- Don't create `/de/styles.css` or `/zh/thumbnails/` - keep everything in root
- The SAME index.html works in every folder because paths always point to root

**Problem**: Language not switching
- Check that `i18n.js` is loaded before `script.js`
- Check browser console for errors

**Problem**: Translations not showing
- Make sure `translations.json` is in the root directory
- Check that the file path `/translations.json` is accessible

**Problem**: Currency not converting
- The API might be down (script will use fallback rates)
- Check browser console for API errors

**Problem**: Wrong language showing
- Clear browser localStorage
- Try in incognito/private mode
- Check the URL path matches a language folder

## Need Help?

1. Check browser console (F12) for error messages
2. Verify all files are uploaded correctly
3. Make sure index.html is in EVERY language folder
4. Confirm translations.json is valid JSON (use jsonlint.com)
