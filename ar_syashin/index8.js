

function ano(){
  const tbox=document.getElementById("tbox");
  var text=tbox.value;
  const idd=document.getElementById("id");
  idd.setAttribute("value",text);
}
function run(){
  console.log("ready");
  let nihon=document.getElementById("nihon");
  let tbox=document.getElementById("tbox");
  var text=tbox.value;
  nihon.setAttribute("data-text",text);
  aframeMutlByte();
}