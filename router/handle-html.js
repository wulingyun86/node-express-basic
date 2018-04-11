var express = require('express');
const {findAll} = require('../handleUser');
var router = new express.Router();
router.get('/',(req,res)=>{
        res.render('www/home',{
            homeActive:'active'
        });
})

router.get('/about',(req,res)=>{
    res.render('www/about',{
        aboutActive:'active'
    });
})

router.get('/user',(req,res)=>{
    const userList = findAll();
    res.render('www/user',{
        goodsActive:'active',
        userList
    });
})

router.get('/login',(req,res)=>{
    res.render('www/login',{
        loginActive:'active'
    });
})

router.get('/register',(req,res)=>{
    res.render('www/register',{
        registerActive:'active'
    });
})


module.exports = router;