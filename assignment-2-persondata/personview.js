
var divScatter = document.querySelector('.att-viewer');
var scatterDim = divScatter.getBoundingClientRect();
new p5(canvasScatter, divScatter);

function canvasScatter(c){

    let personData;
    let textObj = [];
    let f;
    c.preload = function (){
        personData = c.loadTable('./personData.csv', 'csv', 'header');
        f = c.loadFont('./ibmmono.ttf');
    }

    c.setup = function () {
        cnv = c.createCanvas(scatterDim.width,scatterDim.height);
        personData.rows.forEach(d=>{
            textObj.push({
                obj: d.obj,
                x: c.random(-c.width, 2*c.width),
                y: c.random(-c.height, 2*c.height),
                xDir: c.round(c.random(0, 1)),
                yDir: c.round(c.random(0, 1)),
                vel: c.random(0.2, .4)
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
       
        textObj.forEach(d=>{

            let bbox = f.textBounds(d.obj.value, d.x, d.y);

       
            if (d.obj.category == 'external'){
                c.stroke('red')

            } else if (d.obj.category == 'internal'){
                c.stroke('blue')
            } 
            
   
            
            var textWid = c.textWidth(d.obj.value);
            var numLines = c.ceil(textWid / maxTextWidth);
     
            //c.rect(bbox.x, bbox.y, c.min(c.textWidth(d.obj.value), maxTextWidth), c.textAscent() * numLines );

            c.fill(180, 240);
            c.text(d.obj.value, d.x, d.y, maxTextWidth);

           
            
            if (d.x > c.width){
                d.xDir = 0;
            } else if (d.x < 0){
                d.xDir = 1;           
            }
            if (d.y > c.height){
                d.yDir = 0;
            }else if (d.y < 0){
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
