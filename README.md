# Telegram Web App Bot Test

Interactive feature testing [Telegram Web Apps](https://core.telegram.org/bots/webapps).

[🤖 Telegram bot for testing](https://t.me/tg_web_app_test_bot)

## Development

1. Install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
2. Start local live server.
3. Using [@BotFather](https://t.me/botfather) set the button link (the `/setmenubutton` command or Bot Settings > Menu Button) - `http://127.0.0.1:5500/`.

## Update documentation data

When updating the [Telegram Web Apps documentation](https://core.telegram.org/bots/webapps), you can easily update the data. You need to copy the content of the tables from the official telegram website:

1. Visit https://core.telegram.org/bots/webapps#initializing-web-apps.
2. Copy inner HTML table content code.
3. Replace new content under the comment `<!-- {{ PASTE NEW FIELDS DATA HERE }} -->` in `index.html` .
4. Visit https://core.telegram.org/bots/webapps#events-available-for-web-apps.
5. Copy inner HTML table content code.
6. Replace new content under the comment `<!-- {{ PASTE NEW EVENTS DATA HERE }} -->` in `index.html` .
