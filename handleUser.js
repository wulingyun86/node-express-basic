var fs = require('fs');
var User = require('./handleDB');
let userList= [];
 if(fs.existsSync('./user.json')){
      userList = require('./user.json');
 }


function addUser(username,password,sign) {
    // findIndex 找不到就是-1，其他的都是0
    let index = userList.findIndex(item=>{
        if(item.username == username) {
            return true;
        }else {
            return false;
        }
    })
    // 这里的index返回值是上面findIndex查找返回的是否找到满足条件的结果（找到满足条件返回0，否则就是-1）
    // >= 0 说明已经找到存在的值，已经注册过了
    if(index >= 0) {
        return false;
    } else {
        userList.push({username,password,sign});
        console.log('----------userList---------');
        console.log(userList);
        //将数据写到文件
        fs.writeFile('./user.json',JSON.stringify(userList),(err)=>{
             if(err) {
                 console.log('注册内容写入成功');
             }
        });
        return true;
    }
}

function findUser(username, password) {
  let index =  userList.findIndex(item=>{
      if(item.username == username && item.password == password) {
          return true;
      } else {
          return false;
      }
  })
 // 登录找到了匹配的username 返回
  if(index >= 0) {
      return true;
  } else {
      return false;
  }
}

function findAll() {
    //这里不可以直接提供userList，否则外部可以操作内部的数据
    //这里实现深拷贝 Array.from(userList);
    //...arr 是数组扩展运算符
     return [...userList];
}

module.exports = {addUser,findUser,findAll}