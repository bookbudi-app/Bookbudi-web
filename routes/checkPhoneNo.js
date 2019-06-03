const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const env = require('dotenv');
const MongoClient = require('mongodb').MongoClient;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

var dburl = process.env.URL;

router.post('/checkPhoneNo',(req,res) => {

        var userId = {id:req.body.uId};

        MongoClient.connect(dburl,{useNewUrlParser:true},(err,client) => {

                if(err){

                	console.log("Error" +err);
               
                }else{
                
                    var collect = client.db('Bookbudi_db').collection('Users');

                    collect.findOne({_id:userId.id,Phone:{$exists:true}}, (err,doc) => {

                            if(err){

                            	console.log("Error" +err);

                            }if(doc){

                                res.send("Exists");     
                            
                            }else{

                                res.send("Not exists");
                                client.close();
                            }

                    }) ;
                     
                }

        });

});

module.exports = router;