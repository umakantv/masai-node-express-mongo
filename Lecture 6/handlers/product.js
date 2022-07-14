const Product = require("../database/product");

async function fetchAllProducts(req, res, next) {
    const products = await Product.find();

    return res.send({
        data: products
    });
}

async function fetchSingleProduct(req, res, next) {

    const {id} = req.params;

    const product = await Product.findById(id)
    
    if (product) {
        return res.send({
            data: product
        })
    } else {
        return res.status(404).send({
            error: "Product with given id does not exist."
        })
    }
}

async function createProduct(req, res, next) {
    const { product: productData } = req.body;

    let product = new Product(productData)

    await product.save();

    return res.send({
        message: "Product has been added",
        data: product,
    });
}

async function updateProduct(req, res, next) {
    const { product: productData } = req.body;
    const { id: productId } = req.params;

    let product = await Product.findById(productId)

    for(const [key, value] of Object.entries(productData)) {
        product[key] = value;
    }

    await product.save();

    return res.send({
        message: "Product has been updated",
        data: product,
    })
}

async function deleteProduct(req, res, next) {
    const { id: productId } = req.params;

    await Product.findByIdAndDelete(productId)

    return res.send({
        message: "Product has been deleted."
    })
}

module.exports = {
    fetchAllProducts,
    fetchSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}