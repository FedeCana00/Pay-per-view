const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "fdsa959shf",
  host: "212.237.39.62",
  port: 3306,
  password: "jzr_uer6KJZ@hmh5jye",
  database: "tg57srdjbq",
});

db.connect(function(err) {
  if (err) {
    console.error('error connecting: ', err);
    return;
  }
});

// insert into persona
app.post("/createPerson", (req, res) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const password = req.body.password;
  const birthDate = req.body.birthDate;

  db.query('INSERT INTO persona (isAdmin, nome, cognome, email, password, datanascita) VALUES (?, ?, ?, ?, ?, ?)',
    [false, name, surname, email, password, birthDate],
    (err, result) => {
      if(err){
        console.log(err);
      } else {
        res.send("Person inserted into DB!");
      }
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});