const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const env = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const admin = require("firebase-admin");
const serviceAccount = require("./service_account.json");

var dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

admin.initializeApp({

  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://retrofitapp-9b160.firebaseio.com"
});

router.post('/retrofitUsers',(req,res) => {


      var nam = req.body.name;

      var data = {

          name:req.body.name,
          age:req.body.age
      };

      var payload = {
              notification: {
                title: "User added",
                body: "{nam} added in database."
              },  
              data: {
                account: "Savings",
                balance: "$3020.25"
              } 
            };

      var options = {
             priority: "high"
          };

       var registrationToken = "cLW-FpeVz5E:APA91bE2LsRdOe36gV0opaizoGKgZwuLEWP5O4JP6iU8kBcuqznAG4ztIlmiis6AyjFpANeBEta_IzRTkgJbGcI7_w_WbwZD0aZxI1u9orXFxls7211xSuuZPPlxCkejvOw_uUEA8vgv";     

      MongoClient.connect(dburl,{useNewUrlParser:true},(err,client) => {

                 if(err){

                 	console.log("Error" +err);
                 
                 }else{
                     
                    var collect = client.db('Bookbudi_db').collection('RetrofitUser');

                    collect.insertOne(data,(err,resp) => {

                    	if(err){

                    		console.log("Error" +err);
                    	}else{

                    		res.send("Successful");

                        admin.messaging().sendToDevice(registrationToken,payload,options).then((response) =>{
                               
                             console.log("Response", response); 

                        }).catch((error) => {

                             console.log("Error", error);
                        });

                    		client.close();
                    	}
                    
                    });
                 }

         });
});

module.exports = router;