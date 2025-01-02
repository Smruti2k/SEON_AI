import express from 'express';
import connect from './db/db.js';
import morgan from 'morgan';
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

connect();

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extented:  true}));


app.use('/users',userRoutes);

app.get('/', (req,res) => {
    res.send('Hello World');
});

export default app;