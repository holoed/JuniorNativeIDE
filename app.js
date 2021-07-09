const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.use("/", express.static(path.join(__dirname, 'web')));
app.use('/', require('./routes'));

process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  // some other closing procedures go here
  process.exit(1);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})