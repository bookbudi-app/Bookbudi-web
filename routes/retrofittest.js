const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const env = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

var dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/retrofitUsers',(req,res) => {

      var data = {

          name:req.body.name,
          age:req.body.age
      };

      MongoClient.connect(dburl,{useNewUrlParser:true},(err,client) => {

                 if(err){

                 	console.log("Error" +err);
                 
                 }else{
                     
                    var collect = client.db('Bookbudi_db').collection('RetrofitUser');

                    collect.insertOne(data,(err,resp) => {

                    	if(err){

                    		console.log("Error" +err);
                    	}else{

                    		res.send("Data inserted");
                    		client.close();
                    	}
                    })
                 }

         });
});

module.exports = router;