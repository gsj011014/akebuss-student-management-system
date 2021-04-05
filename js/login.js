var localhostIP = "http://www.gmll.xyz/php/";
// var localhostIP = "http://192.168.43.49:8848/AkebussStudentManagementSystemTest/php/";
$(function(){
    		/*拿到刚刚注册的账号*/
    		if(localStorage.getItem("name")!=null){
    			$("#login-username").val(localStorage.getItem("name"));
				$("#login-password").val(localStorage.getItem("passWord"));
    		}
    		/*登录*/
    		$("#login").click(function(){
    			var userName=$("#login-username").val();
    			var passWord=$("#login-password").val();
    			/*获取当前输入的账号密码*/
    			localStorage.setItem("name",userName)
    			localStorage.setItem("passWord",passWord)
				$.ajax(localhostIP+'AkebussStudentManagementRegisterPage.php',{
					data:{
						StartLogin:true,
						RoomName:userName,
						PassWord:passWord
					},
					dataType:'json',//服务器返回json格式数据
					type:'get',//HTTP请求类型
					timeout:10000,//超时时间设置为10秒；
					success:function(data){
						console.log(data);
						if(data){
							alert('登录成功!');
							location="HomePage.html";
						}else{
							alert('账号密码不正确!');
						}
					},
					error:function(xhr,type,errorThrown){
						if(xhr.stateReady == 0){
							alert('请检查您的网络!');
						}
					}
				});
    		})
    	})