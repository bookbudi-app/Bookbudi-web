<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const env = require('dotenv').config();

var dburl = process.env.URL;

router.get('/banners', (req,res) => {

       MongoClient.connect(dburl, {useNewUrlParser:true}, (err,client) => {

               if(err){

               	console.log("Error".yellow, +err);
               }
               else{

               	var collect = client.db('Bookbudi_db').collection('banners');

               	collect.find({}).toArray((err,result) => {

                      
                      if(err){

                      	console.log("Error:".red,+err);
                      }
                      else{

                      	output = result.map(r => ({'Image':r.Image}));

                      	res.json(output);

                        client.close();

                     }    
               	});

               }

        });

    });

module.exports = router;
=======
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const env = require('dotenv').config();

var dburl = process.env.URL;

router.get('/banners', (req,res) => {

       MongoClient.connect(dburl, {useNewUrlParser:true}, (err,client) => {

               if(err){

               	console.log("Error".yellow, +err);
               }
               else{

               	var collect = client.db('Bookbudi_db').collection('banners');

               	collect.find({}).toArray((err,result) => {

                      
                      if(err){

                      	console.log("Error:".red,+err);
                      }
                      else{

                      	output = result.map(r => ({'Image':r.Image}));

                      	res.json(output);

                        client.close();

                     }    
               	});

               }

        });

    });

module.exports = router;
>>>>>>> 39e717597cc854f79ab6273d5bc3ab9a3cc87829
