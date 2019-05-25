
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const env = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

var dburl = process.env.URL;

router.post('/bookDetail',(req,res) => {

         // var data = {book_id:req.body.bId};   

           var ObjectID = require('mongodb').ObjectID;

            var myquery = { _id:new ObjectID(req.body.bId)};

            MongoClient.connect(dburl,{useNewUrlParser:true},(err,client) => {

                      if(err){

                      	console.log("Error:" +err);
                      	client.close();
                      }
                      else{

                      //  console.log("Id:", myquery);
                      	var collect = client.db('Bookbudi_db').collection('Books');

                      	collect.find({_id:myquery._id}).toArray((err,result) => {


                              if(err){

                              	console.log("Error:" +err);
                              	client.close();
                              }
                              else{

                              	var output = result.map(r => ({'Book_name':r.Book_name,'Subject':r.Subject,
                                            'Book_image':r.Book_image,'Class':r.Grade,'Cost':r.Price,
                                             'Name':r.Name}));

                              	res.json(output);

                              	client.close();
                              }
                      	});  
                      
                      }

                  });

           
     });

module.exports = router;