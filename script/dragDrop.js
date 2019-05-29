// Make the DIV element draggable: //Calling the dragElement function
//dragElement(document.getElementById("mydiv"));

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

//Creating new Div-elements.
function addElement(){
    var newElement= document.getElementById("myDiv").cloneNode(true);
    newElement.setAttribute('draggable',true);
    newElement.id="newDiv";
    newElement.childNodes[0].id="newDivHeader";
    /*var text= document.querySelectorAll(".text");
    text[0].setAttribute('contentEditable',true);
    text[1].setAttribute('contentEditable',true);*/
    //var taskContent = document.createTextNode(input.value); 
    //task.appendChild(taskContent);   
    //var parent = document.getElementById("ToDoBox");
    document.body.appendChild(newElement);
    dragElement(newElement);
    
    //Setting the position for new div's using the cursor position.
    var e =window.event;
    newElement.style.top = e.clientY + "px";
    newElement.style.left = e.clientX + "px";
    

    console.log("FirsChild: "+newElement.firstChild);
    console.log("FirsChild: "+newElement.childNodes[0].id);
    
    }

    var trigger = document.getElementById("myDiv");
    trigger.addEventListener("dragend",addElement);

//===================HER MÅ DET JOBBES MED ===========================

document.getElementById('DELETE1').addEventListener('mouseup', function(e)
    {    
   
   document.getElementById('DELETE1').appendChild(e.target.id);
    document.getElementById('DELETE1').removeChild(e.target.id);
           
            //document.getElementById('DELETE1').appendChild(item);
    });
   

//======================================================================
    


//e.keydown==46

