
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const env = require('dotenv');
const MongoClient = require('mongodb').MongoClient;

var dburl = process.env.url;

router.post('/addtoWishlist',(req,res) => {

     var data = { 

     	  Book_id:req.body.BookId,
          User_id:req.body.UserId,
          Book_image:req.body.Book_Image,
          Book_name:req.body.Book_name,
          Book_subject:req.body.Book_subject,
          Book_class:req.body.Book_class
       };

     MongoClient.connect(dburl,{useNewUrlParser:true},(err,client) => {

             if(err){

             	console.log("Error" +err);
              
             }else{
               
               var collect = client.db('Bookbudi_db').collection('Wishlist');

               collect.insertOne(data,(err,resp) => {
                         
                         if(err){

                         	console.log("Error" +err);
                         
                         }else{
                          
                             res.send("Data added");
                             client.close(); 
                      }
                    
               });

           }

     });

});

module.exports = router;