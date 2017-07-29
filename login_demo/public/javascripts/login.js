function login()
{
    var userName=$('#userName').val();
    var passwd=$('#passwd'.val();
    if(userName==""||passwd=="")
    {
        alert("请输入完整");
        passwd.onfocus();
    }
    else
    {
        $.ajax({
            url:"../../src/nodejs/login.js",
            data:{
                userName: userName,
                passwd: passwd
            },
            type:"POST",
            timeout:36000,
            dataType: "text",
            success: function(data, textStatus){
                if(data.code==200)
                {
                    alert("登陆成功");
                }
                else
                {
                    alert("登陆失败");
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                alert("error:" + textStatus);
            }
        });
    }
}