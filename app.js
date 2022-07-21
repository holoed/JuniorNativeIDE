import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import routes from './routes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
//const port = 8081;
const port = process.env.PORT;

app.use("/", express.static(path.join(__dirname, 'web')));
app.use('/', routes);

process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  // some other closing procedures go here
  process.exit(1);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})