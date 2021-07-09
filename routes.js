const path = require('path');
const router = require('express').Router();
const request = require('request');

const textParser = require('body-parser').text();

router.post('/type', textParser, function(req, res) {
    request.post({ headers: {'content-type' : 'text/plain'}
    , url: "http://localhost:8080", body: req.body }
    , function(error, response, body){
        res.send(body);
    });    
});

module.exports = router;


 