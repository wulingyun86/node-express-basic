var mongoose = require('mongoose');
//定义学生课程成绩表
var Schema = ({
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        //设置表关联
        ref:'user'
    },
    score:Number
})
// 表的名字 Score
const ScoreModel = mongoose.model('score',Schema);
const userScore = new ScoreModel({
    userId:'5ace04044ab9c5087ce4ce60',
    score:80
})

// userScore.save().then((result)=>{
//     if(result) {
//         console.log('一条数据插入成功');
//         console.log(result);
//     } else {
//         console.log('数据保存失败');
//     }
// });

//联表查询
/*
$lt 小于
$lte 小于等于
$gt 大于
$gte 大于等于
*/
console.log('-------开始联表查询-------');
ScoreModel.find({score:{$gte:30}}).populate(['userId']).then( //联表查询sore >=30 $lt 小于
    result=>{
        console.log(result);
    }
)

/*
 1:升序
 -1:降序
 注意排序在先才会对整个分页的数据排序，如果排序在后，先分页，数据是错误的
*/
ScoreModel.find().sort({score:1}).then(
    result=>{
       console.info('----------按照分数升序排列----------');
       console.info(result);
    }
)
module.exports = ScoreModel;
