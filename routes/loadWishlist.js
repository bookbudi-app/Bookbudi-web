const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const env = require('dotenv').config();

var dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/loadWishlist',(req,res) => {

           var uId = req.body.uId;

           MongoClient.connect(dburl,{useNewUrlParser:true},(err,client) => {

                    if(err){

                    	console.log("Error",  err);
                    }else{
                        
                     var collect = client.db('Bookbudi_db').collection('Wishlist');
                     
                     collect.find({UserId:uId}).toArray((err,result) => {

                           if(err){
                          
                             console.log("Error", err);
                           
                           }else{

                           	output = result.map(r => ({'UserId':r.UserId,'BookId':r._id,
                                                'BookImage':r.BookImage,'BookName':r.BookName,
                                                 'BookSubject':r.BookSubject}));
                           	res.json(output);
                           	client.close();

                           }
                      });  
                 }

           }); 

});

module.exports = router;