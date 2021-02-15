
var scrolly = scrollama();

document.addEventListener("DOMContentLoaded", function(){

    scrolly
    .setup({
      step: ".card",
      offset: 0.7
    })
    .onStepEnter((r) => {
      elusiveHover = true;

        if (r.element.classList.contains('header-row')){
            document.querySelector('#vis-plural').style.opacity = 0;
            document.querySelector('#vis-singular').style.opacity = 0;  
        }
  
        //determine which right pane to show
        if (r.element.classList.contains('singular-first') || r.element.classList.contains('singular-last') ){
            document.querySelector('#vis-plural').style.opacity = 0;
            document.querySelector('#vis-singular').style.opacity = 1;
            
        } 
        else if (r.element.classList.contains('plural-first') || r.element.classList.contains('plural-last')){
            document.querySelector('#vis-singular').style.opacity = 0;
            document.querySelector('#vis-plural').style.opacity = 1;
        } 

        if (r.element.closest(".singular")){
            var classToShow = '.singular' + '-' + r.index.toString();
            document.querySelectorAll('.pane-img').forEach(d=> {
                d.classList.remove("show");
            });
            document.querySelector(classToShow).classList.add('show');
        } else if (r.element.closest(".plural")){
        
            if (r.element.classList.contains('plural-2')){
                highlightGroup1();
            } else if (r.element.classList.contains('plural-3')){
                highlightGroup2();
            } else if (r.element.classList.contains('plural-5')){
                filterEffect();
            } else if (r.element.classList.contains('plural-6')){
                centerGraph();
            } else  {
                highlightAll();
            }
          
        }

     
    })
    .onStepExit((r) => {
        if (r.element.classList.contains('singular-last')){
            var vis = document.querySelector('#vis-singular').style.opacity = 0;
        } 
    });


    
    const svg = d3.select('#vis-plural').append('svg')
        .attr('width','100%').attr('height','100%');

    //svg filter taken from http://bl.ocks.org/nujabes/b4cef6af662bfd168c9a638b9f004439
    var defs = svg.append('defs');
    var filter = defs.append('filter').attr('id','gooeyCodeFilter');
            filter.append('feGaussianBlur')
            .attr('in','SourceGraphic')
            .attr('stdDeviation','12')
            //to fix safari: http://stackoverflow.com/questions/24295043/svg-gaussian-blur-in-safari-unexpectedly-lightens-image
            .attr('color-interpolation-filters','sRGB')
            .attr('result','blur');
            filter.append('feColorMatrix')
            .attr('in','blur')
            .attr('mode','matrix')
            .attr('values','1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9')
            .attr('result','gooey');        

    var bbox = d3.select('#vis-plural').node().getBoundingClientRect();
    var centerx = bbox.width/2;
    var centery = bbox.height/2;

    var nodes = [];
    var links = [];
    var numNodes = 60;
    var numGrps = 10;
    for (var i=0; i<numNodes; i++){
        var nodeId = i.toString();
        var groupId = Math.floor(Math.random()*numGrps);
        nodes.push({id: nodeId.toString(), group: groupId })
    }

    nodes.forEach(d=> {
        var targetInd = Math.floor(Math.random()*nodes.length).toString();
        var target = nodes.filter(o => o.id == targetInd)[0];
        var groupId = Math.floor(Math.random()*numGrps);
        links.push({source: d.id, target: target.id, value: 1, linkGroup: groupId})
    })
    //more links
    for (var i=0; i<numNodes/3; i++){
        var targetInd = Math.floor(Math.random()*nodes.length).toString();
        var target = nodes.filter(o => o.id == targetInd)[0];
        var srcId =  Math.floor(Math.random()*nodes.length).toString();
        var groupId = Math.floor(Math.random()*numGrps);
        links.push({source: srcId, target: target.id, value: 1, linkGroup: groupId})
    }

 

    //better way of connecting

    var simulation = d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody())
        .force('link', d3.forceLink(links).id(d=> d.id).strength(d=>d.value))  
        .force('center', d3.forceCenter(centerx, centery));

    simulation.on('tick', () => {
        link
            .attr('x1', d=>d.source.x)
            .attr('y1', d=>d.source.y)
            .attr('x2', d=>d.target.x)
            .attr('y2', d=>d.target.y);
        node
            .attr('cx' , d=> d.x)
            .attr('cy', d => d.y)
    })
    
    var cols = [
        '#e8ddcb',
        '#033649',
        '#036564',
        '#031634',
        '#547980',
        '#45ada8',
        '#9de0ad',
        '#e5fcc2'
      ];

     var origR = 7; 

    var link = svg.append('g').attr('class', 'links')
        .selectAll('.link')
        .data(links)
        .join('line')
        .attr('stroke-width', .5) 
        .attr('stroke', 'rgba(255,255,255,.2)')
        .attr('class', d=>{return 'link ' + 'group-' + d.linkGroup})
        ;

    var node = svg.append('g').attr('class', 'nodes')
        .selectAll('.node')
        .data(nodes)
        .join('circle')
        .attr('r', origR)
        .attr('fill', d => {return cols[Math.floor(Math.random() * cols.length)]}  )
        .attr('stroke', 'black')
        .attr('class', d=>{return 'node ' + 'group-' + d.group})
    ;

    function removeFilter(){
        svg.selectAll('.node').transition().attr('r', origR);
        svg.select('.nodes').style('filter', 'none');
        svg.select('.links').style('filter', 'none')
    }

    function highlightAll(){
        svg.selectAll('.node').classed('show', true);
        svg.selectAll('.link').classed('show', true);
        d3.select('.vis-label').classed('show', false);
        d3.select('#vis-plural').classed('center', false);
        removeFilter();
    }

    function highlightByGroup(grpId){
        filteredLinks = link.filter(d=> d.linkGroup == grpId).classed('show', true);
        filteredLinks.each( (d) => {
            //d.source.id
            var filterHolder = [];
            filterHolder.push(d.source.id);
            filterHolder.push(d.target.id)
            node.filter(z=> filterHolder.includes(z.id)).classed('show', true);
        });
    };
    
    function highlightGroup1(){
        svg.selectAll('.node').classed('show', false);
        svg.selectAll('.link').classed('show', false);
        svg.select('.nodes').style('filter', 'none');
        d3.select('.vis-label').classed('show', true).html('Resulting thought: The smell of humidity makes me feel like home');
        removeFilter();
        highlightByGroup(1);
    }
    function highlightGroup2(){
        //svg.selectAll('.node').classed('show', false);
        svg.select('.nodes').style('filter', 'none');
        // svg.selectAll('.link').classed('show', false);
        d3.select('.vis-label').classed('show', true).html('Resulting thought: The smell of humidity makes me feel like home<br><br>That time I');
        d3.select('#vis-plural').classed('center', false);
        removeFilter();
        highlightByGroup(2);
    }

    function filterEffect(){
        svg.selectAll('.node').transition().attr('r', 20);
        svg.select('.nodes').style('filter', 'url(#gooeyCodeFilter)')
        svg.select('.links').style('filter', 'url(#gooeyCodeFilter)')
        d3.select('#vis-plural').classed('center', false);
    }
    
    function centerGraph(){
        d3.select('#vis-plural').classed('center', true);
    }




    //get function name on step enter for each card
    //swap out images

});