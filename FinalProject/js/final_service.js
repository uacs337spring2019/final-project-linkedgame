/* Shiyu Cheng (23329948), Jiaxu Kang (23373848)
* This is the final project of CSC 337, SP. 2019
* 
* Purpose: this is service of login system.
* Tips: please use comment "npm install client-sessions" before read service.
*
* 04/24/2019
* */
const express = require("express");
const fs = require("fs");
const app = express();
const session = require('client-sessions');

app.use(express.static('public'));
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));
//read file.
function read_file(file_name) {
  var text = 0;
  try {  
      text = fs.readFileSync(file_name, 'utf8');
         
  } catch(e) {
      console.log('Error:', e.stack);
  }
  return text;
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
               "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

//sent json to user.
app.get('/', function (req, res) {
res.header("Access-Control-Allow-Origin", "*");
if (req.query.login == "can") {
  
    var name = req.query.name;
    req.session.username = name;
    res.redirect('final.html');
  }
if(req.query.login == "no" && req.query.name != "None"){
  
    var text = read_file("account.txt");
    res.send(text);

}  
});

//get name and passord, save it to the txt.
app.post('/', jsonParser, function (req, res) {
  var name_infile = 0;
  if (req.query.log = "no"){
    var name = req.body.name;
    req.session.username = name;
    var password = req.body.password;
    var text = read_file("account.txt");
    text = text.trim().split("\n");
    for (var i = 0; i < text.length; i++) {
      var a =text[i];
      a = a.split(" ");
  
      if(name == a[0]){
        name_infile =1;
      }
    }
    if (name_infile == 0) {

          var name_text = name+" "+password+"\n";
          fs.appendFile("account.txt", name_text, function(err) {
          if(err) {

          console.log(err);
          res.status(400);
          }
          });
          res.send("account created successfully!");
        } else {
          res.send("");
        }
    }
  
});

app.listen(process.env.PORT);