const Order = require("../database/order");
const Product = require("../database/product");

async function fetchAllOrders(req, res, next) {
    const orders = await Order.find().populate('product');

    return res.send({
        data: orders
    });
}

async function fetchSingleOrder(req, res, next) {

    const {id} = req.params;

    const order = await Order.findById(id).populate('product').populate('user');
    
    if (order) {
        return res.send({
            data: order
        })
    } else {
        return res.status(404).send({
            error: "Order with given id does not exist."
        })
    }
}

async function createOrder(req, res, next) {
    const { order: orderData } = req.body;

    let product = await Product.findById(orderData.productId);

    orderData.price = product.price * orderData.quantity;
    let order = new Order(orderData)

    await order.save();

    return res.send({
        message: "Order has been added",
        data: order,
    });
}

async function deleteOrder(req, res, next) {
    const { id: orderId } = req.params;

    await Order.findByIdAndDelete(orderId)

    return res.send({
        message: "Order has been deleted."
    })
}

module.exports = {
    fetchAllOrders,
    fetchSingleOrder,
    createOrder,
    deleteOrder,
}