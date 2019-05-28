

/*
function dragMousedown(e) {
    
}


var canvas = document.getElementById("canV"); 
var ctx = canvas.getContext("2d");


// mouse stuff
var mouse = {
    x:0,
    y:0,
    buttonLastRaw:0, // user modified value 
    buttonRaw:0,
    buttons:[1,2,4,6,5,3], // masks for setting and clearing button raw bits;
};
function mouseMove(event){
    mouse.x = event.offsetX;  mouse.y = event.offsetY; 
    if(mouse.x === undefined){ mouse.x = event.clientX;  mouse.y = event.clientY;}    
    if(event.type === "mousedown"){ mouse.buttonRaw |= mouse.buttons[event.which-1];
    }else if(event.type === "mouseup"){mouse.buttonRaw &= mouse.buttons[event.which+2];
    }else if(event.type === "mouseout"){ mouse.buttonRaw = 0; mouse.over = false;
    }else if(event.type === "mouseover"){ mouse.over = true; }
    event.preventDefault();
}
canvas.addEventListener('mousemove',mouseMove);
canvas.addEventListener('mousedown',mouseMove);
canvas.addEventListener('mouseup'  ,mouseMove); 
canvas.addEventListener('mouseout'  ,mouseMove); 
canvas.addEventListener('mouseover'  ,mouseMove); 
canvas.addEventListener("contextmenu", function(e){ e.preventDefault();}, false);


// Line simplification based on
// the Ramer–Douglas–Peucker algorithm
// referance https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm
// points are and array of arrays consisting of [[x,y],[x,y],...,[x,y]]
// length is in pixels and is the square of the actual distance.
// returns array of points of the same form as the input argument points.
var simplifyLineRDP = function(points, length) {
    var simplify = function(start, end) { // recursize simplifies points from start to end
        var maxDist, index, i, xx , yy, dx, dy, ddx, ddy, p1, p2, p, t, dist, dist1;
        p1 = points[start];
        p2 = points[end];   
        xx = p1[0];
        yy = p1[1];
        ddx = p2[0] - xx;
        ddy = p2[1] - yy;
        dist1 = (ddx * ddx + ddy * ddy);
        maxDist = length;
        for (var i = start + 1; i < end; i++) {
            p = points[i];
            if (ddx !== 0 || ddy !== 0) {
                t = ((p[0] - xx) * ddx + (p[1] - yy) * ddy) / dist1;
                if (t > 1) {
                    dx = p[0] - p2[0];
                    dy = p[1] - p2[1];
                } else 
                if (t > 0) {
                    dx = p[0] - (xx + ddx * t);
                    dy = p[1] - (yy + ddy * t);
                } else {
                    dx = p[0] - xx;
                    dy = p[1] - yy;
                }
            }else{
                dx = p[0] - xx;
                dy = p[1] - yy;
            }
            dist = dx * dx + dy * dy 
            if (dist > maxDist) {
                index = i;
                maxDist = dist;
            }
        }

        if (maxDist > length) { // continue simplification while maxDist > length
            if (index - start > 1){
                simplify(start, index);
            }
            newLine.push(points[index]);
            if (end - index > 1){
                simplify(index, end);
            }
        }
    }    
    var end = points.length - 1;
    var newLine = [points[0]];
    simplify(0, end);
    newLine.push(points[end]);
    return newLine;
}



// This is my own smoothing method 
// It creates a set of bezier control points either 2nd order or third order 
// bezier curves.
// points: list of points
// cornerThres: when to smooth corners and represents the angle between to lines. 
//     When the angle is smaller than the cornerThres then smooth.
// match: if true then the control points will be balanced.
// Function will make a copy of the points

var smoothLine = function(points,cornerThres,match){  // adds bezier control points at points if lines have angle less than thres
    var  p1, p2, p3, dist1, dist2, x, y, endP, len, angle, i, newPoints, aLen, closed, bal, cont1, nx1, nx2, ny1, ny2, np;
    function dot(x, y, xx, yy) {  // get do product
        // dist1,dist2,nx1,nx2,ny1,ny2 are the length and  normals and used outside function
        // normalise both vectors
        dist1 = Math.sqrt(x * x + y * y); // get length
        if (dist1  > 0) {  // normalise
            nx1 = x / dist1 ;
            ny1 = y / dist1 ;
        }else {
            nx1 = 1;  // need to have something so this will do as good as anything
            ny1 = 0;
        }
        dist2  = Math.sqrt(xx * xx + yy * yy);
        if (dist2  > 0) {
            nx2 = xx / dist2;
            ny2 = yy / dist2;
        }else {
            nx2 = 1;
            ny2 = 0;
        }
       return Math.acos(nx1 * nx2 + ny1 * ny2 ); // dot product
    }
    newPoints = []; // array for new points
    aLen = points.length;
    if(aLen <= 2){  // nothing to if line too short
        for(i = 0; i < aLen; i ++){  // ensure that the points are copied          
            newPoints.push([points[i][0],points[i][1]]);
        }
        return newPoints;
    }
    p1 = points[0];
    endP =points[aLen-1];
    i = 0;  // start from second poitn if line not closed
    closed = false;
    len = Math.hypot(p1[0]- endP[0], p1[1]-endP[1]);
    if(len < Math.SQRT2){  // end points are the same. Join them in coordinate space
        endP =  p1;
        i = 0;             // start from first point if line closed
        p1 = points[aLen-2];
        closed = true;
    }       
    newPoints.push([points[i][0],points[i][1]])
    for(; i < aLen-1; i++){
        p2 = points[i];
        p3 = points[i + 1];
        angle = Math.abs(dot(p2[0] - p1[0], p2[1] - p1[1], p3[0] - p2[0], p3[1] - p2[1]));
        if(dist1 !== 0){  // dist1 and dist2 come from dot function
            if( angle < cornerThres*3.14){ // bend it if angle between lines is small
                  if(match){
                      dist1 = Math.min(dist1,dist2);
                      dist2 = dist1;
                  }
                  // use the two normalized vectors along the lines to create the tangent vector
                  x = (nx1 + nx2) / 2;  
                  y = (ny1 + ny2) / 2;
                  len = Math.sqrt(x * x + y * y);  // normalise the tangent
                  if(len === 0){
                      newPoints.push([p2[0],p2[1]]);                                  
                  }else{
                      x /= len;
                      y /= len;
                      if(newPoints.length > 0){
                          var np = newPoints[newPoints.length-1];
                          np.push(p2[0]-x*dist1*0.25);
                          np.push(p2[1]-y*dist1*0.25);
                      }
                      newPoints.push([  // create the new point with the new bezier control points.
                            p2[0],
                            p2[1],
                            p2[0]+x*dist2*0.25,
                            p2[1]+y*dist2*0.25
                      ]);
                  }
            }else{
                newPoints.push([p2[0],p2[1]]);            
            }
        }
        p1 = p2;
    }  
    if(closed){ // if closed then copy first point to last.
        p1 = [];
        for(i = 0; i < newPoints[0].length; i++){
            p1.push(newPoints[0][i]);
        }
        newPoints.push(p1);
    }else{
        newPoints.push([points[points.length-1][0],points[points.length-1][1]]);      
    }
    return newPoints;    
}

// creates a drawable image
var createImage = function(w,h){
    var image = document.createElement("canvas");
    image.width = w;
    image.height =h; 
    image.ctx = image.getContext("2d"); 
    return image;
}  

// draws the smoothed line with bezier control points.
var drawSmoothedLine = function(line){
    var i,p;
    ctx.beginPath()
    ctx.moveTo(line[0][0],line[0][1])
    for(i = 0; i < line.length-1; i++){
       p = line[i];
       p1 = line[i+1]
       if(p.length === 2){ // linear 
            ctx.lineTo(p[0],p[1])
       }else
       if(p.length === 4){ // bezier 2nd order
           ctx.quadraticCurveTo(p[2],p[3],p1[0],p1[1]);
       }else{              // bezier 3rd order
           ctx.bezierCurveTo(p[2],p[3],p[4],p[5],p1[0],p1[1]);
       }
    }
    if(p.length === 2){
        ctx.lineTo(p1[0],p1[1])
    }
    ctx.stroke();
}

// smoothing settings
var liveSmooth;
var lineSmooth = {};
lineSmooth.lengthMin = 8;  // square of the pixel length
lineSmooth.angle = 0.8;      // angle threshold
lineSmooth.match = false;  // not working.
// back buffer to save the canvas allowing the new line to be erased
var backBuffer = createImage(canvas.width,canvas.height);
var currentLine = [];
mouse.lastButtonRaw = 0;  // add mouse last incase not there
ctx.lineWidth = 3;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.strokeStyle = "black";
ctx.clearRect(0,0,canvas.width,canvas.height);
var drawing = false;  // if drawing
var input = false;  // if menu input
var smoothIt = false;  // flag to allow feedback that smoothing is happening as it takes some time.
function draw(){
    // if not drawing test for menu interaction and draw the menus
    if(!drawing){      
        if(mouse.x < 203 && mouse.y < 24){
            if(mouse.y < 13){
                if(mouse.buttonRaw === 1){
                    ctx.clearRect(3,3,200,10);
                    lineSmooth.angle = (mouse.x-3)/200;
                    input = true;
                }
            }else
            if(mouse.buttonRaw === 1){
                ctx.clearRect(3,14,200,10);
                lineSmooth.lengthMin = (mouse.x-3)/10;
                input = true;
            }
                
            canvas.style.cursor = "pointer";
        }else{
            canvas.style.cursor = "crosshair";
            
        }
        if(mouse.buttonRaw === 0 && input){
            input = false;
            mouse.lastButtonRaw = 0;
        }
        ctx.lineWidth = 0.5;
        ctx.fillStyle = "red";
        ctx.clearRect(3,3,200,10);
        ctx.clearRect(3,14,200,10);
        ctx.fillRect(3,3,lineSmooth.angle*200,10);
        ctx.fillRect(3,14,lineSmooth.lengthMin*10,10);

        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillStyle = "#000"
        ctx.strokeRect(3,3,200,10);
        ctx.fillText("Smooth "+(lineSmooth.angle * (180 / Math.PI)).toFixed(0)+"deg",5,2)
        ctx.strokeRect(3,14,200,10);
        ctx.fillText("Detail "+lineSmooth.lengthMin.toFixed(0) + "pixels",5,13);

    }else{
        canvas.style.cursor = "crosshair"; 
    }
    if(!input){
         ctx.lineWidth = 3;
        if(mouse.buttonRaw === 4 && mouse.lastButtonRaw === 0){
            currentLine = [];
            drawing  = true;

            backBuffer.ctx.clearRect(0,0,canvas.width,canvas.height);
            backBuffer.ctx.drawImage(canvas,0,0);
            currentLine.push([mouse.x,mouse.y])
        }else
        if(mouse.buttonRaw === 4){
            var lp = currentLine[currentLine.length-1]; // get last point
            // dont record point if no movement
            if(mouse.x !== lp[0] || mouse.y !== lp[1] ){
                currentLine.push([mouse.x,mouse.y]);
                ctx.beginPath();
                ctx.moveTo(lp[0],lp[1])
                ctx.lineTo(mouse.x,mouse.y);
                ctx.stroke();
                liveSmooth = smoothLine(
                    simplifyLineRDP(
                        currentLine,
                        lineSmooth.lengthMin
                    ),
                    lineSmooth.angle,
                    lineSmooth.match
                );
                ctx.clearRect(0,0,canvas.width,canvas.height);
               ctx.drawImage(backBuffer,0,0);
                ctx.strokeStyle = "Blue";
                drawSmoothedLine(liveSmooth );
                ctx.strokeStyle = "black";
            }
        }else
        if(mouse.buttonRaw === 0 && mouse.lastButtonRaw === 4){
            ctx.textAlign = "center"
            ctx.fillStyle = "red"
            ctx.fillText("Smoothing...",canvas.width/2,canvas.height/5);
            smoothIt = true;
        }else
        if(smoothIt){
            smoothIt = false;
            
            var newLine = smoothLine(
                simplifyLineRDP(
                    currentLine,
                    lineSmooth.lengthMin
                ),
                lineSmooth.angle,
                lineSmooth.match
            );
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.drawImage(backBuffer,0,0);
            drawSmoothedLine(newLine);
            drawing  = false;
            
        }


        if(mouse.buttonRaw === 1 && mouse.lastButtonRaw === 0){
            currentLine = [];
            drawing  = true;

            backBuffer.ctx.clearRect(0,0,canvas.width,canvas.height);
            backBuffer.ctx.drawImage(canvas,0,0);
            currentLine.push([mouse.x,mouse.y])
        }else
        if(mouse.buttonRaw === 1){
            var lp = currentLine[currentLine.length-1]; // get last point
            // dont record point if no movement
            if(mouse.x !== lp[0] || mouse.y !== lp[1] ){
                currentLine.push([mouse.x,mouse.y]);
                ctx.beginPath();
                ctx.moveTo(lp[0],lp[1])
                ctx.lineTo(mouse.x,mouse.y);
                ctx.stroke();
            }
        }else
        if(mouse.buttonRaw === 0 && mouse.lastButtonRaw === 1){
            ctx.textAlign = "center"
            ctx.fillStyle = "red"
            ctx.fillText("Smoothing...",canvas.width/2,canvas.height/5);
            smoothIt = true;
        }else
        if(smoothIt){
            smoothIt = false;
            
            var newLine = smoothLine(
                simplifyLineRDP(
                    currentLine,
                    lineSmooth.lengthMin
                ),
                lineSmooth.angle,
                lineSmooth.match
            );
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.drawImage(backBuffer,0,0);
            drawSmoothedLine(newLine);
            drawing  = false;
            
        }
    }
    // middle button clear
    if(mouse.buttonRaw === 2){
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }
    mouse.lastButtonRaw = mouse.buttonRaw;

    requestAnimationFrame(draw);

}

draw();
*/

let cx = document.querySelector("canvas").getContext("2d");
  cx.beginPath();
  cx.moveTo(10, 90);
  // control1=(10,10) control2=(90,10) goal=(50,90)
  cx.bezierCurveTo(10, 10, 90, 10, 50, 90);
  cx.lineTo(90, 10);
  cx.lineTo(10, 10);
  cx.closePath();
  cx.stroke();

//Setting the position for new div's using the cursor position.
    var e =window.event;
    newElement.style.top = e.clientY + "px";
    newElement.style.left = e.clientX + "px";
