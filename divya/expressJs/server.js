var express = require("express");
var app = express();
var path = require("path");

app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,"public")))

app.get('/',(req,res) => {
    // res.write(" inserted Successfully");
    // res.render('first.ejs', {
    //     'text': 'It is coming from backend'
    // });
    res.render('divya.ejs', {
        'text': ""
    });
    // res.end();
});

app.listen(8080);


