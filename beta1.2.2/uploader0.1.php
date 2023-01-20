<?php
// ファイル名を取得して、ユニークなファイル名に変更
$file_name = $_FILES['upfile']['name'];
$uniq_file_name = date("YmdHis") . "_" . $file_name;

// 仮にファイルがアップロードされている場所のパスを取得
$tmp_path = $_FILES['upfile']['tmp_name'];

// 保存先のパスを設定
$upload_path = './upload/';


//
//
//javascriptから受け取り
$gps_x=$_POST["gpsx"];
$gps_y=$_POST["gpsy"];

//ファイル名の指定
$filename = "./text/exam2.txt";
$filename_gps="./text/gps.txt";

if (is_uploaded_file($tmp_path)) {
  // 仮のアップロード場所から保存先にファイルを移動
  if (move_uploaded_file($tmp_path, $upload_path . $uniq_file_name)) {
    // ファイルが読出可能になるようにアクセス権限を変更
    chmod($upload_path . $uniq_file_name, 0644);

    //書き込み
    text($uniq_file_name,$gps_x,$gps_y);

    //echo $file_name . "をアップロードしました。";
    //echo "<br><a href='./index5.html'><- TOPへ戻る</a>";
    header("Location:./beta1.0.html");
  } else {
    echo "Error:アップロードに失敗しました。";
  }
} else {
  echo "Error:画像が見つかりません。";
}

function text($uniq_file_name,$gps_x,$gps_y){
$message = $uniq_file_name;
//ファイル名の指定
$text_filename = "./text/exam2.txt";
$text_filename_gps="./text/gps.txt";
//改行処理
file_put_contents($text_filename,"\n" ,FILE_APPEND);
//受け取ったメッセージをファイルに追記
file_put_contents($text_filename,$message ,FILE_APPEND);

//同じく
file_put_contents($text_filename_gps,"\n" ,FILE_APPEND);
file_put_contents($text_filename_gps,$gps_x ,FILE_APPEND);
//同じく
file_put_contents($text_filename_gps,"\n" ,FILE_APPEND);
file_put_contents($text_filename_gps,$gps_y ,FILE_APPEND);
}
?>