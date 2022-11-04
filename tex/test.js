window.addEventListener('DOMContentLoaded', function(){

	// (1) XMLHttpRequestオブジェクトを作成
	const xhr = new XMLHttpRequest();

	// (2) 取得するファイルの設定
	xhr.open('get', './text/test.txt');
	// xhr.responseType = 'blob'; (ファイル形式によって設定）

	// (3) リクエスト（要求）を送信
	xhr.send();

	xhr.onreadystatechange = function() {

		// (4) 通信が正常に完了したか確認
		if( xhr.readyState === 4 && xhr.status === 200) {

			// (5) 取得したレスポンスをページに表示
			const file_area = document.getElementById('file_area');
			file_area.innerHTML = this.responseText.replace(/\n/g, "");
		}
	}
});

$(function(){
    // ===========================================
    // Ajaxを利用したお問い合せ
    // ===========================================
        $('#send').on('click', function(e){
        e.preventDefault();
        $.ajax('upload.php',
        {
        		type: 'post',
            	data: {message: $('#message').val()},
            	dataType: 'xml'
            }).done(function(data){
                alert('成功');
                //console.log("できたよ");
            }).fail(function(msg, XMLHttpRequest, textStatus, errorThrown){
                alert("ひょっひょっひょ");
                console.log(XMLHttpRequest.status);
                console.log(textStatus);
                console.log(errorThrown);
            });
        });
});