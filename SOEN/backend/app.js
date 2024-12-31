import express from 'express';
import connect from './db/db.js';
import morgan from 'morgan';

connect();

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extented:  true}));

app.get('/', (req,res) => {
    res.send('Hello World');
});

export default app;