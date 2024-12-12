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
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

const Product = mongoose.model("product", {
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
    old_price: {
        type: Number, // Ensure this is a number if it's meant to represent price
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
    sizes: { // Updated to "sizes" to represent multiple size options
        type: [String], // Array of size options (e.g., ["S", "M", "L"])
        required: true,
    },
});

module.exports = Product;


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
            old_price: req.body.old_price,
            sizes: req.body.sizes || [] // เพิ่มฟิลด์ sizes
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

// API Endpoint to Get All Users
app.get('/api/users', async(req, res) => {
    try {
        // กรองผู้ใช้ที่มี role เป็น 'user' และเลือกแค่ฟิลด์ที่ต้องการ
        const users = await Users.find({ role: { $in: ['user', 'admin', 'seller'] } }, 'name email role date password');

        res.json(users); // ส่งข้อมูลผู้ใช้กลับไป
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Server Error' }); // ส่ง error response หากเกิดปัญหากับการดึงข้อมูล
    }
});

app.post('/api/users', async(req, res) => {
    try {
        // ดึงข้อมูลจาก request body
        const { idstudent, email, role, password, date } = req.body;

        // ตรวจสอบว่าข้อมูลครบถ้วน
        if (!idstudent || !email || !role || !password || !date) {
            return res.status(400).json({ error: 'All fields are required: name, email, and role' });
        }

        // ตรวจสอบว่า email ซ้ำหรือไม่
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // สร้างผู้ใช้ใหม่
        const newUser = new Users({
            idstudent,
            email,
            role,
            password,
            date,
        });

        // บันทึกผู้ใช้ในฐานข้อมูล
        await newUser.save();

        // ส่ง response กลับไปพร้อมผู้ใช้ที่เพิ่งถูกเพิ่ม
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

// ลบผู้ใช้
app.delete('/api/users/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await Users.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

// แก้ไขข้อมูลผู้ใช้
app.put('/api/users/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { idstudent, email, role, password } = req.body; // สามารถเพิ่มฟิลด์อื่น ๆ ได้
        const updatedUser = await Users.findByIdAndUpdate(id, { idstudent, email, role, password }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});

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

// User Schema
const Users = mongoose.model('Users', {
    name: {
        type: String, // แก้ไข type ให้ตรงกับความหมาย
        required: true,
    },
    idstudent: {
        type: Number, // แก้ไข type ให้ตรงกับความหมาย
        required: function() {
            return this.role === 'user'; // จำเป็นเฉพาะเมื่อ role เป็น 'user'
        },
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartData: {
        type: Object,
        default: {},
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'seller'], // กำหนดค่าสิทธิ์ได้เฉพาะ 'user' หรือ 'admin'
        default: 'user', // ค่าเริ่มต้นเป็นผู้ใช้ทั่วไป
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
        let checkId = await Users.findOne({ idstudent: req.body.idstudent });
        if (checkId) {
            return res.status(400).json({ success: false, error: "Existing user found with same idstudent" });
        }
        // ถ้าไม่พบชื่อและอีเมลที่ซ้ำกันก็สร้างผู้ใช้ใหม่
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        const user = new Users({
            name: req.body.username,
            idstudent: req.body.idstudent,
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
// Server: /login Endpoint
app.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, error: "Please provide both email and password" });
        }

        let user = await Users.findOne({ email });
        if (user) {
            const passCompare = password === user.password; // ใช้ bcrypt เพื่อความปลอดภัยเพิ่ม
            if (passCompare) {
                // สร้าง Token พร้อม role
                const data = { user: { id: user.id, role: user.role } };
                const token = jwt.sign(data, 'secret_ecom', { expiresIn: '1h' }); // เพิ่ม expiresIn
                return res.json({ success: true, token, role: user.role }); // ส่ง role กลับไปด้วย
            } else {
                return res.json({ success: false, error: "รหัสผ่านไม่ถูกต้อง" });
            }
        } else {
            return res.json({ success: false, error: "อีเมลไม่ถูกต้อง" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

const checkRole = (role) => (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ success: false, error: "Access Denied" });

    try {
        const verified = jwt.verify(token, 'secret_ecom');
        const userRole = verified.user.role;

        if (userRole !== role) {
            return res.status(403).json({ success: false, error: "Access Denied: Insufficient Role" });
        }

        req.user = verified.user;
        next(); // ไปที่ endpoint ถัดไป
    } catch (err) {
        res.status(400).json({ success: false, error: "Invalid Token" });
    }
};


// เส้นทางสำหรับ admin เท่านั้น
app.get('/admin/dashboard', checkRole('admin'), (req, res) => {
    res.json({ success: true, message: "Welcome Admin Dashboard" });
});

// เส้นทางสำหรับ user เท่านั้น
app.get('/user/profile', checkRole('user'), (req, res) => {
    res.json({ success: true, message: "Welcome User Profile" });
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

//creating endpoint for adding products in cartData
app.post('/addtocart', fetchUser, async(req, res) => {
    try {
        console.log("Added", req.body.itemId);

        // ค้นหาข้อมูลผู้ใช้
        let userData = await Users.findOne({ _id: req.user.id });
        userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) + 1;

        // อัปเดตข้อมูลในฐานข้อมูล
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });

        // ส่งข้อมูลกลับในรูปแบบ JSON
        res.json({ message: "Added successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
});


//creating endpoint to remove product from cartdata
app.post('/removefromcart', fetchUser, async(req, res) => {
    try {
        console.log("Remove", req.body.itemId);
        let userData = await Users.findOne({ _id: req.user.id });
        if (userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;
        }

        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });

        res.json({ message: "Remove successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
});


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