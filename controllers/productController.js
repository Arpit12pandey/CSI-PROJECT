const Product = require('../models/productModel');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createProduct = async (req, res) => {
    const { name, description, price, countInStock } = req.body;

    try {
        const product = new Product({
            name,
            description,
            price,
            countInStock,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateProduct = async (req, res) => {
    const { name, description, price, countInStock } = req.body;

    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name;
            product.description = description;
            product.price = price;
            product.countInStock = countInStock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.remove();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
