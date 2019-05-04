const express = require('express');
const router = express.Router();
const dotEnv = require('dotenv').config();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/addbooks', (req,res) => {


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

      MongoClient.connect(dburl, {useNewUrlParser:true} ,(err,client) => {

              if(err){

              	console.log("Error".red, +err);
              }
              else{

              	var collect = client.db('Bookbudi_db').collection('Books');
              
                collect.insertOne(data, (err,resp) =>{

                      if(err){

                      	console.log("Error".red, +err);
                      }
                      else{

                      	res.send("Successfully inserted");
                      }

                      client.close();
                });

            }

      });

});

module.exports = router;