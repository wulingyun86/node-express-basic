var Score = require('../models/UserScore');

function findUserScore(_id) {
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

function findAllScores() {
    return new Promise((resolve,reject)=>{
        User.find().then(
            lists=>{
               resolve(lists);
            }
        )
    })
}

module.exports = {findAllScores,findUserScore}