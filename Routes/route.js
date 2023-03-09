const express = require('express');
const app = express();
const product = require('../Controllers/product.js')
const user = require('../Controllers/user.js')
const router = require('express').Router()
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

function verifyToken(req,res,next){
    const bearerToken = req.headers['authorization']
    if(typeof bearerToken !== 'undefined'){
        const bearer = bearerToken.split(" ")
        const token = bearer[1]
        req.token = token
        next()
    }else{
        res.send({
            'msg' : 'Token is not valid',
        })
    }
}
app.use(verifyToken); 

router.post('/add-product',product.addProduct);
router.get('/all-products',product.getAllProducts);
router.put('/product/:id',product.updateProduct);
router.delete('/product/:id',product.deleteProduct);
router.post('/register',user.create);
router.post('/login',  body('email').isEmail().normalizeEmail(),
body('password').isLength({
    min: 6,
}),user.login);
router.get('/home',verifyToken,(req, res) =>{
    jwt.verify(req.token,"secretkeyappearshere",(err,authData) => {
        if(err){
            res.send('Invalid token')
        }else{
            res.send('Welcome to Home Page')
        }
    })
})

router.get('/sendmail',user.mailSending)


module.exports = router