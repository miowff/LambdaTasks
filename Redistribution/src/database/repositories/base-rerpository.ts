import { Database } from "../database-connection";

export abstract class BaseRepository<T extends object> {
  protected tableName: string;
  protected db: Database;

  constructor(tableName: string, databse: Database) {
    this.tableName = tableName;
    this.db = databse;
  }

  async getAllAsync(): Promise<T[]> {
    const [rows] = await this.db.executeQueryAsync(
      `SELECT * FROM ${this.tableName}`
    );
    return Object.values(JSON.parse(JSON.stringify(rows)));
  }

  async getByIdAsync(id: string | number): Promise<T> {
    const [rows] = await this.db.executeQueryAsync(
      `SELECT * FROM ${this.tableName} WHERE Id = '${id}'`
    );
    return rows[0];
  }

  async addNewAsync(model: T) {
    const keys = Object.keys(model);
    const values = Object.values(model);
    await this.db.executeParamsQueryAsync(
      `INSERT INTO ${this.tableName}(${keys.toString()}) VALUES (?)`,
      [values]
    );
  }

  async addManyAsync(insertData: T[]) {
    const values = insertData.map((value) => Object.values(value));
    const keys = Object.keys(insertData[0]);
    await this.db.executeParamsQueryAsync(
      `INSERT INTO ${this.tableName}(${keys.toString()}) VALUES ?`,
      [values]
    );
  }

  async deleteByIdAsync(id: string | number) {
    await this.db.executeQueryAsync(
      `DELETE FROM ${this.tableName} WHERE Id = '${id}'`
    );
  }
}
