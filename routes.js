const path = require('path');
const router = require('express').Router();
const request = require('request');

const textParser = require('body-parser').text();

router.post('/run', textParser, function(req, res) {
    request.post({ headers: {'content-type' : 'text/plain'}
    , url: "http://junior-type.default.svc.cluster.local/run", body: req.body }
    , function(error, response, body){
        res.send(body);
    });    
});

module.exports = router;


 