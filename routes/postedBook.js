const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

var dburl = process.env.URL;

router.post('/postedBook', (req,res) => {

    
     MongoClient.connect(dburl, {useNewUrlParser:true} ,(err,client) => {

          if(err){

          	console.log("Error:".red, +err);
          }
          else{

          	var collect = client.db("Bookbudi_db").collection('Books');

            collect.find({User_id:req.body.userId}).project({Book_name:1,Book_image:1}).toArray((err,result) =>{


                      if(err){

                      	console.log("Error".red, +err);
                        client.close();

                      }

                      else{

                      	output = result.map(r => ({'Book_name':r.Book_name,'Book_image':r.Book_image}));

                      	res.send(output);

                      	client.close();
                      }

            });
          
          }

     }) ;

});

module.exports = router; 