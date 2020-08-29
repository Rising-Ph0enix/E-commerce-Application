const Product = require('../models/product');
const express = require('express');
const router = express.Router();
const cors = require('cors')

router.get('/', cors(), (req, res) => {
    res.send('Welcome to the E-commerce App!');
});

/* 
    Create a new product 
*/
router.post('/products/create', cors(), async function (req, res) {
    try {
        const isProductInStock = await Product.findOne({ name: req.body.name });
        if (isProductInStock) {
            throw new Error('A product already exists with that name');
        }
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price,
            reviews: req.body.reviews
        });
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(409).json(err.toString());
    }
});

/* 
    Get a specific product by name
*/
router.get('/products/:name', cors(), async function (req, res) {
    try {
        const isProductInStock = await Product.findOne({ name: req.params.name });
        if (!isProductInStock) {
            throw new Error('No product exists with that name');
        }
        const product = await Product.aggregate()
            .match({
                name: req.params.name
            }).addFields({
                average_rating: { $avg: '$reviews.rating' }
            });
        res.json(product);
    } catch (err) {
        res.status(404).json(err.toString());
    }
});

/* 
    Get all products
*/
router.get('/products', cors(), async function (req, res) {
    try {
        const products = await Product.aggregate()
            .addFields({
                average_rating: { $avg: '$reviews.rating' }
            })
            .project('name image price average_rating');
        if (!products.length) {
            throw new Error('There are no products in the store');
        }
        res.json(products);
    } catch (err) {
        res.status(404).json(err.toString());
    }
});

/* 
    Update a product's fields
*/
router.patch('/products/:name', cors(), async function (req, res) {
    try {
        const product = await Product.findOne({ name: req.params.name });
        if (!product) {
            throw new Error('No product exists with that name');
        }
        if(req.body._id){
            delete req.body._id;
        }
        for (let field in req.body) {
            product[field] = req.body[field];
        }
        await product.save();
        res.json(product);
    } catch (err) {
        res.status(404).json(err.toString());
    }
});

/* 
    Delete a product, given it's name
*/
router.delete('/products/:name', cors(), async function (req, res) {
    try {
        const doc = await Product.deleteOne({ name: req.params.name });
        if (doc.deletedCount === 0) {
            throw new Error('No product exists with that name');
        }
        res.status(204).send();
    } catch (err) {
        res.status(404).json(err.toString());
    }    
});

module.exports = router;