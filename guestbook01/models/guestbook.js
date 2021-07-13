const mysql = require('mysql');
const util = require('util');

const dbconn = require('./dbconn');

module.exports = {
    findAll: async function() {
        const conn = dbconn();
        // const query = (sql, data) => new Promise((resolve, reject) => conn.query(sql, data, (error, rows, field) => error ? reject(error):resolve(rows))); 
        const query = util.promisify(conn.query).bind(conn);

        try {
            const results = await 
            query("select no, name, password, message, date_format(reg_date,'%y-%m-%d') as regDate from guestbook order by no desc", []);
            return results;    
        } catch(e) {
            console.error(e);
        } finally {
            conn.end();
        }
    },
    insert: async function(guestbook){
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);

        try {
            const results = await 
            query("insert into guestbook values (null,?,?,?,now())",
            Object.values(guestbook));
            return results;    
        } catch(e) {
            console.error(e);
        } finally {
            conn.end();
        }
    },
    delete: async function(no){
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);
        try {
            const results = await 
            query("delete from guestbook where no=?", no);
            return results;    
        } catch(e) {
            console.error(e);
        } finally {
            conn.end();
        }
    }
}