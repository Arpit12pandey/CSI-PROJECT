const express = require('express');
const {
    createOrder,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
} = require('../controllers/orderController');
const { protect } = require('../middleWare/authMiddleware');

const router = express.Router();

router.route('/')
    .post(protect, createOrder);

router.route('/:id')
    .get(protect, getOrderById);

router.route('/:id/pay')
    .put(protect, updateOrderToPaid);

router.route('/:id/deliver')
    .put(protect, updateOrderToDelivered);

module.exports = router;
