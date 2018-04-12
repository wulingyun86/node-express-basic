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
module.exports = UserModel;
