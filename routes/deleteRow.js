
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const env = require('dotenv').config();

var dburl = process.env.URL;

router.post('/deleteRow', (req,res) => {

     MongoClient.connect(dburl,{useNewUrlParser:true}, (err,client) => {

        var ObjectID = require('mongodb').ObjectID;

        var myquery = { _id:new ObjectID(req.body.postId)};

          if(err){

            	console.log("Error:", +err);
            }
            else{

              	var collect = client.db('Bookbudi_db').collection('Books');

                collect.deleteOne(myquery, function(err,obj){

                       if(err){

                       	console.log("Error".red, +err);

                       	client.close();

                       }
                       else{

                       	 res.send("Deleted");  

                       	 client.close();
                       }

                }); 
            }

     });

});

module.exports = router;