const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const env = require('dotenv').config();

var dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/removeFromWishlist',(req,res) => {

           var ObjectId = require('mongodb').ObjectID
           var bId = new ObjectId(req.body.bId);

           var uId = req.body.uId; 

           MongoClient.connect(dburl,{useNewUrlParser:true},(err,client) => {

                   if(err){

                   	console.log("Error" +err);
                   }
                   else{

                   	var collect = client.db('Bookbudi_db').collection('Wishlist');

                   	collect.find({$and:[{_id:bId},{UserId:uId}]}).toArray((err,result) => {


                                 if(err){

                                 	console.log("Error", err);
                               
                                 }if(result.length>0){
                                      
                                   remove();
                                 
                                 }else{

                                 	res.send("Not found");
                                 	client.close();
                                 }
                          });
                   }

                 function remove(){

                      var collect = client.db('Bookbudi_db').collection('Wishlist');
                   
                      collect.deleteOne({$and:[{UserId:uId},{_id:bId}]},(err,obj) => {

                             if(err){

                             	console.log("Error" +err);
                             
                             }else{

                             	res.send("Deleted");
                             	client.close();
                             }

                      });

                 }

          }); 
});

   module.exports = router;
