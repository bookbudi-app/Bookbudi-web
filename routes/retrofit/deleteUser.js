const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const env = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

var dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/deleteRemoteUser',(req,res) => {

       
       MongoClient.connect(dburl,{useNewUrlParser:true},(err,client) => {

                var ObjectID = require('mongodb').ObjectID;
                var myquery = { _id:new ObjectID(req.body._id)};
                
                if(err){
                	
                	console.log("Error", err);
                }else{

                 var collect = client.db('Bookbudi_db').collection('RetrofitUser');

                 collect.deleteOne(myquery,function(err,obj) {


                          if(err){
                          	console.log("Error",err);
                          }else{
                            
                            res.send("Deleted");
                            client.close();   
                          }

                    });
             }

       });

  });

module.exports = router;