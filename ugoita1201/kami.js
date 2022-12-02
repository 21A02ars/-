
function ano(){
  let nihon=document.getElementById("nihon");
  let tbox=document.getElementById("tbox");
  var text=tbox.value;
  nihon.setAttribute("data-text","");
  tbox.value="";
  aframeMutlByte();
}
function run(){

  console.log("ready");
  let nihon=document.getElementById("nihon");
  let tbox=document.getElementById("tbox");
  var text=tbox.value;
  nihon.setAttribute("data-text",text);
  aframeMutlByte();
  
  
}


function aframeMutlByte(){

    document.querySelectorAll('[mb-text]').forEach(mb_text2=>{
        console.log(mb_text2.dataset.text)
        let text  =mb_text2.dataset.text
        let text_cnt = text.length
        let width = text_cnt*1.4
        let height= 1.6
        let cvs = document.createElement('canvas')
        let ctx = cvs.getContext('2d')
        cvs.width = width*100
        cvs.height = height*100
        ctx.fillStyle = "rgb(127,255,212)"
        ctx.font = '100pt Arial'
        ctx.fillText(text,0,125)

        let base64 = cvs.toDataURL("image/png")
        mb_text2.innerHTML=`<a-image scale="${(width)/10} ${height/10} 1" src="${base64}"></a-image>`
    })
}

function Rayquaza(){
  let Jirachi = document.getElementById('Jirachi');
  Jirachi.remove();
}


$(function(){
    // ===========================================
    // Ajaxを利用したお問い合せ
    // ===========================================
        $('#run').on('click', function(e){
        e.preventDefault();
        $.ajax('upload2.php',
        {
        		type: 'post',
            	data: {message: $('#tbox').val()},
            	dataType: 'xml'
            }).done(function(data){
                alert('成功');
                //console.log("できたよ");

            }).fail(function(msg, XMLHttpRequest, textStatus, errorThrown){
                //alert("ひょっひょっひょ");
                console.log(XMLHttpRequest.status);
                console.log(textStatus);
                console.log(errorThrown);
            });
        });
});

var k=-1;
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
};


var xhr = new XMLHttpRequest();
xhr.open('GET', './text/exam2.txt', true);

xhr.onreadystatechange = function(){
    if((xhr.readyState == 4) && (xhr.status == 200)){
      console.log("iine");
    var data_list = xhr.responseText.split("\n");
    var output = [];
            console.log(data_list);
            let image=[];
            function finish(i){
              console.log(image[i].complete);
              var mb_text2=document.getElementById(`nihon${i}`);
              var img=image[i];
              var height=img.naturalHeight;
              var width=img.naturalWidth;
              var ratio=width/height;
              console.log(img);
              console.log(img.naturalHeight);
              mb_text2.innerHTML=`<a-image scale="${ratio} 1 " src="./upload/${output}"></a-image>`
              console.log(id+"after");
              console.log(mb_text2);

              //image onload for loop
            }
            function finish2(res){
              var id=`nihon${k}`;
              console.log(id+"before");
              console.log(res.complete);
              var mb_text2=document.getElementById(`${id}`);
              var height=res.naturalHeight;
              var width=res.naturalWidth;
              var ratio=width/height;
              console.log(res);
              console.log(res.naturalHeight);
              console.log(res.src);
              mb_text2.innerHTML=`<a-image scale="${ratio} 1 " src="${res.src}"></a-image>`
              console.log(id+"after");
              console.log(mb_text2);

              //image onload for loop
            }
            
            for(var i=0;i<data_list.length;i++){
              output[i] = data_list[i];}
        for(var i=0;i<data_list.length;i++){
          
            loadImage(`./upload/${output[i]}`).then(res=>{
              k++;
              finish2(res);
            })
            
        }
        
        console.log(output);
        console.log("ready");
    }
}

xhr.send(null);
