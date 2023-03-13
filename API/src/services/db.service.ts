import dbConfig from '../configs/db.config';

const mysql = require('mysql2/promise');

async function query(sql: string, params: any) {
  const connection = await mysql.createConnection(dbConfig);
  connection.config.namedPlaceholders = true;

  const [results] = await connection.execute(sql, params);

  return results;
}

export default query;
