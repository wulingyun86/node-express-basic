$('#confirm').on('click',function(){
    var username = $('input[name=username]').val();
    var password = $('input[name=password]').val();
    var repassword = $('input[name=repassword]').val();
    var sign = $('textarea[name=sign]').val();
    if(!username || !password ||  !sign) {
           alert('请填写表单完整');
           return;
    }

    if(password != repassword) {
        alert('两个密码不一致,请修改');
        return;
    }

    $.ajax({
        url:'/api/register',
        data:{
            username:username,
            password:password,
            sign:sign
        },
        method:'POST',
        success:function(result) {
            if(result.status == 0) {
               //跳转登录页面
               window.location.href="/login";
            } else if(result.status == 1) {
                alert(result.message);
                return;
            }
        },
        error:function(error) {
           if(error) {
               console.info(error);
           }
        }
    })
})