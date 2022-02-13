module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": ["dist/src/modules/**/entities/*.js"],
  "migrations": ["dist/src/database/migrations/**/*.js"],
  "cli": {
    "entitiesDir": "dist/src/modules/**/entities",
    "migrationsDir": "dist/src/database/migrations",
  }
};