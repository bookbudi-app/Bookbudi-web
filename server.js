
const express = require('express');
const color = require('colors');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine','ejs');

app.use(require('./routes/register'));
app.use(require('./routes/banners'));
app.use(require('./routes/addbooks'));
app.use(require('./routes/loginBanners'));
app.use(require('./routes/postedBook'));
app.use(require('./routes/deleteRow'));
app.use(require('./routes/loadCity'));
app.use(require('./routes/loadBooks'));
app.use(require('./routes/bookDetail'));
app.use(require('./routes/saveUserProfile'));
app.use(require('./routes/checkPhoneNo'));
app.use(require('./routes/addPhoneNo'));
app.use(require('./routes/checkWishlist'));
app.use(require('./routes/addtoWishlist'));
app.use(require('./routes/removeFromWishlist'));
app.use(require('./routes/loadWishlist'));
app.use(require('./routes/getPhone'));
app.use(require('./routes/getMoreBooks'));
app.use(require('./routes/checkVersion'));
app.use(require('./routes/retrofit/retrofittest'));
app.use(require('./routes/retrofit/getUsers'));   
app.use(require('./routes/retrofit/deleteUser')); 

const port = process.env.PORT || 3000; 

app.listen(port, (req,res) => {

    console.log("Server is running at: ".green, +port);

});



     