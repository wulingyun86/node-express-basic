var fs = require('fs');
var User = require('../models/UserInfo');
let userList= [];
 if(fs.existsSync('../user.json')){
      userList = require('../user.json');
 }


function addUser(username,password,sign) {
    // findIndex 找不到就是-1，其他的都是0
    // let index = userList.findIndex(item=>{
    //     if(item.username == username) {
    //         return true;
    //     }else {
    //         return false;
    //     }
    // })
    // // 这里的index返回值是上面findIndex查找返回的是否找到满足条件的结果（找到满足条件返回0，否则就是-1）
    // // >= 0 说明已经找到存在的值，已经注册过了
    // if(index >= 0) {
    //     return false;
    // } else {
    //     userList.push({username,password,sign});
    //     //将数据写到文件
    //     fs.writeFile('./user.json',JSON.stringify(userList),(err)=>{
    //          if(err) {
    //              console.log('注册内容写入成功');
    //          }
    //     });
    //     return true;
    // }

    //利用另外一种操作mongodb方法改写添加用户
    return new Promise((resolve,reject)=>{
        //根据用户名查询数据库
        User.findOne({username}).then((result)=>{
           if(result) {
              reject();
           } else {
               let userInfo = new User({username,password,sign});
               userInfo.save().then((res)=>{
                   if(res) {
                       resolve();
                   } else {
                       reject();
                   }
               })
           }
        })
    })
}

function isExistUser(username, password) {
//   let index =  userList.findIndex(item=>{
//       if(item.username == username && item.password == password) {
//           return true;
//       } else {
//           return false;
//       }
//   })
//  // 登录找到了匹配的username 返回
//   if(index >= 0) {
//       return true;
//   } else {
//       return false;
//   }
  //查询数据库校验登录
  return new Promise((resolve,reject)=>{
      User.findOne({username,password})
      .then(result=>{
          if(result) {
              resolve(result._id);
          } else {
              reject();
          }
      })
  })
}

//用于判断用户是否登录
function findUser(_id) {
    return new Promise((resolve,reject)=>{
        User.findById({_id})
        .then(
          (result)=>{
              //查询一个用户返回一个对象
              resolve(result);
        },()=>{
              reject();
      })
  })
}

//查询所有数据分页
function findAll(page,count) {
    //这里不可以直接提供userList，否则外部可以操作内部的数据
    //这里实现深拷贝 Array.from(userList);
    //...arr 是数组扩展运算符
    //  return [...userList];
    //改写成promise
    return new Promise((resolve,reject)=>{
        //查询总页数
        User.count().then(nums=>{
            let pages = Math.ceil(nums/count);//总条数除每一页的条数，去除余数就是总页数
            let skipVal = (page-1)*count;
            User.find().skip(skipVal).limit(count).then(
                userList=>{
                   resolve(
                       {userList:userList,
                        pages:pages
                       }
                    );
                }
            )
        })
    })
}

module.exports = {addUser,isExistUser,findAll,findUser}