var localhostIP = "http://www.gmll.xyz/php/";
// var localhostIP = "http://192.168.43.49:8848/";
//点击侧边栏标题展开列表
$(function(){
	$('#StudentManagementSon').click(function(){
		if($(this).parent().find('ul').height() == 0){
			$(this).parent().find('ul').height('50px');
			$(this).find('img').css('transform','rotateZ(360deg)');
		}else{
			$(this).parent().find('ul').height('0px');
			$(this).find('img').css('transform','rotateZ(0deg)');
		}
	});
});
//点击列表里的子列表,改变背景颜色.
$(function(){
	$('.Student-information ul li').click(function(){
		$(this).css({"background-color":"rgb(180,200,206)","color":"rgb(42,57,60)"});
		$('#loader_wrpper').css('display','block');
		$('.System-MenuPage').css('display','block');
		setTimeout(function(){
			$('#loader_wrpper').css('opacity','0');
			setTimeout(function(){
				$('#loader_wrpper').css({"opacity":"1","display":"none"});
				$('.Student-Wrapper').css('animation',' OpenAnimationScaling 1s ease-in-out 0s 1 forwards');
				setTimeout(function(){
					//开始获取信息
					$('.Student-Wrapper-Content ul').remove();//刷新的时候删除信息
					SelectInfor();
				},100);
			},800);
		},800);
	});
});
//点击搜索如果为空,文字提示!
$(function(){
	$('#search-btn').click(function(){
		if($('#search-border').val() == ''){
			$('.not-null').css('display',' block');
			$('.not-null').css('animation',' labelMoveUser 0.2s ease 0s alternate infinite');
			setTimeout(function(){
				$('.not-null').css('animation',' none');
			},600);
		}
	});
	//如果输入的时候,检测到内部有文本,文字提示消失.
	var SearchBorder = document.getElementById('search-border');
		SearchBorder.oninput = function(){
			if(this.value != ''){
				$('.not-null').css('display','none');
			}
		}
});
//点击关闭按钮,关闭弹出操作框.
$(function(){
	$('#close-btn').click(function(){
		$('.Student-Wrapper').css('animation',' CloseAnimationScaling 0.5s ease-in-out 0s 1 forwards');
	});
});
//查询信息
function SelectInfor(){
	$.ajax(localhostIP+'AkebussStudentManagementSystem.php',{
		data:{
			SelectAllInfor:true
		},
		dataType:'json',//服务器返回json格式数据
		type:'get',//HTTP请求类型
		timeout:5000,//超时时间设置为10秒；
		success:function(data){
			if(data.length == 0){//如果没有数据
				$('#not-student-information').css('display','block');
				return;
			}
			$('#not-student-information').css('display','none');
			//开始解析json
			for(var i = 0;i < data.length;i++){
				$('.Student-Wrapper-Content div').prepend('<ul><li class="user-head-image" style="background-image: url('+data[i].StudentImage+');"></li><li class="StudentId">'+data[i].StudentId+'</li><li class="StudentName">'+data[i].StudentName+'</li><li class="StudentAge">'+data[i].StudentAge+'岁</li><li class="StudentSex">'+data[i].StudentSex+'</li><li class="StudentGrade">'+data[i].StudentGrade+'</li><li class="StudentDepartment">'+data[i].StudentDepartment+'</li><li><span class="update-btn">修改</span><span class="delete-btn">删除</span></li></ul>');
			}
			//点击删除按钮.删除数据.
			$('.delete-btn').click(function(){
				var StudentId = $(this).parents('ul').find('.StudentId').text();
				$('.DeleteWindowWrapper').css('animation',' OpenAnimationScaling 0.5s ease-in-out 0s 1 forwards');
				//点击删除框里面的取消 和 确定按钮
				$('.DeleteWindowWrapper .Delete-sure-btn').click(function(){
					$('.DeleteWindowWrapper').css('animation',' CloseAnimationScaling 0.5s ease-in-out 0s 1 forwards');
					DeleteInfor(StudentId);//开始删除数据
				});
				$('.DeleteWindowWrapper .Delete-cancel-btn').click(function(){
					$('.DeleteWindowWrapper').css('animation',' CloseAnimationScaling 0.5s ease-in-out 0s 1 forwards');
				});
			});
			//点击修改按钮 弹出修改窗口
			$('.Student-Wrapper .update-btn').click(function(){
				$('.Update-Wrapper-Conent').css('animation',' OpenAnimationScaling 0.5s ease-in-out 0s 1 forwards');
				//将原始信息带入更改信息里面,方便用户操作.
				var ImageUrl = $(this).parents('ul').find('li').eq(0).css('background-image');
				var StudentId = $(this).parents('ul').find('li').eq(1).text();
				var StudentName = $(this).parents('ul').find('li').eq(2).text();
				var StudentAge= $(this).parents('ul').find('li').eq(3).text().split('岁')[0];
				$('.Update-Wrapper-Conent ul li').eq(0).css('background-image',ImageUrl);
				$('.Update-Wrapper-Conent ul li').eq(1).find('input').val(StudentId);
				$('.Update-Wrapper-Conent ul li').eq(2).find('input').val(StudentName);
				$('.Update-Wrapper-Conent ul li').eq(3).find('input').val(StudentAge);
				updateImageUrl = ImageUrl.substring(ImageUrl.lastIndexOf('/')+1).split('"')[0];
				// $("#update-StudentInfor-Grade").find("option:contains("+$(this).parents('ul').find('li').eq(5).text()+")").attr("selected",true);
				// $("#update-StudentInfor-department").find("option:contains("+$(this).parents('ul').find('li').eq(6).text()+")").attr("selected",true);
			});
		},
		error:function(xhr,type,errorThrown){
			if(xhr.readyState == 0){
				alert('请检查您的网络!');
			}
		}
	});
}
var updateImageUrl = '';
//点击刷新
$(function(){
	var rotateZ = 0,
		isRotate = true;
	$('#refresh').click(function(){
		$('.Student-Wrapper-Content ul').remove();//刷新的时候删除信息
		SelectInfor();
		//刷新按钮旋转
		if(!isRotate){
			return;
		}
		isRotate = false;
		setTimeout(function(){
			isRotate = true;
		},500);
		$(this).find('img').css('transform',' rotateZ('+parseInt(rotateZ += 360)+'deg)');
	});
});
//删除信息
function DeleteInfor(id){
	// console.log(id);
	$.ajax(localhostIP+'AkebussStudentManagementSystem.php',{
		data:{
			DeleteInformation:true,
			StudentId:id
		},
		dataType:'json',//服务器返回json格式数据
		type:'get',//HTTP请求类型
		timeout:5000,//超时时间设置为10秒；
		success:function(data){
			if(data){
				setTimeout(function(){
					$('.DeleteSuccessfulWindow').css('animation',' OpenAnimationScaling 0.5s ease-in-out 0s 1 forwards');
				},200);
			}else{
				
			}
		},
		error:function(xhr,type,errorThrown){
			if(xhr.readyState == 0){
				alert('请检查您的网络!');
			}
		}
	});
}
//点击删除成功弹窗的确定按钮
$(function(){
	$('.DeleteSuccessfulWindow .Delete-sure-btn').click(function(){
		$('.DeleteSuccessfulWindow').css('animation',' CloseAnimationScaling 0.5s ease-in-out 0s 1 forwards');
		$('#refresh').click();
	});
});
//点击关闭修改信息窗口
$(function(){
	$('#close-Update-Wrapper-btn').click(function(){
		$('.Update-Wrapper-Conent').css('animation',' CloseAnimationScaling 0.5s ease-in-out 0s 1 forwards');
		$('#refresh').click();
		setTimeout(function(){
			SetNull('.Update-Wrapper-Conent input');
		},500);
	});
});
//点击修改弹窗里的修改确定按钮 关闭弹窗
$(function(){
	$('.UpdateSuccessfulWindow .Delete-sure-btn').click(function(){
		$('.UpdateSuccessfulWindow').css('animation',' CloseAnimationScaling 0.5s ease-in-out 0s 1 forwards');
	});
});
//点击确定修改弹窗 //修改信息
$(function(){
	//更换头像
	var formdata = null,
		fileName = '';
	$('#update-StudentHeadImage').change(function(){
		var files = $(this).prop('files')[0];
			// if(files.size/1024/1024 > 2){
			// 	alert('文件过大!')
			// 	return;
			// }
		var src = window.URL.createObjectURL(files);
			updateImageUrl = files.name;
			$(this).parent().css('background-image','url('+src+')');
			formdata = new FormData();
			formdata.append('file', files);
		});
	$('.sure-update').click(function(){
			var isNull = NotNullJudge('.update-form-input');
			if(isNull == 0){//代表不为空
			//上传图片
			$.ajax(localhostIP+'UploadingImage.php',{
				data:formdata,
				cache: false,
				processData: false,//不处理数据
				contentType: false,//不设置内容类型
				dataType:'',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				timeout:5000,//超时时间设置为10秒；
				success:function(data){
					console.log(data);
				},
				error:function(xhr,type,errorThrown){
					
				}
			});
			var StudentId = $('#StudentId').val();
			var UpdateStudentName = $('#update-StudentInfor-Name').val();
			var UpdateStudentAge = $('#update-StudentInfor-Age').val();
			var UpdateStudentGrade = $('#update-StudentInfor-Grade').val();
			var UpdateStudentDepartment = $('#update-StudentInfor-department').val();
			var UpdateSex = '';
			// var StudentImage = 'gsj.png';
			if($('#update-man').get(0).checked == true){
				UpdateSex = '男';
			}else{
				UpdateSex = '女';
			}
			// console.log(StudentId,UpdateStudentName,UpdateStudentAge,UpdateStudentGrade,UpdateStudentDepartment,UpdateSex);
			//增加信息
			$.ajax(localhostIP+'AkebussStudentManagementSystem.php',{
				data:{
					UpdateInformation:true,
					UpdateStudentId:StudentId,
					UpdateStudentName:UpdateStudentName,
					UpdateStudentAge:UpdateStudentAge,
					UpdateStudentGrade:UpdateStudentGrade,
					UpdateStudentDepartment:UpdateStudentDepartment,
					UpdateStudentImage:updateImageUrl,
					UpdateStudentSex:UpdateSex
				},
				dataType:'json',//服务器返回json格式数据
				type:'get',//HTTP请求类型
				timeout:5000,//超时时间设置为10秒；
				success:function(data){
					if(data){
						$('.UpdateSuccessfulWindow').css('animation',' OpenAnimationScaling 0.5s ease-in-out 0s 1 forwards');
					}else{
						$('.UpdateSuccessfulWindow .alert-text').text('更改失败!');
						$('.UpdateSuccessfulWindow').css('animation',' OpenAnimationScaling 0.5s ease-in-out 0s 1 forwards');
					}
				},
				error:function(xhr,type,errorThrown){
					if(xhr.readyState == 0){
						alert('请检查您的网络!');
					}
				}
			});
			// $('.UpdateSuccessfulWindow').css('animation',' OpenAnimationScaling 0.5s ease-in-out 0s 1 forwards');
		}
	});
});
var UpdateWrapper = document.getElementsByClassName('Update-Wrapper-Conent')[0].getElementsByClassName('update-form-input'),
	UpdateWrapperNotNullAlert = document.getElementsByClassName('Update-Wrapper-Conent')[0].getElementsByClassName('not-null-alert');
	BlurIsNull(UpdateWrapper,UpdateWrapperNotNullAlert);//增加信息里面 失去焦点的非空判断
