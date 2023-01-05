
// preparing the page -------------------

var mousePosX;
var mousePosY;

var clicks = 0;

const customData = await fetch("./libs/custom.json");
var custom = await customData.json();
// console.log(custom); // set up the customisable variables
var max = custom["chance"]


const soundsData = await fetch("./libs/soundfiles/sounds.json");
var sounds = await soundsData.json();
// console.log(sounds);
console.log(sounds["random_scale_select"]); // display possible scales

var scale = sounds["random_scale_select"][Math.floor(Math.random() * 7)+1];
var transposeValue = Math.floor(Math.random() * 12);
console.log(scale); // display current scale
console.log(transposeValue); // display tranpose value


 // functions --------------------------------

function randomNote(scale) {
  var note = (sounds["scales"][scale][Math.floor(Math.random() * 7)] + transposeValue-1) % 12 + 1;
  return sounds["notes"][note];
}

function randomiNote(scale) {
  var inote = (sounds["scales"][scale][Math.floor(Math.random() * 7)]+(12*Math.floor(Math.random()*2)) + transposeValue) % 24 + 1;
  return sounds["inotes"][inote];
}


function mouseCoordinates(event){
    mousePosX = event.clientX;
    mousePosY = event.clientY;
    trigger();
    // console.log("pageX: ", event.pageX,
    // "pageY: ", event.pageY,
    // "clientX: ", mousePosX,
    // "clientY:", mousePosY)
    }
    
  function atLeastOneClick() {
  return (clicks > 0);
}

function trigger() {
    if (atLeastOneClick() == false) {
      return
    }
    var rand = Math.floor(Math.random() * max);
    var limiter = Math.floor(Math.random() * max);
    // console.log(rand, limiter)
    if (rand == limiter) {
      positiveTrigger();
    }
  }
  
function positiveTrigger() {
  var init_hue = Math.random()*360;
  var init_rgb = HSLToRGB(init_hue, 100, 69)
  var i = Math.floor(Math.random() * 5);
  if (i==4) {
    var note = randomNote(scale);
  } else {
    var note = randomiNote(scale);
  }
  var note_path = 'libs/soundfiles/' + note + '.mp3';
  var audio = new Audio(note_path);
  audio.play();
  draw(mousePosX, mousePosY, init_rgb);
  console.log("Played a " + note + " with a circle of hue " + init_hue + ".");
}

function draw(centerX, centerY, init_rgb)
  {
  var display_color;
  var temp = 1; 
  var color = 1;
  var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  svg1.appendChild(circle);
  circle.setAttribute("cx", centerX);
  circle.setAttribute("cy", centerY);
  circle.setAttribute("r", 10);
  circle.setAttribute("fill", "none");
  setInterval(() => {
    temp += 2;
    display_color = "rgb(" + init_rgb[0]*color + ", " + init_rgb[1]*color + ", " + init_rgb[2]*color + ")";
    color -= 0.01;  
    circle.setAttribute("r", 9+temp);
    circle.setAttribute("fill", display_color);
  }, 30);
  setTimeout(() => {  circle.remove(); }, 3000);
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
    
function updateValues(e) {
  console.log(e);
  if (e.target.id == "chance") {
    max = e.target.value;
  } else if (e.target.id == "scale") {
    scale = e.target.value;
  } else if (e.target.id == "mute") {
    mute = e.target.value;
  }
}


// building the page ---------------------------------------------

//<canvas id="scene" width="682" height="814" style="left: -30px; top: -30px;"></canvas>


var br = document.createElement("br");

var svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//svg1.setAttribute("height",screen.availHeight);
//svg1.setAttribute("width",screen.availWidth);
svg1.setAttribute("style","background: rgb(0,0,0)");
svg1.setAttribute("width", screen.availWidth);
svg1.setAttribute("height", screen.availHeight);
document.body.appendChild(svg1);

var settings = document.createElement("div");
settings.setAttribute("class", "settings");
settings.setAttribute("width", "200");
settings.addEventListener('change', updateValues);
document.body.appendChild(settings);

var maxLabel = document.createElement("label");
maxLabel.innerText = "Chance Value : ";
settings.appendChild(maxLabel);
var muteLabel = document.createElement("label");
muteLabel.innerText = "Mute : ";
settings.appendChild(muteLabel);
settings.appendChild(br);
var scaleLabel = document.createElement("label");
scaleLabel.innerText = "Choose a scale : ";
settings.appendChild(scaleLabel);



var maxInputBox = document.createElement("input");
maxInputBox.setAttribute("id", "chance");
maxInputBox.setAttribute("maxlength", "8");
maxInputBox.setAttribute("value", "100");
maxLabel.appendChild(maxInputBox);

var muteCheckBox = document.createElement("input");
muteCheckBox.setAttribute("id", "mute");
muteCheckBox.setAttribute("type", "checkbox");
muteCheckBox.setAttribute("value", "off");
muteLabel.appendChild(muteCheckBox);


var scaleInputBox = document.createElement("select");
scaleInputBox.setAttribute("id", "scale");
for (var l=1; l<=7; l++) {
  var option = document.createElement("option");
  option.setAttribute("value", sounds["random_scale_select"][l]);
  option.innerText = sounds["random_scale_select"][l]
  scaleInputBox.appendChild(option);
}
scaleLabel.appendChild(scaleInputBox);



svg1.addEventListener('click', () => {clicks += 1;});
svg1.addEventListener('mousemove', mouseCoordinates);








