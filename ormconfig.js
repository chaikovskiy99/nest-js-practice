module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  password: 'pass123',
  username: 'postgres',
  // autoLoadEntities: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli : {
    migrationDir: 'src/migrations'
  },
  database: 'postgres'
}
