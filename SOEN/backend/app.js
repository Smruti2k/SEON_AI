import express from 'express';
import connect from './db/db.js';
import morgan from 'morgan';
import userRoutes from "./routes/user.routes.js";
import projectRoutes from './routes/project.routes.js';
import cookieParser from "cookie-parser";
import aiRoutes from "./routes/ai.routes.js";
import cors from 'cors';

connect();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extented:  true}));


app.use('/users',userRoutes);
app.use('/project',projectRoutes);
app.use('/ai',aiRoutes);

app.get('/', (req,res) => {
    res.send('Hello World');
});

export default app;