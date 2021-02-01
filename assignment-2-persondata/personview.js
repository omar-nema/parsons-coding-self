
var divScatter = document.querySelector('.att-viewer');
var scatterDim = divScatter.getBoundingClientRect();
new p5(canvasScatter, divScatter);

function canvasScatter(c){

    let personData;
    let collageObj = [];
    let f;
    let imgNames = ['img1.jpg', 'img2.PNG', 'img3.jpg', 'img4.jpg', 'img5.PNG', 'img6.JPG', 'img7.JPG', 'img8.JPG', 'img9.JPG', 'img10.JPG', 'img11.JPG', 'img12.JPG']
    let imgs = [];
    c.preload = function (){
        personData = c.loadTable('./persondata.csv', 'csv', 'header');
        f = c.loadFont('./ibmmono.ttf');
  
    }

    c.setup = function () {
        cnv = c.createCanvas(scatterDim.width,scatterDim.height);

        let sizeMaxImg = c.width/3;
        c.angleMode(c.DEGREES);

        imgNames.forEach(d=> {
            var imgDir = './imgs/' + d; 
            var img = c.loadImage(imgDir);
            img.resize(300, 0);
            var w = img.width;
            var h = img.height;
            var ratio = c.min(img.width/sizeMaxImg, img.height/sizeMaxImg);
            
            collageObj.push({
                type: 'image',
                image: img,
                x: c.random(-c.width, 2*c.width),
                y: c.random(-c.height, 2*c.height),
                w: img.width/ratio,
                h: img.height/ratio,
                xDir: c.round(c.random(0, 1)),
                yDir: c.round(c.random(0, 1)),
                vel: c.random(0.2, .4),
                rotate: c.random(-.5, 0.5),
                shear: 0
            })
        })

        personData.rows.forEach(d=>{
            collageObj.push({
                type: 'text',
                obj: d.obj,
                x: c.random(-c.width, 2*c.width),
                y: c.random(-c.height, 2*c.height),
                xDir: c.round(c.random(0, 1)),
                yDir: c.round(c.random(0, 1)),
                vel: c.random(0.2, .4),
                rotate: c.random(-2, 2),
                shear: c.random(-.5, .5)
            })
        });


        c.drawingContext.shadowOffsetX = 5;
        c.drawingContext.shadowOffsetY = -5;
        c.drawingContext.shadowBlur = 10;
        c.drawingContext.shadowColor = 'black';

          c.textSize(12);
          font = c.textFont(f);

      }

      c.draw = function () {
        c.background(0);  
        var maxTextWidth = c.width/2;


        collageObj.forEach(d=>{

            c.rotate(d.rotate);
            c.shearX(d.shear);

            if (d.type == 'text'){
                c.stroke(180);

                // if (d.obj.category == 'external'){
                //     // c.stroke('#c2cd0c')
                   
                // } else if (d.obj.category == 'internal'){
                //     c.stroke('blue');
                // } 
                c.fill(255, 240);
                c.text(d.obj.value, d.x, d.y, maxTextWidth);
            } else if (d.type == 'image'){
                c.image(d.image, d.x, d.y, d.w, d.h);
            }


            if (d.x > 1.5*c.width){
                d.xDir = 0;
            } else if (d.x < -c.width/2){
                d.xDir = 1;           
            }
            if (d.y > c.height*1.5){
                d.yDir = 0;
            }else if (d.y < -c.height/2){
                d.yDir = 1;           
            }
      
            if (d.xDir == 1){
                d.x += d.vel;
            } else {
                d.x -= d.vel;
            }

            if (d.yDir == 1){
                d.y += d.vel;
            } else {
                d.y -= d.vel;
            }

        })
        
       
    }         
}





// async function parseData() {
//     return await d3.csv('./persondata.csv');
// }


// parseData().then(d=> {
//     var holder = d3.select('.att-viewer');
//     var personData = holder
//         .selectAll('.person-data')
//         .data(d)
//         .join('div')
//         .attr('class', 'person-data')
//         .text((d)=> {
//             return d.value;
//         })
//         .style('top', d =>{
//             var randPct = Math.round(Math.random()*100);
//             return randPct.toString() + '%'
//         })
//         .style('left', d =>{
//             var randPct = Math.round(Math.random()*100);
//             return randPct.toString() + '%'
//         })        
//         .style('background', d=> {
//             if (d.category == 'appearance'){
//                 return 'red';
//             } else if (d.category == 'demeanor'){
//                 return 'blue';
//             }else if (d.category == 'thought'){
//                 return 'green';
//             }
//         })
//         ;

//     return personData;    
// }).then(pd=> {

//     for (var i =0; i< 1000; i++){
//         pd.each(function (d,z) {
//             var currTop = parseInt(d3.select(this).style('top'));
//             currTop += 2 ;
//             var newPct = currTop.toString() + '%';
//             if (z == 0 ){
//                 console.log(newPct)
//             }
//             d3.select(this).style('top', newPct)
//         })
//     }
// })
