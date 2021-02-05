
var emotionCore = null;
var emotionComp = [];
var alphaGlobal = 1;
var scaleFactor = 1;
var scaleFactorLonely = 1;

document.addEventListener("DOMContentLoaded", function(){
    // UI FUNCTIONS

    var selcore = document.querySelectorAll('.emotion-btns.core .emotion-btn');
    for (btn of selcore){
        btn.addEventListener('click', coreBtnClick)
    }

    var selcomp = document.querySelectorAll('.emotion-btns.comp .emotion-btn');
    for (btn of selcomp){
        btn.addEventListener('click', compBtnClick)
    }

    function coreBtnClick(d){
        var dataVal = this.getAttribute('data');
        emotionCore = dataVal;
        for (el of selcore){
            el.classList.remove('active');
        }
        this.classList.add('active');
    }

    function compBtnClick(d){
        var dataVal = this.getAttribute('data');
        emotionComp.push(dataVal);
        this.classList.add('active');
    }


    var canvas = document.querySelector('.canvas-holder');
    var containerDim = canvas.getBoundingClientRect();
    new p5(drawCanvas, canvas);

    function drawCanvas(c){
        var width = containerDim.width - 2;
        var ht = containerDim.height - 2;

        c.setup = function () {
            cnv = c.createCanvas(width, ht);
            c.background(250);
            c.colorMode(c.HSB);
            c.rectMode(c.CENTER);
            c.prepJoy();
            c.prepAnxiety();
            c.prepAnger();
          }

      
   
        var anxietyArr = [];
        c.prepAnxiety = function(){
            for (var i = 0 ; i < 100; i++){
                anxietyPt = {x: c.random(-width, width*2), y: c.random(-ht, ht*2)};
                anxietyArr.push(anxietyPt)
            }
        }
        var joyArr = [];
        c.prepJoy = function(){      
            var numPts = 7;
            var angleInc = 360/numPts;
            var r = width/3;
            var ctrx = width/2;
            var ctry = ht/2;
            var rdiff = r/10;
            for (var i=0; i< numPts+1; i++){
                let a = angleInc * i;
                let x = r * c.cos(a) + c.random(-rdiff, rdiff);
                let y = r * c.sin(a) + 2*c.random(-rdiff, rdiff);
                joyArr.push({x: ctrx+x, y: ctry+y});
            }
       
        }
        c.drawJoy = function(){

            var numLayers = 5;
            var minB = 30;
            var maxB = 100; 
            var minSizeRatio = .75;
            for (let i = 0; i<numLayers; i++){
                var currB = minB + i*(maxB - minB)/numLayers;
                var sizeRatio = minSizeRatio +(numLayers-i)*(1-minSizeRatio)/numLayers;
                c.fill(0,0,currB);
                c.noStroke();
                c.push()
                c.beginShape()
                joyArr.forEach(d=> {
                    c.curveVertex(d.x*sizeRatio, d.y*sizeRatio);
                })
                c.endShape(c.CLOSE);
                c.pop()
            }     
        }
        c.drawFear = function(){
            alphaGlobal = .2;
            scaleFactor = .6;
            c.push();
            c.noStroke();
            c.fill(0,0, 0, .5);
            c.rect(width/2,ht/2, width*scaleFactorLonely, ht*scaleFactorLonely);
            c.pop();
            //should the background be repeating
        }

        c.drawPride = function(){
            c.push();
            c.noFill();
            c.stroke(0,0, 0, 1);
            c.strokeWeight(14*scaleFactorLonely);
            c.rect(width/2,ht/2, width*scaleFactorLonely, ht*scaleFactorLonely);
            c.pop();
        };

        c.drawAnxiety = function() {
            c.push();
            c.noFill();
            c.stroke(0,0, 0, .2);
            c.strokeWeight(1);
            c.beginShape();
            anxietyArr.forEach(d=> {
                c.vertex(d.x, d.y);
            })
            c.endShape();
            c.pop();
        }

        c.drawLoneliness = function(){
            scaleFactorLonely = 0.2;
        }

        var angryArr = [];
        var blobWidth = width/2.5;
        c.prepAnger = function(){
            var numPts = 30;
            var angleInc = 360/numPts;
            var r = blobWidth;
            var ctrx = width/2;
            var ctry = ht/2;
            var rdiff = r/3;
            for (var i=0; i< numPts+2; i++){
                let a = angleInc * i;
                let x = r * c.cos(a) + c.random(-rdiff, rdiff);
                let y = r * c.sin(a) + c.random(-rdiff, rdiff);
                angryArr.push({x: ctrx+x, y: ctry+y});
            }
        }
        c.drawAnger = function(){
            var minB = 60;
            var maxB = 100;
            var angryLayers = 100;
            var fillInc = (maxB-minB)/angryLayers;
            var minRatio = .8;
            var ratioInc = (1-minRatio)/angryLayers;
            for (var i=0; i<angryLayers; i++){
                c.push();
                var currB = minB + fillInc*i;
                var widthRatio = 1 - ratioInc*i;
                var col = c.color(0,0,currB, .15);
                c.strokeWeight(.1);
                c.fill(col);
                var transAmt = (blobWidth - widthRatio*blobWidth);
                c.translate(transAmt, transAmt*2)
                c.beginShape();
                angryArr.forEach(d=> {
                    c.vertex(d.x*widthRatio, d.y*widthRatio);
                })
                c.endShape(c.CLOSE);
                c.pop();
            }
    
        }
     

        c.draw = function (){
         
            c.background(240);

            if (emotionCore == 'joy'){
                c.drawJoy();
            }  else if (emotionCore == 'sadness'){
                c.drawSadness();
            }
            else if (emotionCore == 'anger'){
                c.drawAnger();
            }
            
        
  
            if (emotionComp.includes('loneliness')){
                c.drawLoneliness();
            }   
            if (emotionComp.includes('anxiety')){
                c.drawAnxiety();
            }     
            if (emotionComp.includes('fear')){
                c.drawFear();
            } 
            if (emotionComp.includes('pride')){
                c.drawPride();
            }             
         
        }  
    }

  });


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