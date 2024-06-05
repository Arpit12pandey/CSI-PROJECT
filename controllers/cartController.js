const Cart = require('../models/cartModel');

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product');

        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (cart) {
            const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

            if (itemIndex > -1) {
                cart.cartItems[itemIndex].quantity += quantity;
            } else {
                cart.cartItems.push({ product: productId, quantity });
            }

            const updatedCart = await cart.save();
            res.json(updatedCart);
        } else {
            const newCart = await Cart.create({
                user: req.user._id,
                cartItems: [{ product: productId, quantity }],
            });

            res.status(201).json(newCart);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;

    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (cart) {
            cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== productId);

            const updatedCart = await cart.save();
            res.json(updatedCart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
