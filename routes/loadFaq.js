const express=  require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const env = require('dotenv').config();

var dburl = process.env.URL;

router.get('loadFaq',(req,res) => {

      MongoClient.connect(dburl,{useNewUrlParser:true},(err,client) => {

                 if(err){
                     console.log("Error",err);
                 }
                 else{

                     var collect = client.db('Bookbudi_db').collection('Faq');

                     collect.find({}).toArray((err,result) => {

                            if(err){
                               console.log("Error",err);
                            }
                            else{

                                var output = result.map(r => ({"Question":r.Question,"Answer":r.Answer}));
                            
                                res.send(output);
                                client.close(); 
                            }
                     });

                 }        
      });

});

module.exports = router;