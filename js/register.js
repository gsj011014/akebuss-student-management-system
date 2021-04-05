var localhostIP = "http://www.gmll.xyz/php/";
// var localhostIP = "http://192.168.43.49:8848/AkebussStudentManagementSystemTest/php/";
$(function(){
    		/*错误class  form-control is-invalid
    		正确class  form-control is-valid*/
    		var flagName=false;
    		var flagPas=false;
    		var flagPass=false;
    		/*验证用户名*/
    		var name,passWord,passWords;
    		$("#register-username").change(function(){
    			name=$("#register-username").val();
    			if(name.length<2||name.length>10){
    				$("#register-username").removeClass("form-control is-valid")
    				$("#register-username").addClass("form-control is-invalid");
    				flagName=false;
    			}else{
    				$("#register-username").removeClass("form-control is-invalid")
    				$("#register-username").addClass("form-control is-valid");
    				flagName=true;
    			}
    		})
    		/*验证密码*/
    		$("#register-password").change(function(){
    			passWord=$("#register-password").val();
    			if(passWord.length<6||passWord.length>18){
    				$("#register-password").removeClass("form-control is-valid")
    				$("#register-password").addClass("form-control is-invalid");
    				flagPas=false;
    			}else{
    				$("#register-password").removeClass("form-control is-invalid")
    				$("#register-password").addClass("form-control is-valid");
    				flagPas=true;
    			}
    		})
    		/*验证确认密码*/
    		$("#register-passwords").change(function(){
    			passWords=$("#register-passwords").val();
    			if((passWord!=passWords)||(passWords.length<6||passWords.length>18)){
    				$("#register-passwords").removeClass("form-control is-valid")
    				$("#register-passwords").addClass("form-control is-invalid");
    				flagPass=false;
    			}else{
    				$("#register-passwords").removeClass("form-control is-invalid")
    				$("#register-passwords").addClass("form-control is-valid");
    				flagPass=true;
    			}
    		})
    		
    		
    		$("#regbtn").click(function(){
    			if(flagName&&flagPas&&flagPass){
    				localStorage.setItem("name",name);
    				localStorage.setItem("passWord",passWord);
					$.ajax(localhostIP+'AkebussStudentManagementRegisterPage.php',{
						data:{
							SelectMaxId:true
						},
						dataType:'',//服务器返回json格式数据
						type:'get',//HTTP请求类型
						timeout:10000,//超时时间设置为10秒；
						success:function(data){
							var nextId = JSON.parse(data)[0]['MAX(id)'];
							$.ajax(localhostIP+'AkebussStudentManagementRegisterPage.php',{
								data:{
									register:true,
									id:parseInt(nextId + 1),
									RoomName:name,
									PassWord:passWord
								},
								dataType:'json',//服务器返回json格式数据
								type:'get',//HTTP请求类型
								timeout:10000,//超时时间设置为10秒；
								success:function(data){
									// console.log(data);
									if(data){
										alert('注册成功!');
										location="index.html";
									}
								},
								error:function(xhr,type,errorThrown){
									if(xhr.stateReady == 0){
										alert('请检查您的网络!');
									}
								}
							});
						},
						error:function(xhr,type,errorThrown){
							if(xhr.stateReady == 0){
								alert('请检查您的网络!');
							}
						}
					});
    			}else{
    				if(!flagName){
    					$("#register-username").addClass("form-control is-invalid");
    				}
    				if(!flagPas){
    					$("#register-password").addClass("form-control is-invalid");
    				}
    				if(!flagPass){
    					$("#register-passwords").addClass("form-control is-invalid");
    				}
    			}
    		})
    	});