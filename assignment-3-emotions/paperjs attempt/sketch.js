

function randColor(){
    return new Color({ hue: Math.random()*210+150, saturation: .8, brightness: .8 });
}

function createBlobPath(center, numPoints, radius, radiusDelta){
    var path = new Path();
    path.closed = true;
    for (var i=0; i<numPoints; i++){
        //var r = radiusMin + Math.random()*radiusDelta;
        var r = radius + Math.random()*radiusDelta;
        var delta = new Point({
            length: r,
            angle: (360/numPoints)*i
        });
        path.add(center + delta);
    }
    path.smooth();
    return path;
}


var ptsMin = 3;
var ptsDelta = 3;
var center = new Point(250, 250);
var centerDelta = 0;

var gridscl = 5;
var unitSize = 400/gridscl;
var radiusMin = unitSize/8;
var radiusDelta = radiusMin*2;



var blobsPerSpace = 3;



function createBlobs(){

    var blob = createBlobPath(center, 33, 70, 20);
    blob.style = {
        strokeColor: 'black',
        strokeWidth: .2,
        fillColor: randColor(),
    };

    blob.style

    //try changing the size
  

    // for (var y=0; y<gridscl; y++){
    //     for (var x=0; x<gridscl; x++){
    //         var blobCenter = new Point(x*unitSize+unitSize/2, y*unitSize+unitSize/2);
    //         var blobNumPts = ptsMin + Math.round(Math.random()*ptsDelta);
    //         //var blobCenter = center + Math.round(Math.random()*centerDelta);
    //         var blobRadius = radiusMin  + Math.round(Math.random()*radiusDelta);
    //         var col = randColor();
    //         var alphaStart = .9;
    //         var alphaStroke = .9;
    //         for (var i=0; i < blobsPerSpace; i++){
    //             var blob = createBlobPath(blobCenter, blobNumPts, blobRadius);
    //             blob.style = {
    //                 strokeColor: 'black',
    //                 strokeWidth: .2,
    //                 fillColor: col,
    //             };
              
    //             blob.fillColor.alpha = alphaStart;
    //             blob.strokeColor.alpha = alphaStroke;

    //             alphaStart -= 2/blobsPerSpace;
    //             // alphaStroke -= 1/(blobsPerSpace*2.5);
    //             blobRadius *= 0.9;
    //         }
      
            
    //     }
    // };


    // var blobNumPts = ptsMin + Math.round(Math.random()*ptsDelta);
    // var blobCenter = center + Math.round(Math.random()*centerDelta);
    // var blobRadius = radiusMin  + Math.round(Math.random()*radiusDelta);
    // var blob = createBlobPath(blobCenter, blobNumPts, blobRadius);
    // blob.style = {
    //     strokeColor: 'black',
    //     fillColor: 'black',
    // };
    

}


createBlobs();