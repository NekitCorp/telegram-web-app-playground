import "./app.css";
import App from "./App.svelte";

declare global {
    interface Window {
        Telegram: {
            WebView: unknown;
            Utils: unknown;
            WebApp: Record<string, unknown>;
        };
    }
}

const app = new App({
    target: document.getElementById("app"),
});

export default app;
