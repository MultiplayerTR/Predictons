interface Window {
    Telegram: {
        WebApp: {
            initData: string;
            initDataUnsafe: any;
            close: () => void;
            expand: () => void;
            ready: () => void;
            offEvent: (eventType: string, callback: () => void) => void;
            onEvent: (eventType: string, callback: () => void) => void;
            sendData: (data: string) => void;
            version: string;
        };
    };
}