
require('dotenv').config();
const port = process.env.ENV_PORT || 3000,
	express = require("express"),
	app = express(),
	db = require("./db/db");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var ejs = require('ejs');
app.engine('ejs', ejs.renderFile);
// jsonを扱えるようにする
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    var msg = 'トップページです!';
    res.render('index.ejs',
        {
            title:'Index',
            content:msg,

        });
});

app.get("/contest",async (req, res)=>{
	db.pool.connect((err, client) => {
    if (err) {
      console.log(err);
    } else {
      client.query('SELECT * FROM contest;', (err, result) => {
		  if(err)console.log(err)
		  res.send(result.rows)
        	console.log(result.rows);
      });
    }
	});
});


app.listen(port);
