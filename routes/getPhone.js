const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/getPhone',(req,res) => {

	 let myquery = req.body.uId;

     MongoClient.connect(dburl,{useNewUrlParser:true},(err,client) => {
                        
                      if(err){
                      	console.log("Error",err);
                      
                      }else{
                        
                        let collect = client.db('Bookbudi_db').collection('Users');

                        collect.find({_id:myquery}).toArray((err,result) => {

                                  if(err){
                                  	console.log("Error",err);
                                  }else{

                                  	let output = result.map(r => ({'phone':r.Phone}));
                                  	res.json(output);
                                  	client.close();
                                  }
                        });
                    }
           });

});

module.exports = router;

