var express = require("express");
var app = express();
var request = require('request');
var bodyParser = require("body-parser");


var soap = require('soap');
var cors = require('cors');




var PORT = process.env.PORT || 3000;


var data = "";

//app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set("view engine", "ejs")



app.get('/callSoap', function(req, res) {

    var hello = new express.Router();
    hello.use(cors());
    hello.use(bodyParser());

    var barcode = "123";
    var wsdlUrl3 = 'http://www.searchupc.com/service/UPCSearch.asmx?wsdl';
    
    var username = "yourusername";
    var password = "yourpassword";

     var options = {
        passwordType: 'PasswordDigest',
        hasNonce: true , 
        hasTimeStamp: false,
        hasTokenCreated: true
      };
  var wsSecurity = new soap.WSSecurity(username, password, options)
   
    soap.createClient(wsdlUrl3, function(err, soapClient){
         
      soapClient.setSecurity(wsSecurity);
        
      if (err){
          return res.status(500).json(err);
        }
      soapClient.getCardList({
        className : "Employee"
      }, function(err, result){
        if (err){
          console.log("Log of last request" + soapClient.lastRequest);
          return res.status(500).json(err);
        }
        console.log("Log of last request" + soapClient.lastRequest);
        return res.json(result); //response from server
          
      });

    });
  });


//app.listen(process.env.PORT, process.env.IP, function(){
 //  console.log("Serving in PORT: "+ process.env.PORT); 
//});

app.listen(PORT, function () {
  console.log('Server ready and running...');
}); 
