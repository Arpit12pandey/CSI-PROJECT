const express = require('express');
const {
    getCart,
    addToCart,
    removeFromCart,
} = require('../controllers/cartController');
const { protect } = require('../middleWare/authMiddleware');

const router = express.Router();

router.route('/')
    .get(protect, getCart)
    .post(protect, addToCart)
    .delete(protect, removeFromCart);

module.exports = router;
