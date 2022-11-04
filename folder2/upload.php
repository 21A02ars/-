<?php
// ファイル名を取得して、ユニークなファイル名に変更
$file_name = $_FILES['upfile']['name'];
//$uniq_file_name = date("YmdHis") . "_" . $file_name;

// 仮にファイルがアップロードされている場所のパスを取得
$tmp_path = $_FILES['upfile']['tmp_name'];

// 保存先のパスを設定
//$upload_path = './upload/';

/*if (is_uploaded_file($tmp_path)) {
  // 仮のアップロード場所から保存先にファイルを移動
  if (move_uploaded_file($tmp_path, $upload_path . $uniq_file_name)) {
    // ファイルが読出可能になるようにアクセス権限を変更
    chmod($upload_path . $uniq_file_name, 0644);

    echo $file_name . "をアップロードしました。";
    echo "<br><a href='./index4.html'><- TOPへ戻る</a>";
  } else {
    echo "Error:アップロードに失敗しました。";
  }
} else {
  echo "Error:画像が見つかりません。";
}*/

$authtoken="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&scope=repo&token_type=bearer";  //GitHub API access_token

$projectname="sotu";        //
$repogitoryname="folder2"; //リポジトリ名　projectname/repogitorynameという形になります
$branch="master";       //ブランチ名　masterブランチ以外も指定できます


$realfilename=$_FILES['upfile']['name'];   //アップロードしたいファイル名
$gitfilepath="sotu/folder2/".$realfilename;   //GitHub上でのファイル名　フルパスで。ただし先頭には/をつけないように！
$commitmessage="commit_".date("YmsHis");        //コミットメッセージ

//実行！
$ret = github_fileupload($projectname,$repogitoryname,$branch,$authtoken , $realfilename,$gitfilepath,$commitmessage);

print_r($ret);


function github_fileupload($projectname,$repogitoryname,$branch,$authtoken , $realfilename,$gitfilepath,$commitmessage)
{
    if($branch=="")
    {
        $branch="master";
    }
    ////////////////////
    //BLOB　create
    $base64=base64_encode(file_get_contents($realfilename));
    $apiurl="https://api.github.com/repos/".$projectname."/".$repogitoryname."/git/blobs";
    $postdata=array("content"=>$base64,
                "encoding"=>"base64"
    );
    $ret=github_apiaccess($apiurl,$authtoken,$postdata);
    $retdata=json_decode($ret,true);
    //print_r($retdata);
    $sha_blob=$retdata["sha"];

    ////////////////////
    //Get latest Tree sha (latest commit hash)
    $apiurl="https://api.github.com/repos/".$projectname."/".$repogitoryname."/git/trees/".$branch;
    $postdata=null;
    $ret=github_apiaccess($apiurl,$authtoken,$postdata);
    $retdata=json_decode($ret,true);
    //print_r($retdata);
    $sha_latestcommithash=$retdata["sha"];
    //echo "*****sha_blob:".$sha_blob."\n";
    //echo "*****sha_prevcommithash:".$sha_latestcommithash."\n";

    ////////////////////
    //Create New tree(like git add file)
    $apiurl="https://api.github.com/repos/".$projectname."/".$repogitoryname."/git/trees";
    $postdata=array("base_tree"=>$sha_latestcommithash,
        "tree"=>array(array("path"=>$gitfilepath,
                        "mode"=>"100644",
                        "type"=>"blob",
                        "sha"=>$sha_blob))
        );

    $ret=github_apiaccess($apiurl,$authtoken,$postdata);
    $retdata=json_decode($ret,true);
    //print_r($retdata);
    $sha_newtree=$retdata["sha"];
    //echo "*****sha_newtree:".$sha_newtree."\n";

    ////////////////////
    //Commit
    $apiurl="https://api.github.com/repos/".$projectname."/".$repogitoryname."/git/commits";
    $postdata=array("message"=>$commitmessage,
                    "tree"=>$sha_newtree,
                    "parents"=>array($sha_latestcommithash)
        );
    $ret=github_apiaccess($apiurl,$authtoken,$postdata);
    $retdata=json_decode($ret,true);
    //print_r($retdata);
    $sha_newcommithash=$retdata["sha"];
    //echo "*****sha_newcommithash:".$sha_newcommithash."\n";

    ////////////////////
    //reflect head
    $apiurl="https://api.github.com/repos/".$projectname."/".$repogitoryname."/git/refs/heads/".$branch;
    $postdata=array("force"=>false,
                    "sha"=>$sha_newcommithash
            );
    $ret=github_apiaccess($apiurl,$authtoken,$postdata);
    $retdata=json_decode($ret,true);
    return $retdata;
}
function github_apiaccess($apiurl,$authtoken,$postdata)
{
    //echo $apiurl."\n";

    $header[]="Accept: application/json";
    $header[]="Content-Type: application/json";
    $header[]="Authorization: bearer ".$authtoken;
    $header[]="User-Agent: PHP_GITHUBAPI_FILEUPLOAD";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiurl); 
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header );
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    //curl_setopt($ch, CURLOPT_VERBOSE, true);

    //curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    //curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
    //curl_setopt($ch, CURLOPT_AUTOREFERER, true);

    if(is_array($postdata) && $postdata!=null)
    {
        curl_setopt($ch, CURLOPT_POST, true);
        $postjson=json_encode($postdata, JSON_UNESCAPED_SLASHES);
        //echo "POSTJSON:".$postjson."\n";
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postjson);
    }

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $ret = curl_exec($ch);
    curl_close($ch);

    return $ret;
}
?>
