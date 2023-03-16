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
    res.render('index');
});

app.get('/table', (req, res) => {
    db.names.findAll().then(names => {
        res.render('table', { names: names });
    }).catch(err => {
        console.log(err);
        res.redirect('/');
    });
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
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`);
});