// ! No absolute imports in this file please
import config from "./src/config";

export default {
  client: "pg",
  connection: {
    host: config.pgHost,
    user: config.pgUser,
    password: config.pgPassword,
    database: config.pgDatabaseName,
    charset: "utf8",
  },
  migrations: {
    directory: __dirname + "/knex/migrations",
  },
};
