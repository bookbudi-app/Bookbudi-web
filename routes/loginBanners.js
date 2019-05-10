const express = require('express');
const router = express.Router();
const env = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

var dburl = process.env.URL;

router.get('/loginBanners', (req,res) =>{
	
         MongoClient.connect(dburl,{useNewUrlParser:true},(err,client) => {

                    if(err){

                       console.log('Error:'.red, +err);
                    }
                    else{

                        var collect = client.db('Bookbudi_db').collection('LoginBanners');

                        collect.find({}).toArray((err,result) => {

                        if(err){

                      	    console.log("Error:".red,+err);
                         }

                         else{

                            output = result.map(r => ({'Image':r.Image,'Description':r.Description}));

                            res.json(output);

                            client.close(); 

                           }

                        });


                   }

         });

});

module.exports = router;
