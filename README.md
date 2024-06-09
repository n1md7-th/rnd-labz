# Telegram BOT

## How to run

Pre-requisites:

1. You need to have [NVM](https://github.com/nvm-sh/nvm) installed.
2. You need to have Telegram Bot Token. You can get it from [BotFather](https://core.telegram.org/bots#botfather).
3. You need to create a `.env.development` file from the `.env.example` file and set the `BOT_TOKEN` variable with the token you got from BotFather. Also, you need to make sure that the `ADMIN_USERNAME` variable is set with your Telegram username. When you run the `/start` command it will add you as an admin. You can always add more admins by flipping the flag from the database.

Run the bot with the following commands:
```bash
nvm use
npm install
npm run dev
```

Run the Web App with the following commands:
```bash
nvm use
npm install --prefix clientApp/svelte
npm run dev --prefix clientApp/svelte
```

## Supported commands
```text
Available commands are below:

/start - Start the bot
/adminHello <telegramId> <text> - Say hello to user
/help - Show this help message
```

## Additional information

There is a pre-generated asymmetric key pair in the `clientApp/svelte/certs` folder.
It is added for development purposes. To make the Web App runs in Telegram, it refuses to work with HTTP.
It also locates your local IP address since Telegram does not allow localhost as a Web App URL.

`clientApp` folder contains the Web App that is served by the bot. It is a Svelte project.
The root folder is the bot itself. It is a Node.js project. Written in Vanilla JavaScript.
It has been a long time since I wrote a Node.js project without any framework.
So, I decided this was good chance to mess with the latest features of Node.js, e.g. ES Modules, HMR, environment variables, etc.

The bot is using a SQLite database to store the users. It is located in the `db.sqlite` file.
I used [Sequelize](https://sequelize.org/) as an ORM to interact with the database.
There is a schema but no migration, it generates the table automatically in development mode.

I created a custom logging system. It logs to the console and a file. I leveraged to use some design patterns to create it like Factory and Strategy.
It uses Telegram bot context to log more detailed information about the user and the message.

I used Command and Composition design patterns to handle the commands. This way the business logic is isolated, it's highly testable, maintainable, scalable, and it's easy to add new commands.
It complies SOLID principles as much as possible.

I wanted to add unit tests but since it was not requirement I decided to skip it.


