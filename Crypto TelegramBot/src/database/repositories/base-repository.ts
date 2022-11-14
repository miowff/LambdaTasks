import { Database } from 'sqlite3';
import db from '../databse'
import { createQuestionmarksString } from '../../services/create-questionmarks-string';

export abstract class BaseRepository<T extends object>
{
    protected tableName:string;
    protected db:Database;
    constructor(tableName:string,databse:Database)
    {
        this.tableName = tableName;
        this.db = databse;
    }

    async getAllAsync():Promise<T[]>
    {
        return new Promise((resolve)=>
        {
            db.all(`SELECT * FROM ${this.tableName}`,[],(err,rows)=>
            {
                if(err) {throw err}
                resolve(rows);
            });
        });
    }
    async addNewAsync(model:T):Promise<void>
    {
        const keys = Object.keys(model);
        const values = Object.values(model);
        const questionmarks = createQuestionmarksString(values);
        await db.run(`INSERT INTO ${this.tableName}(${keys.toString()}) VALUES(${questionmarks})`,values);
    }
    async getById(id:string|number):Promise<T>
    {
        if(typeof id === 'string')
        {
            return new Promise((resolve)=>
            {
                this.db.get(`SELECT * FROM ${this.tableName} WHERE Id = '${id}'`,(err,result)=>
                {
                    if(err) {throw err}
                    resolve(result);
                });
            });
        }
        return new Promise((resolve)=>
        {
            this.db.get(`SELECT * FROM ${this.tableName} WHERE Id = ${id}`,(err,result)=>
            {
                if(err) {throw err}
                resolve(result);
            });
        });
    }
}