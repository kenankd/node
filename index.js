//const express = require('express');
import express from 'express';
import fs from 'fs'
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import userRoutes from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js'
const app = express();
const port = 4000;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('',(req, res) => {
  res.send('Hello world!')
});

app.get('/health',(req,res) => {
  res.send('Pozzzz');
});

app.use('/users',userRoutes);
app.use('/auth',authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});