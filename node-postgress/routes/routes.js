const { Router, request} = require('express');
const router = Router();
const { 
    getProducts, 
    createProducts, 
    getProductsDetails, 
    createDetailsProducts,
    getProductsById
} = require('../controllers/index.controller.js');

// Get all Products
router.get('/Products', getProducts);
// Get all Products
router.get('/Products/:idProducto', getProductsById);
// Create a new product
router.post('/Products', createProducts);
// get product detail by id product
router.get('/ProductsDetails/:idproducto', getProductsDetails);
// Create a detail Product by id
router.post('/ProductsDetails', createDetailsProducts);

module.exports = router;