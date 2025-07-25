/* global chrome */
import React, { useState, useEffect } from "react";
import { Box, Typography, Switch, FormControlLabel } from "@mui/material";
import WhitelistManager from "./WhitelistManager"; // We will create this next

function Popup() {
  const [stats, setStats] = useState({ adsBlocked: 0 });

  useEffect(() => {
    // Fetch stats from storage
    chrome.storage.local.get("adsBlocked", (data) => {
      setStats(data);
    });
  }, []);

  return (
    <Box sx={{ width: 300, p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Ad Blocker Stats
      </Typography>
      <Typography variant="body1">
        Total Ads Blocked: <strong>{stats.adsBlocked || 0}</strong>
      </Typography>
      <hr style={{ margin: "16px 0" }} />
      <WhitelistManager />
    </Box>
  );
}

export default Popup;
