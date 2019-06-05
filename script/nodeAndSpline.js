   //set up the SVG
            var svg = document.getElementById("mySVG");
            var evt = window.Event;

               var index = false;
               var nodeAxClick;
               var nodeAyClick;
               var nodeBxClick;
               var nodeByClick;
    
        
               document.body.addEventListener("click",connectNodes);

               function connectNodes(e){
                   if(e.target.className == "node" && index == false){
                        
                        index = !index;
                        var rect = e.target.getBoundingClientRect();
                         nodeAxClick=rect.x;
                         nodeAyClick=rect.y;

                   } else if(e.target.className == "node" && index){

                       index = !index;
                       var rect = e.target.getBoundingClientRect();
                       nodeBxClick=rect.x;
                       nodeByClick=rect.y;
                       
                       var d_value="M"+nodeAxClick + " " + nodeAyClick +", "+ nodeBxClick + " " + nodeByClick;
                       document.querySelector("#mySVG #mySpline").setAttribute("d",d_value);
                       
                       nodeAxClick=undefined;
                       nodeAyClick=undefined;
                       nodeBxClick=undefined;
                       nodeByClick=undefined;
                   }  
            }

                //Get Mouse Position

                function addElement(){


               } 
              // var triggerNode = document.getElementById("newNode");
              // triggerNode.addEventListener("click",addElement);
