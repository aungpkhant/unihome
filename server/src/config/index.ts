import dotenv, { config } from "dotenv";
import "./pg";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const configVars = {
  port: parseInt(process.env.PORT!, 10),
  pgHost: process.env.PG_HOST,
  pgUser: process.env.PG_USER,
  pgPassword: process.env.PG_PASSWORD,
  pgDatabaseName: process.env.PG_DB_NAME,

  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
};

for (let [configKey, value] of Object.entries(configVars)) {
  if (value === undefined) {
    console.warn(
      `WARNING: ${configKey} is not set. The server may not function properly.`
    );
  }
}

export default configVars;