//点击打开新增窗口的按钮
$(function(){
	$('#add-btn-Wrapper').click(function(){
		$('.Add-Wrapper').css('animation',' OpenAnimationScaling 0.5s ease-in-out 0s 1 forwards');
	});
});
//点击添加弹窗里的确定按钮 关闭弹窗
$(function(){
	$('.AddSuccessfulWindow .Add-sure-btn').click(function(){
		$('.AddSuccessfulWindow').css('animation',' CloseAnimationScaling 0.5s ease-in-out 0s 1 forwards');
		setTimeout(function(){
			$('.AddSuccessfulWindow .alert-text').text('增加成功!');
		},800);
	});
});
//点击关闭添加信息窗口
$(function(){
	$('#close-Add-Wrapper-btn').click(function(){
		$('.Add-Wrapper').css('animation',' CloseAnimationScaling 0.5s ease-in-out 0s 1 forwards');
		$('#refresh').click();
		setTimeout(function(){
			SetNull('.Add-Wrapper input');
			$('#add-StudentHeadImage').parent().css('background-image',' url(images/touxiang.png)');
		},500);
	});
});
function AddInfor(){//添加学生信息
	
}
var formdata = null,
	fileName = '',
	StudentIdIsEqual = false;
	// 监听上传进度
	var xhrOnProgress = function(fun){
	    xhrOnProgress.onprogress = fun; //绑定监听
	    return function() {
	        //通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
	        var xhr = $.ajaxSettings.xhr();
	        //判断监听函数是否为函数
	        if (typeof xhrOnProgress.onprogress !== 'function')
	            return xhr;
	        //如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
	        if (xhrOnProgress.onprogress && xhr.upload) {
	            xhr.upload.onprogress = xhrOnProgress.onprogress;
	        }
	        return xhr;
	    }
	}
