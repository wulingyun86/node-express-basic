$('#confirm').on('click',function() {
    var username = $('input[name=username]').val();
    var password = $('input[name=password').val();

    if(!username || !password) {
        alert('请填写完整');
        return;
    }

    $.ajax({
        url:'/api/login',
        data:{
            username:username,
            password:password
        },
        method:'POST',
        success:function(res) {
            if(res.status == 0) {
                window.location.href="/user"
            } else if(res.status == 1) {
                alert(res.message);
            }
        },
        fail:function(err) {
            console.log(err);
        }
    })
})