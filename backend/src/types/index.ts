// config
export interface Config {
  serviceName: string;
  port: number;
  db: PgConfig;
}

// database utils
export interface PgConfig {
  user: string;
  database: string;
  password: string;
  host: string;
  port: number;
  max: number;
  idleTimeoutMillis: number;
}
