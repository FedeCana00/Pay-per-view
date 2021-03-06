const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql')
const cors = require('cors')
var path= require('path')

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'movies')))
// database configuration
const config = {
  user: "fdsa959shf",
  host: "212.237.39.62",
  port: 3306,
  password: "jzr_uer6KJZ@hmh5jye",
  database: "tg57srdjbq",
}

// insert into persona
app.post("/createPerson", (req, res) => {
  const db = mysql.createConnection(config);

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
        console.log("User sign up successfully!");
      }
    });

    // close connection
    db.end();
});

// get if the username is in use
app.get("/isUsernameInUse", (req, res) => {
  const db = mysql.createConnection(config);

    db.query("SELECT * FROM persona WHERE email = ?", [req.query.email],
    (err, result) => {
      if(err){
        console.log(err);
      } else {
        res.send(result);
      }
    });

    // close connection
    db.end();
});

// login user
//TODO è il caso di mantenere un get per un login?
app.get("/login", (req, res) => {
  const db = mysql.createConnection(config);
    
    db.query("SELECT * FROM persona WHERE email = ? AND password = ?", [req.query.email, req.query.password],
    (err, result) => {
      if(err){
        console.log(err);
      } else {
        res.send(result);
        console.log("User login successfully!");
      }
    });

    // close connection
    db.end();
});

app.get("/userinfo", (req, res) => {
  const db = mysql.createConnection(config);
    
    db.query("SELECT * FROM persona WHERE email = ? AND password = ?", [req.query.email, req.query.password],
    (err, result) => {
      if(err){
        console.log(err);
      } else {
        res.send(result);
      }
    });

    // close connection
    db.end();
});


// get film from id
app.get("/film", (req, res) => {
  const db = mysql.createConnection(config);
    
    db.query("SELECT * FROM film WHERE id = ?", [req.query.id],
    (err, result) => {
      if(err){
        console.log(err);
      } else {
        res.send(result);
        console.log("Films get successfully!");
      }
    });

    // close connection
    db.end();
});

app.get("/userinventory", (req, res) => {
  const db = mysql.createConnection(config);
    
    db.query("SELECT f.*, a.data, a.prezzo" +
    " FROM acquisto as a, film as f WHERE a.idFilm = f.id " + 
    "AND a.idUser = ?", [req.query.id],
    (err, result) => {
      if(err){
        console.log(err);
      } else {
        res.send(result);
        console.log("User's films get successfully!");
      }
    });

    // close connection
    db.end();
});

app.get("/films/bestsellers", (req, res) => {
  const db = mysql.createConnection(config);
    
    db.query("SELECT f.*, COUNT(*) AS freq" +
    " FROM acquisto as a, film as f WHERE a.idFilm = f.id " + 
    "GROUP BY idFilm ORDER BY freq desc",
    (err, result) => {
      if(err){
        console.log(err);
      } else {
        res.send(result);
        console.log("Best sellers get successfully!");
      }
    });

    // close connection
    db.end();
});

// get films from genere
app.get("/films/genere", (req, res) => {
    const db = mysql.createConnection(config);
    
    db.query("SELECT * FROM film WHERE genere = ?", [req.query.genere],
    (err, result) => {
      if(err){
        console.log(err);
      } else {
        res.send(result);
        console.log("Film genere get successfully!");
      }
    });

    // close connection
    db.end();
});

// get films from name
app.get("/films/searchName", (req, res) => {
    const db = mysql.createConnection(config);

    db.query("SELECT * FROM film WHERE nome LIKE ? ",req.query.name+'%',
    (err, result) => {
      if(err){
        console.log(err);
      } else {
        res.send(result);
        console.log("Films search by name successfully!");
      }
    });

    // close connection
    db.end();
});

// get all films order by name
app.get("/films/searchAll", (req, res) => {
  const db = mysql.createConnection(config);

  db.query("SELECT * FROM film ORDER BY nome",
  (err, result) => {
    if(err){
      console.log(err);
    } else {
      res.send(result);
      console.log("Get all films successfully!");
    }
  });

  // close connection
  db.end();
});

