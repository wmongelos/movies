const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbmovies'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/api/movies", (req, res) => {
    const sqlQuery = "SELECT * FROM movies";

    db.query(sqlQuery,(error, result) => {
        res.send(result);
    });
});

app.get("/api/search", (req, res) => {
    const searchQuery = req.query.text;
    if(searchQuery != null){
        const sqlQuery = "select * from movies where id in (select id_movie from movies_actors " +
        "left join actors on actors.id = movies_actors.id_actor where name like '%"+ searchQuery +"%') " +
        "or id in (select id_movie from movies_genres left join genres on genres.id = movies_genres.id_genre " +
        "where description like '%"+ searchQuery +"%') or title like '%"+ searchQuery +"%' or synopsis like '%"+ searchQuery +"%'"

        db.query(sqlQuery,(error, result) => {
            res.send(result);
        });
    }else{
      res.end();
    }
});


app.listen(3001, () =>{
    console.log('Running on port 3001')
});