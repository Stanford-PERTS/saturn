import * as functions from 'firebase-functions';
import * as mysql from 'promise-mysql';

import isDeployed from '../util/isDeployed';
import isTesting from '../util/isTesting';
import toCamel from '../util/toCamel';

// Using functions:config, which only allows lower case in key names, otherwise
// we'd be using camel case.
interface RawConfig {
  connection_limit?: number;
  database: string;
  password: string;
  socket_path?: string;
  user: string;
}

// For local connections.
const localConfig: { sql: MysqlConfig } = {
  sql: {
    charset: 'utf8mb4',
    connectionLimit: 1,
    database: process.env.SATURN_DB_NAME || 'saturn',
    user: process.env.SATURN_DB_USER || 'saturn',
    password: process.env.SATURN_DB_PASS || 'saturn',
  },
};

interface MysqlConfig extends mysql.PoolConfig {
  charset: string;
  socketPath?: string;
  // // Options available from PoolConfig:
  // // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/mysql/index.d.ts#L568
  // acquireTimeout?: number;
  // connectionLimit?: number;
  // queueLimit?: number;
  // waitForConnections?: boolean;
}

export default async function mysqlConnect(): Promise<mysql.Pool> {
  // Production
  if (isDeployed()) {
    const rawConfig: RawConfig = functions.config().sql;
    const mysqlConfig: any = {};
    for (const [key, value] of Object.entries(rawConfig)) {
      mysqlConfig[toCamel(key)] = value;
    }
    return await mysql.createPool(mysqlConfig as MysqlConfig);
  }

  // Local
  if (!isTesting()) {
    console.log('mysqlConnect: no config, using local connection');
  }

  return await mysql.createPool(localConfig.sql);
}
