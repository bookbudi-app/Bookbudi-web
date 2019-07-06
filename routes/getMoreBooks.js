const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const env = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

var dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/getMoreBooks',(req,res) => {

     let id = req.body.userId;

     MongoClient.connect(dburl,{useNewUrlParser:true},(err,client) => {
                 
                 if(err){
                 	console.log("Error:",err);
                 }else{

                   let collect = client.db('Bookbudi_db').collection('Books');

                   collect.find({User_id:id}).toArray((err,result) => {

                             if(err){
                             	console.log("Error:",err);
                             }else{

                             	let output = result.map(r => ({'bookImg':r.Book_image,'bookName':r.Book_name,
                                              'bookSubject':r.Subject,'bookClass':r.Grade,'bookCity':r.City,
                                               'userName':r.Name}));

                             	res.json(output);

                             	client.close();
                             }
                   });
               }
     });

});

module.exports = router;