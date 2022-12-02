<?php
	//javascriptから受け取り
	$message = $_POST['message'];
	//ファイル名の指定
	$filename = "./text/exam2.txt";
	//改行処理
	file_put_contents($filename,"\n" ,FILE_APPEND);
	//受け取ったメッセージをファイルに追記
	file_put_contents($filename,$message ,FILE_APPEND);
?>