<?php
	header('Access-Control-Allow-Origin:*');//允许所有来源访问
	header('Access-Control-Allow-Method:POST,GET,OPTIONS');//允许访问的方式
//上传图片
	if(file_exists("../StudentImage/" . $_FILES["file"]["name"])){//已经存在，此文件。
		// echo $_FILES["file"]["name"] . " already exists. ";
		echo 'false';
	}else{
		move_uploaded_file($_FILES["file"]["tmp_name"],
		"../StudentImage/" . $_FILES["file"]["name"]);
		// echo "Stored in: " . "../AkebussStudentManagementSystem/StudentImage/" . $_FILES["file"]["name"];
		echo 'true';
	}
?>