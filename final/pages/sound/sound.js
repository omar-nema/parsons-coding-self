
let globalAudio = new Audio('./audioAmbientDesk.mp3');
globalAudio.loop = true;

document.addEventListener("DOMContentLoaded", async function(){

 
  let sketchNoise = function(p) {

    let numRows = 80;
    let numCols = 80;
    let unitH, unitW;

    let w = 5, h = 5;
    let noiseMult = 200;

    let pointArr = [];

    p.setup = function(){
      bbox = document.querySelector('#fullCanvas').getBoundingClientRect();
      p.createCanvas(bbox.width, bbox.height);
      unitH = p.height/numRows;
      unitW = p.width/numCols;
      p.angleMode(p.DEGREES);
      let numPts = 0;
      for (let y=0; y<numRows;y++){
        let row = [];
        for (let x=0; x<numCols; x++){
          numPts ++;
          let xOff = p.random(-100, 100);
          let yOff = p.random(-100, 100);
          row.push({
            x: xOff + x*unitW,
            y: yOff + y*unitH,
            index: numPts
          });
        }
        pointArr.push(row);
      }
    }


    p.draw = function(){
        p.background(0);
        p.noStroke();
        for (let y=0; y<numRows;y++){
          for (let x=0; x<numCols; x++){  
            let col = p.map(p.noise(x*.02, y*.02, p.frameCount*.009), 0, 1, 0, 240);
            p.fill(col);
            p.stroke(col);
            p.rect(x*unitW, y*unitH, unitW, unitH);
          }
        };
    }

    

  };

  let audioDir = await d3.csv("./audiodir.csv").then(d => d);
  audioDir.forEach(file => {
    let audio = new Audio('./assets-audio/' +file.filename);
    createDiv(audio, file.title, file.notes);
  });

  
  let tooltip = document.querySelector('#audio-tooltip');
  function showTooltip(e, title, notes){
  
    tooltip.innerHTML = `<div><strong>${title}</strong><br><br>${notes}</div>`
    tooltip.style.top = e.pageY + 30 +  'px';
    tooltip.style.left = e.pageX + 10 + 'px';
    tooltip.className = '';
  }

  function hideTooltip(){
    tooltip.className = 'hidden'
  }

  function createDiv(audio, title, notes){
    let audioDiv = document.createElement('div');
    audioDiv.className = 'audio-trigger';

    let styleString = `width: 50px; height: 50px; top: ${5+parseInt(90*Math.random())}%; left: ${5+parseInt(90*Math.random())}%`
    audioDiv.setAttribute('style', styleString);

    audioDiv.addEventListener('mouseover', (e)=> {
      showTooltip(e, title, notes);
      globalAudio.pause();
      audio.play();

    });
    audioDiv.addEventListener('mouseout', ()=> {
      audio.pause();
      globalAudio.play();
      hideTooltip();
    });
    document.querySelector('body').appendChild(audioDiv);
  };

  let node = document.createElement('div');
  new p5(sketchNoise, 'fullCanvas');


  document.querySelector('.help-btn').addEventListener('click', ()=> {
    let helpInfo = document.querySelector('.help-info');
    helpInfo.classList.toggle('hidden');
    setTimeout(() => {
      helpInfo.classList.toggle('hidden');
    }, 8000);
  });

  document.querySelector('.btn.proceed').addEventListener('click', ()=>{

    var context = new AudioContext();

    context.resume().then(() => {
      globalAudio.play();
      ;document.querySelector('.modal-overlay').classList.toggle('hidden')
    });

  
  });
  
});







