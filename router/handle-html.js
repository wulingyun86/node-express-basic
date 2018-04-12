var express = require('express');
const {findAll,findUser} = require('../handleData/handleUser');
var router = new express.Router();
router.get('/login',(req,res)=>{
    res.render('www/login',{
        loginActive:'active',
        isLogin:res.isLogin
    });
})

router.get('/register',(req,res)=>{
    res.render('www/register',{
        registerActive:'active',
        isLogin:res.isLogin
    });
})

router.use((req,res,next)=>{
   let userId = res.cookies.get('USERID');
   if(!userId) {
       res.isLogin = false;
       res.personInfo = {};
       next();
       return;
   }
   findUser(userId).then(
       (result)=>{
         res.isLogin = true;
         res.personInfo = result;
         next(); //因为这里是异步请求，所以需要分别next()
       },()=>{
         res.isLogin = false;
         //防止cookie userid被改，导致报错
         res.personInfo = {};
         next();
       }
    )
  
})

router.get('/',(req,res)=>{
        res.render('www/home',{
            homeActive:'active',
            isLogin:res.isLogin
        });
})

router.get('/about',(req,res)=>{
    res.render('www/about',{
        aboutActive:'active',
        isLogin:res.isLogin
    });
})

router.get('/user',(req,res)=>{
    findAll().then(
        (userList)=>{
            res.render('www/user',{
                goodsActive:'active',
                userList,
                isLogin:res.isLogin
            });
        }
    );
   
})




router.get('/personInfo',(req,res)=>{
    res.render('www/personInfo',{
        loginActive:'active',
        personInfo : res.personInfo,
        isLogin:res.isLogin
    });
})

//退出保证地址和页面一致
router.get('/logOut',(req,res)=>{
    //退出，清掉cookies
    res.cookies.set('USERID','');
     res.redirect('/');
    // res.render('www/login',{
    //     registerActive:'active',
    //     isLogin:res.isLogin
    // });
})



module.exports = router;