// get new releases films
app.get("/films/newReleases", (req, res) => {
  const db = mysql.createConnection(config);

  db.query("SELECT * FROM film order by datauscita desc",
  (err, result) => {
    if(err){
      console.log(err);
    } else {
      res.send(result);
      console.log("Films new releases successfully!");
    }
  });

  // close connection
  db.end();
});

app.post('/payment',(req,res)=>{
  const db = mysql.createConnection(config);
  const idFilm= req.body.idFilm;
  const idUser= req.body.idUser;
  const prezzo=req.body.prezzo;

  
  db.query("INSERT INTO acquisto (idFilm,idUser,prezzo) VALUES (?,?,?)", [idFilm,idUser,prezzo],
  (err, result)=>{
    if(err){
      console.log(err);
    } else {
      res.status(201);
      res.send("Transaction inserted into DB!");
      console.log("Payment successfully!");
    }
  })
  db.end();
})


app.get("/alreadyowned", (req, res) => {
  const db = mysql.createConnection(config);
  
  db.query("SELECT * FROM acquisto WHERE idFilm = ? AND idUser= ?", [req.query.idFilm, req.query.idUser],
    (err, result) => {
      if(err){
        console.log(err);
      } else {
        res.send(result);
      }
    });

    // close connection
    db.end();
});
//user downloads the file
app.get("/getfile",(req,res)=>{
  const db = mysql.createConnection(config);
  
  db.query("SELECT file FROM film WHERE id = ?", [req.query.id],
    (err, result) => {
      if(err){
        console.log(err);
      } else {
        Object.keys(result).forEach(function(key) {
          var row = result[key];
          res.download(row.file);
          console.log("Download film successfully!");
        });
      }
    });

    // close connection
    db.end();

})
// get all sales
app.get("/sales", (req, res) => {
  const db = mysql.createConnection(config);

  // order by data desc
  db.query("SELECT f.locandina, f.nome, p.email, a.data, a.prezzo" +
          " FROM acquisto as a, film as f, persona as p WHERE a.idFilm = f.id " + 
          "AND a.idUser = p.id order by a.data DESC",
  (err, result) => {
    if(err){
      console.log(err);
    } else {
      res.send(result);
      console.log("Get all sales successfully!");
    }
  });

  // close connection
  db.end();
});

// insert new film in database
app.post('/film/add',(req,res)=>{
  const db = mysql.createConnection(config);

  const name = req.body.name;
  const genere = req.body.genere;
  const plot = req.body.plot;
  const date = req.body.date;
  const price = req.body.price;
  const duration = req.body.duration;
  const image = req.body.image;
  const file = req.body.file;
  const idAdmin = req.body.idAdmin;
  
  db.query("INSERT INTO film (nome,genere,trama, datauscita, prezzo, "
          + "durata, file, locandina, idAdmin) VALUES (?,?,?,?,?,?,?,?,?)", 
          [name,genere,plot, date, price, duration, file, image, idAdmin],
  (err, result)=>{
    if(err)
      console.log(err);
    else {
      res.status(201);
      res.send("Transaction inserted into DB!");
      console.log("Insert new film successfully!");
    }
  })
  // close connection to database
  db.end();
});


// edit film in database
app.post('/film/edit',(req,res)=>{
  const db = mysql.createConnection(config);

  const id = req.body.id;
  const name = req.body.name;
  const genere = req.body.genere;
  const plot = req.body.plot;
  const date = req.body.date;
  const price = req.body.price;
  const duration = req.body.duration;
  const image = req.body.image;
  const file = req.body.file;
  const idAdmin = req.body.idAdmin;
  
  db.query("UPDATE film SET nome = '" + [name] + "', genere = '" + [genere] + 
          "', trama = '" + [plot] + "', datauscita = " + [date] + ", prezzo = " + [price] +
          ", durata = " + [duration] + ", file = '" + [file] + "', locandina = '" + [image] +
          "', idAdmin = " + [idAdmin] + " WHERE id = " + [id],
    (err, result)=>{
      if(err)
        console.log(err);
      else {
        db.end();
        const oldFilm = req.body.oldFilm;
        // delete previous update
        deleteOldUpdate(oldFilm);
      }
  });
});

