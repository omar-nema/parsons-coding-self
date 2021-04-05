let numRows = 50;
let numCols = 50;
let unitW;
let unitH;

function setup() {
    createCanvas(900, 900)   
    background(240);
    angleMode(DEGREES)
    unitW = width/numCols;
    unitH = height/numRows;
}

var noiseMult = 0.02;

function draw() {
    noLoop();
    var fillstart = 80;
    noStroke();

    //noise field
    for (var y=0; y<numRows; y++){
        for (var x=0; x<numCols; x++){

            var noiseVal = noise(x*noiseMult, y*noiseMult);

            
            push ()
            //noise field
            var col = color( fillstart+ map(noiseVal, 0, 1, -30, 50) );
            
            fill(col);
            stroke(col);
        
            rect(x*unitW, y*unitH, unitW, unitH);
            pop ();


            push ()

            //shape
            let rectW = unitW/2;
            let rectH = unitH/2;
            rectMode(CENTER);
            stroke(255);
            translate(x*unitW, y*unitH);
            shearX(map(noise(x*noiseMult)*2, 0, 1, -20, 20))
            shearY(map(noise(y*noiseMult)*2, 0, 1, -20, 20))
      
            noFill();


            strokeWeight(0.3);
            stroke(255, 60);

            let n = map(noise(x*noiseMult, y*noiseMult)*3, 0, 1, -rectW/5, rectW/5);
            //let n = 0;
            if (x < 10){
                console.log(n, rectW)
            }
            beginShape();
         
 
            vertex(0,0);
            vertex(rectW+n, 0);
            vertex(rectW+n, rectH+n);
            vertex(0, rectH+n);
            vertex(0,0);
            endShape(CLOSE);
    

            pop ();
        }    
    }


    //try smaller
    //try points


}

function keyPressed() {
    if (key == "a") {
      save(frameCount + ".png");
    }
}