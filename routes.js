const path = require('path');
const router = require('express').Router();
const request = require('request');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});

const textParser = require('body-parser').text();

router.post('/type', textParser, function(req, res) {
    request.post({ headers: {'content-type' : 'text/plain'}
    , url: "http://junior-type.default.127.0.0.1.nip.io", body: req.body }
    , function(error, response, body){
        res.send(body);
    });    
});

module.exports = router;


 