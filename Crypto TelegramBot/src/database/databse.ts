import sqlite3  from "sqlite3";

const db =  new sqlite3.Database('./LambdaCryptoBot.db',(err)=>
{
    if(err)
    {
        console.log(err);
    }
});

export default db;