var dateElement = document.getElementById("dateInput");
//Testing av hva som registrers som e.target.=============LA STÅ
/*document.body.addEventListener('click ',function(e){
    console.log(e.target);
});*/
//===============================================================

//Index for cards.
var i=0;

//===================DraggingFunction==================================
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;    
    function dragElement(elmnt) {
        if(elmnt.id=="template1" || elmnt.id=="template2" || elmnt.id=="template3") {
          elmnt.onmousedown = dragMouseDown;
      } 
        else{
          elmnt.childNodes[3].onmousedown = dragMouseDown; 
            elmnt.childNodes[1].onmousedown = dragMouseDown;//FIKS HER
        }

      function dragMouseDown(e) {
        e = window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;

      }

      function elementDrag(e) {
        e = window.event;
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
        newElement.className="newDiv"
        newElement.style.visibility="visible";
        
        newElement.childNodes[3].className="newDivHeader";
        newElement.childNodes[3].setAttribute('contentEditable',"true");
        newElement.childNodes[3].innerHTML="<i>Your class name here</i>";
        newElement.childNodes[19].className="newInProgress";
        newElement.childNodes[21].className="newDone";
        
        i++;
        // we add indexes to every child element we are going to change, because when we do the change we only do it on the 1 div, instead of all of them...
        newElement.id="newDiv"+i;
        newElement.childNodes[3].id="newDivHeader"+i;
        newElement.childNodes[19].id="newInProgress"+i;
        newElement.childNodes[21].id="newDone"+i;
        newElement.childNodes[25].id="box"+i;
    
        //Setting Done or in-progress on the cards.
        document.body.addEventListener("click",function(e){
        
        //if the element our mouse is hovering has the id of done then run.
        if(e.target.className=="newDone"){
            document.getElementById(e.target.id).style.backgroundColor="lawngreen";
            document.getElementById(e.target.previousElementSibling.id).style.backgroundColor="grey";
            e.target.parentElement.childNodes[3].style.backgroundColor="lawngreen";
            e.target.parentElement.style.outline="2px solid lawngreen";
            e.target.parentElement.style.border="1px solid black";
        }
        //if the element our mouse is hovering has the id of inProgress then run.
        else if(e.target.className=="newInProgress"){
            document.getElementById(e.target.nextElementSibling.id).style.backgroundColor="grey";
            document.getElementById(e.target.id).style.backgroundColor="yellow";
            e.target.parentElement.childNodes[3].style.backgroundColor="yellow";
            e.target.parentElement.style.outline="2px solid yellow";
            e.target.parentElement.style.border="1px solid black";
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
       
}

function addCheckboxElement(){
    var newCheckboxElement= document.getElementById("myCheckbox").cloneNode(true);
        
        newCheckboxElement.setAttribute('draggable',true);
        newCheckboxElement.className="newCheckbox"
        newCheckboxElement.style.visibility="visible";
        
        newCheckboxElement.childNodes[1].id="newCheckboxHeader";
    
            //Setting Done or in-progress on the cards.
        document.body.addEventListener("click",function(e){
        
        //if the element our mouse is hovering has the id of done then run.
        if(e.target.className=="newDone"){
            document.getElementById(e.target.id).style.backgroundColor="lawngreen";
            document.getElementById(e.target.previousElementSibling.id).style.backgroundColor="grey";
            e.target.parentElement.childNodes[3].style.backgroundColor="lawngreen";
            e.target.parentElement.style.outline="2px solid lawngreen";
            e.target.parentElement.style.border="1px solid black";
        }
        //if the element our mouse is hovering has the id of inProgress then run.
        else if(e.target.className=="newInProgress"){
            document.getElementById(e.target.nextElementSibling.id).style.backgroundColor="grey";
            document.getElementById(e.target.id).style.backgroundColor="yellow";
            e.target.parentElement.childNodes[3].style.backgroundColor="yellow";
            e.target.parentElement.style.outline="2px solid yellow";
            e.target.parentElement.style.border="1px solid black";
          }
        });  
  
        //Setting the position for new element equal to the cursors position.
        var e =window.event;
        newCheckboxElement.style.top = e.clientY-80 + "px";
        newCheckboxElement.style.left = e.clientX-300 + "px";
        
        //Choose where we want this new element to be placed in the HTML.
       document.getElementById('foreignContainer').appendChild(newCheckboxElement);
        
        dragElement(newCheckboxElement);
        dateSetter();
}
        
//===================Creating new Div-elements-END=================.

//listening for the drag event. (Hvis vi drar fra myDiv, så kjører den addElement funksjonen)
var trigger = document.getElementById("testTemplate");
trigger.addEventListener("dragend",addElement); 

var triggerCheckbox = document.getElementById("testTemplateCheckbox");
triggerCheckbox.addEventListener("dragend",addCheckboxElement); 

//=============DateSETTER==========================
function dateSetter(){
    var classname= document.getElementsByClassName("dateInput");
        for (var i = 0; i < classname.length; i++) {
            classname[i].addEventListener('change', setDateValue, false);
        }   
        
      
        function setDateValue(){
             var dateValue=this.value;
            
        
        }
               
}



//================DATE END==============================
//================Expand box=============================
document.body.addEventListener('click',hideMembersbar);
 function hideMembersbar(e){
     
        if(e.target.className=='expand'){
            if(e.target.nextElementSibling.style.display == 'block'){
            e.target.nextElementSibling.style.display= 'none';
            e.target.style.transform="rotate(0deg)";
            }
        else {
            e.target.nextElementSibling.style.display = 'block';
            e.target.style.transform="rotate(180deg)";
        }
    }
 }
//===============Expand box END==========================
//===============DELETE=================================
document.body.addEventListener('click',deleteElement);
function deleteElement(e){
    if(e.target.className=="deleteButton"){
         
    var divElement= e.target.parentNode; //newDiv
    divElement.parentNode.removeChild(divElement);
    }
}
//===============DELETE END==============================