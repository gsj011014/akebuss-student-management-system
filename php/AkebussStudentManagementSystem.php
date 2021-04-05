<?php
	header('Access-Control-Allow-Origin:*');//允许所有来源访问
	header('Access-Control-Allow-Method:POST,GET,OPTIONS');//允许访问的方式
	// header("Content-Type:application/json;charset=utf-8");
	$dbms='mysql';
	$dbName='3h9gvz828s223';
	$user='3h9gvz828s223';
	$pwd='Gu13120011014';
	$host='localhost';
	$dsn="$dbms:host=$host;dbname=$dbName";
	//查询所有数据
	if(isset($_GET['SelectAllInfor'])){
		try{
			$pdo = new PDO($dsn,$user,$pwd);
			$query="select * from studentmanagement";
			$result = $pdo->prepare($query);
			$result->execute();
			$res = $result->fetchAll(PDO::FETCH_ASSOC);
			echo '[';
			for($i = 0;$i < count($res);$i++){
				echo '{'.'"'.'StudentId'.'"'.':'.'"'.$res[$i]["StudentId"].'"'.','.'"'.'StudentName'.'"'.':'.'"'.$res[$i]["StudentName"].'"'.','.'"'.'StudentAge'.'"'.':'.'"'.$res[$i]["StudentAge"].'"'.','.'"'.'StudentSex'.'"'.':'.'"'.$res[$i]["StudentSex"].'"'.','.'"'.'StudentGrade'.'"'.':'.'"'.$res[$i]["StudentGrade"].'"'.','.'"'.'StudentDepartment'.'"'.':'.'"'.$res[$i]["StudentDepartment"].'"'.','.'"'.'StudentImage'.'"'.':'.'"'.$res[$i]["StudentImage"].'"'.'}';
				if($i != count($res) - 1){
					echo ',';
				}
			}
			echo ']';
		}catch(PDOException $e){
			echo $e->getMessage();
		}
		$pdo = null;
	}
	//删除指定数据
	if(isset($_GET['DeleteInformation'])){
		try{
			$pdo = new PDO($dsn,$user,$pwd);
			$query = "delete from studentmanagement where StudentId = "."'".$_GET['StudentId']."'";
			$result = $pdo->exec($query);
			if($result != 0){
				echo 'true';
			}else{
				echo 'false';
			}
		}catch(PDOException $e){
			echo $e->getMessage();
		}
	}
	//新增数据
	if(isset($_GET['AddInformation'])){
		try{
			$pdo = new PDO($dsn,$user,$pwd);
			$query = "insert into studentmanagement(StudentId,StudentName,StudentAge,StudentSex,StudentGrade,StudentDepartment,StudentImage) values("."'".$_GET['AddStudentId']."'".","."'".$_GET['AddStudentName']."'".","."'".$_GET['AddStudentAge']."'".","."'".$_GET['AddStudentSex']."'".","."'".$_GET['AddStudentGrade']."'".","."'".$_GET['AddStudentDepartment']."'".","."'".$_GET['AddStudentImage']."'".")";
			$result = $pdo->exec($query);
			if($result != 0){
				echo 'true';
			}else{
				echo 'false';
			}
		}catch(PDOException $e){
			echo $e->getMessage();
		}
		$pdo = null;
	}
	//修改数据
	if(isset($_GET['UpdateInformation'])){
		try {
		    $pdo = new PDO($dsn,$user,$pwd);
			$query = "update studentmanagement set StudentName = ".'"'.$_GET['UpdateStudentName'].'"'.','."StudentAge = ".'"'.$_GET['UpdateStudentAge'].'"'.','."StudentSex = ".'"'.$_GET['UpdateStudentSex'].'"'.','."StudentGrade = ".'"'.$_GET['UpdateStudentGrade'].'"'.','."StudentDepartment = ".'"'.$_GET['UpdateStudentDepartment'].'"'.','."StudentImage = ".'"'.$_GET['UpdateStudentImage'].'"'." where StudentId = ".'"'.$_GET['UpdateStudentId'].'"';//定义SQL语句
			$result = $pdo->exec($query);//准备查询语句
			if($result >= 1){
				echo 'true';
			}else{
				echo 'false';
			}
		}
		catch(PDOException $e)
		{
		    echo $e->getMessage();
			echo "修改信息失败！";
		}
		$pdo = null;
	}
?>