const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database Connection with error handling
mongoose.connect("mongodb+srv://GreatEcom:a044848100@cluster0.kta1t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Database connection error:", err));

// API Root Endpoint
app.get("/", (req, res) => {
    res.send("Express App is Running");
});



// Ensure the upload directory exists (use 'fs' to check and create if needed)
const fs = require('fs');
const { log, error } = require("console");
const uploadDir = './upload/images';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Image Storage Engine
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });

// Image Upload Endpoint
app.use('/images', express.static(uploadDir));
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Product Schema
const Product = mongoose.model("product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    description: {
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
    old_price: { // assuming this should be a number, not Date
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: { // spelling correction
        type: Boolean,
        default: true,
    },
});

// Add Product Endpoint
app.post('/addproduct', async(req, res) => {
    try {
        let products = await Product.find({});
        const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price
        });
        await product.save();
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Remove Product Endpoint
app.post('/removeproduct', async(req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Get All Products Endpoint
app.get('/allproducts', async(req, res) => {
    try {
        let products = await Product.find({});
        res.json(products);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// User Schema
const Users = mongoose.model('Users', {
    name: {
        type: Number,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

// User Signup Endpoint
app.post('/signup', async(req, res) => {
    try {
        // ตรวจสอบว่าอีเมลซ้ำหรือไม่
        let checkEmail = await Users.findOne({ email: req.body.email });
        if (checkEmail) {
            return res.status(400).json({ success: false, error: "Existing user found with same email address" });
        }
        // ตรวจสอบว่ามีชื่อเดียวกันในระบบหรือไม่
        let checkName = await Users.findOne({ name: req.body.username });
        if (checkName) {
            return res.status(400).json({ success: false, error: "Existing user found with same username" });
        }
        // ถ้าไม่พบชื่อและอีเมลที่ซ้ำกันก็สร้างผู้ใช้ใหม่
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });

        await user.save();

        const data = { user: { id: user.id } };
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


// Creating Endpoint Login with Server
app.post('/login', async(req, res) => {
    console.log("Request Body: ", req.body);
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, error: "Please provide both email and password" });
        }
        let user = await Users.findOne({ email });
        if (user) {
            console.log("User Found: ", user);
            const passCompare = password === user.password; // เปลี่ยนเป็น bcrypt หากใช้
            if (passCompare) {
                const data = { user: { id: user.id } };
                const token = jwt.sign(data, 'secret_ecom');
                return res.json({ success: true, token });
            } else {
                return res.json({ success: false, error: "Wrong Password" });
            }
        } else {
            return res.json({ success: false, error: "Wrong Email Id" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});



// creating endpoint for newcollection data
app.get('/newcollections', async(req, res) => {
    let products = await Product.find({ category: { $in: ["ผู้หญิง", "ผู้ชาย", "เสื้อช็อป"] } });
    let newcollection = products.slice(0).slice(0);
    console.log("NewCollection Fetched");
    res.send(newcollection)

})


//creating endpoint for popular women section
app.get('/popularinwomen', async(req, res) => {
    let products = await Product.find({ category: "ผู้หญิง" });
    let popular_in_women = products.slice(0, 4);
    console.log("Popular In Women");
    res.send(popular_in_women);
})

//creating endpoint for popular women section
app.get('/popularinmen', async(req, res) => {
    let products = await Product.find({ category: "ผู้ชาย" });
    let popular_in_men = products.slice(0, 4);
    console.log("Popular In Men");
    res.send(popular_in_men);
})

// Middleware to fetch user from JWT token
const fetchUser = async(req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            return res.status(401).send({ errors: "Please authenticate using a valid token" });
        }
    }
};


//creating endpoint for adding products in cartData
app.post('/addtocart', fetchUser, async(req, res) => {
    console.log("Added", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id })
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send('Added');
})

//creating endpoint to remove product from cartdata
app.post('/removefromcart', fetchUser, async(req, res) => {
    console.log("removed", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id })
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send('Remove');
})

//creating endpoint to get cartdata
app.post('/getcart', fetchUser, async(req, res) => {
    console.log("GetCart");
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
})

// Get Product by ID
app.get('/product/:id', async(req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        res.json(product);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Update Product
app.post('/updateproduct/:id', async(req, res) => {
    try {
        await Product.findOneAndUpdate({ id: req.params.id }, req.body);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Update Product Endpoint
app.put('/updateproduct', async(req, res) => {
    try {
        const { id, name, image, description, category, new_price, old_price, available } = req.body;

        // Find and update the product
        const product = await Product.findOneAndUpdate({ id: id }, // Find product by ID
            {
                name: name,
                image: image,
                description: description,
                category: category,
                new_price: new_price,
                old_price: old_price,
                available: available
            }, { new: true } // Return the updated document
        );

        // Check if product exists
        if (!product) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }

        res.json({ success: true, product });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Start Server
app.listen(port, (error) => {
    if (!error) {
        console.log("Service Running on Port " + port);
    } else {
        console.log("Error : " + error);
    }
});