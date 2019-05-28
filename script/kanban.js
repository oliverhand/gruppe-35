document.getElementById("button").addEventListener('click',buttonFunction);
var input= document.getElementById("input");
var output= document.getElementById("output");

function buttonFunction(){
    var field= document.createElement('div');
    field.className="field";
   var fieldContent = document.createTextNode(input.value); 
    field.appendChild(fieldContent);  
    var parent = document.getElementById("output");
   parent.appendChild(field);
  
}
