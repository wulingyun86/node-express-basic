var express = require('express');
const {addUser,isExistUser,findAll} = require('../handleUser');
var bodyParser = require('body-parser');
const cookies = require('cookies');

var router = new express.Router();
router.use(bodyParser.urlencoded());
router.post('/register',(req,res)=>{
        const {username,password,sign} = req.body;
        // let result = addUser(username,password,sign);
        // if(result) {
        //     res.json({
        //         status:0,
        //         message:'注册成功'
        //     })
        // } else {
        //     res.json({
        //         status:1,
        //         message:'注册失败，用户已经存在'
        //     })
        // }
        //利用promis改写
        addUser(username,password,sign).then(()=>{
            //成功的回调
            res.json({
                status:0,
                message:'注册成功'
                })
            },
        //失败的回调
        ()=>{
        res.json({
                status:1,
                message:'注册失败，用户已经存在'
            })
    })
})

router.use('/login',(req,res)=>{
    const {username,password} = req.body;
    // let result = findUser(username,password);
    // if(result) {
    //     res.json({
    //         status:0,
    //         message:'登录成功'
    //     })
    // } else {
    //     res.json({
    //         status:1,
    //         message:'登录失败'
    //     })
    // }
    //修改成promise,注册的时候检查用户是否存在
    isExistUser(username,password).then(
    //成功的回调
    (userId)=>{
        res.cookies.set('USERID',userId);
        res.json({
            status:0,
            message:'登录成功'
        })
    },
    //失败的回调
    ()=>{
        res.json({
            status:1,
            message:'登录失败'
        })
    }
)
});


module.exports = router;