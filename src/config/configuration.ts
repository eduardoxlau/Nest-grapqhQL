export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  tokenAuth: process.env.TOKEN_AUTH,
  database: {
    port: process.env.POSTGRES_PORT,
    password: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    logging: process.env.DB_LOGGING,
    synchronize: false,
  },
});
