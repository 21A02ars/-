//キャッシュを読み込ませないための-->221
var d=new Date().getTime();

document.querySelectorAll('[mb-text2]').forEach(mb_text2=>{
  mb_text2.setAttribute("id",`${d}`);
  })

        $('#save').change(function(e){
          // 要素を追加
          document.myForm.appendChild(ele);
          document.myForm.appendChild(ele2);
            if (this.files.length > 0) {

            e.preventDefault();
            
            // 選択されたファイル情報を取得
            var file = this.files[0];
            
            // readerのresultプロパティに、データURLとしてエンコードされたファイルデータを格納
            var image =new Image();
            var reader = new FileReader();
            
            reader.readAsDataURL(file);

            
            reader.onload = function() {
                $('#kyu').attr('src', reader.result );
                image.src=reader.result;
                image.onload=function(){
                document.querySelectorAll('[mb-text2]').forEach(mb_text2=>{
                mb_text2.innerHTML=`<a-image id="Jirachi" scale="${(image.naturalWidth)/image.naturalHeight} 1 1" src="${reader.result}"></a-image>`
                })
                }
                e.preventDefault();

                

                $.ajax('uploader1.1.php',
                {
                    type: 'post',
                    data: data,
                    dataType: 'xml'
                }).done(function(data){
                }).fail(function(msg, XMLHttpRequest, textStatus, errorThrown){
                });
            }
            }
        });

        $('#upfile').change(function(e){
          if (this.files.length > 0) {

          e.preventDefault();
          
          // 選択されたファイル情報を取得
          var file = this.files[0];
          
          // readerのresultプロパティに、データURLとしてエンコードされたファイルデータを格納
          var image =new Image();
          var reader = new FileReader();
          
          reader.readAsDataURL(file);
          
          reader.onload = function() {
              $('#kyu').attr('src', reader.result );
              image.src=reader.result;
              image.onload=function(){
              document.querySelectorAll('[mb-text2]').forEach(mb_text2=>{
                  var height=image.naturalHeight;
                  var width=image.naturalWidth;
                  var ratio=width/height;
                  mb_text2.innerHTML=`<a-image id="Jirachi" scale="${ratio} 1 " src="${reader.result}"></a-image>`
              //mb_text2.innerHTML=`<a-image id="Jirachi" scale="${(image.naturalWidth)/image.naturalHeight} 1 " src="${reader.result}"></a-image>`
              })
              }
          }
          }
      });

  function aframeMutlByte(){
      document.querySelectorAll('[mb-text]').forEach(mb_text2=>{
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
  
  
  var k=-1;
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = src;
    });
  };

  let ido;
  let kedo;
  
  function gps(){
    return new Promise((resolve)=>{
      navigator.geolocation.getCurrentPosition(test2);
      
      function test2(position) {

          ido = position.coords.latitude;
          kedo = position.coords.longitude;
          document.getElementById("gps_now").innerHTML=`<span class="blue">現在地:緯度${ido} 経度:${kedo}</span>`;
          data={
            gpsx: ido,
            gpsy: kedo
      }
      resolve(true);
    }
  })
  }
  var data;
  var gpsx = ido;
  var gpsy = kedo;
  function gpsData(resolve){
  // エレメントを作成
  var ele = document.createElement('input');
  var ele2 = document.createElement('input');
  // データを設定
  ele.setAttribute('type', 'hidden');
  ele.setAttribute('name', 'gpsx');
  ele.setAttribute('value', data["gpsx"]);
  ele2.setAttribute('type', 'hidden');
  ele2.setAttribute('name', 'gpsy');
  ele2.setAttribute('value', data["gpsy"]);
  // 要素を追加
  document.myForm.appendChild(ele);
  document.myForm.appendChild(ele2);

  request().then(hako=>{
    request2(hako);
    });
  
  };
gps().then(resolve=>{
  gpsData(resolve);
});
function request(){
  return new Promise((resolve)=>{
let hako=[];
  var xhr2=new XMLHttpRequest();
  xhr2.open("GET","./text/gps.txt",true);
  xhr2.onreadystatechange=function(){
    if((xhr2.readyState==4) && (xhr2.status==200)){
        var data_list10=xhr2.responseText.split("\n");
        //result=data_list10.filter(item=> item>5);
        let m=-1;
        var r=0;
        for(var i=0;i<data_list10.length;i+=2){
          m+=1;
          var ido_pic=data_list10[i];
          var kedo_pic=data_list10[i+1];

          var Geeta = ido_pic;
        var Iono=Geeta;

        var Geeta2=kedo_pic;
        var Iono2=Geeta2;

        var Geeta3=10;//距離の設定
        var Iono3=Geeta3;

        var Nemona=ido;//緯度
        var Nemona2=kedo;//経度

        
        var Miriam=Math.abs(Iono-Nemona);
        var Miriam2=Math.abs(Iono2-Nemona2);
        

        

        var Iono4=Math.sqrt((Miriam ** 2) + (Miriam2 ** 2));    

        if(Iono4<=Iono3){
          hako[r]=m;
          r+=1;
        }
          
        }
        resolve(hako);
    }
  }
  xhr2.send(null);
})
  }
  function request2(hako){
    return new Promise((resolve)=>{
  var xhr = new XMLHttpRequest();
  xhr.open('GET', './text/exam2.txt', true);
  
  xhr.onreadystatechange = function(){
      if((xhr.readyState == 4) && (xhr.status == 200)){
      var data_list = xhr.responseText.split("\n");
      var output = [];
              function finish2(res){
                var id=`nihon${k}`;
                var mb_text2=document.getElementById(`${id}`);
                var height=res.naturalHeight;
                var width=res.naturalWidth;
                var ratio=width/height;
                mb_text2.innerHTML=`<a-image scale="1 1 " src="${d}"></a-image>`;
                if(ratio<=1.7){
                  mb_text2.innerHTML=`<a-image scale="${ratio} 1 " src="${res.src}"></a-image>`;
                }else{
                  var surplus=ratio-1.7;
                  if(surplus>1.0){
                    ratio=ratio/surplus;
                    mb_text2.innerHTML=`<a-image scale="${ratio} ${1/surplus} " src="${res.src}"></a-image>`
                  }else{
                    ratio=ratio*(1.0-surplus);
                    mb_text2.innerHTML=`<a-image scale="${ratio} ${1*(1.0-surplus)} " src="${res.src}"></a-image>`
                  }
                  
                }
                
  
                //image onload for loop
              }
              let pic_list=[];
              for(var i=0;i<hako.length;i++){
                pic_list[i]=data_list[hako[i]];
              }
              for(var i=0;i<pic_list.length;i++){
                output[i] = pic_list[i];}
          for(var i=0;i<pic_list.length;i++){
            
              loadImage(`./upload/${output[i]}`).then(res=>{
                k++;
                finish2(res);
              })
              
          }
          
      }
  }
  
  xhr.send(null);
})
}

