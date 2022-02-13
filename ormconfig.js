module.exports = {
  "type": process.env.TYPEORM_CONNECTION,
  "host": process.env.TYPEORM_HOST,
  "port": process.env.TYPEORM_PORT,
  "username": process.env.TYPEORM_USERNAME,
  "password": process.env.TYPEORM_PASSWORD,
  "database": process.env.TYPEORM_DATABASE,
  "synchronize": true,
  "logging": false,
  "entities": ["dist/src/modules/**/entities/*.js"],
  "migrations": ["dist/src/migrations/**/*.js"],
  "cli": {
    "entitiesDir": "dist/src/modules/**/entities",
    "migrationsDir": "dist/src/database/migrations",
  }
};