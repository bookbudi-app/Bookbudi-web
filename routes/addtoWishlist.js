
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const env = require('dotenv');
const MongoClient = require('mongodb').MongoClient;

var dburl = process.env.URL;

router.post('/addtoWishlist',(req,res) => {

           var ObjectId = require('mongodb').ObjectID
     
        var data = { 
            
          _id: ObjectId(req.body.BookId),
          UserId:req.body.UserId,
          BookImage:req.body.Book_Image,
          BookName:req.body.Book_name,
          BookSubject:req.body.Book_subject,
          BookClass:req.body.Book_class
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