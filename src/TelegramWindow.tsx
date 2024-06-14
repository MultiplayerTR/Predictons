import React, {useEffect} from 'react';

const TelegramWindow = () => {
    useEffect(() => {
        // Check if Telegram Web App is available
        console.log(window);
        if (window.Telegram && window.Telegram.WebApp) {
            // Initialize the web app
            window.Telegram.WebApp.ready();

            // Request full-screen mode
            window.Telegram.WebApp.expand();
        }
    }, []);

    return (
        <div style={{ padding: '20px' }}>
        </div>)
};

export default TelegramWindow;