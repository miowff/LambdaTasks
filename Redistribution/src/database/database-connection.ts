import sql from "mysql2/promise";

export class Database {
  private pool: sql.Pool;

  constructor() {
    this.pool = sql.createPool({
      connectionLimit: 100,
      host: process.env.RDS_MYSQL_ENDPOINT,
      user: process.env.RDS_MYSQL_USERNAME,
      database: process.env.RDS_MYSQL_DB_NAME,
      password: process.env.RDS_MYSQL_PASSWORD,
      port: parseInt(process.env.RDS_MYSQL_PORT),
    });
  }

  async executeQueryAsync(query: string) {
    return await this.pool.query(query);
  }

  async executeParamsQueryAsync(query: string, params: any[]) {
    return await this.pool.query(query, params);
  }
}

const database = new Database();
export default database;
