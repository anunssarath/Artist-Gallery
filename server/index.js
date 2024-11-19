const express = require("express")
const multer = require('multer');
const path = require('path');

const mongoose = require('mongoose')
const cors = require('cors')
const ArtistModel = require ('./models/Artists')
const Product = require('./models/Product'); 

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/artists");
mongoose.connect('mongodb://127.0.0.1:27017//products', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('MongoDB connection error:', err));
// set up Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        const fileName = Date.now() + fileExtension; 
        cb(null, fileName);
    },
});
const upload = multer({ storage: storage });
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const { price, description } = req.body;
    const imageName = req.file.filename;
    try {
        const product = new Product({
            image: imageName,
            price,
            description,
        });

        await product.save();
        res.status(201).json({ message: 'Product uploaded successfully' });
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(500).json({ message: 'Error uploading product' });
    }
});


app.post('/register', (req,res) => {
    ArtistModel.create(req.body)
    .then(artistss => res.json(artistss))
    .catch(err => res.json(err))

})
app.post('/login', (req,res) => {
    const {email,password} = req.body;
    ArtistModel.findOne({email:email})
    .then(user =>{
        if(user){
            if(user.password ===password){
                res.json("success")
            }
            else{
                res.json("password incorrect")
            }
        }
        else{
            res.json("no record existed")
        }
    })
})
// display all products 
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products); 
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
});



app.listen(3001,() => {
    console.log("server is running")
})