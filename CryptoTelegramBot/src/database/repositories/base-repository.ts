import { Database } from 'sqlite3';
import db from '../databse'

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
        return new Promise((resolve,reject)=>
        {
            db.all(`SELECT * FROM ${this.tableName}`,[],(err,rows)=>
            {
                if(err) {reject(err)}
                resolve(rows);
            });
        });
    }
    async addNewAsync(model:T):Promise<void>
    {
        const keys = Object.keys(model);
        const values = Object.values(model);
        const questionmarks = this.createQuestionmarksString(values);
        await db.run(`INSERT INTO ${this.tableName}(${keys.toString()}) VALUES(${questionmarks})`,values);
    }
    async getById(id:string|number):Promise<T>
    {
        if(typeof id === 'string')
        {
            return new Promise((resolve,reject)=>
            {
                this.db.get(`SELECT * FROM ${this.tableName} WHERE Id = '${id}'`,(err,result)=>
                {
                    if(err) {reject(err)}
                    resolve(result);
                });
            });
        }
        return new Promise((resolve,reject)=>
        {
            this.db.get(`SELECT * FROM ${this.tableName} WHERE Id = ${id}`,(err,result)=>
            {
                if(err) {reject(err)}
                resolve(result);
            });
        });
    }


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createQuestionmarksString(values:any[]):string
    {
        let result = '?';
        for(let i=1;i<values.length;i++)
        {
            result+=',?';
        }
        return result;
    }
}