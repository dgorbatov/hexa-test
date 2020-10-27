function getEmailList(){
    console.log("in email list");
    var retString = '';

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

    var sql = 'SELECT * FROM email_name';
    con.query(sql, function (err, result, fields) {
        if (err){
            console.error('Error connecting: ' + err.stack);
            return;
        }
        if(result == null){
            console.log("Returning NULL");
            return '';
        }
        if(result.affectedRows == 0){
            console.log("Returning Nothing");
            return '';
        }

        retString = result[0].name;

        console.log(result.length);

        for( i=1; i<result.length; i=i+1){
            console.log("IN" + i);
            retString = retString.concat(",",result[i].name);
        }
        console.log(retString);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'dzgorbatov@gmail.com',
              pass: 'moridguujmsmlbor'
            }
          });
        
          var mailOptions = {
            from: 'dzgorbatov@gmail.com',
            to: retString,
            subject: 'Hexadecimal Team Notification',
            text: `Thiers a new update on the Hexadecimals website`
          };
        
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    });
    con.end();

}

function getEmailListForIndividual(email){
  var list = '';

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

  var sql='SELECT * FROM email_name';
  con.query(sql, function (err, result, fields) {
      if (err){
          console.error('Error connecting: ' + err.stack);
          return;
      }

      list = result[0].name;

      for( i=1; i<result.length; i=i+1){
          console.log("IN" + i);
          list = list.concat(",",result[i].name);
      }

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dzgorbatov@gmail.com',
          pass: 'moridguujmsmlbor'
        }
      });
    
      var mailOptions = {
        from: 'dzgorbatov@gmail.com',
        to: email,
        subject: 'Email List, WHEN DONE DELETE',
        text: list
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  });

  con.end();
}