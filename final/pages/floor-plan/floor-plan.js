document.addEventListener("DOMContentLoaded", function() {
  


  tooltip = document.querySelector('.tooltip');


  
  fetch('./svg/combinedRooms.svg')
    .then(r => r.text())
    .then(text => {
        document.querySelector('.floor-plan').innerHTML = text;
    }).then(initUI);
    // .catch(console.error.bind(console));

    function initUI(){

      var ids = ['#click-boxBooks', '#click-cushion'];

      d3.csv('./floor-plan.csv').then(rows=> {

        rows.forEach(d=> {
          el = document.querySelector('#'+d.id);
          if (el){
       
            el.addEventListener('click', e => {
              console.log(d.id)
              
              e.stopPropagation();
            });
            el.addEventListener('mouseover', e=>{
              tooltip.innerHTML = `<div>${d.notes}</div>`
              tooltip.style.top = e.pageY + 30 +  'px';
              tooltip.style.left = e.pageX + 10 + 'px';
              tooltip.className = 'tooltip';
              d3.select('#'+d.id).style('filter', 'contrast(0.7)');
              e.stopPropagation();
            });
            
            el.addEventListener('mouseout', e=>{
              tooltip.className = 'tooltip hidden';
              d3.select('#'+d.id).style('filter', 'inherit');
            })
            
            // .addEventListener('mouseout', e=>{
            //   el.style.opacity = 1;
            // });
            el.style.cursor = 'pointer';
           
          } else {
            console.log('No element found ', d.id);
          }    
        })


        
        
      })

      // ids.forEach(d=> {
      //   document.querySelector(d).addEventListener('click', d=> {
      //     console.log('right on surfs up')
      //   })
      // })

     
    }



  // var svgObject = document.getElementById('svg-object').contentDocument;

  });