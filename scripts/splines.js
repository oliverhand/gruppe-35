//Spline maker
var index = false;
var rectAX;
var rectAY;
var rectBX;
var rectBY;
var d_value;

document.body.addEventListener("click",function test(e){ //EVENTCLICK
    if(e.target.className == "node" && index == false){ //IF-STATEMENT
        if(e.target.parentElement.id=="rightNode"){
            rectAX = parseInt(e.target.parentElement.parentElement.style.left)+150;
        } else if(e.target.parentElement.id=="leftNode"){
            rectAX = parseInt(e.target.parentElement.parentElement.style.left);
        }   index = true;
            rectAY = parseInt(e.target.parentElement.parentElement.style.top)  +97;
    } else if(e.target.className == "node" && index){
        if(e.target.parentElement.id=="rightNode"){
            rectBX = parseInt(e.target.parentElement.parentElement.style.left)+145;
        } else if(e.target.parentElement.id=="leftNode"){
            rectBX = parseInt(e.target.parentElement.parentElement.style.left);
        }   index = false;
            rectBY = parseInt(e.target.parentElement.parentElement.style.top) + 97;
            d_value="M"+rectAX + " " + rectAY +", "+ rectBX + " " + rectBY; 
            var newPath=document.getElementById('mySpline').cloneNode('true');
            newPath.id="newPath";
            newPath.setAttribute('tabindex',-1);
            newPath.setAttribute("d",d_value);
            document.getElementById('pathContainer').appendChild(newPath);
                
    }
});

//=============================================DELETE PATH==================================================
document.addEventListener('keydown',function deletePath(e){    
    if(e.target.id == "newPath" || e.target.id == "mySpline"){
        if(e.keyCode == 46){
            var path= e.target;
            e.target.parentElement.removeChild(path);
        }
    }
});