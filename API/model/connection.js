import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config()
const url = process.env.MONGO_URI; // database coonection
mongoose.connect(url).then(()=>{
    console.log("Successfully connected to mongodb database...");
}).catch((error)=>{
  console.log("Failed to connect with database: "+error);
})
