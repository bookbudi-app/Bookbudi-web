const express = require('express');
const router = express.Router();
const env = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

var dburl = process.env.URL;

router.get('/getUsers',(req,res) => {

     MongoClient.connect(dburl,{useNewUrlParser:true},(err,client) => {

               if(err){

               	console.log("Error" +err);
               }
               else{


               	 var collect = client.db('Bookbudi_db').collection("RetrofitUser");
               	 
               	 collect.find({}).toArray((err,result) => {

                          if(err){

                          	console.log("Error" +err);
                          }
                          else{

                          	output = result.map(r => ({'_id':r._id,'name':r.name,'age':r.age}));
                          	res.json(output);

                          	client.close();
                          }

               	 }) ; 
              
               }

      });
        
});

module.exports = router;