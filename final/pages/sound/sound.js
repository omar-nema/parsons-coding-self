

let fft;
let initFft = 512;
let currTrack;

let trackList = [
  'rooftop 2021 elaine.m4a',
  '2020 yemeni.m4a'
]
let loadedTracks = [];
let trackDirectory = './assets-audio/';
let table;

async function preload() {
   loadTable('./audiodir.csv', 'csv', 'header')
  console.log(table)

  trackList.forEach(t => {
    trackName = trackDirectory + t;
    loadedTracks.push(loadSound(trackName))
  })

  currTrack = loadSound('./assets-audio/rooftop 2021 elaine.m4a');

  currTrack.setLoop(false);

  // document.querySelector('.btn.next').addEventListener('click', ()=>{
  //   trackList.filter(d=> {})
  // })
  

}



function mousePressed() {
  if (currTrack.isPlaying()) {
    currTrack.stop();
  } else {
    currTrack.play();
  }
}


function setup() {
    createCanvas(600, 600, WEBGL);
    userStartAudio();
    fft = new p5.FFT(.4, initFft);
    fft.setInput(currTrack);
    currTrack.play();
  console.log(table)
}

function swapAudio(){
  currTrack.stop();
  currTrack = currTrack2;
  fft.setInput(currTrack);
  currTrack.play();
}




var scl = 5;

function draw() {


  if (currTrack.isPlaying()){


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