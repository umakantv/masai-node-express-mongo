
const express = require('express');
const { fetchAllOrders, fetchSingleOrder, createOrder, deleteOrder } = require('../handlers/order');

const orderRouter = express.Router()

orderRouter.get('/orders/all', fetchAllOrders)
orderRouter.get('/orders/:id', fetchSingleOrder)
orderRouter.post('/orders', createOrder)
orderRouter.delete('/orders/:id', deleteOrder)

module.exports = orderRouter;