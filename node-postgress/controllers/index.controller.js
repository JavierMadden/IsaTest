const {Pool} = require('pg');
const configDb = {
    user: 'postgres',
    host: 'localhost', 
    password: 'Ja127026',
    database:'isa_test'
}
const pool = new Pool(configDb);

const getProducts = async (req, res) =>{
    try {
        const response = await pool.query('select * from Productos;');
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal error Server');
    }
}
const getProductsById = async (req, res) =>{
    try {
        const response = await pool.query('select * from Productos where idProducto = $1;',[req.params.idProducto]);
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal error Server');
    }
}
const getProductsDetails = async (req, res) =>{
    try {
        var queryText = `select * from detalleProductos  where idProducto = ${req.params.idproducto};`
        const response = await pool.query(queryText);
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal error Server');
    }
}
const createProducts = async (req, res) =>{
    try {
        var queryText = 'INSERT INTO Productos(nombre, precio, descripcion) VALUES($1, $2, $3) RETURNING idproducto';
        console.log(queryText, [req.body.nombre, req.body.precio, req.body.descripcion])
        const result = await pool.query(queryText, [req.body.nombre, req.body.precio, req.body.descripcion]);
        const newlyCreatedProductId = result.rows[0].idproducto;
        console.log(newlyCreatedProductId);
        const response = await pool.query(`select * from Productos where idProducto = ${newlyCreatedProductId}`);
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal error Server');
    }
}
const createDetailsProducts = async (req, res) =>{
    try {
        var queryText = `INSERT INTO detalleProductos(
            idProducto, cantidad, valorTotal, valorIva) VALUES($1, $2, $3, $4) 
            ON CONFLICT (idProducto) DO UPDATE SET cantidad = $2, valorTotal=$3, valorIva=$4
            `
            let queryPrice = `select precio from Productos  where idProducto = ${req.body.idproducto};`
            
            const resp = await pool.query(queryPrice);
            const quantity = req.body.cantidad || 0;    
            const price =  resp.rows[0]['precio'] || 0;
            const totalValue = quantity * price; 
            const iva = 0.19;
            const totalIva = (totalValue * iva );
            const arguments =  [req.body.idProducto, quantity, totalValue, totalIva];               
            const result = await pool.query(queryText, arguments);
            res.status(200).send({msg : 'Detalle de Producto Agregado Existosamente!'});
            console.log(arguments)
        } catch (error) {
            console.log(error)
            res.status(500).send('Internal error Server');
        }
}

module.exports = {
    getProducts,
    getProductsById,
    createProducts,
    getProductsDetails,
    createDetailsProducts
}