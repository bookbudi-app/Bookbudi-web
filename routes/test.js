const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

var dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/addBooks',(req,res) => {

            var userId = {id:req.body.uId};

            var data = {

	  	User_id: req.body.userId,
	  	Email:req.body.email,
	  	Name: req.body.name,
	  	Book_name: req.body.bookName,
	    Book_image: req.body.image,
	  	Subject: req.body.subject,
	  	Category: req.body.category,
	  	Grade: req.body.grade,
	  	City: req.body.city,
	  	Price: req.body.cost
	  };

    MongoClient.connect(dburl,{useNewUrlParser:true},(err,client) => {

                  if(err){

                  	console.log("Error:" +err);
                  }
                  else{

                  	var collect = client.db('Bookbudi_db').collection('Users');

                  	collect.findOne({_id:userId.id,Phone:{$exists:true}},(err,doc) => {

                                 if(err){

                                 	console.log("Error:" +err);
                                 }
                                 
                                 if(doc){

                                 	res.send("Exist");

                          var coll = client.db('Bookbudi_db').collection('Books');
                          
                          coll.insertOne(data, (err,resp) => {

                                     if(err){

                                     	console.log("Error:" +err);
                                     }
                                
                            });       	
                             
                             }
                                     else{

                                 	res.send("Not exist");
                                 }  
                            
                  	     });
                  
                  }

    });  

});

module.exports = router;