// delete last update of film
function deleteOldUpdate(oldFilm){
  const db = mysql.createConnection(config);

  db.query("DELETE FROM modifica WHERE idFilm = ?", oldFilm.id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // close connection to database
      db.end();
      // add update inside database
      addUpdateOfFilm(oldFilm);
    }
  });
}

// insert new update film with info of last film state
function addUpdateOfFilm(oldFilm){
  const db = mysql.createConnection(config);

  const id = oldFilm.id;
  const name = oldFilm.nome;
  const genere = oldFilm.genere;
  const plot = oldFilm.trama;
  const date = oldFilm.datauscita;
  const price = oldFilm.prezzo;
  const duration = oldFilm.durata;
  const image = oldFilm.locandina;
  const file = oldFilm.file;
  const idAdmin = oldFilm.idAdmin;

  //get current date
  const t = getTodayDate();

  db.query("INSERT INTO modifica (idFilm, idAdmin, data, nome, genere, " 
          + "trama, datauscita, prezzo, durata, file, locandina) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [id, idAdmin, t, name, genere, plot, date, price, duration, file, image],
      (err, result)=>{
      if(err)
        console.log(err);
      else {
        console.log("Inserted into modifica");
  }});

  db.end();
}

function getTodayDate(){
  // get today date
  var today = new Date();
  var string = today.getFullYear() + String(today.getMonth() + 1).padStart(2, '0')
    + String(today.getDate()).padStart(2, '0');
  return parseInt(string);
}

// delete film in database
app.delete('/film/delete/:id',(req,res)=>{
  const db = mysql.createConnection(config);

  const id = req.params.id;
  db.query("DELETE FROM film WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log("Delete film successfully!");
    }
  });
  // close connection to database
  db.end();
});

// get update of film
app.get("/update/:id", (req, res) => {
  const db = mysql.createConnection(config);

  const id = req.params.id;

  // order by data desc
  db.query("SELECT * FROM modifica WHERE idFilm = ?", [id],
  (err, result) => {
    if(err){
      console.log(err);
    } else {
      res.send(result);
      console.log("Get last film edit successfully!");
    }
  });

  // close connection
  db.end();
});

// post update discount 0f film
app.post("/update/:id/:discount", (req, res) => {
  const db = mysql.createConnection(config);

  const id = req.params.id;
  const discount = req.params.discount;

  // order by data desc
  db.query("UPDATE film SET sconto = ? WHERE id = ?", [discount, id],
  (err, result) => {
    if(err){
      console.log(err);
    } else {
      res.send(result);
      console.log("Set discount of film successfully!");
    }
  });

  // close connection
  db.end();
});

// get number of film buy
app.get("/sales/:id", (req, res) => {
  const db = mysql.createConnection(config);

  const id = req.params.id;

  // order by data desc
  db.query("SELECT COUNT(*) as sales FROM acquisto WHERE idFilm = ?", [id],
  (err, result) => {
    if(err){
      console.log(err);
    } else {
      res.send(result);
      console.log("Get number of films bought successfully!");
    }
  });

  // close connection
  db.end();
});

// get earning of film
app.get("/earnings/:id", (req, res) => {
  const db = mysql.createConnection(config);

  const id = req.params.id;

  // order by data desc
  db.query("SELECT SUM(prezzo) as earn FROM acquisto WHERE idFilm = ?", [id],
  (err, result) => {
    if(err){
      console.log(err);
    } else {
      res.send(result);
      console.log("Get earning of film successfully!");
    }
  });

  // close connection
  db.end();
});
// default url returns a presentation message
app.get("/", (req, res) => {

  res.send("This is the pay-per-view service!")
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});