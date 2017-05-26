var express = require('express');
var bodyParser = require('body-parser');
var nodemailer=require('nodemailer');

var multer = require('multer')
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();

router.use(bodyParser.json());

router.get('/',function (req, res){
    res.render('information.ejs', {data: {type:'information'}});
});

router.get('/report/:id',function (req, res){
    var db = new sqlite3.Database('sql.db');
    result={}
    db.serialize(function() {
        db.all("SELECT report.*,user.email,user.username FROM report,user WHERE report.user_id=user.user_id and report.report_id=(?)", [req.params.id], function (error, data) {
            result.data=data[0];
        });

        db.all("SELECT comment.content,comment.report_id, comment.timestap, comment.user_id,user.username FROM comment, user WHERE comment.user_id = user.user_id and comment.report_id=(?)", [req.params.id], function (error, data) {
            db.close();
            result.comments = data;
            return res.render('detail.ejs', result);
        });
    });
    //404
});

router.get('/reportLost',function (req, res){
    var uid = req.session.uid;
    data = {};
    if(uid){
        res.render('information.ejs', {data: {type:'reportLost'}});
    }else{
        res.redirect('/');
    }
});

router.get('/reportFound',function (req, res){
    var uid = req.session.uid;
    console.log(uid);
    data={};
    if(uid){
        res.render('information.ejs', {data: {type:'reportFound'}});
    }else{
        res.redirect('/');
    }
});

router.get('/lost',function (req, res){
    var db = new sqlite3.Database('sql.db');

    db.all("select * from report where type='lost'",function (error,data) {
        res.send(data);
    });
});
router.get('/found',function (req, res){
    var db = new sqlite3.Database('sql.db');

    db.all("select * from report where type='found'",function (error,data) {
        db.close();
        return res.send(data);
    });
});

router.post('/submitLost',function (req, res){
    var uid = req.session.uid;
    if(!uid){
        res.send({});
    }
    var db = new sqlite3.Database('sql.db');
    data = req.body;
    var d=new Date();
    date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    db.run("insert into report values(null,(?),(?),(?),(?),'lost','unclosed',(?),(?),(?),(?))",[
        data.species,
        data.eventDate,
        data.location,
        uid,
        data.description,
        data.title,
        data.image,
        date
    ],function (error,data) {
        db.close();
        return res.send("success");
    });
});

router.post('/submitFound',function (req, res){
    var uid = req.session.uid;
    if(!uid){
        res.send({});
    }
    var db = new sqlite3.Database('sql.db');
    data = req.body;
    var d=new Date();
    date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    db.run("insert into report values(null,(?),(?),(?),(?),'found','unclosed',(?),(?),(?),(?))",[
        data.species,
        data.eventDate,
        data.location,
        uid,
        data.description,
        data.title,
        data.image,
        date
    ],function (error,data) {
        return res.send("success");
    });
});


router.post('/upImage', function(req, res) {
    const upload = multer({storage: multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, __dirname + '/../www/public/image/')
        },
        filename: function (req, file, callback) {
            var fileFormat = (file.originalname).split(".")
            callback(null, file.originalname)
        }
    })});
    const Postupload = upload.single('file');
    Postupload(req, res, function (err) {
        if(err){
            return  console.log(err)
        }else{
            res.send(true)
        }
    })
});

router.post('/sendEmail', function(req, res) {

    var transport =nodemailer.createTransport({
        service :'Gmail',
        auth:{
            user:'ggfindmypet@gmail.com',
            pass:'1122334gg'
        }
    });

    var mailOp={
        from: req.body.myemail,
        to :req.body.email,
        subject:'You get message from find my pet',
        text: req.body.message
        // html: '<h3> You have a new message! </h3>'+'<h3> From User:' +req.body.name+ '<li> Message:<li>'+req.body.message+'</h3>'
    };
    transport.sendMail(mailOp,function(error,info){
        if (error){
            console.log("Email failed!\n"+ error);
            res.redirect('/contact');
        }else{
            console.log("Email Success!\n"+ info.response);
            res.redirect('/');
        }
    });
});

router.post('/submitComment', function(req, res) {
    uid = req.session.uid;
    if(!uid){
        console.log('uid not');
    }
    var db = new sqlite3.Database('sql.db');
    var d=new Date();
    var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    db.run("insert into comment values(null,(?),(?),(?),(?))",[
        req.body.content,
        req.body.rid,
        date,
        uid
    ],function (error,data) {
        console.log(error);
        console.log(data);
    });
});

router.post('/updateStatus', function(req, res) {
    uid = req.session.uid;
    if(!uid){
        console.log('uid error1');
    }
    if(uid!=req.body.uid){
        console.log('uid error2');
    }

    var db = new sqlite3.Database('sql.db');
    db.run("UPDATE report SET status='closed' WHERE report_id=(?)",[req.body.rid],function (error,data) {
        console.log(error);
        console.log(data);
    });
});




module.exports = router;