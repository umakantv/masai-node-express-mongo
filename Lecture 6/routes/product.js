
const express = require('express');
const { fetchAllProducts, fetchSingleProduct, createProduct, updateProduct, deleteProduct } = require('../handlers/product');

const productRouter = express.Router()

productRouter.get('/products/all', fetchAllProducts)
productRouter.get('/products/:id', fetchSingleProduct)
productRouter.post('/products', createProduct)
productRouter.patch('/products/:id', updateProduct)
productRouter.delete('/products/:id', deleteProduct)

module.exports = productRouter;