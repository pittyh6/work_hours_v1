
/*---------------import---------------*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


/*---------------ROOT---------------*/
app.set('view', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

//Server Static File
app.use(express.static('public'));
app.use(express.json());

//Define routes -> redirect to home page when open website
