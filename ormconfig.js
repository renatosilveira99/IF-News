module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  dropSchema: false,
  logging: true,
  ssl: {
    ca: process.env.SSL_CERT,
  },
  entities: ["dist/src/modules/**/entities/*.js"],
  migrations: ["dist/src/database/migrations/**/*.js"],
  cli: {
    entitiesDir: "dist/src/modules/**/entities",
    migrationsDir: "dist/src/database/migrations",
  },
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  }
};