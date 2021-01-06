const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/dancecontact', { useNewUrlParser: true, useUnifiedTopology: true });
const port = process.env.PORT || 1000;


// define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC CONFIGURATION
app.use('/static', express.static('static'));  //For serving static files.
app.use(express.urlencoded());




// PUG SPECIFIC CONFIGURATION
app.set('view engine', 'pug');   // set the template engine as pug
app.set('views', path.join(__dirname, 'views'));   // template file ko kaha se read karna chahte he


// PUG ENDPOINTD
app.get('/', (req, res) => {
 const params = { }
 res.status(200).render('home.pug',params);
 
 });

 




 
app.get('/about', (req, res) => {
    const params = { }
    res.status(200).render('about.pug',params);
    
});

app.get('/services', (req, res) => {
    const params = { }
    res.status(200).render('services.pug',params);
    
});

app.get('/classinfo', (req, res) => {
    const params = { }
    res.status(200).render('classinfo.pug',params);
    
});

app.get('/contact', (req, res) => {
    const params = { }
    res.status(200).render('contact.pug',params);
    
});


app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("items has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to datavase")
    })
    // res.status(200).render('contact.pug');
    
});


// // for creating a txt file of input
// app.post('/contact', (req, res)=>{
//     name = req.body.name;
//     phone = req.body.phone;
//     email = req.body.email
//     address = req.body.address;
//     desc = req.body.desc; 
 
//     let writecontent = `THE details of the clint is here : NAME : ${phone} , AGE : ${email}, ADRESS : ${address},  MORE: ${desc}`
//      fs.writeFileSync('gymclient.text',writecontent);    // here we are writing details in txt file
//  console.log(req.body);   // it will show the details as object on terminal
//  const params = {'message' : 'Your form is submitted successfully'};
//  res.status(200).render('index.pug',params );

// });





 // START THE SERVER 
app.listen(port, () => {
    console.log(`application started successfully on port number ${port}`);
});


