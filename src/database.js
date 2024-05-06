const mysql = require('mysql')
const connection = mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'user',
   database:'customerfeedbackdb',
})
function getConnection()
{
   return connection
}
module.exports = {getConnection,mysql}