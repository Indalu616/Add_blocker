/* global chrome */
import React, { useState, useEffect } from "react";
import { Switch, FormControlLabel, Typography } from "@mui/material";

const WhitelistManager = () => {
  const [currentSite, setCurrentSite] = useState("");
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the current active tab to find its hostname
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url) {
        const url = new URL(tabs[0].url);
        const hostname = url.hostname;
        setCurrentSite(hostname);

        // Check if this site is already in our whitelist
        chrome.storage.local.get("whitelist", (data) => {
          const whitelist = data.whitelist || [];
          setIsWhitelisted(whitelist.includes(hostname));
          setLoading(false);
        });
      }
    });
  }, []);

  const handleToggle = (event) => {
    const shouldWhitelist = event.target.checked;
    setIsWhitelisted(shouldWhitelist);

    chrome.storage.local.get("whitelist", (data) => {
      let whitelist = data.whitelist || [];
      if (shouldWhitelist) {
        // Add to whitelist
        whitelist.push(currentSite);
      } else {
        // Remove from whitelist
        whitelist = whitelist.filter((site) => site !== currentSite);
      }

      // Save the new list and notify the background script
      chrome.storage.local.set({ whitelist }, () => {
        chrome.runtime.sendMessage({ type: "UPDATE_WHITELIST" });
      });
    });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <FormControlLabel
      control={<Switch checked={isWhitelisted} onChange={handleToggle} />}
      label={`Allow ads on ${currentSite}`}
    />
  );
};

export default WhitelistManager;
