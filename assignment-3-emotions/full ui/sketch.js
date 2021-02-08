
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

        if (this.classList.contains('active')){
            var ind = emotionComp.indexOf(dataVal);
            emotionComp.splice(ind, 1);
            this.classList.remove('active');
        } else {
            emotionComp.push(dataVal);
            this.classList.add('active');
        }

   
    }


    var canvas = document.querySelector('.canvas-holder');
    var containerDim = canvas.getBoundingClientRect();
    new p5(drawCanvas, canvas);

    function drawCanvas(c){
        var width = containerDim.width - 2;
        var ht = containerDim.height - 2;
        var noiseOff = 0;

        c.setup = function () {
            cnv = c.createCanvas(width, ht);
            c.background(250);
            c.colorMode(c.HSB);
            c.rectMode(c.CENTER);
            c.prepFocus();
            c.prepAnxiety();
            c.prepAnger();
            c.prepSadness();
            c.prepJoy();
            c.prepShame();
            c.prepConfusion();
        }

        var joyArr = [];
        var colAdd = 0;
        var joyWidth = width/3;
        c.prepFocus = function(){      
            var numPts = 7;
            var angleInc = 360/numPts;
            var r = joyWidth;
            var ctrx = width/2;
            var ctry = ht/2;
            var rdiff = r/20;
            for (var i=0; i< numPts+1; i++){
                let a = angleInc * i;
                let x = r * c.cos(a) + c.random(-rdiff, rdiff);
                let y = r * c.sin(a) + 2*c.random(-rdiff, rdiff);
                joyArr.push({x: ctrx+x, y: ctry+y});
            }
       
        }
        c.drawFocus = function(){
            var numLayers = 10;
            var minB = 50;
            var maxB = 100; 
            var minSizeRatio = .7 ;
        
            c.push();
   
            c.stroke(50, 50);
            c.noStroke();
            c.fill(300,50,minB-3, 1);
     
            c.shearX(3)
            c.rect(width/2, ht/2, width/1.3, ht/1.3)
            c.pop();

            c.background(0,0,minB-2, 1);


            for (let i = 0; i<numLayers; i++){
                c.push();
                var currB = minB + i*(maxB - minB)/numLayers;
                var sizeRatio = minSizeRatio +(numLayers-i)*(1-minSizeRatio)/numLayers;
                c.fill(0,0,currB, 1);
                c.noStroke();
                c.shearX(3)

                c.beginShape()
                joyArr.forEach( (d, z) => {
                    var noisey = 0;
                    var noisex = 0;    
                    if (emotionComp.includes('anxiety') && !emotionComp.includes('fear')){
                        var noisex = c.map(c.noise(noiseOff, z), 0, 1, -.02, .02);
                        var noisey = c.map(c.noise(noiseOff, z+5000), 0, 1, -.2, .2);
                    }                     
                    d.x += noisex;
                    d.y += noisey;
             
                    c.curveVertex(d.x*sizeRatio, d.y*sizeRatio);

                
                })
                c.endShape();
                c.pop()

 
            }     

            
        }

        var angryArr = [];
        var blobWidth = width/2.7;
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
                angryArr.forEach((d, z)=> {
                    if (emotionComp.includes('anxiety')){
                        if (emotionComp.includes('fear')){
                            widthRatio += c.map(c.noise(noiseOff, z), 0, 1, -.02, .02);
                        } else if (emotionComp.includes('pride')){
                            widthRatio += c.map(c.noise(noiseOff, z), 0, 1, -.13, .13);
                        }
                        else {
                            widthRatio += c.map(c.noise(noiseOff, z), 0, 1, -.07, .07);
                        }
                        
                    }

                    c.vertex(d.x*widthRatio, d.y*widthRatio);
                })
                c.endShape(c.CLOSE);
                c.pop();
            }
    
        }

        var sadArr = [];
        var sadWidth = width/3;
        c.prepSadness = function(){
            var numPts = 50;
            var angleInc = 360/numPts;
            var r = sadWidth;
            var ctrx = width/2;
            var ctry = ht/2;
            var rdiff = r/10;
            for (var i=0; i< numPts+1; i++){
                let a = angleInc * i;
                let x = r * c.cos(a) + c.random(-rdiff, rdiff);
                let y = r * c.sin(a) + c.random(-rdiff, rdiff);
                sadArr.push({x: ctrx+x, y: ctry+y});
            }
        };
        c.drawSadness = function(){
            var numLayers = 3;
            var minB = 40;
            var maxB = 60; 
       
            var minSizeRatio = .7;
            var ratioInc = (1-minSizeRatio)/numLayers;

            for (let i = 0; i<numLayers; i++){
                c.push();
                var currB = minB + i*(maxB - minB)/numLayers;
                var widthRatio = 1 - ratioInc*i;
        
                if (emotionComp.includes('anxiety') && !emotionComp.includes('fear')){
                    widthRatio += c.map(c.noise(noiseOff), 0, 1, -.1, .1);
                } else if (emotionComp.includes('anxiety') && emotionComp.includes('fear')){
                    widthRatio += c.map(c.noise(noiseOff), 0, 1, -.02, .02);
                }
                var transAmt = (blobWidth - widthRatio*sadWidth);
    
                c.fill(0,0,currB, .15);
                c.noStroke();
                var sadTrans = (sadWidth - widthRatio*sadWidth);
                c.translate(sadTrans, sadTrans*2)
                c.beginShape()
                sadArr.forEach(d=> {
                    c.curveVertex(d.x*widthRatio, d.y*widthRatio);
                })
                c.endShape();
                c.pop()

            }    
        };

        //completementary drawing
        var anxietyArr = [];
        c.prepAnxiety = function(){
            for (var i = 0 ; i < 5000; i++){
                anxietyPt = {x: c.random(-width, width*2), y: c.random(-ht, ht*2)};
                anxietyArr.push(anxietyPt)
            }
        }
        c.drawAnxiety = function() {
            c.push();
            c.noFill();
            c.stroke(0,0, 0, .2);
            c.strokeWeight(.35);
            c.beginShape();
            anxietyArr.forEach((d, z)=> {
                var noisex = c.map(c.noise(noiseOff*2, z), 0, 1, -1, 1);
                var noisey = c.map(c.noise(noiseOff*2, z+5000), 0, 1, -1, 1);
                d.x += noisex;
                d.y += noisey;
                c.vertex(d.x, d.y);
            })
            c.endShape();
            c.pop();
        }
        c.drawLoneliness = function(){
            scaleFactorLonely = 0.2;
        }
        c.drawFear = function(){
            alphaGlobal = .15;
            scaleFactor = .6;
            c.push();
            c.noStroke();
    
            c.fill(0,0, 0, .65);
            c.rect(width/2,ht/2, width*scaleFactorLonely, ht*scaleFactorLonely);
            c.pop();
            //should the background be repeating
        }
        c.drawPride = function(){
            c.push();
            c.noFill();
            c.stroke('red');
            c.strokeWeight(14*scaleFactorLonely);
            c.rect(width/2,ht/2, width*scaleFactorLonely, ht*scaleFactorLonely);
            c.pop();
        };


        var joyArrReal = [];
        var zoff = 0;
        var yoff = 0;
        c.randomSeed(10);
        var scl = 6;
        var cols = c.floor(width / scl)
        var rows = c.floor(ht / scl);
        let inc = 0.1;
        c.prepJoy = function(){
            for (let y = 0; y < rows; y ++ ){
                var xoff = 0;
                yoff += inc;
                for (let x = 0; x < cols; x ++ ){        
                    c.push()
  
                    //col.setAlpha(c.random(1));
                    var namt = c.map(c.noise(x, y), 0, 1, 0, 360);
                    var angle = c.noise(xoff, yoff, zoff) * c.TWO_PI;
                    var v = p5.Vector.fromAngle(angle);
                    var joyObj = {
                        strokeWt: 10,
                        angle: angle,
                        translateX: x*scl,
                        translateY: y*scl,
                        rotate: v.heading(),
                        lineY: scl, 
                        color: c.color(c.random(40, 300), 85, 90, c.random(.2, 1))
                    }
                    joyArrReal.push(joyObj);
                    c.pop()
                    xoff += inc;
                }
            }
        }
        c.drawJoy = function(){            
            joyArrReal.forEach((d,z)=>{
                c.push();
                c.strokeWeight(d.strokeWt);
                c.stroke(d.color);
                c.translate(d.translateX, d.translateY)
                c.rotate(d.rotate);
                c.line(0, 0, d.lineY, 0);
                c.pop();
                if (emotionComp.includes('anxiety') && !emotionComp.includes('fear')){
                    d.rotate += .15;
                    // d.rotate += c.map(c.noise(z), 0, 1, - else.5, .5);
                } else if (emotionComp.includes('anxiety') && emotionComp.includes('fear')){
                    d.rotate += .07;
                }
            }); 

        
        }

     
        c.prepShame = function(){

        }
        c.drawShame = function(){

        }

        var confuseArr = [];
        let imgW = 200;
        let imgH = 200;
        let img = c.createImage(imgW, imgH);
        let imgScale = c.min(width/imgW, ht/imgH);
        c.prepConfusion = function(){
            for (y=0; y<imgH; y++){
                for (x=0;x<imgW; x++){
                    let col = c.color(0, 0, c.random(70, 130), .5);
                    confuseArr.push({
                        col: col,
                        x: x,
                        y: y
                    })
                }
            }
        };
        c.drawConfusion = function(){
            confuseArr.forEach((d,i) => {
                img.set(d.x, d.y, d.col); 
            })

            img.updatePixels();
            c.noSmooth(); 
            c.filter(c.BLUR)
            c.image (img, 0,0, imgW*imgScale, imgH*imgScale);

          
        };
    


        c.draw = function (){
         
            c.background(240);

            if (emotionCore == 'focus'){
                c.drawFocus();
            }  else if (emotionCore == 'sadness'){
                c.drawSadness();
            }
            else if (emotionCore == 'anger'){
                c.drawAnger();
            }
            else if (emotionCore == 'joy'){
                c.drawJoy();
            }     
            else if (emotionCore == 'shame'){
                c.drawShame();
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
            if (emotionComp.includes('confusion')){
                c.drawConfusion();
            }   
            if (emotionComp.includes('pride')){
                c.drawPride();
            } 
                              
            noiseOff += 0.05;
            
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