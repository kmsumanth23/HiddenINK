import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import getPort from 'get-port';
import cors from 'cors';
//this thing is required to set so as to set cookies for owr website else using cores it will not allow to set cookies; 

const corsOptions = {
    origin: true, // Allow only the frontend URL
    credentials: true, // Allow credentials (cookies)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use(cors(corsOptions));

// // CORS Configuration
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "https://stegnofroggy-1.onrender.com");
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
//   });


dotenv.config({path:"./config.env"});

import './DB/conn.js';
import User from './DB/schema.js';
app.use(express.json());
import authenticationUser from './DB/Authentication.js';



// middle ware connection for routing
app.use(authenticationUser);  // doubt - why using middle where;???

// app.get('/', (req,res)=>{
//     res.send("hello");
// });


(async () => {
    // Try to use the port from the environment variable or a default port
    const preferredPorts = [process.env.PORT || 3000];
    const PORT = await getPort({ port: preferredPorts });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})();


// app.listen(5000, ()=>{
//     console.log("connected to port 5000");
// });


