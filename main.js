const http = require('http');
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const routes = require('./app.js');
const app = express();
http.Server(app).listen(8080);

app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(cookieParser());
app.set('views', __dirname + '/www/html');
app.use(express.static(__dirname + '/www/public'));

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('pet');

app.get('/', function(req, res){
    // var name = req.cookies.username;
    // var key = req.cookies.key;
    // // 查询用户name和key, 判断是否已登录
    // // 需要得到
    const data = {};
    data.Login = false;
    // if(Name == 'xivistudio' && Key == '112525'){
    //     data.Login = true;
    // }else{
    //     data.Login = false;
    // }
    data.UserLogo = '/media/zw.jpg';
    res.render('index.ejs', {
        data:data
    });
});


app.get('/Lose', (req, res) => {
    res.render('Information.ejs', {
        data: {
            GetType:'Lose',
            page:1,
            sum:10,
            UserLogo:'media/zw.jpg',
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
    res.render('Information.ejs', {
        data: {
            GetType:'Found',
            page:1,
            sum:10,
            UserLogo:'media/zw.jpg',
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


app.get('/Information', (req, res) => {
    res.render('Information.ejs', {
        data: {
            GetType:'Information',
            page:1,
            sum:10,
            UserLogo:'media/zw.jpg',
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


app.get('/Volunteers', (req, res) => {
    res.render('volunteers.ejs', {
        name: 'tinyphp'
    })
})