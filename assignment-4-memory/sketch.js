
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


    // var nodeData = {
    //     "nodes": [
    //         {"id": "mem1", "group": 1}
    //         ,{"id": "mem2", "group": 1}
    //         ,{"id": "mem3", "group": 2}
    //         ,{"id": "mem4", "group": 2}
    //         ,{"id": "mem5", "group": 2}
    //         ,{"id": "mem6", "group": 4}
    //         ,{"id": "mem7", "group": 4}
    //     ], 
    //     "links": [
    //         {"source": "mem1", "target": "mem2", "value": .3  },
    //         {"source": "mem3", "target": "mem4", "value": .5  },
    //         {"source": "mem1", "target": "mem5", "value": .1  },
    //         {"source": "mem5", "target": "mem2", "value": .8  },
    //         {"source": "mem6", "target": "mem7", "value": .8 },
    //         // {"source": "mem2", "target": "mem1", "value": 5 },
     
    //     ]
    // }

    var nodes = [];
    var links = [];
    var numNodes = 500;
    var numLinks = numNodes/2;
    var numGrps = 15;
    for (var i=0; i<numNodes; i++){
        var nodeId = Math.floor(Math.random()*numNodes);
        var groupId = Math.floor(Math.random()*numGrps);
        nodes.push({id: nodeId.toString(), group: groupId })
    }
    for (var i=0; i<numLinks; i++){
        var src = nodes[Math.floor(Math.random() * nodes.length)];
        var target = nodes[Math.floor(Math.random() * nodes.length)];
        links.push({source: src.id, target: target.id, value: Math.random()})
    }


    links.forEach(d=> {
        var srcGrp = nodes.filter(o => o.id == d.source)[0].group;
        var targetGrp = nodes.filter(o => o.id == d.target)[0].group;
        if (srcGrp == 1 && targetGrp == 1){
            d.linkGroup = 1;
        } else if ([1, 2].includes(srcGrp) && [1, 2].includes(targetGrp)){
            d.linkGroup = 2;
        }
        
    })

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

    var link = svg.append('g').attr('class', 'links')
        .selectAll('.link')
        .data(links)
        .join('line')
        .attr('stroke-width', .5) 
        .attr('stroke', 'white')
        .attr('class', d=>{return 'link ' + 'group-' + d.linkGroup})
        ;

    var node = svg.append('g').attr('class', 'nodes')
        .selectAll('.node')
        .data(nodes)
        .join('circle')
        .attr('r', 8)
        .attr('fill', d => {return cols[Math.floor(Math.random() * cols.length)]}  )
        .attr('class', d=>{return 'node ' + 'group-' + d.group})
    ;

  ;

    function removeFilter(){
        svg.selectAll('.node').transition().attr('r', 8);
        svg.select('.nodes').style('filter', 'none');
    }

    function highlightAll(){
        svg.selectAll('.node').classed('show', true);
        svg.selectAll('.link').classed('show', true);
        d3.select('.vis-label').classed('show', false);
        d3.select('#vis-plural').classed('center', false);
        removeFilter();
    }
    function highlightGroup1(){
        svg.selectAll('.node').classed('show', false);
        svg.select('.nodes').style('filter', 'none');
        svg.selectAll('.link').classed('show', false);
        d3.select('.vis-label').classed('show', true).text('the first mem');
        svg.selectAll('.node.group-1').classed('show', true);
        svg.selectAll('.link.group-1').classed('show', true);
        removeFilter();
    }
    function highlightGroup2(){
        svg.selectAll('.node').classed('show', false);
        svg.select('.nodes').style('filter', 'none');
        svg.selectAll('.link').classed('show', false);
        d3.select('.vis-label').classed('show', true).text('the second mem')
        svg.selectAll('.node.group-1').classed('show', true);
        svg.selectAll('.node.group-2').classed('show', true);
        svg.selectAll('.link.group-1').classed('show', true);
        svg.selectAll('.link.group-2').classed('show', true);
        d3.select('#vis-plural').classed('center', false);
        removeFilter();
    }

    function filterEffect(){
        svg.selectAll('.node').transition().attr('r', 20);
        svg.select('.nodes').style('filter', 'url(#gooeyCodeFilter)')
        d3.select('#vis-plural').classed('center', false);
    }
    
    function centerGraph(){
        d3.select('#vis-plural').classed('center', true);
    }




    //get function name on step enter for each card
    //swap out images

});