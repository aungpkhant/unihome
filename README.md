# UniHome Suburb Selector

> A smart data driven suburb recommendation system for Melbourne catered towards students built as part of a final year project for university. 

###### Tech Stack
- NodeJS
- React
- Typescript
- Express
- Knex
- Postgres
- Playwright
- Jest
- MaterialUI
- Tableau

`server` contains code for the Express backend

`web` contains code for the React app

`retriever` contains a NodeJS script to periodically mine distance data from an external API

### Prerequisites

- npm `install knex -g`

### Setting up the React Web App

- navigate to the `web` folder
- run `npm install` to download dependencies
- run `npm start` to start the app

### Setting up the NodeJS Backend

- navigate to the `server` folder
- create a `.env` file inside the `server` folder and copy the contents of `.env.example` to it
- fill your environment variables with your own credentials after restoring from the `unihome_pg_dump` file in the `database/data_dump` folder
- run `npm install` to download dependencies
- run `npm start` to start the server

### Viewing the Database

- Download a GUI tool such as [pgAdmin](https://www.pgadmin.org/)

### Referenced Codebases

- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [Bulletproof NodeJS](https://github.com/santiq/bulletproof-nodejs)

### Snippets

```
knex migrate:latest
```

### Recommended Tools/Software

1. VSCode
2. Postman
3. pgAdmin
