var mongoose = require('mongoose');
//定义表字段以及字段类型
var userSchema = ({
    username:String,
    password:String,
    sign:String,
    age:Number,
    sex:{
        type:String,
        default:'女'
    },
    identify:String,
    phone:String
})
// 表的名字 user
const UserModel = mongoose.model('user',userSchema);

// //插入一条数据

// const userModel = new UserModel({
//     username:"aaa",
//     password:'223434',
//     age:22,
//     sex:'女'
// })

// userModel.save().then((result)=>{
//     if(result) {
//         console.log('一条数据插入成功');
//         console.log(result);
//     } else {
//         console.log('数据保存失败');
//     }
// });
// //按照条件查询，使用where
// UserModel.where({
//     username:'aaa'
// }).find().then(res=>{
//     if(res) {
//         console.log('--------------findWhere-------------------');
//         console.log(res);
//     }
// })
// //也可以把条件写到find({})里面，实现where同样的效果
// UserModel.find({
//     username:'aaa'
// }).then(res=>{
//     if(res) {
//         console.log('--------------find（）-----------------------');
//         console.log(res);
//     }
// })

// UserModel.findById("5acc7d3b948dfe204475d02e").then(res=>{
//     if(res) {
//         console.log("-------------------findById------------------");
//         console.log(res);
//     }
// })

// //修改操作,修改查询到的第一个
// UserModel.update(
//     //条件查询
//     {age:22},
//     {sex:'nvnvnv'}
// ).then(res=>{
//     console.log('---------------------update-----------------')
//     console.log(res);
// })

// UserModel.findByIdAndUpdate('5acc7d3b948dfe204475d02e',{username:'hahaaaaaaaaaaaaaaaaa'})
// .then(res=>{
//     console.log('-----------findByIdAndUpdate-----------');
//     console.log(res);
// })

// UserModel.findOneAndUpdate({username:'aaa',username:'dh'}).then(res=>{
//     if(res) {
//         console.log('--------------findOneAndUpdate-----------');
//         console.log(res);
//     }
// })

// UserModel.remove({username:'aaa2'}).then(res=>{
//     if(res) {
//         console.log('----------remove0-------------');
//         console.log(res);
//     }
// })

//分页显示数据
let count;//总条数
let page;//页数
var skipVal = (page-1)*count;//跳过的数据条数
var limitVal = count;
UserModel.find().skip(4).limit(5).then(result=>{
    console.log('--------分页显示数据-------');
    console.log(result);
})

//查询总条数
UserModel.count().then(num=>{
    console.log(num)
})

//正则匹配
let reg = new RegExp(/@qq/); //查询username包含 "@qq" 字符的名字,并且sing nul 或者'' 或者 undefined
UserModel.find({username:{$regex:reg} , sign:null||''||undefined}).then(result=>{
    console.info('-------------正则匹配查询-----------')
    console.info(result);
})

//查询或条件
UserModel.find({$or:[{username:{$regex:/xiao/}},{username:{$regex:/qq/}},{sex:'女'}]}).then(result=>{
    console.info('--------匹配or表达式-------')
    console.log(result);
})
module.exports = UserModel;
