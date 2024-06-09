const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const dbURI = "mongodb+srv://ecommerce_bk:ecommerce@cluster0.ihlvv5z.mongodb.net/e-commerce";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('MongoDB connection error: ', err));

// Root Route
app.get('/', (req, res) => {
    res.send("Express App is Running");
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/image',  // Corrected the folder name
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Serve Images
app.use('/image', express.static('upload/image'));

// Upload Route
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/image/${req.file.filename}`
    });
});

// Product Schema
const productSchema = new mongoose.Schema({
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
        required: true,
    },
});

const Product = mongoose.model('Product', productSchema);

// Add Product Route
app.post('/addproduct', async (req, res) => {
    const product = new Product({
        id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        available: req.body.available,
    });

    try {
        await product.save();
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add product',
            error: error.message,
        });
    }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Bad JSON');
        return res.status(400).send({ success: false, message: 'Invalid JSON' });
    }
    next();
});

// Start Server
app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on port " + port);
    } else {
        console.log("Error: " + error);
    }
});
