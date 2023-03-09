const express = require('express');
const body_parser = require('body-parser');
const ejs = require('ejs');
const cors = require('cors');
const app = express();
const bcrypt = require('bcryptjs'); 

// let user = [];
app.use(body_parser.urlencoded({extended:true}));
app.set(('view engine'),'ejs');
app.use(express.static('public'));
app.listen('3000',()=>{
    console.log('Port 3000 is running');
})
 
app.get('/',(req,res)=>{
    res.send('working')
})

// app.post('/register',(req,res)=>{
    // res.sendFile(__dirname+'/home.html')
//     let temp_user = {
//         'name':req.body.name,    
//         'email':req.body.email,    
//     }
//     user.push(temp_user);
//     console.log(user);
//     res.redirect('/')
// })

// app.get('/users',(req,res)=>{
//     res.render('user',{student : user})
// })


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true}))
const router = require('./Routes/route.js')
app.use('/api',router)