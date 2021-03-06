

var c = document.getElementById('paperCanvas');
var cnvW = c.width/2;
var cnvH = c.height/2;


//defaults w/ big arrange
// var paramDelta = 0;
// var paramAngle = 45;
// var paramSides = 6;
// var paramSize = cnvW/2;
// var paramScale = 10;

//defaults w/ small arrange
var paramDelta = 0;
var paramAngle = 42;
var paramSides = 8;
var paramScale = 21;
var paramSize = 90;

settings = QuickSettings.create(550, 100, 'Islamic');
settings.addRange('angle', 0, 90, paramAngle, 1);      
settings.addRange('delta',-20, 20, paramDelta, .1)
settings.addRange('size', 0, 150, paramSize, 2)
settings.addRange('sides', 4, 20, paramSides, 2);   
settings.addRange('scale', 2, 50, paramScale, 1);   

// drawAllShapes();


settings.setGlobalChangeHandler(function(d){
    var s = settings.getValuesAsJSON();
    paramDelta = s.delta;
    paramSides = s.sides;
    paramAngle = s.angle;
    paramSize = s.size;
    paramScale = s.scale;
    //drawAllShapes();
    drawBg();
})


drawBg();

//drawAllShapes();

function drawBg(){
    project.clear();
    var u = paramScale;
    var widthInc = cnvW / u;
    var htInc = cnvH / u;

    var colors = [
     
        '#d7a000', //yellow
        '#CA32b4', //purple
        '#7FBc6f', //green
        '#c088da', //pink
        // '#c49800', //yellow again
        '#006eb2', //blue
        '#fe7b41', //orange
        '#008a95', //teal
    ];
   

    for (var y=0; y<u+1; y++){
               
    
        for (var x=0; x<u+1; x++){
           
            var currCol = colors[Math.floor(Math.random() * colors.length)];
            console.log(currCol)
            createPoly(x*widthInc,y*htInc, paramSize, paramSides, currCol, 0, 0.5);
        }
    }

   
    
}

t = new Tool();
 t.onKeyUp = function(event) {
     console.log(event)
    if(event.character == "p") {
        console.log('downloading');
        downloadAsSVG();
    }

}   

var downloadAsSVG = function (fileName) {
   
    if(!fileName) {
        fileName = "paperjs_example.svg"
    }
 
    var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({asString:true}));
    
    var link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.click();
 }

 



function drawAllShapes(){
    project.clear();
    var numPolygons = 8;
    var colors = [
     
        '#d7a000', //yellow
        '#CA32b4', //purple
        '#7FBc6f', //green
        '#c088da', //pink
        '#c49800', //yellow again
        '#006eb2', //blue
        '#fe7b41', //orange
        '#008a95', //teal
  
    ];

    var rotateAmt = 0;
    var sizeFrac = .8;
    for (var z=0; z<numPolygons; z++){

      
        // paramSize -= 20;
        // paramSize = cnvW*.4 + Math.random()*cnvW/20;
        // paramSize = cnvW/2;
        //paramSize -= 8;
        // paramSide += 2;
        //paramSides = 6 + Math.random()*4;
   
        paramAngle += 2;

        // paramDelta += 3;
        // paramAngle += 1;
        //paramAngle = 30 + Math.random()*30;
        var numShapes = 200;
        //sizeFrac += 0.02;
        var inc = paramSize*sizeFrac/(numShapes);
        var opacityInc = inc*(1/paramSize);
        
        rotateAmt+=2;
        for (var i=paramSize*(1-sizeFrac); i<paramSize; i+= inc){
            var opacityVal = i/paramSize*.3;
            var col = new Color(colors[z-1]);
            
            col.alpha = opacityVal;
            //rotateAmt += Math.random()*.2;
            createPoly(cnvW/2 + Math.random(),cnvH/2 + Math.random(), i, paramSides, col, rotateAmt, 0.5);
        }
    }

   
}

///polygon tings
function createPoly(x, y, radius, npoints, color, angleRotation, strokeWt) {
    var angle = 360 / npoints;
    poly = new Polygon(color, angleRotation, strokeWt);
    for (var a = 0; a < 360; a += angle) {
      var aRad = a * Math.PI / 180;
      var sx = x + Math.cos(aRad) * radius;
      var sy = y + Math.sin(aRad) * radius;
      poly.addVertex(sx, sy);
    }
    
    poly.close();
    poly.hankin();
    poly.show();
    return poly;
}

