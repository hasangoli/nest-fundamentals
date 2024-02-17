module.exports = {
  type: 'postgres',
  host: 'ep-delicate-pine-a58ibk4a-pooler.us-east-2.aws.neon.tech',
  port: 5432,
  username: 'hasangoli',
  password: 'Qwrsp1XvDda7',
  database: 'coffees',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
