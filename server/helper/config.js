// init
const util = require('util')
const mysql = require('mysql')


let db_config = {
  connectionLimit: 10,
  host : '142.93.222.211',
  user : 'equipr_user',
  password : 'D3f3o903434$1',
  database : 'kworktech'
};

// let db_config = {
//   connectionLimit: 10,
//   host : '142.93.208.147',
//   user : 'kwt_user',
//   password : 'D3f3o903434$1',
//   database : 'kworktech'
// };

const pool = mysql.createPool(db_config);

// console.log(pool);

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
  }

  if (connection) connection.release()

  return
})

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)

module.exports = pool