function Edge(a,b){

    this.a = a;
    this.b = b;
    this.h1;
    this.h2;
    this.offset1;
    this.offset2;
    this.end, this.end2;

    this.hankin = function(sides){

        var mid = (this.a + this.b) * 0.5;
        var v1 = this.a - mid;
        var elen = v1.length + paramDelta;
        var v2 = this.b - mid;
        var offset1 = mid;
        var offset2 = mid;

        if (paramDelta > 0){
            v1.length = paramDelta;
            v2.length = paramDelta;
            offset1 = mid + v2;
            offset2 = mid + v1;
        }

        v1 = v1.normalize();
        v2 = v2.normalize();
        v1 =  v1.rotate(-paramAngle);
        v2 =  v2.rotate(paramAngle);
        //rotation puts them out of sync

        var polygonAngle = ((sides - 2)*180) / sides;
        var edgeAngle = 180 - polygonAngle*.5 - paramAngle;

        var polygonAngleRadians = polygonAngle * Math.PI / 180;
        var edgeAngleRadians = edgeAngle * Math.PI / 180;
        hlen = (elen * Math.sin(polygonAngleRadians*.5)  )/Math.sin(edgeAngleRadians);
        v1.length = hlen;
        v2.length = hlen;
         
        this.offset1 = offset1;
        this.offset2 = offset2;
        this.end = offset1 + v1;
        this.end2 = offset2 + v2;

    }
}

function Polygon(strokeCol, angleRotation, strokeWt){
    this.edges = [];
    this.vertices = [];

    this.addVertex = function(x, y) {
        var a = new Point(x,y)
        if (this.vertices.length > 0){
            var prev = this.vertices[this.vertices.length-1];
            var edge = new Edge(prev, a);
            this.edges.push(edge);
        }
        this.vertices.push(a)
    }

    if (!strokeWt){
        strokeWt = 0.3;
    }


    this.show = function(){

        var compPath = new CompoundPath();
        compPath.style = {
            strokeColor: strokeCol,
            strokeWidth: strokeWt,
            strokeOpacity: 1,
        }
        //compPath.blendMode = 'multiply';
        //compPath.dashArray = [4, 2];
  

        for (var i=0; i< this.edges.length; i++){
            // this.edges[i].show();
            var e = this.edges[i];
            var p1 = new Path.Line({
                from: new Point(e.a.x, e.a.y),
                to: new Point(e.b.x, e.b.y),
                // strokeColor: 'rgba(0,0,0, .05)'
            });
        
            var p2 = new Path.Line({
                from: new Point(e.offset1.x, e.offset1.y),
                to: new Point(e.end.x, e.end.y),
                strokeColor: 'rgba(0,0,0, 1)'
            });
           
            var p3 = new Path.Line({
                from: new Point(e.offset2.x, e.offset2.y),
                to: new Point(e.end2.x, e.end2.y),
                strokeColor: 'rgba(0,0,0, 1)'
            });  
          
      
            compPath.addChild(p2);
            compPath.addChild(p3);
            // compPath.add(new Point(e.a.x, e.a.y));
            // compPath.add(new Point(e.b.x, e.b.y));
            // compPath.add(new Point(e.offset1.x, e.offset1.y));
            // compPath.add(new Point(e.end.x, e.end.y));
            // compPath.add(new Point(e.offset2.x, e.offset2.y));            
            // compPath.add(new Point(e.end2.x, e.end2.y));
            // compPath.add(new Point(e.a.x, e.a.y))                    
        }
        compPath.rotate(angleRotation);  
        //compPath.simplify();  
        compPath.smooth({ type: 'continuous' });
        
    }

    this.close = function(){
        var lastEdge = this.vertices[this.vertices.length -1];
        var firstEdge = this.vertices[0];
        var edge = new Edge(lastEdge, firstEdge);
        this.edges.push(edge);
    }

    this.hankin = function(){
        for (i=0; i<this.edges.length;i++){
            this.edges[i].hankin(this.edges.length);
        }
    }

}

