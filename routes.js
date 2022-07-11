import express from 'express';
import request from 'request';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const router = express.Router();
const textParser = bodyParser.text();
const jsonParser = bodyParser.json();

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

router.get('/libTypes', jsonParser, function(req, res) {
    request.get({ headers: {'content-type' : 'application/json'}
    , url: url + "/libTypes" }
    , function(error, response, body){
        res.send(body);
    });  
});

const atob = (base64) => {
    return Buffer.from(base64, 'base64').toString('binary');
};

router.post('/eval', jsonParser, async function(req,res) {
    const code = atob(req.body.code)
    const ret = eval(code + "\n\n" + `applyClosure(${req.body.fn}, ${req.body.arg})`)
    res.status(200).send(JSON.stringify(ret))
});

router.post('/fetch', jsonParser, async function(req, res) {
    try {
        const reqUrl = req.body.url;
        console.log(reqUrl);
        if (reqUrl.endsWith(".gz")) {
            const response = await fetch(reqUrl);
            const body = await response.arrayBuffer();
            res.send(base64ArrayBuffer(body)).end();
        } else {
            const response = await fetch(reqUrl);
            const body = await response.text()
            res.send(body).end();
        } 
    } catch (e) {
        res.sendStatus(500).end();
    }
});

function base64ArrayBuffer(arrayBuffer) {
    var base64    = ''
    var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  
    var bytes         = new Uint8Array(arrayBuffer)
    var byteLength    = bytes.byteLength
    var byteRemainder = byteLength % 3
    var mainLength    = byteLength - byteRemainder
  
    var a, b, c, d
    var chunk
  
    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
      // Combine the three bytes into a single integer
      chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]
  
      // Use bitmasks to extract 6-bit segments from the triplet
      a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
      b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
      c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
      d = chunk & 63               // 63       = 2^6 - 1
  
      // Convert the raw binary segments to the appropriate ASCII encoding
      base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
    }
  
    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
      chunk = bytes[mainLength]
  
      a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2
  
      // Set the 4 least significant bits to zero
      b = (chunk & 3)   << 4 // 3   = 2^2 - 1
  
      base64 += encodings[a] + encodings[b] + '=='
    } else if (byteRemainder == 2) {
      chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]
  
      a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
      b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4
  
      // Set the 2 least significant bits to zero
      c = (chunk & 15)    <<  2 // 15    = 2^4 - 1
  
      base64 += encodings[a] + encodings[b] + encodings[c] + '='
    }
    
    return base64
  }

export default router;




 