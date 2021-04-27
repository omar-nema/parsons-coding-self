


let sketch = function(p) {

  let fft;
  let initFft = 512;
  let loadedTracks = [];
  let trackDirectory = './assets-audio/';
  let currTrack, currTrackIndex;

  function updateTrackTitle(title){
    document.querySelector('.track-title').innerText = loadedTracks[currTrackIndex].title;
    document.querySelector('.track-desc').innerText = loadedTracks[currTrackIndex].notes;
  };
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
  async function swapAudio(newTrack){
    await currTrack.stop();
    currTrack = newTrack;
    fft.setInput(currTrack);
    currTrack.play();
    return;
  }

  p.preload = async function(){
    p.loadTable('./audiodir.csv', 'csv', 'header' , d=>{
      d.rows.forEach(t=> {
        trackName = trackDirectory + t.obj.filename;
        loadedTracks.push({
          audio: p.loadSound(trackName),
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

  p.setup = function(){
    bbox = document.querySelector('#p5canvas').getBoundingClientRect();
    p.createCanvas(bbox.width, bbox.height);
    p.background(0);
    p.userStartAudio();
    fft = new p5.FFT(.4, initFft);
    fft.setInput(currTrack);
    currTrack.play(); 
    initUIElements();
  }


  p.draw = function(){
      
    if (currTrack && currTrack.isPlaying()){

      let spectrum = fft.analyze();
      let wave = fft.waveform();
      // let rMin = width/70;
      // let rMax = width*.35;
      // var currR = 0;
      var bands = fft.getOctaveBands();
      let bandVals = [];


      //frequency bands by radius, transparency by presence
      // for (var i=0; i<bands.length; i++){
      //   ctr = bands[i].ctr;
      //   n = fft.getEnergy(bands[i].lo, bands[i].hi);
      //   n = p.map(n, 0, 130, 0, 30);
      //   bandVals.push(n)
      // }

      const numRows = 20;
      const numCols = 20;
      const unitW = p.width/numCols;
      const unitH = p.height/numRows;
      let rectNum = 0;
      for (y=0; y<numRows; y++){
        for (x=0; x<numCols; x++){

          p.noStroke();

          let currBand = rectNum % bands.length;
          p.fill(p.map(spectrum[rectNum], 0, 150, 30, 60))
          //console.log(band)
          p.rect(x*unitW, y*unitH, unitW, unitH);
          rectNum ++;
        }
      }



    }
  }

  

};




let node = document.createElement('div');
new p5(sketch, 'p5canvas');






// let fft;
// let initFft = 512;

// let loadedTracks = [];
// let trackDirectory = './assets-audio/';

// let currTrack, currTrackIndex;


// async function swapAudio(newTrack){
//   await currTrack.stop();
//   currTrack = newTrack;
//   fft.setInput(currTrack);
//   currTrack.play();
//   return;
// }

// async function setNewTrack(indexChg){
//   newTrack = loadedTracks[currTrackIndex+indexChg].audio;
//   currTrackIndex += indexChg;
//   await swapAudio(newTrack);
//   updateTrackTitle();
// }

// function updateTrackTitle(title){
//   document.querySelector('.track-title').innerText = loadedTracks[currTrackIndex].title;
//   document.querySelector('.track-desc').innerText = loadedTracks[currTrackIndex].notes;
// };

// function initUIElements(){
//   document.querySelector('.btn.prev').addEventListener('click', d=> {
//     setNewTrack(-1)
//   })  
//   document.querySelector('.btn.next').addEventListener('click', d=> {
//     setNewTrack(1);
//   })
// }

// let scrollPos = 0;
// let scale = 0.1
// function mouseWheel(e) {
//   if (e.deltaY > 0){
//     scrollPos+=10;
//     scale+= 0.1;
//     if (scrollPos ==50){
//       scrollPos = 0;
//       setNewTrack(1);
//     }
  
//   } else {
//     scrollPos-=10;
//   }
// }



// async function preload() {
//   loadTable('./audiodir.csv', 'csv', 'header' , d=>{
//     d.rows.forEach(t=> {
//       trackName = trackDirectory + t.obj.filename;
//       loadedTracks.push({
//         audio: loadSound(trackName),
//         filename: t.obj.filename,
//         title: t.obj.title,
//         notes: t.obj.notes
//       })

//       currTrackIndex = 0;
//       currTrack = loadedTracks[currTrackIndex].audio;
//       updateTrackTitle();
//       currTrack.setLoop(false); 
//     });
//   });
// }


// function setup() {

//   var myCanvas = createCanvas(400, 400);
//   userStartAudio();
//   fft = new p5.FFT(.4, initFft);
//   fft.setInput(currTrack);
//   currTrack.play(); 
  
//   initUIElements();
// }





// var scl = 5;

// function draw() {

//   // orbitControl();
//   // rotateX(PI/3)
//   background(0);

  

//   noLoop();



//   if (currTrack && currTrack.isPlaying()){

//     //amp = amp.getLevel();
//     // var bgalpha = map(amp, 0, .2, 255, 150);
//     // bgcol.setAlpha(bgalpha);

//     let spectrum = fft.analyze();
//     let wave = fft.waveform();
//     let rMin = width/70;
//     let rMax = width*.35;
//     var bands = fft.getOctaveBands();
//     var currR = 0;
 
//     let bandVals = [];


//     //frequency bands by radius, transparency by presence
//     for (var i=0; i<bands.length; i++){
//       ctr = bands[i].ctr;

//       n = fft.getEnergy(bands[i].lo, bands[i].hi);
//       n = map(n, 0, 130, 0, 30);
//       bandVals.push(n)

//       // if (n){
//       //   currR += width/70
//       //   var r = map(min(ctr, 5000), 0, 5000, rMin, rMax);
//       //   var col = color('white');
//       //   col.setAlpha(n);
        
//       //   stroke(col);
//       //   strokeWeight(.5);

//       //   noFill();
//       //   //sphere(r)
//       // }
//     }

//     let numRows = 20;
//     let numCols = 20;
  
//     let unitW = width/numCols;
//     let unitH = height/numRows;
  
//     let rectNum = 0;
//     for (y=0; y<numRows; y++){
//       for (x=0; x<numCols; x++){

//         noStroke();
        
//         let currBand = rectNum % bands.length;
//         fill(spectrum[rectNum])
//         //console.log(band)
//         rect(x*unitW, y*unitH, unitW, unitH);
//         rectNum ++;
//       }
//     }




//   }





  
// }

// function keyPressed() {
//     if (key == "a") {
//       save(frameCount + ".png");
//     }
// }