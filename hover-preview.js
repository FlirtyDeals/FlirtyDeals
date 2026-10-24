// ============================================
// FlirtyDeals.com - hover-preview.js
// Short video previews on the deal thumbnails.
//
// Mouse devices: the video plays while the pointer is over the thumbnail.
// Touch devices: there is no hover, so each thumbnail gets a small play
//   icon. Tapping the thumbnail plays the preview, tapping again stops it.
//   Only one preview plays at a time, and it stops when scrolled out of
//   view. The hero image plays while it is on screen, because tapping the
//   hero opens the offer.
//
// Portrait media (for example the Candy.Ai video) is shown with its full
// height inside the card. The empty areas at the sides are filled with a
// blurred, enlarged copy of the same picture, so it looks neat.
// ============================================

(function () {
  'use strict';

  // Anything narrower than this width/height ratio gets the full-height
  // treatment. A normal 16:9 video is about 1.78.
  var FIT_RATIO = 1.5;

  // Also apply the full-height treatment to the still thumbnail, so the
  // card does not jump when the video starts. Set to false to leave
  // still images cropped.
  var FIT_STILL_IMAGES = true;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var coarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  // Phones and tablets: no hover, so previews start with a tap instead.
  // iPadOS reports itself as a Mac, so detect it by Mac + multi-touch.
  var isIPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  var mobileUA = /Android|iPhone|iPad|iPod|Mobile|Tablet/i.test(navigator.userAgent);
  // Only phones/tablets use tap mode. Desktops and laptops (even with a
  // touchscreen) keep the mouse hover behaviour.
  var touchMode = coarsePointer || !canHover || isIPadOS || mobileUA;
  var activeItem = null;

  function isNarrow(w, h) {
    return !!(w && h) && (w / h) < FIT_RATIO;
  }

  function isCard(item) {
    return item.classList.contains('deal-card');
  }

  // Deal cards show the video over their .aspect-video thumbnail box.
  // The hero image is its own box.
  function getBox(item) {
    return isCard(item) ? item.querySelector('.aspect-video') : item;
  }

  // ---------------------------------------------------------------------
  // Still thumbnail: show the whole image with a blurred copy behind it
  // ---------------------------------------------------------------------
  function fitStillImage(item) {
    var box = getBox(item);
    if (!box || !isCard(item)) return;
    var img = box.querySelector('img');
    if (!img) return;

    function apply() {
      if (box.classList.contains('is-fit')) return;
      if (!isNarrow(img.naturalWidth, img.naturalHeight)) return;
      var src = img.currentSrc || img.src;
      var bg = document.createElement('div');
      bg.className = 'card-fit-bg';
      bg.setAttribute('aria-hidden', 'true');
      bg.style.backgroundImage = 'url("' + src + '")';
      box.classList.add('is-fit');
      box.insertBefore(bg, img);
    }

    if (img.complete && img.naturalWidth) apply();
    else img.addEventListener('load', apply, { once: true });
  }

  // ---------------------------------------------------------------------
  // Preview video
  // ---------------------------------------------------------------------

  // Portrait video: show it at full height and paint a small, blurred
  // copy of the current frame on a canvas behind it. One video is
  // enough, and a canvas renders reliably on phones.
  function enterFit(video, box) {
    if (video.classList.contains('is-fit')) return;
    video.classList.add('is-fit');

    var canvas = document.createElement('canvas');
    canvas.className = 'card-preview-bg';
    canvas.width = 48;
    canvas.height = 27;
    canvas.setAttribute('aria-hidden', 'true');
    box.insertBefore(canvas, video);
    video._bg = canvas;
    if (video.classList.contains('is-playing')) canvas.classList.add('is-playing');

    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var raf = 0;

    function draw() {
      var vw = video.videoWidth;
      var vh = video.videoHeight;
      if (vw && vh) {
        var s = Math.max(canvas.width / vw, canvas.height / vh);
        var dw = vw * s;
        var dh = vh * s;
        try {
          ctx.drawImage(video, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);
          ctx.fillStyle = 'rgba(0,0,0,0.25)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } catch (e) { /* ignore */ }
      }
      raf = (!video.paused && !video.ended) ? requestAnimationFrame(draw) : 0;
    }

    video.addEventListener('play', function () {
      if (!raf) raf = requestAnimationFrame(draw);
    });
    if (!video.paused && !raf) raf = requestAnimationFrame(draw);
  }

  // The video element is created on the first start, so nothing is
  // downloaded until someone actually points at or taps a thumbnail.
  function ensureVideo(item) {
    var box = getBox(item);
    if (!box) return null;
    var video = box.querySelector('video.card-preview');
    if (video) return video;

    video = document.createElement('video');
    video.className = 'card-preview';
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', '');
    video.setAttribute('aria-hidden', 'true');
    video.tabIndex = -1;
    video.preload = 'auto';

    video.addEventListener('playing', function () {
      video.classList.add('is-playing');
      if (video._bg) video._bg.classList.add('is-playing');
    });

    function checkShape() {
      // Only deal cards use the full-height treatment.
      if (isCard(item) && isNarrow(video.videoWidth, video.videoHeight)) enterFit(video, box);
    }
    video.addEventListener('loadedmetadata', checkShape);

    video.src = item.dataset.preview;
    box.appendChild(video);
    if (video.readyState >= 1) checkShape();
    return video;
  }

  function setChip(item, playing) {
    var box = getBox(item);
    var icon = box && box.querySelector('.card-play .material-symbols-outlined');
    if (icon) icon.textContent = playing ? 'pause' : 'play_arrow';
  }

  function startPreview(item) {
    if (!item.dataset.preview) return;
    if (activeItem && activeItem !== item) stopPreview(activeItem);
    var video = ensureVideo(item);
    if (!video) return;
    activeItem = item;
    setChip(item, true);
    var p = video.play();
    if (p !== undefined) {
      p.catch(function () {
        // Autoplay refused or interrupted: go back to the still image.
        if (activeItem === item) stopPreview(item);
      });
    }
  }

  function stopPreview(item) {
    var box = getBox(item);
    var video = box && box.querySelector('video.card-preview');
    if (video) {
      video.pause();
      video.classList.remove('is-playing');
      if (video._bg) video._bg.classList.remove('is-playing');
      try { video.currentTime = 0; } catch (e) { /* ignore */ }
    }
    setChip(item, false);
    if (activeItem === item) activeItem = null;
  }

  // Small play icon in the corner of each thumbnail (touch devices only,
  // shown through the html.touch-previews class).
  function addTapTarget(item) {
    var box = getBox(item);
    if (!box || box.querySelector('.card-play')) return;
    var chip = document.createElement('span');
    chip.className = 'card-play';
    chip.setAttribute('aria-hidden', 'true');
    // Inline styles so the icon shows even if styles.css is cached or stale.
    chip.style.cssText = 'display:flex;position:absolute;right:8px;bottom:8px;' +
      'width:40px;height:40px;border-radius:50%;background:rgba(0,0,0,0.65);' +
      'border:1.5px solid rgba(255,255,255,0.85);color:#fff;align-items:center;' +
      'justify-content:center;z-index:5;pointer-events:none;' +
      'box-shadow:0 2px 8px rgba(0,0,0,0.35);';
    var icon = document.createElement('span');
    icon.className = 'material-symbols-outlined';
    icon.textContent = 'play_arrow';
    chip.appendChild(icon);
    box.appendChild(chip);

    box.setAttribute('role', 'button');
    box.setAttribute('aria-label', 'Play preview');
    box.addEventListener('click', function () {
      if (activeItem === item) stopPreview(item);
      else startPreview(item);
    });
  }

  function init() {
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-preview]'));
    if (!items.length) return;

    if (FIT_STILL_IMAGES) items.forEach(fitStillImage);

    if (!touchMode) {
      // Mouse devices: previews follow the pointer. Skipped when the
      // visitor asked for reduced motion.
      if (reduceMotion) return;
      items.forEach(function (item) {
        var box = getBox(item);
        if (!box) return;
        box.addEventListener('mouseenter', function () { startPreview(item); });
        box.addEventListener('mouseleave', function () { stopPreview(item); });
      });
      return;
    }

    // Touch devices. The tap icon always shows, even with reduced motion,
    // because a tap is the visitor asking for the preview.
    document.documentElement.classList.add('touch-previews');
    var cards = items.filter(isCard);
    var heroes = items.filter(function (item) { return !isCard(item); });

    cards.forEach(addTapTarget);

    if ('IntersectionObserver' in window) {
      // A running card preview stops once its card scrolls out of view.
      var cardObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting && activeItem === entry.target) stopPreview(entry.target);
        });
      }, { threshold: 0 });
      cards.forEach(function (card) { cardObserver.observe(card); });

      // The hero is a link, so it plays on its own while it is on screen.
      var heroObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) startPreview(entry.target);
          else stopPreview(entry.target);
        });
      }, { threshold: [0, 0.5] });
      if (!reduceMotion) heroes.forEach(function (hero) { heroObserver.observe(hero); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
