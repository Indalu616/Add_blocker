// Set initial state when the extension is installed
// background.js

const WHITELIST_RULE_ID_START = 10000;

// Function to apply whitelist rules
async function updateWhitelistRules() {
  const { whitelist = [] } = await chrome.storage.local.get("whitelist");

  // First, get existing dynamic rules
  const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
  const rulesToRemove = existingRules
    .filter((rule) => rule.id >= WHITELIST_RULE_ID_START)
    .map((rule) => rule.id);

  const rulesToAdd = whitelist.map((site, index) => ({
    id: WHITELIST_RULE_ID_START + index,
    priority: 2, // Higher priority to override block rules
    action: { type: "allow" },
    condition: {
      requestDomains: [site],
      resourceTypes: [
        "main_frame",
        "sub_frame",
        "script",
        "image",
        "xmlhttprequest",
        "stylesheet",
        "media",
      ],
    },
  }));

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rulesToRemove,
    addRules: rulesToAdd,
  });

  console.log("Whitelist rules updated for:", whitelist);
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "UPDATE_WHITELIST") {
    updateWhitelistRules();
  }
});

// Run on startup to ensure rules are set
chrome.runtime.onStartup.addListener(updateWhitelistRules);
chrome.runtime.onInstalled.addListener(updateWhitelistRules);

// --- Your existing background code below ---
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ extensionEnabled: true });
  console.log("Ad Blocker installed and enabled.");
});

// A function to update rules based on the enabled state
async function updateRuleState() {
  const { extensionEnabled } = await chrome.storage.local.get(
    "extensionEnabled"
  );

  if (extensionEnabled) {
    // This enables the ruleset defined in manifest.json
    await chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: ["ruleset_1"],
    });
    console.log("Blocking rules have been enabled.");
  } else {
    // This disables the ruleset
    await chrome.declarativeNetRequest.updateEnabledRulesets({
      disableRulesetIds: ["ruleset_1"],
    });
    console.log("Blocking rules have been disabled.");
  }
}

// Listen for changes in storage (e.g., if the user toggles the extension on/off from a popup)
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.extensionEnabled) {
    updateRuleState();
  }
});

// Ensure the rules are correctly set on browser startup
chrome.runtime.onStartup.addListener(() => {
  updateRuleState();
});
