var containerDim = document.querySelector('.card-visual').getBoundingClientRect();
let circleX = containerDim.width/2;
let circleY = containerDim.height/2;
let xSpeed = 2;
let ySpeed = 2;
let xDir = 1;
let yDir = 1;


let elusiveHover = false;
document.querySelector('.card.elusive').onmouseover = ()=> {
  elusiveHover = true;
}
document.querySelector('.card.elusive').onmouseout = function () {
  elusiveHover = false;
}

let amorHover = false;
document.querySelector('.card.amor').onmouseover = ()=> {
  amorHover = true;
}
document.querySelector('.card.amor').onmouseout = function () {
  amorHover = false;
}

let expHover = false;
document.querySelector('.card.expansive').onmouseover = ()=> {
  expHover = true;
}
document.querySelector('.card.expansive').onmouseout = function () {
  expHover = false;
}

function canvasElusive(c) {

  c.setup = function () {
    cnv = c.createCanvas(containerDim.width,containerDim.height);
  }

  c.draw = function () {
    c.background(20);

    if (elusiveHover){
      let offset = 40;
      if (circleX > c.width + offset &&  xDir == 1){
        xDir = xDir*-1;
      } 
      else if (circleX < -offset &&  xDir == -1){
        xDir = xDir*-1;
      } 
      if (circleY > c.height + offset &&  yDir == 1){
        yDir = yDir*-1;
      } 
      else if (circleY < -offset &&  yDir == -1){
        yDir = yDir*-1;
      } 
      circleX += (xSpeed * xDir);
      circleY += (ySpeed * yDir);
    }

    
    c.fill(40);
    c.strokeWeight(1.5)
    c.stroke(255, 180);
    c.circle(circleX, circleY, 80, 80)


    // stuff to draw
  }
}

function canvasExpansive(c){

  let diam = 80;

  c.setup = function () {
    cnv = c.createCanvas(containerDim.width,containerDim.height);
  }


  c.draw = function () {
    c.background(20);

    c.fill(40);
    c.strokeWeight(1.5)
    c.stroke(255, 180);
    c.circle(c.width/2, c.height/2, diam, diam)

    if (expHover){
      if (diam < c.width*.8){
        diam = diam*1.01;
      } else {
        diam = 80;
      }
    }

  }
}

function canvasAmor(d) {

  let r = 40;
  let numPts = 50;
  let angleInc = 360/numPts;
  let noiseoff = 0;
  let circleObj = [];

  d.setup = function () {
    d.createCanvas(containerDim.width,containerDim.height);
    d.angleMode(d.DEGREES);
    for (let i=0; i<numPts+1; i++){
      let a = angleInc * i;
      let x = r * d.cos(a);
      let y = r * d.sin(a);
      circleObj.push({
        x: x,
        y: y
      })

    }
    noiseoff += 0.05;
  }

  d.updateCircle = function () {
    for (let i=0; i<numPts+1; i++){
      let a = angleInc * i;
      let offset = 10*d.noise(i*.5, noiseoff);
      let rOff = r + offset;
      let x = rOff * d.cos(a);
      let y = rOff * d.sin(a);
      circleObj[i].x = x;
      circleObj[i].y = y;
    }
    noiseoff += 0.05;
  }
 

  d.draw = function () {
    d.background(20);
  
    d.fill(50);
    d.stroke(255)
    d.strokeWeight(1);
    d.translate(containerDim.width/2, containerDim.height/2);

    if (amorHover){
      d.updateCircle();
    }
    
  
    d.beginShape();
    for (let i = 0 ; i < circleObj.length; i++){
      var el = circleObj[i];
     
      d.vertex(el.x, el.y);
    }
    d.endShape();
    
    
    // for (let i=0; i<numPts+1; i++){
    //   let a = angleInc * i;
    //   if (amorHover){
    //     offset = 10*d.noise(i*.5, noiseoff);
    //   } 
    //   rOff = r + offset;

    //   x = rOff * d.cos(a);
    //   y = rOff * d.sin(a);

    //   if (i==10){
    //     console.log(x)
    //   }
    //   d.vertex(x, y);
    // }
    // d.endShape();

    // noiseoff += 0.05;
   
    // stuff to draw
  }
}



var divElusive = document.querySelector('#body-elusive');
new p5(canvasElusive, divElusive);

var divExpansive = document.querySelector('#canvas-expansive');
new p5(canvasExpansive, divExpansive)

var divAmor = document.querySelector('#canvas-amorphous');
new p5(canvasAmor, divAmor);




// var canvasExp = document.querySelector('#canvas-expansive');
// new p5(canvasAmor, amor)


// function setup() {
//     createCanvas(700, 700)   
//     background(150)
// }

// function draw() {

// }

// function keyPressed() {
//     if (key == "a") {
//       save(frameCount + ".png");
//     }
// }