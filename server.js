/**
 * Created by mmalkav on 08.04.2016.
 */

var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var redis = require('redis');
var http = require('http');

mongoose = require('mongoose');
uaParser = require('ua-parser');

var port = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || parseInt(process.env.PORT) ||  901;

var dbURI = 'mongodb://huaweiarmenia:huawei901@ds019970.mlab.com:19970/heroku_c5wd0q4r';

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

app.use(express.static('' + __dirname + '/files'));
app.set('views',[''+__dirname + '/files/templates', ''+__dirname + '/files/templates/botView/']);
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/favicon.ico', express.static('./files/img/favicon.ico'));

app.set('json spaces', 2);

require('middleware/routes.js')(app, fs);
require('middleware/mongooseModels.js')(app, mongoose);

productsSchema = mongoose.model('products', huaweiModels.product);

var server = app.listen(port || 901, function() {
    console.log("listening on " + port);
});

var subscriber = JSON.stringify({
    "email_address": "test@test.com",
    "status": "subscribed",
    "merge_fields": {
        "FNAME": "Tester",
        "LNAME": "Testerson"
    }
});

var options = {
    host: 'us13.api.mailchimp.com',
    path: '/3.0/lists/403ece5b2c/members',
    method: 'POST',
    headers: {
        'Authorization': 'apikey a756db21ca45ac2c287198217355ecd2-us13',
        'Content-Type': 'application/json',
        'Content-Length': subscriber.length
    }
};

var hreq = http.request(options, function (hres) {
    console.log('STATUS CODE: ' + hres.statusCode);
    console.log('HEADERS: ' + JSON.stringify(hres.headers));
    hres.setEncoding('utf8');

    hres.on('data', function (chunk) {
        console.log('\n\n===========CHUNK===============')
        console.log(chunk);
        //res.send(chunk);
    });

    hres.on('end', function(res) {
        console.log('\n\n=========RESPONSE END===============');
    });

    hres.on('error', function (e) {
        console.log('ERROR: ' + e.message);
    });
});

hreq.write(subscriber);
hreq.end();