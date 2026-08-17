// FlirtyDeals.com - Tailwind CDN theme configuration
// Extracted from the Stitch-generated markup so it can be reused/edited
// independently of the page HTML. Must load BEFORE the Tailwind CDN
// <script> tag runs, since it sets window.tailwind.config.
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "hot-pink": "#ff00a8",
        "primary-fixed-dim": "#ffafd2",
        "error-container": "#ffdad6",
        "on-tertiary-fixed-variant": "#005137",
        "surface-pink": "#fff8f8",
        "error": "#ba1a1a",
        "surface-dim": "#f0d2dc",
        "secondary-container": "#dae2fd",
        "on-secondary-fixed": "#131b2e",
        "outline": "#8e6e7b",
        "primary": "#b20074",
        "surface-tint": "#b60077",
        "surface-container-highest": "#f9dbe5",
        "surface": "#fff8f8",
        "on-tertiary": "#ffffff",
        "border-subtle": "#e2e8f0",
        "on-secondary": "#ffffff",
        "surface-container-low": "#fff0f4",
        "on-background": "#27171e",
        "on-primary-fixed-variant": "#8b005a",
        "tertiary-fixed-dim": "#68dba9",
        "on-secondary-fixed-variant": "#3f465c",
        "primary-fixed": "#ffd8e6",
        "background": "#fff8f8",
        "primary-container": "#de0092",
        "on-surface": "#27171e",
        "on-surface-variant": "#5a3f4a",
        "tertiary-fixed": "#85f8c4",
        "on-secondary-container": "#5c647a",
        "surface-container-lowest": "#ffffff",
        "on-primary-container": "#fffbff",
        "secondary-fixed-dim": "#bec6e0",
        "surface-container-high": "#ffe0eb",
        "surface-bright": "#fff8f8",
        "surface-container": "#ffe8ef",
        "inverse-primary": "#ffafd2",
        "on-tertiary-container": "#f5fff7",
        "outline-variant": "#e2bdca",
        "secondary": "#565e74",
        "tertiary": "#006948",
        "price-tag": "#059669"
      },
      borderRadius: {
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "gutter": "1.5rem",
        "stack-lg": "2rem",
        "margin-mobile": "1rem",
        "stack-sm": "0.5rem",
        "section-gap": "4rem",
        "container-max": "1280px",
        "stack-md": "1rem"
      },
      fontFamily: {
        "headline-lg": ["Hanken Grotesk"],
        "display-lg": ["Hanken Grotesk"],
        "headline-md": ["Hanken Grotesk"],
        "price-display": ["Hanken Grotesk"],
        "body-lg": ["Inter"],
        "headline-sm": ["Hanken Grotesk"],
        "label-md": ["Hanken Grotesk"],
        "body-md": ["Inter"],
        "headline-lg-mobile": ["Hanken Grotesk"]
      },
      fontSize: {
        "headline-lg": ["32px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "800" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "price-display": ["20px", { lineHeight: "1", fontWeight: "700" }],
        "body-lg": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "headline-sm": ["18px", { lineHeight: "1.4", fontWeight: "600" }],
        "label-md": ["13px", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "600" }],
        "body-md": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        "headline-lg-mobile": ["28px", { lineHeight: "1.2", fontWeight: "700" }]
      }
    }
  }
};
