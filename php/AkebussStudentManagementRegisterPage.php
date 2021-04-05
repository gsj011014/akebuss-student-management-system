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
	//查询Id最大值
	if(isset($_GET['SelectMaxId'])){
		try{
			$pdo = new PDO($dsn,$user,$pwd);
			$query="select MAX(id) from akebussstudentmanagementregisterpage";
			$result = $pdo->prepare($query);
			$result->execute();
			$res = $result->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode($res);//转json字符串开始传输
		}catch(PDOException $e){
			echo $e->getMessage();
		}
		$pdo = null;
	}
	//增加账号
	if(isset($_GET['register'])){
		try{
			$pdo = new PDO($dsn,$user,$pwd);
			$query="insert into akebussstudentmanagementregisterpage(id,roomname,password) values(".'"'.$_GET['id'].'"'.','.'"'.$_GET['RoomName'].'"'.','.'"'.$_GET['PassWord'].'"'.")";
			$result = $pdo->exec($query);
			if($result >= 1){
				echo 'true';
			}else{
				echo 'false';
			}
		}catch(PDOException $e){
			echo $e->getMessage();
		}
		$pdo = null;
	}
	//验证登录
	if(isset($_GET['StartLogin'])){
		try{
			$pdo = new PDO($dsn,$user,$pwd);
			$query="select * from akebussstudentmanagementregisterpage where roomname = ".'"'.$_GET['RoomName'].'"'." and password = ".'"'.$_GET['PassWord'].'"';
			$result = $pdo->prepare($query);
			$result->execute();
			$res = $result->fetchAll(PDO::FETCH_ASSOC);
			if(count($res) >= 1){
				echo 'true';
			}else{
				echo 'false';
			}
		}catch(PDOException $e){
			echo $e->getMessage();
		}
		$pdo = null;
	}
?>