const dbconn = require("./dbconn");
const util = require('util');
const promisify = function(f){
    return f
}
module.exports = {
    findAll: async function () {
        const conn = dbconn();
        // const query = (sql, data) => new Promise((resolve, reject) => conn.query(sql, data, (error, rows, field) => error ? reject(error) : resolve(rows)));
        const query = util.promisify(conn.query).bind(conn);

        try {
            const results = await query("select fist_name, last_name, email from emaillist order by no desc", []);
            

            return results;
        } catch (e) {
            console.error(e);
        } finally {
            conn.end();
        }
        console.log(conn);
    },
    insert: function () {

    },
    delete: function () {

    }
}