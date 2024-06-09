# Telegram Web APP

## How to run

Pre-requisites:

1. You need to have [NVM](https://github.com/nvm-sh/nvm) installed.

Run the Web App with the following commands:

```bash
nvm use
npm install
npm run dev
```

It runs on HTTPS protocol. It locates your local IP address since Telegram does not allow localhost as a Web App URL.
I decided to enable HTTPS instead of using [NGROK](https://ngrok.com/) to make it work without any additional external
tools.

It is possible to access the Web App from your mobile device if it is connected to the same network.
The web app is using the local IP address of your machine. It is automatically configured in development mode unless you
explicitly specify/override `SERVER_HOST` in the `.env.development` file.

There are 4 routes:

- `/` - Home page
- `/sign-in` - Sign in to the account
- `/sign-up` - Create a new account
- `/profile` - Protected route, redirect back if not FE cache for logged-in user.
