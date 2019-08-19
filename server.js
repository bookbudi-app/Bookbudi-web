
const express = require('express');
const bodyParser = require('body-parser'); 
const path = require('path');
const env = require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use("/public", express.static('public')); 
app.use(express.static(path.join(__dirname,'public')));

app.use(require('./routes/index'));
app.use(require('./routes/register'));
app.use(require('./routes/banners'));
app.use(require('./routes/addbooks'));
app.use(require('./routes/loginBanners'));
app.use(require('./routes/postedBook'));
app.use(require('./routes/deleteRow'));
//app.use(require('./routes/loadCity'));
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
app.use(require('./routes/loadFaq'));
//app.use(require('./routes/checkVersion'));
app.use(require('./routes/retrofit/retrofittest'));
app.use(require('./routes/retrofit/getUsers'));   
app.use(require('./routes/retrofit/deleteUser')); 


app.listen(port, () => {
 
    console.log(`Server started on port ${port}`);
});

