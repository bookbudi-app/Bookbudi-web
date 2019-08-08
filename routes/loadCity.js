const express = require('express');
const router = express.Router();
const env = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

var dburl = process.env.URL;

router.get('/loadCity', (req,res) => {

      MongoClient.connect(dburl, {useNewUrlParser:true}, (err,client) => {
                 
            if(err){

            	console.log("Error", +err);
            	client.close();
            }
            else{
              
              var connect = client.db('Bookbudi_db').collection('Locations');

              connect.find({}).toArray((err,result) => {

                      if(err){

                      	res.send("Error",+err);
                      }
                      else{

                      	output = result.map(r => ({'Place':r.Place}));

                      	res.json(output);

                      	client.close();
                      }
              });
            
            }

      });

});

module.exports = router;