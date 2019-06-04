var dateElement = document.getElementById("dateInput");
//Testing av hva som registrers som e.targer.=============LA STÅ
document.body.addEventListener('click',function(e){
    console.log(e.target);
});
//===============================================================

//Index for cards.
var i=0;

//===================DraggingFunction==================================
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;    
    function dragElement(elmnt) {

      if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById('newDivHeader').onmousedown = dragMouseDown;
          console.log("dette fungerer");

      } else {
        // otherwise, move the DIV from anywhere inside the DIV: 
          elmnt.childNodes[3].onmousedown = dragMouseDown; //FIKS HER
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;

      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      } 
    }
//==============DraggingFunction-END==================================

//===================Creating new Div-elements=====================.
    function addElement(){

        //Cloning and setting new values to the cloned element.
        var newElement= document.getElementById("myDiv").cloneNode(true);
        newElement.setAttribute('draggable',true);
        newElement.id="newDiv";
        newElement.className="newDiv"
        newElement.style.visibility="visible";
        
        newElement.childNodes[3].className="newDivHeader";
        newElement.childNodes[3].setAttribute('contentEditable',true);
        newElement.childNodes[3].innerHTML='Change name here:';
        newElement.childNodes[19].className="newInProgress";
        newElement.childNodes[21].className="newDone";
        
        
        i++;
    
        console.log(i);
        newElement.id="newDiv"+i;
       ;
        newElement.childNodes[3].id="newDivHeader"+i;
        newElement.childNodes[19].id="newInProgress"+i;
        newElement.childNodes[21].id="newDone"+i;
        newElement.childNodes[25].id="box"+i;
    
        console.log(newElement.childNodes);
    
        
        //Setting Done or in-progress on the cards.
        document.body.addEventListener("click",function(e){
        
        //if the element our mouse is hovering has the id of done then run.
        if(e.target.className=="newDone"){
            document.getElementById(e.target.id).style.backgroundColor="lawngreen";
            console.log(e.target.previousElementSibling);
            document.getElementById(e.target.previousElementSibling.id).style.backgroundColor="grey";
            e.target.parentElement.childNodes[3].style.backgroundColor="lawngreen";
            e.target.parentElement.style.border="1px solid lawngreen";
        }
        //if the element our mouse is hovering has the id of inProgress then run.
        else if(e.target.className=="newInProgress"){
            document.getElementById(e.target.nextElementSibling.id).style.backgroundColor="grey";
            document.getElementById(e.target.id).style.backgroundColor="yellow";
            e.target.parentElement.childNodes[3].style.backgroundColor="yellow";
            e.target.parentElement.style.border="1px solid yellow";
          }
        });  
  
        //Setting the position for new element equal to the cursors position.
        var e =window.event;
        newElement.style.top = e.clientY-80 + "px";
        newElement.style.left = e.clientX-300 + "px";
        
        //Choose where we want this new element to be placed in the HTML.
       document.getElementById('foreignContainer').appendChild(newElement);
        dragElement(newElement);
        dateSetter();
        console.log("X"+e.clientX+" Y"+e.clientY)
}
        
//===================Creating new Div-elements-END=================.

//listening for the drag event. (Hvis vi drar fra myDiv, så kjører den addElement funksjonen)
var trigger = document.getElementById("testTemplate");
trigger.addEventListener("dragend",addElement); 

//=============DateSETTER==========================
function dateSetter(){
    var classname= document.getElementsByClassName("dateInput");
        for (var i = 0; i < classname.length; i++) {
            classname[i].addEventListener('change', setDateValue, false);
        }   
        
      
        function setDateValue(){
             var testValue=this.value;
                console.log("heisan"+testValue);  
        }
               
}
//================DATE END==============================
//================Expand box=============================
document.body.addEventListener('click',hideMembersbar);
 function hideMembersbar(e){
     
        if(e.target.className=='expand'){
            if(e.target.nextElementSibling.style.display == 'block'){
            e.target.nextElementSibling.style.display= 'none';
            console.log("Show none");
            e.target.style.transform="rotate(0deg)";
            }
        else {
            e.target.nextElementSibling.style.display = 'block';
            console.log("Show block");
            e.target.style.transform="rotate(180deg)";
        }
    }
 }
//===============Expand box END==========================
//===============DELETE=================================
document.body.addEventListener('click',deleteElement);
function deleteElement(e){
    console.log("hei");
    if(e.target.className=="deleteButton"){
         
    var divElement= e.target.parentNode; //newDiv
    divElement.parentNode.removeChild(divElement);
    }
}
//===============DELETE END==============================