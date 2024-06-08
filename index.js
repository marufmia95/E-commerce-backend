const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { error } = require('console');

app.use(express.json());
app.use(cors());
//dataBase CONNECT
mongoose.connect("mongodb+srv://ecommerce_bk:ecommerce@cluster0.ihlvv5z.mongodb.net/e-commerce")

//api creation

app.get('/',(req,res)=>{
    res.send("Express App is Running");
})
//img storage Engine
const storage = multer.diskStorage({
    destination: './Uplode/image',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const Upload = multer ({storage:storage})

//creating Upload instance
app.use('/image',express.static('upload/image'))
app.post('/upload',Upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        Image_url: `http://localhost:${port}/image/${req.file.filename}`
    })
})

// Schema for creating Products
const product = mongoose.model('Product',{
    id:{
        type:Number,
        required:true,
    }
    name:{
        type:String,
    }
})





app.listen(port,(error)=>{
    if(!error){
        console.log("Server is running on port " +port);
    }
    else{
        console.log("Error : " +error);
    }
})