
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import expressFileupload from 'express-fileupload';
import userRouter from './router/user.router.js';
import categoryRouter from './router/category.router.js';
import subcategoryRouter from './router/subCategory.router.js'
import productRouter from './router/product.router.js';
import bidRouter from './router/bid.router.js'
import newsletterRouter from './router/newsletter.router.js';
import contactRouter from './router/contact.router.js';

dotenv.config()
const app = express();

// for cross origin ( different port handle)
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressFileupload());

// routes
app.use('/user',userRouter);
app.use('/category',categoryRouter);
app.use("/subcategory",subcategoryRouter);
app.use("/product",productRouter);
app.use("/bid",bidRouter);
app.use('/newsletter', newsletterRouter);
app.use('/contact', contactRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT);
console.log("Server invoked at:", PORT);


