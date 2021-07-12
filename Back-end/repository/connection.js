var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'bpkttu857tad9vensizb-mysql.services.clever-cloud.com',
  user     : 'uhnwj0ogm1azhs5o',
  password : 'xBgoC8R0HY6InKHbsteW',
  database : 'bpkttu857tad9vensizb'
});

module.exports = connection;