
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
    trigger();
    // console.log("pageX: ", event.pageX,
    // "pageY: ", event.pageY,
    // "clientX: ", mousePosX,
    // "clientY:", mousePosY)
    }
    
    


window.addEventListener('mousemove', mouseCoordinates);



function trigger() {
    var max = custom["chance"];
    var rand = Math.floor(Math.random() * max);
    var limiter = Math.floor(Math.random() * max);
    // console.log(rand, limiter)
    if (rand == limiter) {
      myFunction();
    }
  }
  

function draw(centerX, centerY, init_rgb)
  {
  var temp = 1; 
  var color = 1;
  var circle = document.createElement("circle");
  var window = document.getElementById("window");
  window.appendChild(circle);
  circle.setAttribute("cx", centerX);
  circle.setAttribute("cy", centerY);
  circle.setAttribute("fill", "none");
  while (color >= 0) {
    setTimeout(() => {  console.log(color); }, 500);
    temp += .05;
    circle.setAttribute("r", 9+temp);
    var display_color = "rgb(" + init_rgb[0]*color + ", " + init_rgb[1]*color + ", " + init_rgb[2]*color + ")";
    color -= 0.05;
    circle.setAttribute("stroke", display_color);
  }
  circle.remove();
}

// using https://www.30secondsofcode.org/js/s/hsl-to-rgb
// note to self, hue is a value between 0 and 360
const HSLToRGB = (h, s, l) => {
  s /= 100; // percentage
  l /= 100; // percentage
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

function myFunction() {
  var init_hue = Math.random()*360;
  var init_rgb = HSLToRGB(init_hue, 100, 69)
  draw(mousePosX, mousePosY, init_rgb)
  console.log("executed a function")
}




