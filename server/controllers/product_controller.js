const express  = require('express');
const router = express.Router();
const Product = require('../db').import('../models/products');

/* ALLOWS ADMIN TO CREATE A PRODUCT ... */
router.post('/products/add', (req, res) => { 
    Product.create({
        name:   req.body.name,
        image:  req.body.image,
        price:  req.body.price,
        desc:   req.body.desc
    })
    .then(
        createSuccess = (data) => {    
            res.status(200).json({
                outcome: 1,
                data: data,
                message: 'Products was created.'
            })
        },
        createError = err => res.status(500).send(err.message)
    )
})

/* GETS ALL PRODUCTS TO DISPLAY IN LIST /// ORDER BY later */
router.get('/products', (req, res) => {
    Product.findAll({
        order: [
            ['name', 'ASC']
        ]
    }).then( 
        findAllSuccess = (data) => {
            res.status(200).json(data);
        },
        findAllError = (err) => {
            res.status(500).send(err.message);
        }
    );
})

/* ALLOWS USER TO VIEW DETAILS OF ONE PRODUCT BY ID */
router.delete('/products/:id', (req, res) => {
    Product.destroy({
        where: { id: req.params.id}
    }).then(
        deleteShowSuccess = (productid) => {
            res.status(200).send("product was removed");
        },
        deleteShowError = (err) => {
            res.status(500).send(err.message);
        }
    );
});

/* ALLOWS ADMIN TO UPDATE DETIALS OF ONE PRODUCT BY ID */ 
router.put('/products/:id', (req, res) => {
    let prod_id     = req.params.id,
        prod_name   = req.body.name,
        prod_image  = req.body.image,
        prod_price  = req.body.price,
        prod_desc   = req.body.desc;

    Product.update({
        name: prod_name,
        image: prod_image,
        price: prod_price,
        desc: prod_desc
    },
    {where: {id: prod_id}}
    ).then(
        function updateSuccess(updatedProd) {
            res.status(200).json(updatedProd);
        },
        function updateError(err) {
            res.status(500).send(err.message);
        }
    )
});

module.exports = router;