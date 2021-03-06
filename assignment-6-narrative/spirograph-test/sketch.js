


var poly;
var paramAngle, paramDelta, paramRadius, paramShape, paramColor, paramScale;

var sliderAngle, sliderDelta, sliderRadius, sliderShape, sliderColor, sliderScale;
var btnSubmit;

function setup() {
    createCanvas(300, 300)   
    background(255)
    angleMode(DEGREES);

    console.log('p5 reporting for duty')

    paramDelta = 2;
    paramAngle = 30;
    paramShape = 5;

    // createP ('Angle')
    // sliderAngle = createSlider(0, 90, 30, 10);

    // createP ('Center Offset')
    // sliderDelta = createSlider(0, 20, 0, 1);

    // createP ('Shape')
    // sliderShape = createSlider(3, 30, 4, 1); 

    createP ('Size')
    sliderRadius = createSlider(width/4, width/2, 10, 1); 

 
    createP ('Color')
    sliderColor = createColorPicker('#000000'); 

    // createP ('Scale')
    // sliderScale = createSlider(1, 50, 10, 1);    

    // btnSubmit = createButton('Submit')
    // btnSubmit.mousePressed(redraw)
}









function updateParams(){
    // paramAngle = sliderAngle.value();
    // paramDelta = sliderDelta.value();
    // paramShape = sliderShape.value();

    paramRadius = sliderRadius.value();
    //paramScale = sliderScale.value();    
    paramColor = sliderColor.value();
}




//remove me 
function draw() {

  noLoop();
  background(255);
  updateParams();
  col = color(paramColor);
  col.setAlpha(140);
  stroke(col);
  strokeWeight(.5)




  createPolygon(width/2,height/2, paramRadius, 5)
    // createPolygon(width/2,height/2, paramRadius*.75, paramShape)

    //createPolygon(width/2-width/20,height/2-height/20, paramRadius, paramShape)
 

}




///use p5 to create polygon data






