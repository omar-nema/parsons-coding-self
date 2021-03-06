function createPolygon(x, y, radius, npoints) {
    let angle = 360 / npoints;
    poly = new Polygon();
    for (let a = 0; a < 360; a += angle) {
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      poly.addVertex(sx, sy);
    }
    
    poly.close();
    poly.hankin();
    poly.show();
    return poly;
}


function Polygon(){
    this.edges = [];
    this.vertices = [];

    this.addVertex = function(x, y) {
        var a = createVector(x,y);
        if (this.vertices.length > 0){
            var prev = this.vertices[this.vertices.length-1];
            var edge = new Edge(prev, a);
            this.edges.push(edge);
        }
        this.vertices.push(a)
    }

    this.show = function(){
        for (var i=0; i< this.edges.length; i++){
            // this.edges[i].show();
            var e = this.edges[i]
            noFill()
            line (e.a.x, e.a.y, e.b.x, e.b.y);
            line (e.offset1.x, e.offset1.y, e.end.x, e.end.y)
            line (e.offset2.x, e.offset2.y, e.end2.x, e.end2.y)

        }
      
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



function Edge(a,b){

    this.a = a;
    this.b = b;
    this.h1;
    this.h2;
    this.offset1;
    this.offset2;
    this.end, this.end2;

    this.hankin = function(sides){
        //midpoint, and vectors from midpoint to edge
        var mid = p5.Vector.add(this.a, this.b)
        mid.mult(0.5);
        var v1 = p5.Vector.sub(this.a, mid);
    
        var elen = v1.mag() + paramDelta;
        var v2 = p5.Vector.sub(this.b, mid);
        var offset1 = mid;
        var offset2 = mid;
        if (paramDelta > 0){
            v1.setMag(paramDelta);
            v2.setMag(paramDelta);
            offset1 = p5.Vector.add(mid, v2);
            offset2 = p5.Vector.add(mid, v1);
        }
  
        angleMode(DEGREES)
        v1.normalize();
        v2.normalize();
        v1.rotate(radians(-paramAngle));
        v2.rotate(radians(paramAngle));

        var polygonAngle = ((sides - 2)*180) / sides;
        var edgeAngle = 180 - polygonAngle*.5 - paramAngle;
        hlen = (elen * sin(polygonAngle*.5))/sin(edgeAngle);
        v1.setMag(hlen);
        v2.setMag(hlen);

        this.offset1 = offset1;
        this.offset2 = offset2;
        this.end = p5.Vector.add(offset1, v1);
        this.end2 = p5.Vector.add(offset2, v2);

    }
}





