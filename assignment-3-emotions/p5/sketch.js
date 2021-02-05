//2 assets: this, and another is an atlast of emotions


var sadPts = [];

function setup() {
    createCanvas(500, 500);
    angleMode(DEGREES);

    var numPts = 12;
    var angleInc = 360/numPts;
    var r = width/3;
    var ctrx = width/2;
    var ctry = height/2;
    var rdiff = r/2;

    for (var i=0; i< numPts+1; i++){
        let a = angleInc * i;
        let x = r * cos(a) + random(rdiff, rdiff);
        let y = r * sin(a) + random(-rdiff, rdiff);
        sadPts.push({x: ctrx+x, y: ctry+y});
    }
}

var alphaGlobal = 255;

function draw() {
    //orbitControl();
    background(255);
    noLoop();
    
  


   
//    drawSadness();


   drawJoy();
  //drawAnxiety();

//    drawLoneliness();

   
   //drawFear();
}

function drawJoy(){
    noStroke();
    fill(240); 
    circle(width/2, height/2, 300)   
   fill(230); 
   circle(width/2, height/2, 250)   
   fill(200);
   circle(width/2, height/2, 200) 
   fill(150);
   circle(width/2, height/2, 150) 
  
}


function drawLoneliness(){
    //makes everything smaller
    //scale function
   
}

function drawSadness(){

 

    fill(50)
    stroke(0, 50)
    strokeWeight(2);
    noStroke();
   
    beginShape();

    sadPts.forEach(d=> {
        curveVertex(d.x, d.y);
    })
    // for (var i=0; i< numPts + 1; i++){

    //     let a = angleInc * i;
    //     let x = r * cos(a) + random(-r/3, r/3);
    //     let y = r * sin(a) + random(-r/3, r/3);
    //     //circle(ctrx+x, ctry+y, 5)
       
    // }
    endShape(CLOSE);


    beginShape();
    fill(150)
    sadPts.forEach(d=> {
        curveVertex(d.x*.98, d.y *.98);
    })
    endShape(CLOSE);

    beginShape();
    fill(240)
    sadPts.forEach(d=> {
        curveVertex(d.x*.95, d.y *.95);
    })
    endShape(CLOSE);
}

function drawFear(){
    var r = width/2;
    var ctrx = width/2;
    var ctry = height/2;

    var numPts = 4;
    var angleInc = 360/numPts;
    var diffAmt = r/5;

    fill(0, 200)
    rect(0,0, width, height)

    // strokeWeight(2);
    // fill(30, 190)
    // beginShape();
    // for (var i=0; i< numPts; i++){

    //     vertex(random(0, width), random(0, height));

    //     var deg = i*angleInc;
    //     let a = angleInc * i;
    //     let x = r * cos(a) + random(-diffAmt, diffAmt);
    //     let y = r * sin(a) + random(-diffAmt, diffAmt);
    //     vertex(ctrx+x, ctry+y);
    // }
    // endShape(CLOSE);

    // push ()
    // //stroke(0);
    // fill(30, 160);
    
    // numPts =  10;
    // beginShape();
    // for (var i=0; i< numPts; i++){
    //     var deg = i*angleInc;
    //     let a = angleInc * i;
    //     let x = r * cos(a) + random(-r/3, r/3);
    //     let y = r * sin(a) + random(-r/3, r/3);
    //     vertex(ctrx+x, ctry+y);
    // }
    // endShape(CLOSE);

    // pop ()
}

function drawAnxiety(){
    var ctrx = width/2;
    var ctry = height/2;
    var diffMax = width*.8;
    let numPts = 22;

    push ()
        stroke(50, 140);
        strokeWeight(1.5);
      
        var opacitySteps =3;

        //fill(0, opacityVal/5)
        // noFill();

        for (var z = 0; z < 1; z++){
            beginShape();
            for (var i=0; i< numPts; i++){
                diffx = random(-diffMax, diffMax);
                diffy = random(-diffMax, diffMax);
                vertex(ctrx+diffx, ctry+diffy);
            }
            endShape(CLOSE);
        }




    pop();



    // stroke(0);
    // strokeWeight(.2)
    // beginShape();
    // for (var i=0; i< 35; i++){
    //     diffx = random(-diffMax*.8, diffMax*.8);
    //     diffy = random(-diffMax*.8, diffMax*.8);
    //     vertex(ctrx+diffx, ctry+diffy);
    // }
    // endShape();

}

function keyPressed() {
    
    if (key == "a") {
      save(frameCount + ".png");
    }
}

//what if we had a single shape that shifts
//even w emotion combinations

// Sharp vs soft
// Complexity: number of points 
// Color (HSB)
// Texture --> flat vs 3d?
// Skew
// Opacity and stacking index Focus
