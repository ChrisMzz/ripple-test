
var testconstant = 1;

// fetch("./libs/custom.json").then(results => {
//  custom = results.json();
//  console.log(custom);
//  })
//fetch("./libs/soundfiles/sounds.json").then(results => {
//  sounds = results.json();
//  console.log(sounds);
//  })


const customData = await fetch("./libs/custom.json");
const custom = await customData.json();



const soundsData = await fetch("./libs/soundfiles/sounds.json");
const sounds = await soundsData.json();



function mouseCoordinates(event){
    console.log("pageX: ", event.pageX,
    "pageY: ", event.pageY,
    "clientX: ", event.clientX,
    "clientY:", event.clientY)
    }

window.addEventListener('mousemove', mouseCoordinates);



function trigger() {
    var min  = custom[minTime],
      max = custom[maxTime];
    var rand = Math.floor(Math.random() * (max - min + 1) + min);
    console.log('Wait for ' + rand + ' seconds');
    setTimeout(myFunction, rand * 1000);
  }
  
  myFunction()


function myFunction() {
  console.log("executed a function")
}


trigger()


