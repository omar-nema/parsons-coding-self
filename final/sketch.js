document.addEventListener("DOMContentLoaded", function() {
  
   
    document.querySelector('.btn.info').addEventListener('click', (e)=> {
        let infoOverlay = document.querySelector('.info-overlay');
        infoOverlay.classList.toggle('show');
        if (infoOverlay.classList.contains('show')){
            e.target.innerHTML = 'X';
        } else {
            e.target.innerHTML = '?';      
        }
    })

});