var containerDim = document.querySelector('#vis-holder').getBoundingClientRect();
let circleX = containerDim.width/2;
let circleY = containerDim.height/2;
let xSpeed = 2;
let ySpeed = 2;
let xDir = 1;
let yDir = 1;

var scrolly = scrollama();

let stateElusive = false;
let stateExp = false;
let stateAmor = false;

scrolly
  .setup({
    step: ".card",
  })
  .onStepEnter((r) => {
    elusiveHover = true;
    if (r.element.classList.contains('elusive')){
      stateElusive = true;
    } else {
      stateElusive = false;
    }
    if (r.element.classList.contains('expansive')){
      stateExp = true;
    } else {
      stateExp = false;
    }

    if (r.element.classList.contains('amor')){
      stateAmor = true;
    } else {
      stateAmor = false;
    }

    // { element, index, direction }
  })
  .onStepExit((response) => {
    // { element, index, direction }
  });


function canvasAll(c) {

  let r = 40;
  let numPts = 50;
  let angleInc = 360/numPts;
  var noiseoff = 0;
  let circleObj = [];
  let centerX;
  let centerY;

  c.setup = function () {
    cnv = c.createCanvas(containerDim.width,containerDim.height);

    centerX = c.width/2;
    centerY = c.height/2;

    c.angleMode(c.DEGREES);
    for (let i=0; i<numPts+1; i++){
      let a = angleInc * i;
      let x = r * c.cos(a);
      let y = r * c.sin(a);
      circleObj.push({
        x: x + centerX,
        y: y + centerY
      })

    }
  
  }

  c.updateCircle = function (){
    for (let i=0; i<numPts+1; i++){
      let a = angleInc * i;
      let offset = 10*c.noise(i*.5, noiseoff);
      let rOff = r + offset;
      let x = rOff * c.cos(a);
      let y = rOff * c.sin(a);
      circleObj[i].x = x + centerX;
      circleObj[i].y = y + centerY;
    }
  };

  var opacitySteps = 30;
  var opacity = 1;
  var opacityDir = -1;
  var currFrame;

  c.draw = function () {
    c.background('#121213');
    c.strokeWeight(2)
    c.noFill();

    if (stateElusive){


      currFrame = c.frameCount % opacitySteps;
      if (currFrame == 0 && c.frameCount > 0){
        opacityDir = opacityDir*-1;
      } 
      opacity = opacityDir*currFrame/opacitySteps;
      //c.fill(40, 80+opacity*150);
      c.stroke(255, 80+opacity*150);
    }
    else {
      c.stroke(255, 180);
    }

    if (stateExp){
      if (r < 200){
        r = r*1.01;
      } else {
        r = 40;
      }
    }

    if (stateAmor){
      noiseoff += 0.08;
    }

    c.updateCircle();

 
    
    
   
     
    c.beginShape();
    for (let i = 0 ; i < circleObj.length; i++){
      var el = circleObj[i];
     
      c.vertex(el.x, el.y);
    }
    c.endShape();
    

  }
}


var divAll = document.querySelector('#vis-holder');
new p5(canvasAll, divAll);


