// ============================================
// FlirtyDeals.com - main.js
// Site interactions for the merged (Stitch design + legacy features) page.
// ============================================

(function () {
  'use strict';

  // ----------------------------------------------------------------------
  // Robust persistent storage (localStorage -> IndexedDB -> cookie ->
  // sessionStorage), carried over from the old script.js so age
  // verification and the shemale reveal state survive blocked/cleared
  // localStorage.
  // ----------------------------------------------------------------------
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

  function openIDB() {
    return new Promise((resolve) => {
      if (!('indexedDB' in window)) return resolve(null);
      const req = indexedDB.open('flirty_deals_db', 1);
      req.onupgradeneeded = (evt) => {
        const db = evt.target.result;
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      };
      req.onsuccess = (evt) => resolve(evt.target.result);
      req.onerror = () => resolve(null);
    });
  }

  function idbGet(db, key) {
    return new Promise((resolve) => {
      if (!db) return resolve(null);
      try {
        const tx = db.transaction('settings', 'readonly');
        const req = tx.objectStore('settings').get(key);
        req.onsuccess = () => resolve(req.result ? req.result.value : null);
        req.onerror = () => resolve(null);
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
        tx.objectStore('settings').put({ key, value });
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      } catch (e) {
        resolve(false);
      }
    });
  }

  async function getStored(key) {
    try {
      if (storageAvailable('localStorage')) {
        const v = localStorage.getItem(key);
        if (v !== null) return v;
      }
    } catch (e) { /* ignore */ }

    try {
      const db = await openIDB();
      if (db) {
        const v = await idbGet(db, key);
        if (v !== null && v !== undefined) return v;
      }
    } catch (e) { /* ignore */ }

    try {
      const v = getCookie(key);
      if (v !== null && v !== undefined) return v;
    } catch (e) { /* ignore */ }

    try {
      if (storageAvailable('sessionStorage')) {
        const v = sessionStorage.getItem(key);
        if (v !== null) return v;
      }
    } catch (e) { /* ignore */ }

    return null;
  }

  async function setStored(key, value) {
    const str = String(value);
    try {
      if (storageAvailable('localStorage')) {
        localStorage.setItem(key, str);
        return true;
      }
    } catch (e) { /* ignore */ }

    try {
      const db = await openIDB();
      if (db && (await idbSet(db, key, str))) return true;
    } catch (e) { /* ignore */ }

    try {
      setCookie(key, str, 3650);
      return true;
    } catch (e) { /* ignore */ }

    try {
      if (storageAvailable('sessionStorage')) {
        sessionStorage.setItem(key, str);
        return true;
      }
    } catch (e) { /* ignore */ }

    return false;
  }

  async function getFlag(key) {
    return (await getStored(key)) === 'true';
  }

  async function saveFlag(key, value) {
    return setStored(key, value ? 'true' : 'false');
  }

  // ----------------------------------------------------------------------
  // Filtering (All / Premium / Free / Shemale / Trending)
  // ----------------------------------------------------------------------
  // Record each card's original parent grid + original order once, up
  // front, so filtering can move cards out and later put them back
  // exactly where they came from.
  let originalCardOrder = [];
  function recordOriginalCardPositions() {
    originalCardOrder = Array.from(document.querySelectorAll('#deals-grid .deal-card, #premium-grid .deal-card, #free-grid .deal-card, #shemale-grid .deal-card'));
    originalCardOrder.forEach((card) => {
      card.dataset.originalGrid = card.parentElement.id;
    });
  }

  function restoreCardsToOriginalGrids() {
    originalCardOrder.forEach((card) => {
      const home = document.getElementById(card.dataset.originalGrid);
      if (home && card.parentElement !== home) home.appendChild(card);
      card.style.display = 'flex';
    });
  }

  function filterDeals(category, clickedButton) {
    document.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.classList.remove('bg-hot-pink', 'text-white');
      btn.classList.add('bg-gray-100', 'dark:bg-[#1e293b]', 'text-gray-700', 'dark:text-white');
    });
    if (clickedButton) {
      clickedButton.classList.remove('bg-gray-100', 'dark:bg-[#1e293b]', 'text-gray-700', 'dark:text-white');
      clickedButton.classList.add('bg-hot-pink', 'text-white');
    }

    const filteredSection = document.getElementById('filtered-section');
    const filteredGrid = document.getElementById('filtered-grid');

    // Always start from a clean slate: every card back in its original
    // section. Without this, cards moved into the shared grid by a
    // previous filter click just stayed there (they were only ever
    // added to, never removed), so cycling through filters left every
    // previously-matched card visible alongside the new ones.
    restoreCardsToOriginalGrids();

    if (category === 'all') {
      if (filteredSection) filteredSection.style.display = 'none';
      document.querySelectorAll('[data-section]').forEach((section) => {
        section.style.display = '';
      });
      return;
    }

    // A filter is active: don't just hide non-matching cards within
    // each section - a section can still have one matching card left
    // (e.g. a "premium" card living in "Top Deals") and showing that
    // section's own header/grid makes the results look un-merged.
    // Instead, pull every matching card - regardless of which section
    // it started in - into one shared grid, and hide the original
    // category sections entirely.
    document.querySelectorAll('[data-section]').forEach((section) => {
      section.style.display = 'none';
    });

    if (filteredGrid) {
      originalCardOrder.forEach((card) => {
        const cats = (card.dataset.category || '').split(' ');
        if (cats.includes(category)) {
          filteredGrid.appendChild(card);
        }
      });
    }
    if (filteredSection) filteredSection.style.display = '';
  }
  window.filterDeals = filterDeals;

  // ----------------------------------------------------------------------
  // Click-to-reveal (Shemale/Trans cards) - blur toggled per-card, with the
  // choice persisted (and applied to all reveal cards at once, matching
  // the old site's "reveal all at once" behavior)
  // ----------------------------------------------------------------------
  async function attachRevealListeners() {
    const shemaleImages = document.querySelectorAll('.shemale-card .deal-image');
    const wasRevealed = await getFlag('shemaleRevealed');
    if (wasRevealed) {
      shemaleImages.forEach((img) => img.classList.add('revealed'));
    }

    shemaleImages.forEach((dealImage) => {
      dealImage.addEventListener('click', async () => {
        const nowRevealed = !dealImage.classList.contains('revealed');
        shemaleImages.forEach((img) => img.classList.toggle('revealed', nowRevealed));
        await saveFlag('shemaleRevealed', nowRevealed);
      });
    });
  }

  // ----------------------------------------------------------------------
  // Age verification (persistent across visits, multi-backend storage)
  // ----------------------------------------------------------------------
  async function initAgeVerification() {
    const ageModal = document.getElementById('ageModal');
    const acceptBtn = document.getElementById('acceptAge');
    const exitBtn = document.getElementById('exitSite');
    if (!ageModal) return;

    function exitSite() {
      window.location.href = 'https://www.google.com';
    }

    const isVerified = await getFlag('ageVerified');
    if (isVerified) {
      ageModal.remove();
      document.body.classList.remove('overflow-hidden');
      document.documentElement.classList.add('age-verified');
    } else {
      if (acceptBtn) {
        acceptBtn.addEventListener('click', async () => {
          await saveFlag('ageVerified', true);
          document.documentElement.classList.add('age-verified');
          ageModal.remove();
          document.body.classList.remove('overflow-hidden');
        });
      }
      if (exitBtn) exitBtn.addEventListener('click', exitSite);

      document.addEventListener('keydown', (e) => {
        if (!document.body.contains(ageModal)) return;
        if (e.key === 'Escape') exitSite();
        if (e.key === 'Enter') acceptBtn && acceptBtn.click();
      });
    }
  }

  // ----------------------------------------------------------------------
  // Dark mode (persisted, applied to <html> for Tailwind's class strategy)
  // ----------------------------------------------------------------------
  function initDarkMode() {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (!toggleBtn) return;
    toggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      try {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      } catch (e) { /* ignore */ }
    });
  }

  // ----------------------------------------------------------------------
  // Smooth scroll for in-page anchors (e.g. hero "View Deals" -> grid)
  // ----------------------------------------------------------------------
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.length <= 1) return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ----------------------------------------------------------------------
  // Scroll-to-top button
  // ----------------------------------------------------------------------
  function initScrollToTop() {
    const btn = document.getElementById('scrollToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('show', window.pageYOffset > 300);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ----------------------------------------------------------------------
  // Hero video autoplay fix for mobile browsers
  // ----------------------------------------------------------------------
  function fixVideoAutoplay() {
    document.querySelectorAll('video').forEach((video) => {
      const p = video.play();
      if (p !== undefined) p.catch(() => {});
    });
  }

  // ----------------------------------------------------------------------
  // Deal click tracking (stub - wire up to analytics/affiliate reporting)
  // ----------------------------------------------------------------------
  function trackDealClick(dealName, dealUrl) {
    console.log('Deal clicked:', dealName, dealUrl);
  }

  function initClickTracking() {
    document.querySelectorAll('.deal-btn').forEach((button) => {
      button.addEventListener('click', function () {
        const card = this.closest('.deal-card');
        const title = card ? card.querySelector('h3')?.textContent : 'Unknown';
        trackDealClick(title, this.href || '#');
      });
    });
  }

  // ----------------------------------------------------------------------
  // Init
  // ----------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    recordOriginalCardPositions();
    initAgeVerification();
    attachRevealListeners();
    initDarkMode();
    initSmoothScroll();
    initScrollToTop();
    initClickTracking();

    window.addEventListener('load', fixVideoAutoplay);
    window.addEventListener('orientationchange', fixVideoAutoplay);

    console.log('%c🌸 FlirtyDeals.com 🌸', 'color: #d6006e; font-size: 20px; font-weight: bold;');
  });
})();
