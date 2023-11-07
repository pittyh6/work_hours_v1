
/*---------------import---------------*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
/*-------------------------------------*/

/* -------------Mongo DB------------*/
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/workJamy", {useNewUrlParser: true, useUnifiedTopology: true});
import Work from './model/Work'

const work_day = new Work({
    name_user: 'Priscila',
    work: []
})
/*-------------------------------------*/

/*---------------ROOT---------------*/
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

//Server Static File
app.use(express.static('public'));
app.use(express.json());

//Define routes -> redirect to home page when open website
app.get('/', function (req, res) {
    res.render('pages/index');
})
app.get('/punch', function (req, res) {
    res.render('pages/punch');
})

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})