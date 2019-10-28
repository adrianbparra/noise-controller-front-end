const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;

const server = express();
server.use(bodyParser.json());
server.use(cors());

server.listen(port, err => {
    if (err) console.log(err);
    console.log(`server is listening on port ${port}`);
});