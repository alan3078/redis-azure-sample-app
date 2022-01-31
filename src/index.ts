import { createClient } from 'redis';
import * as dotenv from "dotenv";

dotenv.config();

const config = {
    socket: {
        tls: true,
        host: process.env.REDISCACHEHOSTNAME || '',
        port: parseInt(process.env.PORT || '6380')
    },
    password: process.env.REDISCACHEKEY
}

async function testCache() {

    // Connect to the Azure Cache for Redis over the TLS port using the key.
    const cacheConnection = createClient(config)
    cacheConnection.on('error', (err) => console.log('Redis Client Error', err));

    await cacheConnection.connect()
    await cacheConnection.ping
    
    // Simple PING command
    console.log("\nCache command: PING");
    console.log("Cache response : " + await cacheConnection.ping())

    // Redis 3.1.2
    // // Simple PING command
    // console.log("\nCache command: PING");
    // console.log("Cache response : " + await cacheConnection.pingAsync());

    // // Simple get and put of integral data types into the cache
    // console.log("\nCache command: GET Message");
    // console.log("Cache response : " + await cacheConnection.getAsync("Message"));

    // console.log("\nCache command: SET Message");
    // console.log("Cache response : " + await cacheConnection.setAsync("Message",
    //     "Hello! The cache is working from Node.js!"));

    // // Demonstrate "SET Message" executed as expected...
    // console.log("\nCache command: GET Message");
    // console.log("Cache response : " + await cacheConnection.getAsync("Message"));

    // // Get the client list, useful to see if connection list is growing...
    // console.log("\nCache command: CLIENT LIST");
    // console.log("Cache response : " + await cacheConnection.clientAsync("LIST"));
}

testCache();