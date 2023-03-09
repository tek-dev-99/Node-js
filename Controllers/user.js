const db = require('../Models')
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { password } = require('../Config/db');
const jwt = require('jsonwebtoken');
const mailsend = require('../Config/mail');
const e = require('express');

const User = db.users
const create = async(req,res) => {
  const salt = bcrypt.genSaltSync(10)
   const password = req.body.password
  console.log(salt)
let hashedPassword =  bcrypt.hashSync(password, salt); 
    let info = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }
   const user = await User.create(info);
   if(user){
   let successMail = new Promise((resolve,reject)=>{
    setTimeout(()=>{
      mailsend.mailToUser(req.body.email)
      resolve();
    },5000)    
             
   })
   successMail. 
    then(function () { 
         res.status(200).send(user);
    }). 
    catch(function () { 
        res.status(501).json({
      'msg' : 'Mail is not sending'
    })
    });
  }else{
    res.status(404).json({
      'msg' : 'Something went to wrong'
    })
  }
}

const login = async(req,res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({
          errors: errors.array()
        })
      }

    const user = await User.findOne({where: {  email: req.body.email  }});
    if(user){
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      console.log(validPassword)
      let  token = jwt.sign(
              { userId: user.id, email: user.email },
              "secretkeyappearshere",
              { expiresIn: "1h" }
            );
    if(validPassword !== null){
       let successMail = await mailsend.mailToUser(req.body.email)
       if(successMail){
        res.status(200).json({
          'msg' : 'Login Successfully',
          "token" : token
      })
       }        
         
    }else{
        res.status(400).send('Credential doesn\'t match')
    }
  }else{
    res.json({
      'msg': 'User not found!'
    })
  }
}

const mailSending = (req,res) => {
  email = 'rohan.techydox@gmail.com'
}

module.exports = {
    create,
    login,
    mailSending
}