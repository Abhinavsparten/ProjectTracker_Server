//import env file
require('dotenv').config()

//import express
const express=require('express')

const cors=require('cors')
const router = require('./routes/router')
const cookieParser = require('cookie-parser')

//import db
require('./db/connection')

//server
const server=express()

// connect frontend
server.use(cors({
    origin: 'https://65f030eb75301ba4cbb5e6bb--aesthetic-seahorse-4ab372.netlify.app/', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  }));

// server.use(cors())

server.use(cookieParser());
server.use(express.json())
server.use(router)



const port = process.env.PORT || 3000;


server.listen(port,()=>{
    console.log(`Inhouse Server Started at port ${port}`);
})
