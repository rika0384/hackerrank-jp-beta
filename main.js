
require('dotenv').config();
const port = process.env.ENV_PORT || 3000,
	express = require("express"),
	app = express(),
	db = require("./db/db");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.set("view engine", "ejs");
app.use(express.static('public'));
// jsonを扱えるようにする
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    var contest = [{"contest_id":1,"contest_name":"ゆるふわ競技プログラミングオンサイト at FORCIA #2 ゴリラの挑戦状","contest_url":"yfkpo2","contest_date":"2019-09-13","writer":"prd_xxx, matsu7874"}];
	res.render('./index.ejs',
        {
            contests:contest

        });
});
app.get('/add', (req, res) => {
    res.render('./add.ejs');
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
