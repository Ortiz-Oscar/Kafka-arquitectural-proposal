import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import createConsumer, { TOPIC } from "./kafka-consumer.js"
import cors from "cors"
const app = express();
const corsOptions = {
    origin: 'localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log(`New connection ${socket.id}`);

    socket.on("disconnect", (reason) => {
        console.log(`disconnected ${socket.id} due to ${reason}`);
    });
});

//Consumer configuration
async function handleConsumerMessages(){
    let consumer = await createConsumer(({key, value}) => {
        let k = key.toString();
        io.local.emit("Vote", {"voter" : k, "vote" : value})
        //console.log(`Consumed event from topic ${TOPIC}: key = ${k} value = ${value}`);
    });
    
    consumer.subscribe([TOPIC]);
    consumer.consume();
    
    process.on('SIGINT', () => {
        console.log('\nDisconnecting consumer ...');
        consumer.disconnect();
        process.exit(1)
    }
    );
}

handleConsumerMessages()
  .catch((err) => {
    console.error(`Something went wrong:\n${err}`);
    process.exit(1);
});
//----------------------


//It is not going to listen to the express ports
httpServer.listen(3001);