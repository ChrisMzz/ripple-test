import custom from './libs/custom.json' assert { type: 'JSON' };


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


