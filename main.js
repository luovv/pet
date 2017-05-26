const http = require('http');
const fs = require('fs');
const express = require('express');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const routes = require('./app.js');
const app = express();
http.Server(app).listen(8080);

var index = require('./routes/index.js');
var home = require('./routes/home.js');
var information = require('./routes/information.js');

app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(cookieParser());
app.use(expressSession({secret:'abcdefg'}));
app.set('views', __dirname + '/www/html');
app.use(express.static(__dirname + '/www/public'));

app.use('/', index);
app.use('/home', home);
app.use('/information', information);



var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('pet');



app.get('/Lose', (req, res) => {
    res.render('information.ejs', {
        data: {
            GetType:'Lose',
            page:1,
            sum:10,
            UserLogo:'image/zw.jpg',
            news:[
                {
                    title:'information-page-num',
                    body:'The official MongoDB Node.js driver provides both callback based as well as Promised based interaction with MongoDB allowing applications to take full advantage of the new features in ES6. The 2.x series of the driver is powered by a brand new core driver and bson library.',
                    time:'2017-5-25',
                    eye:30,
                    commenting:10
                }
            ]
        }
    })
})


app.get('/Found', (req, res) => {
    res.render('information.ejs', {
        data: {
            GetType:'Found',
            page:1,
            sum:10,
            UserLogo:'image/zw.jpg',
            news:[
                {
                    title:'information-page-num',
                    body:'The official MongoDB Node.js driver provides both callback based as well as Promised based interaction with MongoDB allowing applications to take full advantage of the new features in ES6. The 2.x series of the driver is powered by a brand new core driver and bson library.',
                    time:'2017-5-25',
                    eye:30,
                    commenting:10
                }
            ]
        }
    })
})


app.get('/user', (req, res) => {
    // username key
    res.send(true)
})

app.get('/login', (req, res) => {
    // username key
    res.send(true)
})


app.get('/GetDynamic', (req, res) => {
    const module = req.query.module
    const limit = req.query.limit
    const type = req.query.type
    const data = {
        information:{
            Lose : [
                {
                    title:'Lose',
                    body:'The official MongoDB Node.js driver provides both callback based as well as Promised based interaction with MongoDB allowing applications to take full advantage of the new features in ES6. The 2.x series of the driver is powered by a brand new core driver and bson library.',
                    time:'2017-5-25',
                    eye:30,
                    commenting:10
                }
            ],
            Found: [
                {
                    title:'Found',
                    body:'The official MongoDB Node.js driver provides both callback based as well as Promised based interaction with MongoDB allowing applications to take full advantage of the new features in ES6. The 2.x series of the driver is powered by a brand new core driver and bson library.',
                    time:'2017-5-25',
                    eye:30,
                    commenting:10
                } 
            ]
        },
        volunteers:{
            it : [
                {
                    title:'it',
                    body:'The official MongoDB Node.js driver provides both callback based as well as Promised based interaction with MongoDB allowing applications to take full advantage of the new features in ES6. The 2.x series of the driver is powered by a brand new core driver and bson library.',
                    time:'2017-5-25',
                    eye:30,
                    commenting:10
                }
            ],
            need: [
                {
                    title:'need',
                    body:'The official MongoDB Node.js driver provides both callback based as well as Promised based interaction with MongoDB allowing applications to take full advantage of the new features in ES6. The 2.x series of the driver is powered by a brand new core driver and bson library.',
                    time:'2017-5-25',
                    eye:30,
                    commenting:10
                } 
            ]
        } 
    }
    const moduele = data[module]
    res.send(moduele[type])
})




app.get('/Volunteers', (req, res) => {
    res.render('volunteers.ejs', {
        name: 'tinyphp'
    })
})