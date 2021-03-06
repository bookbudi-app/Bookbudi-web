const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const env = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

var dburl = process.env.URL;

router.get('/checkVersion',(req,res) => {

       MongoClient.connect(dburl,{useNewUrlParser:true},(err,client) => {

                 if(err){

                 	console.log("Error",err);
                 }else{

                 	var collect = client.db('Bookbudi_db').collection('AppVersion');
                 
                    collect.find({}).toArray((err,result) => {

                           if(err){
                           
                           	console.log("Error",err);
                           
                           }else{

                               var output = result.map(r => ({'version':r.version}));

                               res.json(output);
                               client.close();
                           }

                    });

                 }

       });

});

module.exports = router;