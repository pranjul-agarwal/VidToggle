
chrome.runtime.onMessage.addListener(async (message) => {
    try {
        const video = document.querySelector('video'); // Find the video element

        if (!video) {
            throw new Error("No video element found.");
        }

        if (message.action === 'pause') {
            if (!video.paused) {
                await video.pause(); // Pause the video if it's not already paused
            }
        } else if (message.action === 'play') {
            if (video.paused) {
                await video.play(); // Play the video if it's paused
            }
        }
    } catch (error) {
        console.error("Error handling video action:", error.message);
    }
});


