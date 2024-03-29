import mongoose from 'mongoose';
import express from 'express';
import cors = require("cors");
import config from "./config";
import usersRouter from "./routers/users";
import categoriesRouter from "./routers/categories";
import itemsRouter from "./routers/items";


const app = express();
app.use(express.static('public'));
app.use(cors());
const port = 8000;
app.use(express.json());
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/items', itemsRouter);

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);
    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);