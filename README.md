# Telegram Web App Playground

Interactive feature testing Telegram Web Apps based on official Telegram documentation [Web Apps for Bots](https://core.telegram.org/bots/webapps). The application automatically parses documentation page and adds interactive examples. The application is updated [automatically](./.github/workflows/schedule.yml) once a week to match the latest version of Web Apps.

[🤖 Telegram bot for testing](https://t.me/web_app_playground_bot)

<img src="./docs/demo.gif" width="300" alt="Demo" />

## Development

1. `yarn dev`
2. Using [@BotFather](https://t.me/botfather) set the button link (the `/setmenubutton` command or Bot Settings > Menu Button) - `http://127.0.0.1:5173/`.
