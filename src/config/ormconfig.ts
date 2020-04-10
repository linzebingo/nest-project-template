import { ConnectionOptions } from 'typeorm';
import { CustomNamingStrategy } from '../utils/custom-naming-strategy';

const env = process.env.NODE_ENV || 'local'

const DatebaseConfigMap = {
  // TODO 填写数据库链接
  local: {
    username: 'postgres',
    password: '',
    database: '',
    host: '',
    port: 5432,
    schema: '',
    dialect: 'postgres',
  },
  // test: {
  //   username: 'postgres',
  //   password: 'dpDE7tGS4YDkBNZb',
  //   database: 'feamps',
  //   host: 'ipaas-pgdb-postgresql',
  //   port: 5432,
  //   schema: 'hawkeye',
  //   dialect: 'postgres',
  // },
  // production: {
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PSW,
  //   database: process.env.DB_NAME,
  //   host: process.env.DB_HOST,
  //   port: process.env.DB_PORT,
  //   schema: 'hawkeye',
  //   dialect: 'postgres',
  // },
};

const datebaseConfig = DatebaseConfigMap[env];

const config: ConnectionOptions = {
  type: 'postgres',
  host: datebaseConfig.host,
  port: Number(datebaseConfig.port),
  username: datebaseConfig.username,
  password: datebaseConfig.password,
  database: datebaseConfig.database,
  schema: datebaseConfig.schema,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  namingStrategy: new CustomNamingStrategy(),
  logging: false,
  synchronize: env === 'local',
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/config/migrations',
  },
};

export = config;
