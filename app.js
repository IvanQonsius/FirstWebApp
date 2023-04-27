const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

// Set up body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set up view engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Set up routes
app.get('/', (req, res) => {
    const limit = 5;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;
  
    db.names.findAndCountAll({
      limit: limit,
      offset: offset
    }).then(result => {
      const names = result.rows;
      const count = result.count;
      const totalPages = Math.ceil(count / limit);
  
      res.render('index', {
        names: names,
        currentPage: page,
        totalPages: totalPages
      });
    }).catch(err => {
      console.log(err);
      res.redirect('/');
    });
  });
  

app.get('/form', (req, res) => {
    res.render('form');
});

app.get('/test', (req, res) => {
    res.render('test');
});


app.post('/names', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const fullname = `${firstname} ${lastname}`;

    db.names.create({
        firstname: firstname,
        lastname: lastname,
        fullname: fullname
    }).then(() => {
        res.redirect('/');
    }).catch(err => {
        console.log(err);
        res.redirect('/');
    });
});

// Use process.env.PORT to listen for incoming requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
