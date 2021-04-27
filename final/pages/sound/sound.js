

let fft;
let initFft = 512;

let loadedTracks = [];
let trackDirectory = './assets-audio/';

let currTrack, currTrackIndex;


async function swapAudio(newTrack){
  await currTrack.stop();
  currTrack = newTrack;
  fft.setInput(currTrack);
  currTrack.play();
  return;
}

async function setNewTrack(indexChg){
  newTrack = loadedTracks[currTrackIndex+indexChg].audio;
  currTrackIndex += indexChg;
  await swapAudio(newTrack);
  updateTrackTitle();
}

function updateTrackTitle(title){
  document.querySelector('.track-title').innerText = loadedTracks[currTrackIndex].title;
  document.querySelector('.track-desc').innerText = loadedTracks[currTrackIndex].notes;
};

function initUIElements(){
  document.querySelector('.btn.prev').addEventListener('click', d=> {
    setNewTrack(-1)
  })  
  document.querySelector('.btn.next').addEventListener('click', d=> {
    setNewTrack(1);
  })
}

let scrollPos = 0;
let scale = 0.1
function mouseWheel(e) {
  if (e.deltaY > 0){
    scrollPos+=10;
    scale+= 0.1;
    if (scrollPos ==50){
      scrollPos = 0;
      setNewTrack(1);
    }
  
  } else {
    scrollPos-=10;
  }
}



async function preload() {
  loadTable('./audiodir.csv', 'csv', 'header' , d=>{
    d.rows.forEach(t=> {
      trackName = trackDirectory + t.obj.filename;
      loadedTracks.push({
        audio: loadSound(trackName),
        filename: t.obj.filename,
        title: t.obj.title,
        notes: t.obj.notes
      })

      currTrackIndex = 0;
      currTrack = loadedTracks[currTrackIndex].audio;
      updateTrackTitle();
      currTrack.setLoop(false); 
    });
  });
}

// function mousePressed() {
//   if (currTrack.isPlaying()) {
//     currTrack.stop();
//   } else {
//     currTrack.play();
//   }
// }


function setup() {

  var myCanvas = createCanvas(windowWidth*.9, windowHeight*.9);
  //   myCanvas.parent("idnameofdiv");
  // createCanvas(600, 600, WEBGL);
  userStartAudio();
  fft = new p5.FFT(.4, initFft);
  fft.setInput(currTrack);
  currTrack.play(); 
  
  initUIElements();
}



var scl = 5;

function draw() {
  if (currTrack && currTrack.isPlaying()){

    //amp = amp.getLevel();
    // var bgalpha = map(amp, 0, .2, 255, 150);
    // bgcol.setAlpha(bgalpha);
    background(0);
    
    orbitControl();

    let spectrum = fft.analyze();
    let wave = fft.waveform();
    let rMin = width/70;
    let rMax = width*.35;
    var bands = fft.getOctaveBands();
    var currR = 0;

    //frequency bands by radius, transparency by presence
    for (var i=0; i<bands.length; i++){

      ctr = bands[i].ctr;

      n = fft.getEnergy(bands[i].lo, bands[i].hi);
      n = map(n, 0, 130, 1, 150)

      if (n){
        currR += width/70
        var r = map(min(ctr, 5000), 0, 5000, rMin, rMax);
        var col = color('white');
        col.setAlpha(n);
        
        stroke(col);
        strokeWeight(.5);

        noFill();
        sphere(r)
      }
    }
  }
  
}

function keyPressed() {
    if (key == "a") {
      save(frameCount + ".png");
    }
}