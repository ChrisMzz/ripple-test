
var mousePosX;
var mousePosY;


const customData = await fetch("./libs/custom.json");
var custom = await customData.json();
console.log(custom);


const soundsData = await fetch("./libs/soundfiles/sounds.json");
var sounds = await soundsData.json();



function mouseCoordinates(event){
    mousePosX = event.clientX;
    mousePosY = event.clientY;
    console.log("pageX: ", event.pageX,
    "pageY: ", event.pageY,
    "clientX: ", mousePosX,
    "clientY:", mousePosY)
    }
    
    


window.addEventListener('mousemove', mouseCoordinates);



function trigger() {
    var min  = custom["minTime"],
      max = custom["maxTime"];
    var rand = Math.floor(Math.random() * (max - min + 1) + min);
    console.log('Wait for ' + rand + ' seconds');
    setTimeout(myFunction, rand * 1000);
  }
  
  myFunction()

function draw(centerX, centerY)
  {
  var canvas = document.getElementById('circle');
  if (canvas.getContext)
  {
  var ctx = canvas.getContext('2d'); 
  var X = centerX;
  var Y = centerY;
  var R = 45;
  ctx.beginPath();
  ctx.arc(X, Y, R, 0, 2 * Math.PI, false);
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#FF0000';
  ctx.stroke();
  }
}


function myFunction() {
  draw(mousePosX, mousePosY)
  console.log("executed a function")
}

while (true) {
  setTimeout(trigger, 20);
  trigger()
}


