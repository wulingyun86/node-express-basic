var express = require('express');
const {addUser,findUser,findAll} = require('../handleUser');
var bodyParser = require('body-parser');

var router = new express.Router();
router.use(bodyParser.urlencoded());
router.post('/register',(req,res)=>{
        const {username,password,sign} = req.body;
        let result = addUser(username,password,sign);
        if(result) {
            res.json({
                status:0,
                message:'注册成功'
            })
        } else {
            res.json({
                status:1,
                message:'注册失败，用户已经存在'
            })
        }
})

router.use('/login',(req,res)=>{
    const {username,password} = req.body;
    let result = findUser(username,password);
    if(result) {
        res.json({
            status:0,
            message:'登录成功'
        })
    } else {
        res.json({
            status:1,
            message:'登录失败'
        })
    }

})


module.exports = router;