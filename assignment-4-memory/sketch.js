
var scrolly = scrollama();

document.addEventListener("DOMContentLoaded", function(){

    console.log('sup')

    scrolly
    .setup({
      step: ".card",
    })
    .onStepEnter((r) => {
      elusiveHover = true;
      if (r.element.classList.contains('mem-1')){
        console.log('indeed')
      } 
  
      // { element, index, direction }
    })
    .onStepExit((response) => {
      // { element, index, direction }
    });
  

});