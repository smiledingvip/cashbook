<?php
	require 'config.php';
	
	
	$query="INSERT INTO cash_book (user,date,type1,price) 
									VALUES ('{$_POST['user']}',NOW(),'{$_POST['type1']}','{$_POST['price']}')";
	
	mysql_query($query)or die('新增失败！'.mysql_error());
	
	echo mysql_affected_rows();
	
	mysql_close();
?>