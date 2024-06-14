import React, {useEffect} from 'react';

const TelegramWindow = () => {
    useEffect(() => {
        // Check if Telegram Web App is available
        console.log(window.Telegram);
        if (window.Telegram && window.Telegram.WebApp) {
            // Initialize the web app
            window.Telegram.WebApp.ready();

            // Request full-screen mode
            window.Telegram.WebApp.expand();
        }
    }, []);

    return (
        <div>
        </div>)
};

export default TelegramWindow;