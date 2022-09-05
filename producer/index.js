const express = require('express');
let producer_module = require('./src/producer/producer');
let { produceExample } = producer_module;

const SERVER = express();
const PORT = 8080;


SERVER.use(express.json());

SERVER.get('/', async(_req,res)=>{
    await produceExample();
    return res.send('Hello world');
});

SERVER.listen(PORT, () => console.log('Server running on port '+PORT))
