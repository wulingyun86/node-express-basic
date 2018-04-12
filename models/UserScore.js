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

userScore.save().then((result)=>{
    if(result) {
        console.log('一条数据插入成功');
        console.log(result);
    } else {
        console.log('数据保存失败');
    }
});

//联表查询
console.log('-------开始联表查询-------');
ScoreModel.find({score:{$gte:30}}).populate(['userId']).then( //联表查询sore >=30 $lt 小于
    result=>{
        console.log(result);
    }
)
module.exports = ScoreModel;
