document.addEventListener("DOMContentLoaded", function() {
  

  

    // let floorPlan;
    // let svg = d3.select('svg.floor-plan');
    // let svgDim = svg.node().getBoundingClientRect()
  
    // d3.csv('./floor-plan.csv', d =>  d).then( data => {

    //   let dataNested = d3.groups(data, d=> d.room, d=>d.parentObject);
    //   console.log(dataNested)
    //   let rooms = svg.selectAll('.room').data(dataNested, d=>d[0])
    //   .join('svg')
    //   .each(function(d){
    //     let width, height, x, y;
    //     if (d[0] == 'bedroom'){
    //       width = '60%';
    //       height = '60%';
    //       x = '40%';
    //       y = '0%';
    //     } else if (d[0]=='office'){
    //       width = '36%';
    //       height = '60%';
    //       x = '0%';
    //       y = '0%';
    //     }
    //     d3.select(this)
    //       .attr('class', 'room-container')
    //       .attr('width', width)
    //       .attr('height', height)
    //       .attr('x', x)
    //       .attr('y', y)
    //     .append('rect')
    //       .attr('class', 'room')
    //       .attr('width', '100%')
    //       .attr('height', '100%')
    //       .attr('stroke', 'gray')  
    //   })
     
    //   ;

    //   rooms.each(function(d){
    //     console.log(d)
    //   });


    //   function toPercent(x){
    //     return (100*x).toString() + '%';
    //   }

    //   function addObjectProperties(currSel, obj){
    //     currSel
    //       .attr('width', d=> toPercent(obj.sizeX))
    //       .attr('height', d=> toPercent(obj.sizeY))
    //       .attr('x', d=> toPercent(obj.coordX))
    //       .attr('y', d=> toPercent(obj.coordY))
    //       .attr('stroke', 'gray')
    //     .append('rect')
    //       .attr('class', 'room')
    //       .attr('width', '100%')
    //       .attr('height', '100%')
    //       .attr('stroke', 'gray')
    //   }

    //   let objectsParent = d3.selectAll('.room-container').selectAll('.object.parent').data( d=> d[1]).join('svg').attr('class', 'object parent').each(function(d) {
    //     currSel = d3.select(this);
    //     //only add if no children
    //     d[1].forEach(obj => {
    //       if (obj.childObject == ''){
    //         addObjectProperties(currSel, obj);
    //       }
    //     })
    //   });

    //   let objectsChildren = objectsParent.selectAll('.object.children').data( d=> d[1]).join('rect')
    //   .attr('class', 'object children')
    //   .each(function(d){
    //     if (d.childObject != ''){
    //       d3.select(this)
    //       .attr('width', d=> toPercent(d.sizeX))
    //       .attr('height', d=> toPercent(d.sizeY))
    //       .attr('x', d=> toPercent(d.coordX))
    //       .attr('y', d=> toPercent(d.coordY))
    //       .attr('stroke', 'gray')
    //       .attr('fill', 'gray')
    //       .append('text')
    //     }
       
    //   })
   


    // });
  

    

    // d3.select('.floor-plan').append('rect')
    //   .attr('class', 'room')
    //   .attr('x','0')
    //   .attr('y','0')
    //   .attr('width', '50px')
    //   .attr('height', '50px')
  
  });