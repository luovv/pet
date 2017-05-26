var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();

router.use(bodyParser.json());

router.get('/',function (req, res){
    var db = new sqlite3.Database('sql.db');

    db.all("select * from report",function (error,data) {
        console.log(data);
        res.render('information.ejs', {data: data});
    });







    //
    // const UserName = req.cookies.UserName
    // const PassWord = req.cookies.PassWord
    // const Name = req.cookies.username
    // const Key = req.cookies.key
    // const main = req.query.main
    // const module = req.query.module
    // const limit = req.query.limit == undefined ? 1 : req.query.limit
    // const data = SQL
    // const body = new Object()
    // body.news = []
    // if(data.Information[main] == undefined){
    //     data.Information[main] = new Object()
    // }
    // const Information = data.Information[main]
    // if(Information[req.query.module == undefined ? "Lose" : req.query.module] == undefined){
    //     Information[req.query.module == undefined ? "Lose" : req.query.module] = new Object()
    // }
    // const Informationmain = Information[req.query.module == undefined ? "Lose" : req.query.module]
    // if(Informationmain != undefined){
    //     const News = Object.keys(Informationmain)
    //     body.page = News.length / 20 < 1 ? 1 : Math.round(News.length / 20)
    //     if(body.page >= limit){
    //         const num = News.length < 20 ? 0 : limit * 20 - 20
    //         for(let I = num; I < 20; I ++){
    //             if(News[I] && News[I] != 'Sum'){
    //                 let A = Informationmain[News[I]]
    //                 if(A != undefined){
    //                     body.news.push({
    //                         title:A.title,
    //                         body:A.body,
    //                         time:A.time,
    //                         img:A.img,
    //                         id:News[I]
    //                     })
    //                 }
    //             }
    //         }
    //     }
    // }
    // if(body.page < limit){
    //     res.status(404).end()
    // }else{
    //     if(data.User[UserName] != undefined){
    //         const name = data.User[UserName].UserName
    //         const key = data.User[UserName].PassWord
    //         if(name == UserName && key == PassWord){
    //             body.Login = true
    //             body.UserLogo = data.User[UserName].UserLogo
    //             body.LoginName = SQL.User[UserName].Name
    //         }else{
    //             body.Login = false
    //         }
    //     }else{
    //         body.Login = false
    //     }
    //     body.main = main
    //     body.module = module
    //     body.limit = limit
    //     res.render('table.ejs', {data: body})
    // }
});

module.exports = router;