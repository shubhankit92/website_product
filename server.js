const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://anku:o0Y9gVzPhWayoYEq@cluster0.x0pcni4.mongodb.net/products", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Product Schema Configuration
const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: String,
    website: String,
});
const Product = mongoose.model("Product", productSchema);

//Website Schema Configuration
const websiteSchema = new mongoose.Schema({
    name: String,
});
const Website = mongoose.model("Website", websiteSchema);

//Express Schema Configuration
const app = express();

//Port settings
const port = 3000;
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//API to set the product
app.post("/addProduct", async function (req, res) {
    console.log(req.body.name);
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        website: req.body.website,
    });
    product.save()
        .then(doc => {
            res.status(200).send('Products is added to the database');
        })
        .catch(err => res.status(500).send('Products not added to the database'))
});

// API to create the website name
app.post("/addWebsite", async function (req, res) {
    console.log(req.body.name);
    const website = new Website({
        name: req.body.name,
    });
    website.save()
        .then(doc => {
            res.status(200).send('website is added to the database');
        })
        .catch(err => res.status(500).send('website not added to the database'))
});

//API to search the product via name
app.get('/search', async (req, res) => {
    try {
        const result = {}
        const productName = req.query.q
        const websitesList = await Website.find({});
        for(let i = 0; i < websitesList.length; i++) {
            result[websitesList[i].name] = []
        }
        const products = await Product.find({ name: new RegExp(productName, 'i') });
        for(let i = 0; i < products.length; i++) {
            if(!result[products[i].website]){
                result[products[i].website] = [];
            }
            else {
                result[products[i].website].push({
                    name: products[i].name,
                    image: products[i].image,
                    price: products[i].price
                })
            }
        }
        res.status(200).send({result: result});
    } catch(err) {
        console.log(err);
        res.status(500).send('Something went wrong')
    }
});

app.listen(port, () => console.log(`Listening on port ${port}!`));