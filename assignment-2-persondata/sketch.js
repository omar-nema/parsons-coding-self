
// function setup() {
//     createCanvas(700, 700)   
// }

// function draw() {

// }

// function keyPressed() {
//     if (key == "a") {
//       save(frameCount + ".png");
//     }
// }


var containerDim = document.querySelector('.blob').getBoundingClientRect();

function canvasOne(c){
    c.setup = function () {
        cnv = c.createCanvas(containerDim.width,containerDim.height, c.WEBGL);
        c.background(0);
      }

    c.draw = function () {
     
        c.rotateX(c.PI/2.5)
        c.translate(0,0, c.width*.4);
        c.background(0);

        c.noLoop();
      
        c.noFill();
        col = c.color('#F587EA')
        col.setAlpha(120);
        c.stroke(col)
        c.strokeWeight(1);
    
        var numPts = 30;
        var rMax = c.width/3;
        var numCircles = 200;
        var hMax = c.height/2;
        var angleInner = 360/numPts;
        var angleZ = (c.PI)/(numCircles);
      
        c.beginShape();
        for (var j=0.2; j<c.PI*.98; j+= angleZ){
          
          var a = c.sin(j);
          var r = c.sin(a)*rMax;
          var h = (hMax/numCircles)*j/angleZ;
      
          for (var i=0; i<numPts; i++){
            var offset = c.map(c.noise(j, i, c.frameCount/300), 0, 1, -10, 10);
            r = r + offset;
            var aInner = angleInner*i;
            var x = r * c.cos(aInner);
            var y = r * c.sin(aInner);
            c.vertex(x, y, h-100); 
          }
        }
        c.endShape();
    } 
}

function canvasTwo(c){
    c.setup = function () {
        cnv = c.createCanvas(containerDim.width,containerDim.height, c.WEBGL);
        c.background(0);
      }

      c.draw = function () {

        c.noLoop();

        c.rotateX(c.PI/2)
        c.translate(0,0, c.width*.4);
        c.background(0);
      
        c.noFill();
        col = c.color('#86ffee')
        col.setAlpha(50);
        c.stroke(col)
        c.strokeWeight(1.5);
    
        var numPts = 30;
        var rMax = c.width/7;
        var numCircles = 200;
        var hMax = c.height/2;
        var angleInner = 360/numPts;
        var angleZ = (c.PI)/(numCircles);
      
        c.beginShape();
        for (var j=0.2; j<c.PI*.98; j+= angleZ){
          
          var a = c.sin(j);
          var r = c.sin(a)*rMax;
          var h = (hMax/numCircles)*j/angleZ;
      
          for (var i=0; i<numPts; i++){
            var offset = c.map(c.noise(j+500, i-1000, c.frameCount/400), 0, 1, -10, 10);
            r = r + offset;
            var aInner = angleInner*i;
            var x = r * c.cos(aInner);
            var y = r * c.sin(aInner);
            c.vertex(x, y, h-100); 
          }
        }
        c.endShape();
    }       
}

function canvasThree(c){
    c.setup = function () {
        cnv = c.createCanvas(containerDim.width,containerDim.height, c.WEBGL);
        c.background(0);
      }

      c.draw = function () {

        c.noLoop();
        c.rotateX(c.PI/2)
        c.translate(0,0, c.width*.4);
        c.background(0);
      
        c.noFill();
        col = c.color('#eafeb7')
        col.setAlpha(50);
        c.stroke(col)
        c.strokeWeight(1.5);
    
        var numPts = 30;
        var rMax = c.width/2;
        var numCircles = 200;
        var hMax = c.height/2;
        var angleInner = 360/numPts;
        var angleZ = (c.PI)/(numCircles);
      
        c.beginShape();
        for (var j=0.2; j<c.PI*.98; j+= angleZ){
          
          var a = c.sin(j);
          var r = c.sin(a)*rMax;
          var h = (hMax/numCircles)*j/angleZ;
      
          for (var i=0; i<numPts; i++){
            var offset = c.map(c.noise(j+8000, i-3000, c.frameCount/400), 0, 1, -10, 10);
            r = r + offset;
            var aInner = angleInner*i;
            var x = r * c.cos(aInner);
            var y = r * c.sin(aInner);
            c.vertex(x, y, h-100); 
          }
        }
        c.endShape();
    }         
}


var divOne = document.querySelector('#one');
new p5(canvasOne, divOne);

var divTwo = document.querySelector('#two');
new p5(canvasTwo, divTwo);

var divThree = document.querySelector('#three');
new p5(canvasThree, divThree);
