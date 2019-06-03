const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const env = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

var dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/saveUserProfile',(req,res) => {

     var data = {

        id : req.body.uId,
        phone : req.body.phone
     };

     MongoClient.connect(dburl,{useNewUrlParser:true},(err,client) => {

                   if(err){

                   	console.log("Error" +err);
                   }
                   else{

                   	var collect = client.db('Bookbudi_db').collection('Users');

                   	collect.findOne({_id:data.id},(err,doc) =>{
                 
                           if(err){

                           	 console.log("Error" +err);
                           }
                           if(doc){

                       var addPhone = client.db('Bookbudi_db').collection('Users');
                       
                         	
                           }

                   	});
                   
               }

     });

});

module.exports = router;

