const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const env = require('dotenv').config();
const sgMail = require('@sendgrid/mail');

var dburl = process.env.URL;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setSubstitutionWrappers("{{", "}}");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/users', (req,res) => {

      var data = {

          _id:req.body.id,
          Name:req.body.username,
          Email:req.body.email 
      };

      const msg = {
  
  to: req.body.email,
  from: 'hello@bookbudi.com',
  fromname:'Bookbudi',
  templateId:'d-8e322d7da4f44ca1afc76aefb3721972',
  dynamic_Template_Data: {
          
          user:req.body.username,
          company: "Bookbudi",
          city: "Ajmer",
          state:"Rajasthan",
          zip:"305001"
      }
      
};

      MongoClient.connect(dburl,{ useNewUrlParser: true }, (err,client) => {

          
             if(err){

             	console.log('Unable to connect with database'.red +err);
             }
             else{

             	client.db("Bookbudi_db").collection("Users").findOne({_id:req.body.id},function(err,user) {

                          if(err){

                            res.send("Error:" +err);
                          	console.log("Error:".red +err);
                          }
                          if(user){

                          	res.send("User exists");
                          	console.log("User exists");
                          }
                          else{

                          	var collection = client.db("Bookbudi_db").collection("Users");

                          	collection.insertOne(data,(err,resp) => {

                                 if(err){

                                 	console.log("Insertion error".red +err);
                                 	res.send("Error:" +err);
                                 }
                                 else{

                                 	console.log("User created".green);
                                 	res.send("User created");
                                  sgMail.send(msg, (err) => {

                                         if(err){

                                          console.log("Error", err);
                                         }else{

                                          console.log("Email sent");
                                         }

                                  });
                                 
                                 }


                          	});
                               
                         }
                     
                           client.close();
             	});

             }

      });  



});

module.exports = router;

