const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "Sql1182390",
  host: "89.46.111.59",
  port: 3306,
  password: "m774w78080",
  database: "Sql1182390_2",
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