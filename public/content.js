(function () {
  "use strict";

  // --- Configuration ---
  const REMOVAL_METHOD = "hide"; // 'hide' is stealthier, 'remove' is more aggressive.
  const DEBOUNCE_TIME = 100; // ms to wait after the last DOM change before scanning.

  const adSelectors = {
    // Expanded list for YouTube with common and dynamic patterns
    youtube: [
      ".video-ads",
      ".ytp-ad-module",
      ".ytp-ad-skip-button-container",
      ".ytp-ad-overlay-container",
      "ytd-promoted-sparkles-web-renderer",
      "ytd-in-feed-ad-layout-renderer",
      "div#player-ads",
      "div#masthead-ad",
      "ytd-ad-slot-renderer",
    ],
    // Expanded general list with attribute selectors for broader matching
    general: [
      ".ad",
      ".ads",
      ".advert",
      ".advertisement",
      '[id*="ad-slot"]',
      '[id*="google_ads"]',
      '[class*="ad-container"]',
      '[class*="google-ad"]',
      "ins.adsbygoogle",
      'iframe[src*="doubleclick.net"]',
      'iframe[src*="googlesyndication.com"]',
      'iframe[src*="adservice.google.com"]',
    ],
  };

  /**
   * Hides or removes an element.
   * @param {Element} el The element to process.
   */
  function processAdElement(el) {
    if (REMOVAL_METHOD === "hide") {
      el.style.setProperty("display", "none", "important");
      el.style.setProperty("visibility", "hidden", "important");
      el.style.setProperty("width", "0", "important");
      el.style.setProperty("height", "0", "important");
    } else {
      el.remove();
    }
  }

  /**
   * Scans the DOM and processes all elements matching the given selectors.
   * @param {string[]} selectors - Array of CSS selectors to find ads.
   */
  function runAdRemover(selectors) {
    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach(processAdElement);
    });
  }

  /**
   * A simple debounce utility to prevent a function from being called too frequently.
   * @param {Function} func The function to debounce.
   * @param {number} delay The debounce delay in milliseconds.
   * @returns {Function} The debounced function.
   */
  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  /**
   * Initializes the ad observer and runs the initial scan.
   */
  function initialize() {
    const host = window.location.hostname;
    let activeSelectors = adSelectors.general;

    if (host.includes("youtube.com")) {
      activeSelectors = [...adSelectors.general, ...adSelectors.youtube];
    }

    // Create a debounced version of the remover function for performance
    const debouncedRemover = debounce(
      () => runAdRemover(activeSelectors),
      DEBOUNCE_TIME
    );

    const observer = new MutationObserver((mutations) => {
      // Check if any added nodes could be ads before running the full scan
      let mightBeAd = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          mightBeAd = true;
          break;
        }
      }

      if (mightBeAd) {
        debouncedRemover();
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    // Run an initial scan when the script loads
    runAdRemover(activeSelectors);
    console.log("Ad remover script is active.");
  }

  // Start the process
  initialize();
})();
