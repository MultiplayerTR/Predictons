import React, {useEffect} from 'react';

const TelegramWindow: React.FC = () => {
    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.ready();
            window.Telegram.WebApp.expand();
        }
    }, []);

    return (
        <div>
        </div>
    );
}

export default TelegramWindow;