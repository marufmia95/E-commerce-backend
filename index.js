const express = require('express');
const mongoose = require('mongoose'); // Ensure this is declared only once
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

// Database connection
const uri = "mongodb+srv://ecommerce_bk:ecommerce@cluster0.ihlvv5z.mongodb.net/e-commerce";
// mongodb+srv://ecommerce_bk:<password>@cluster0.ihlvv5z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

mongoose.connect(uri, {
    ssl: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => {
      console.error('MongoDB connection error:', err);
      process.exit(1); // Exit the process with an error code
  });

// API endpoint
app.get('/', (req, res) => {
    res.send("Express App is Running");
});

// Image storage engine
const storage = multer.diskStorage({
    destination: './Upload/image',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Creating upload instance
app.use('/image', express.static('upload/image'));

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/image/${req.file.filename}`
    });
});

// Schema for creating products
const Product = mongoose.model('Product', new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
}));

app.post('/addproduct', async (req, res) => {
    try {
        const product = new Product({
            id: req.body.id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });
        console.log(product);
        await product.save();
        console.log("Product saved");
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on port " + port);
    } else {
        console.log("Error: " + error);
    }
});