//图片上传 //点击添加信息窗口中的确定添加按钮
$(function(){
	$('#add-StudentHeadImage').change(function(){
		var files = $(this).prop('files')[0];
			// if(files.size/1024/1024 > 2){
			// 	alert('文件过大!')
			// 	return;
			// }
		var src = window.URL.createObjectURL(files);
			fileName = 'http://www.gmll.xyz/StudentImage/' + files.name;
			$(this).parent().css('background-image','url('+src+')');
			formdata = new FormData();
			formdata.append('file', files);
		});
		$('#add-infor-btn').click(function(){//必须使用POST 点击上传按钮后,先上传信息,在上传图片.
			var isNull = NotNullJudge('.add-form-input');
			if(isNull == 0){//当值不再为空的时候 开始获取里面的值
				var AddStudentId = $('#add-StudentId').val();
				var AddStudentName = $('#add-StudentName').val();
				var AddStudentAge = $('#add-StudentAge').val();
				var AddStudentGrade = $('#add-StudentGrade').val();
				var AddStudentDepartment = $('#add-StudentDepartment').val();
				var AddSex = '';
				var isStartUploadingText = false;
				// var StudentImage = 'gsj.png';
				if($('#add-woman').get(0).checked == "checked" || $('#add-woman').get(0).checked == true){
					AddSex = '女';
				}else{
					AddSex = '男';
				}
			}else{
				return;
			}
			// console.log(AddStudentId,AddStudentName,AddStudentAge,AddStudentGrade,AddStudentDepartment,AddSex);
			if(formdata == null){//如果未选择图片,则给图片一个默认地址.
				fileName = 'http://www.gmll.xyz/images/touxiang.png';
			}
			//增加信息
			$.ajax(localhostIP+'AkebussStudentManagementSystem.php',{
				data:{
					AddInformation:true,
					AddStudentId:AddStudentId,
					AddStudentName:AddStudentName,
					AddStudentAge:AddStudentAge,
					AddStudentGrade:AddStudentGrade,
					AddStudentDepartment:AddStudentDepartment,
					AddStudentImage:fileName,
					AddStudentSex:AddSex
				},
				dataType:'json',//服务器返回json格式数据
				type:'get',//HTTP请求类型
				timeout:5000,//超时时间设置为10秒；
				success:function(data){
					if(formdata != null){
						if(data){
							UploadingImage();
						}else{
							$('.AddSuccessfulWindow .alert-text').text('增加失败,系统已存在此学号!');
							$('.AddSuccessfulWindow').css('animation',' OpenAnimationScaling 0.5s ease-in-out 0s 1 forwards');
						}
						return;
					}
					if(data){
						$('.AddSuccessfulWindow').css('animation',' OpenAnimationScaling 0.5s ease-in-out 0s 1 forwards');
					}else{
						$('.AddSuccessfulWindow .alert-text').text('增加失败,系统已存在此学号!');
						$('.AddSuccessfulWindow').css('animation',' OpenAnimationScaling 0.5s ease-in-out 0s 1 forwards');
					}
				},
				error:function(xhr,type,errorThrown){
					if(xhr.readyState == 0){
						alert('请检查您的网络!');
					}
				}
			});
			$('#again-uploading').click(function(){//如果出现上传图片进度暂停时,可以选择重新上传.
				UploadingImage();
			});
		});
});
function UploadingImage(){//上传图片方法//当选择图片的时候,弹出图片上传进度.如果为选择图片就不弹出.
	$('#AddUploadingImage').css({"opacity":"1","z-index":"1000000"});
	$('#AddUploadingImage-square').css('width','0px');
	setTimeout(function(){
		//上传图片
		$.ajax(localhostIP+'UploadingImage.php',{
			data:formdata,
			cache: false,
			processData: false,//不处理数据
			contentType: false,//不设置内容类型
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000000,//超时时间设置为10秒；
			xhr:xhrOnProgress(function(e){
			    var percent=e.loaded / e.total;//计算百分比
				if(percent < 1){
					// console.log(percent);
					$('#AddUploadingImage-number').text(parseFloat(percent*100).toFixed(2)+'%');
					$('#AddUploadingImage-square').css('width',(parseFloat(percent*100).toFixed(2)*2)+'px');
					if(percent > 0.98){
						$('#AddUploadingImage-number').text('100%');
						$('#AddUploadingImage-square').css('width','200px');
					}
				}else{
					
				}
			}),
			success:function(data){
				// console.log(data);
				if(data){
					// console.log('ok!');
					setTimeout(function(){
						$('#AddUploadingImage-number').text('100%');
						$('#AddUploadingImage-square').css('width','200px');
						$('#AddUploadingImage').css('opacity','0');
						setTimeout(function(){
							$('#AddUploadingImage').css('z-index','-100');
							$('#AddUploadingImage-number').text('0%');
							$('#AddUploadingImage-square').css('width','0px');
							formdata = null;//将上传的内容置为null
							$('.AddSuccessfulWindow').css('animation',' OpenAnimationScaling 0.5s ease-in-out 0s 1 forwards');
						},600);
					},200);
				}else{
					alert('已存在此图片!');
				}
			},
			error:function(xhr,type,errorThrown){
				if(xhr.readyState == 0){
					alert('请检查您的网络!');
				}
			}
		});
	},500);
}
//失去焦点 非空判断
var AddWrapper = document.getElementsByClassName('Add-Wrapper')[0].getElementsByClassName('add-form-input'),
	AddWrapperNotNullAlert = document.getElementsByClassName('Add-Wrapper')[0].getElementsByClassName('not-null-alert');
	BlurIsNull(AddWrapper,AddWrapperNotNullAlert);//增加信息里面 失去焦点的非空判断
 function BlurIsNull(blurObj,AlertObj){//失去焦点对象 文字提示对象
	for(var i = 0;i < blurObj.length;i++){
		blurObj[i].index = i;
		blurObj[i].onblur = function(){
			if(this.value == ''){
				AlertObj[this.index].style.display = 'inline';
				AlertObj[this.index].style.animation = ' NotNullMove 0.1s ease 0s alternate infinite';
				setTimeout(function(){
					for(var j = 0;j < AlertObj.length;j++){
						AlertObj[j].style.animation = ' none';
					}
				},300);
			}else{
				AlertObj[this.index].style.display = 'none';
			}
		}
		blurObj[i].oninput = function(){
			if(this.value == ''){
				AlertObj[this.index].style.display = 'inline';
				AlertObj[this.index].style.animation = ' NotNullMove 0.1s ease 0s alternate infinite';
				setTimeout(function(){
					for(var j = 0;j < AlertObj.length;j++){
						AlertObj[j].style.animation = ' none';
					}
				},300);
			}else{
				AlertObj[this.index].style.display = 'none';
			}
		}
	}
}
function SetNull(obj){//将信息设置为空
	for(var i = 0;i < $(obj).length;i++){
		$(obj).eq(i).val(null);
		$(obj).eq(i).parents('li').find('.not-null-alert').css('display','none');
	}
}
//点击按钮 非空判断
function NotNullJudge(obj){
	var isNull = 0;
	for(var i = 0;i < $(obj).length;i++){
		if($(obj).eq(i).val() == ''){
			$(obj).eq(i).parents('li').find('.not-null-alert').css('display','inline');
			$(obj).eq(i).parents('li').find('.not-null-alert').css('animation',' NotNullMove 0.1s ease 0s alternate infinite');
			setTimeout(function(){
				for(var j = 0;j < $(obj).length;j++){
					$(obj).eq(j).parents('li').find('.not-null-alert').css('animation','none');
				}
			},300);
			isNull = 1;
		}else{
			$(obj).eq(i).parents('li').find('.not-null-alert').css('display','none');
			isNull = 0;
		}
	}
	return isNull;
}
//点击学生信息管理系统 退出管理系统
$(function(){
	$('.Student-information p').click(function(){
		if($('.System-MenuPage').css('display') == 'none'){
			
		}else{
			$('.Student-Wrapper').css('animation',' CloseAnimationScaling 1s ease-in-out 0s 1 forwards');
			setTimeout(function(){
				$('.Student-information ul li').css({"background-color":"rgb(42,57,60)","color":"rgb(180,200,206)"});
				$('#loader_wrpper').css('display','block');
				$('.System-MenuPage').css('display','none');
				setTimeout(function(){
					$('#loader_wrpper').css('opacity','0');
					setTimeout(function(){
						$('#loader_wrpper').css({"opacity":"1","display":"none"});
					},800);
				},800);
			},1000);
		}
	});
});
//绑定实时拖动事件
$(function(){
	$('.Student-Wrapper').draggable();
	$('.Update-Wrapper-Conent').draggable();
	$('.Add-Wrapper').draggable();
});
//点击哪个就让哪个的z-index的值变为最大.
// $(function(){
// 	var UpIndex = -1;//记录上一个div的下标
// 	$('.WrapperMenu').click(function(){
// 		if(UpIndex == -1){
			
// 		}else{
// 			$('.WrapperMenu').eq(UpIndex).css('z-index','100');
// 		}
// 		$(this).css('z-index','1000000000000');
// 		UpIndex = $(this).index() - 1;
// 	});
// });