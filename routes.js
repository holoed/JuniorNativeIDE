const path = require('path');
const router = require('express').Router();
const request = require('request');

const textParser = require('body-parser').text();

//const url = "http://localhost:8080"
const url = "http://junior-type.default.svc.cluster.local"

router.post('/type', textParser, function(req, res) {
    request.post({ headers: {'content-type' : 'text/plain'}
    , url: url + "/type", body: req.body }
    , function(error, response, body){
        res.send(body);
    });    
});

router.post('/compile', textParser, function(req, res) {
    request.post({ headers: {'content-type' : 'text/plain'}
    , url: url + "/compile", body: req.body }
    , function(error, response, body){
        res.send(body);
    });    
});

router.post('/run', textParser, function(req, res) {
    request.post({ headers: {'content-type' : 'text/plain'}
    , url: url + "/run", body: req.body }
    , function(error, response, body){
        res.send(body);
    }); 
}); 
    
router.post('/compileToJs', textParser, function(req, res) {
    request.post({ headers: {'content-type' : 'text/plain'}
    , url: url + "/compileToJs", body: req.body }
    , function(error, response, body){
        res.send(body);
    });  
});

router.get('/libJs', textParser, function(req, res) {
    request.get({ headers: {'content-type' : 'text/plain'}
    , url: url + "/libJs" }
    , function(error, response, body){
        res.send(body);
    });  
});

module.exports = router;




 