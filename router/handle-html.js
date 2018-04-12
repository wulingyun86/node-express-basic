var express = require('express');
const url = require('url');
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
    //获取查询参数
     let query = url.parse(req.url,true).query;
     //Number() 函数是将字符串转换为数字
     let page = Number(query.page) || 1; // 默认1页
     if(page<0) page = 1;
     let count = Number(query.count) || 5; //默认5条数据
    findAll(page,count).then(
        ({userList,pages})=>{
            let pageArr = [];//拆分页面的页数
            for(let i =1; i<=pages; i++) {//页数不可以从0开始
                pageArr.push(i);
            }
            res.render('www/user',{
                goodsActive:'active',
                userList,
                pageArr,
                count,
                page,
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