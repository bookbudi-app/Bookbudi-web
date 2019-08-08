const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const env = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

var dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/addPhoneNo',(req,res) =>{

      var data = {

          uId:req.body.id,
          phone:req.body.phone
      };

      MongoClient.connect(dburl,{useNewUrlParser:true},(err,client) => {

                   if(err){

                   	console.log("Error" +err);
                   
                    }else{


                     var collect = client.db('Bookbudi_db').collection('Users');
                     
                     collect.updateOne({_id:data.uId},{$set:{Phone:data.phone}},(err,result) => {

                              if(err){

                              	console.log("Error" +err);
                              
                              }else{

                                   res.send("Updated successfully");
                                   client.close();
                              }

                     }) ;	
                   
               }
                  
      });

});

module.exports = router;