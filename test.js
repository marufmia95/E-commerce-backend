// const port = 4000;
// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors');

// app.use(express.json());
// app.use(cors());

// // Database Connection
// mongoose.connect("mongodb+srv://ecommerce_bk:ecommerce@cluster0.ihlvv5z.mongodb.net/e-commerce", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('Database connected successfully'))
// .catch(err => console.error('Database connection error: ', err));

// // API Creation
// app.get('/', (req, res) => {
//     res.send("Express App is Running");
// });

// // Start Server
// app.listen(port, () => {
//     console.log("Server is running on port " + port);
// });


// //img storage Engine
// const storage = multer.diskStorage({
//     destination: './Uplode/image',
//     filename:(req,file,cb)=>{
//         return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//     }
// })

// const Upload = multer ({storage:storage})




// https://cloud.mongodb.com/v2/66613f182c6d73293cb24023#/clusters
