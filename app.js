var fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const mysql = require('mysql');
const { Console } = require('console');


eval(fs.readFileSync('hash.js') + '');
eval(fs.readFileSync('loadfile.js') + '');
eval(fs.readFileSync('getList.js') + '');


var router = express.Router();
var getIP = require('ipware')().get_ip;
var is_valid = false;
var nodemailer = require('nodemailer');
var url = require('url');

/*var ipInfo = getIP(req);
console.log(ipInfo);*/
//var sql= "CREATE TABLE adress (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))";

//var sql = "CREATE TABLE email_name (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))";
//var sql = "INSERT INTO email_name (name) VALUES ('dgorbatov@hotmail.com')";

/*con.connect((err) => {
    if(err){
      console.error('Error connecting: ' + err.stack);
      return;
    }
    console.log('Connection established');

    con.query("SELECT * FROM email_name WHERE id = '1'", function (err, result) {
        if (err){
            console.error(err.stack);
        }
        console.log(result);
      });
});
  
//con.end((err) => {});*/


app.use(bodyParser.urlencoded({ extended: true }));

/****************************** */
app.get('/project', (req, res) => {
    load("project.html",res);
})


/****************************** */
app.get('/donate', (req, res) => {
    load("donate.html",res);
})


/****************************** */
app.get('/notebook', (req, res) => {
    load("notebook.html",res);
})


/****************************** */
app.get('/email', (req, res) => {
    load("email.html",res);
}) 


/****************************** */
app.get('/', (req, res) => {
    load("server.html",res);
})


/****************************** */
app.get('/home', (req, res) => {
    load("server.html",res);
})


/****************************** */
app.get('/login', (req, res) => {
    if(is_valid == true){
        res.redirect('http://localhost:8080/admin');
    }
    else{
        load("login.html",res);
    }
})


/****************************** */
app.get('/admin', (req,res) =>{
    if(is_valid == false){
        load("invalid.html",res);
        return;
    }
    else{
        load("admin.html",res);
    }
})


/****************************** */
app.get('/removeform', (req,res) =>{
    if(is_valid == false){
        load("invalid.html",res);
        return;
    }

    else{
        load("removeform.html",res);
    }
})


/****************************** */
app.get('/displayemails', (req,res) =>{
    if(is_valid == false){
        load("invalid.html",res);
        return;
    }
    
    load("securedata.html",res);
})


/****************************** */
app.get('/logout', (req,res) =>{
    is_valid = false;
    res.redirect('http://localhost:8080/home');
})


/****************************** */
app.get('/youtube', (req,res) =>{
  res.redirect('https://www.youtube.com/channel/UCmKZvtS7c4Y4_1HZoj5M7Uw');
})


/****************************** */
app.get('/sendemail', (req,res) =>{
    console.log("SENDING");

    if(is_valid == false){
      load("invalid.html",res);
      return;
    } 

    getEmailList();
    console.log("Going to admin");
    res.redirect('http://localhost:8080/admin');

})

/****************************** */
app.get('/removeEmail', (req,res) =>{
    var parsedData = url.parse(req.url, true);
    var email_data = parsedData.query;

    if(hashStringNum(email_data.email,email_data.num) != email_data.password){
        load("invalid.html",res);
        return;
    }
    else{
        const con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1Eusha$Disha1',
            database: 'emails'
        });
    
        con.connect((err) => {
            if(err){
              console.error('Error connecting: ' + err.stack);
              return;
            }
            console.log('Connection established');
        });
    
        if(email_data.num != "all"){
            var sql = "DELETE FROM email_name WHERE id = " + email_data.num;
        }
        else{
            var sql = "DELETE FROM email_name";
        }
    
        con.query(sql, function (err, result) {
            if (err){
                console.log(err);
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'dzgorbatov@gmail.com',
                      pass: 'moridguujmsmlbor'
                    }
                  });
            
                  var mailOptions = {
                    from: 'dzgorbatov@gmail.com',
                    to: email_data.email,
                    subject: 'ID INVALID',
                    text: `Your removal requst for id#${email_data.num} is invalid`
                  };
            
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
            }
            else{
                console.log("Removed");
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'dzgorbatov@gmail.com',
                      pass: 'moridguujmsmlbor'
                    }
                  });
            
                  var mailOptions = {
                    from: 'dzgorbatov@gmail.com',
                    to: email_data.email,
                    subject: 'REMOVED EMAIL',
                    text: `Your removal requst for id#${email_data.num} has been aproved`
                  };
            
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
            }
        });
    
        con.end();

        res.redirect('http://localhost:8080/admin');
    }
})

/****************************** */
app.get('/dontremoveEmail', (req,res) =>{
    console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
    var parsedData = url.parse(req.protocol + '://' + req.get('host') + req.originalUrl, true);
    var email_data = parsedData.query;

    console.log(email_data);

    if(hashStringNum(String(email_data.email),email_data.num) != email_data.password){
        console.log("Password doese not match");
        load("invalid.html",res);
        return;
    }
    else{
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'dzgorbatov@gmail.com',
              pass: 'moridguujmsmlbor'
            }
          });
    
          var mailOptions = {
            from: 'dzgorbatov@gmail.com',
            to: email_data.email,
            subject: 'REMOVAL DENIAL',
            text: `Your removal requst for id#${email_data.num} has been denied`
          };
    
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          res.redirect('http://localhost:8080/admin');
    }
})


/****************************** */
app.post('/validate', (req, res) => {
    console.log(hashString(String(req.body.data)));
    if(hashString(String(req.body.data)) != 10.723805294763608){
        console.log("Invalid Password Entered")
        load("invalid.html",res);
        return;
    }

    else{
        is_valid = true;
        res.redirect('http://localhost:8080/admin');
    }
})


/****************************** */
app.post('/removedata', (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dzgorbatov@gmail.com',
          pass: 'moridguujmsmlbor'
        }
      });

      var mailOptions = {
        from: 'dzgorbatov@gmail.com',
        to: 'dzgorbatov@gmail.com',
        subject: 'REMOVAL CONFORMATION',
        text: `Please remove id #${req.body.number}, requst from ${req.body.email}.
               Approve link: localhost:8080/removeEmail?num=${req.body.number}&email=${req.body.email}&password=${hashStringNum(String(req.body.email),req.body.number)}
               Deny link: localhost:8080/dontremoveEmail?num=${req.body.number}&email=${req.body.email}&password=${hashStringNum(String(req.body.email),req.body.number)}
        `
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.redirect('http://localhost:8080/admin');
})


/****************************** */
app.post('/datavalidatesecure', (req, res) => {
  if(hashSecure(String(req.body.pass),String(req.body.key)) != 7.53962863806965){
    console.log("Invalid Password Entered")
    load("invalid.html",res);
    return;
  }
  else
    getEmailListForIndividual(req.body.email);
  res.redirect('http://localhost:8080/admin');
});

/****************************** */
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})