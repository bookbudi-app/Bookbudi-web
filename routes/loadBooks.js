
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const env = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

var dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/loadBooks', (req,res) => {

      var data = {loc:req.body.city};

      var i = "All";

      if(data.loc == i){

      MongoClient.connect(dburl,{useNewUrlParser:true},(err,client) => {

                 if(err){

                 	console.log("Error:", +err);
                 }
                 else{

                 	var collect = client.db("Bookbudi_db").collection("Books");

                 	collect.find({}).toArray((err,result) => {

                          if(err){

                          	console.log("Error:", +err);

                          	client.close();
                          }
                          else{
                        
                         output = result.map(r => ({'Id':r._id,'Book_name':r.Book_name,'Subject':r.Subject,
                                        'User_id':r.User_id,'Book_image':r.Book_image,'City':r.City}));

                         res.json(output);

                         client.close();
                        
                        }

                 	});
                 }

      	});

      }

      else{

      	MongoClient.connect(dburl,{useNewUrlParser:true},(err,client) => {
                          
                   if(err){

                   	console.log("Error", +err);
                   }  
                   else{

                   	var collect = client.db('Bookbudi_db').collection('Books');

                   	collect.find({'City':data.loc}).toArray((err,result) => {
                            
                            if(err){

                            	onsole.log("Error", +err);

                            	client.close();
                            }
                            else{

                            	output = result.map(r => ({'Id':r._id,'Book_name':r.Book_name,'Subject':r.Subject,
                                        'User_id':r.User_id,'Book_image':r.Book_image,'City':r.City}));

                                res.json(output);
                            
                                client.close();
                            }

                   	}) ;

                   }       

      	});

      } 
      
 });

module.exports = router;