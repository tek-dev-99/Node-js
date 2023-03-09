const db = require('../Models')

const Product = db.products

const addProduct = async(req, res) => {
    let info = {
        title: req.body.title,
        price: req.body.price,
    }

    const product = await Product.create(info);
    res.status(200).send(product);
}


const getAllProducts = async(req, res) => {

    let products = await Product.findAll({});

    res.status(200).send(products)
}

const updateProduct = async(req, res) => {
    let id = req.params.id;
    await Product.update(req.body,{ where: { id: id } });
    res.status(200).send('Product has been updted!');
}

const deleteProduct = async(req, res) => {
    let id = req.params.id;
     await Product.destroy({ where: { id: id } });
    res.status(200).send('Product has been deleted!')
}

module.exports = {
    addProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
}