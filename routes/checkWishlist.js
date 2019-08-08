const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const env = require('dotenv');
const MongoClient = require('mongodb').MongoClient;

var dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/checkWishlist',(req,res) => {

       MongoClient.connect(dburl,{useNewUrlParser:true},(err,client) => {

                var ObjectId = require('mongodb').ObjectID
                var bId = new ObjectId(req.body.bId);

                var uId = req.body.uId;
                
                if(err){

                	console.log("Error" +err);
               
                }else{
                   
                   var collect = client.db('Bookbudi_db').collection('Wishlist');

                   collect.find({$and:[{_id:bId},{UserId:uId}]}).toArray((err,result) => {

                              if(err){

                             	console.log("Error" +err);
                             
                              }if(result.length>0){
                              
                                 res.send("Available");
                               
                              }else{

                              	res.send("not available");
                              	client.close();
                              }

                   }); 

                }  

       });

});

module.exports = router;