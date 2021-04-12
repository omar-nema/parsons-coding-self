let numRows = 50;
let numCols = 50;
let unitW;
let unitH;

function setup() {
    createCanvas(700, 700)   
    background(30);
    //angleMode(DEGREES)

}

var resx = 8;
var resy = 20;


function draw() {
    noLoop();

    let strwt = 3;

   var numLines = Math.round((width*1.4)/(2*strwt)) ;
   let numPts = 200;

   var ampStart = 70;
   var f = .005;
    var ampAdd = 20/(numPts)

   stroke(220);
   strokeWeight(strwt);
   noFill();

   for (x=-width*.2; x<width*1.2; x+=width*1.4/numLines){
        beginShape();
        ampStart = 15;
         f = .02;
       for (y=-height*.2; y<height*1.2; y+=1.4*height/numPts){
        // ampStart += ampAdd;
        if (y < height*.5){
            f += .00005;
        } else if (y < height*.75) {
            f += .0002;
           // ampStart += ampAdd;
        } else {
            f += .0003;
      
        }
       
        off = ampStart*sin(y*f);
        curveVertex(x+off, y );
 

        //console.log(offsetX);
        //offsetY = 4*sin(5*y);
    
  
       }
       endShape();
   }


}

  

function keyPressed() {
    if (key == "a") {
      save(frameCount + ".png");
    }
}