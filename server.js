
const express = require('express');
const color = require('colors');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine','ejs');
app.use(require('./routes/register'));
app.use(require('./routes/banners'));
app.use(require('./routes/addbook'));

const port = process.env.PORT || 3000; 

app.listen(port, (req,res) => {

    console.log("Server is running at: ".green, +port);

});



     