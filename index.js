import dotenv from "dotenv"
import connectdb from './database/database.js';
import { app } from "./app.js";
dotenv.config({ path: './.env' });

connectdb() // connect.db returns promise so using then and catch
.then(()=>{
    const PORT = process.env.PORT||5000
    app.listen(PORT,()=>{
        console.log(`http://localhost:${PORT}`)
    })
}).catch((err)=>{
    console.log("mongo db connection failed")
});
