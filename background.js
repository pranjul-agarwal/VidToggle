
let pausedTabs = []; // To keep track of paused tabs

// Event listener for when the active tab changes
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    try {
        const activeTab = await chrome.tabs.get(activeInfo.tabId); // Get the active tab

        if (activeTab && activeTab.url && activeTab.url.includes('youtube.com')) {
            // If the tab was paused, send the play message
            if (pausedTabs.includes(activeTab.id)) {
                try {
                    await chrome.tabs.sendMessage(activeTab.id, { action: 'play' });
                    pausedTabs = pausedTabs.filter(id => id !== activeTab.id); // Remove from pausedTabs array
                } catch (error) {
                    console.warn("Could not send 'play' message to tab:", activeTab.id, error.message);
                }
            }
        } else {
            // If the tab is not YouTube, pause all other YouTube tabs
            const tabs = await chrome.tabs.query({});
            for (const tab of tabs) {
                if (tab.url && tab.url.includes('youtube.com')) {
                    try {
                        await chrome.tabs.sendMessage(tab.id, { action: 'pause' });
                        pausedTabs.push(tab.id); // Add tab to pausedTabs array
                    } catch (error) {
                        console.warn("Could not send 'pause' message to tab:", tab.id, error.message);
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error in onActivated listener:", error.message);
    }
});
