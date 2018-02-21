const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public')); // import file Html from other part

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile(`server.log`, log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    });
    next();
});


/*app.use((req, res, next) => {//Middleware 
    res.render('maintence.hbs');
});*/


hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear()
});


hbs.registerHelper('scream', () => {
    return text.toUppercase();
});

app.get('/', (req, res) => {
   res.render('home.hbs', {
       pageTitle: 'Home Page',
       welcomeMessage: 'Welcome to my website',
       currentYear: new Date().getFullYear()
   });
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/home', (req, res) => {
    res.send({
        name: 'Chokrab',
        aimes: [
            'jouer',
            'parler'
        ]
    });
});


app.listen(3000, () => {
    console.log('Server is running now');
});