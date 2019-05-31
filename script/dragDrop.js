
//Testing av hva som registrers som e.targer.=============LA STÅ
document.body.addEventListener('click',function(e){
    console.log(e.target);
});
//===============================================================

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
    newElement.childNodes[3].id="newDivHeader";
    newElement.childNodes[7].id="newNode";
    
    
    //Choose where we want this new element to be placed in the HTML.
    document.body.appendChild(newElement);
    dragElement(newElement);
    
    //Setting the position for new element equal to the cursors position.
    var e =window.event;
    newElement.style.top = e.clientY + "px";
    newElement.style.left = e.clientX + "px";
    }
//===================Creating new Div-elements-END=================.

//listening for the drag event. (Hvis vi drar fra myDiv, så kjører den addElement funksjonen)
    var trigger = document.getElementById("myDiv");
    trigger.addEventListener("dragend",addElement);

//Setting the status from inProgress(default), to done(changing color).
    document.body.addEventListener("click",function(e){
        
        //if the element our mouse is hovering has the id of done then run.
        if(e.target.id=="done"){
            document.getElementById('done').style.backgroundColor="lawngreen";
            document.getElementById('inProgress').style.backgroundColor="grey";
        }
        //if the element our mouse is hovering has the id of inProgress then run.
        else if(e.target.id=="inProgress"){
            document.getElementById('done').style.backgroundColor="grey";
            document.getElementById('inProgress').style.backgroundColor="yellow";
        }      
});

   
var btnAddMembers = document.getElementById("btnAddMembers");
    btnAddMembers.addEventListener("click",addMembers);
function addMembers(){
    var newMember= document.createElement('div');
    newMember.id=('newMember');
    newMember.setAttribute('contentEditable',true);
    newMember.innerHTML="Add name here";
    document.getElementById('box1').appendChild(newMember);
    
}

document.getElementById('expand').addEventListener('click',hideMembersbar);

function hideMembersbar(){
    if(document.getElementById('box1').style.display == 'none'){
        console.log("!== none");
        document.getElementById('box1').style.display= 'block';
    }
    else if(document.getElementById('box1').style.display == 'block'){
        console.log('!== block');
        document.getElementById('box1').style.display = 'none';
    }
}







//===================HER MÅ DET JOBBES MED EN DELETE FUNKSJON ===========================

/*document.getElementById('DELETE1').addEventListener('mouseup', function(e)
    {    
   
   document.getElementById('DELETE1').appendChild(e.target.id);
    document.getElementById('DELETE1').removeChild(e.target.id);
           
            //document.getElementById('DELETE1').appendChild(item);
    });
   */

//======================================================================
//e.keydown==46

