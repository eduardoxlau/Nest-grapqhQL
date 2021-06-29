module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_PASSWORD,
  password: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  factories: ['dist/**/database/factories/**/*.js'],
  seeds: ['dist/**/database/seeds/**/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
