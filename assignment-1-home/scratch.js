
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
    
  }
}



// var divElusive = document.querySelector('#body-elusive');
// new p5(canvasElusive, divElusive);

// var divExpansive = document.querySelector('#canvas-expansive');
// new p5(canvasExpansive, divExpansive)

// var divAmor = document.querySelector('#canvas-amorphous');
// new p5(canvasAmor, divAmor);


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