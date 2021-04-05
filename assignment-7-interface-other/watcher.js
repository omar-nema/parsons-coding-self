console.log('CONTENT SCRIPT')

var select = document.createElement('select');
select.innerHTML = '<select name="decayTime" id="decay"><option value="1">1 minute decay</option><option value="2">5 minutes</option><option value="3">1 hour decay</option><option value="4">1 day decay</option></select>';
select.className = 'decayTime'
select.style = 'position: fixed; z-index:1000000; top:20px; right: 50px; font-size:14px;'

document.querySelector('body').appendChild(select);

function textNodesUnder(el){
    var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
    while(n=walk.nextNode()) a.push(n);
    return a;
}

//calculate decay time
var currDecayTime = document.querySelector('.decayTime').value;
var decayFactor = .05;
var runPerSec = 1;
var numIterations = 60/runPerSec;

function updateIterations(){
    if (decayFactor == '1'){
        numIterations = 60/runPerSec;
    } else if (decayFactor == '2'){
        numIterations = 60*5/runPerSec;
    } else if (decayFactor == '2'){
        numIterations = 60*60/runPerSec;
    } else if (decayFactor == '2'){
        numIterations = 60*60*24/runPerSec;
    }
}
updateIterations();

document.querySelector('.decayTime').onchange= function(){
    console.log('kaaay')
}

var parsedNodes = [];

function randomNeg(){
    return (Math.random() - 0.5) * 2;   
}
function helperFloat(num){
    return parseFloat(num.match(/[-+]?([0-9]*\.[0-9]+|[0-9]+)/)[0]);
}
function createCrack(){
    crackLength = 1000 + Math.random()*500;
    crack = document.createElement('div');
    crack.style.height = '0.2px';
    crack.className = 'crack';
    crack.style.position = 'fixed';
    crack.style.top = Math.round(Math.random()*100) + '%';
    crack.style.left = Math.round(Math.random()*150)-70 + '%';        
    crack.style.width = crackLength.toString() + 'px';
    crack.style.background = 'rgba(0,0,0, 0.1)';
    crack.style.filter = 'blur('+ Math.random() + 'px)'
    crack.style.transform = 'rotate(' + Math.round(randomNeg()*100).toString() + 'deg)'
    document.querySelector('body').appendChild(crack);
    numCracks = 300;
}



//ideally this would rescrape all nodes

function scrapeAndDistort(){
    var allTextNodes = textNodesUnder(document.querySelector('body'));


    allTextNodes.forEach(function(txtNode){
        var alphaLength = txtNode.textContent.replace(/[^a-z0-9]/gi,'').length;
        if (alphaLength > 0) {
            splitNode = txtNode.textContent.replace(/(\r\n|\n|\r)/gm, "").split(' ');
    
            splitNode.forEach(word => {
                if (word != ''){
                    var parentStyles = 'flex-wrap: wrap; display: flex; align-content: flex-start'
            
                    var spanWrapper = document.createElement('span');
                    spanWrapper.innerHTML = word + '&nbsp;';
           
                    var skewMax = 1*decayFactor;
                    var skewX =  skewMax*( randomNeg())  ;
                    var skewY =  skewMax*( randomNeg()) 
    
                    var opacityMaxReduction = 0.5*(decayFactor);
                    spanWrapper.style.opacity = (1-opacityMaxReduction) + opacityMaxReduction*Math.round(Math.random()*10)/10;
    
                    var translateMax = 1*decayFactor;
                    var translateX = skewMax*( randomNeg()) 
                    var translateY =  skewMax*( randomNeg()) 
                    //spanWrapper.style.transform = `skew(${skewX}deg, ${skewY}deg)`;
                   
                    spanWrapper.style.transform = `translate(${translateX}px, ${translateY}px) skew(${skewX}deg, ${skewY}deg)`;       
                    spanWrapper.style.transition = 'all .1s ease-in-out';         
                    
        
                    var filterAmt = 2*Math.random()*decayFactor;
                    spanWrapper.style.filter = `blur(${filterAmt}px)`;
        
                    txtNode.parentNode.style = parentStyles;
    
                    parsedNodes.push(spanWrapper);
                    txtNode.parentNode.appendChild(spanWrapper);
                }
            })
        
            txtNode.textContent = ' ';
           
        }
    });

    return parsedNodes;
}


async function initTextNodes(){
    return scrapeAndDistort();
} 

async function initImages() {
    var allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.style.transform = 'translate(0px,0px) skew(0deg, 0deg)';
        img.style.opacity = '1';
        img.style.filter= 'blur(0px)'
        parsedNodes.push(img);
    })
    return parsedNodes;
}


initImages();

setTimeout(function(){
    initTextNodes().then(z => {
      initImages();
    }).then(d => {
        initInc();
    })
    
}, 3000)



let maxOpacity = 1;
let maxTransform = 3;
let maxBlur = 3;
let maxSkew = 3;
let numCracks = 300;
let cracksPerIteration = numCracks/numIterations;

function initInc(){

    console.log(parsedNodes);
    var runs = 0;
    var updateStyles = setInterval(function(){ 
        console.log('and 1')
        if (++runs == numIterations){
            window.clearInterval(updateStyles);
        }
        parsedNodes.forEach(n => {
            currOpacity = parseFloat(n.style.opacity);
            currBlur = helperFloat(n.style.filter);
          
            transformFull = n.style.transform.split(') ')[0];
            skewFull = n.style.transform.split(') ')[1];
            currTranslate = [helperFloat(transformFull.split(',')[0]), helperFloat(transformFull.split(',')[1]) ];
            currSkew = [helperFloat(skewFull.split(',')[0]), helperFloat(skewFull.split(',')[1]) ];
                   
            var opacityInc = Math.random()*(maxOpacity/numIterations);
            var transformInc = [ randomNeg()*(maxTransform/numIterations), randomNeg()*(maxTransform/numIterations)];
            var skewInc = [ Math.random()*(maxSkew/numIterations), Math.random()*(maxSkew/numIterations)];
            var blurInc =  Math.random()*(maxBlur/numIterations); 
            
            
            var transformString = `translate(${currTranslate[0]+transformInc[0]}px, ${currTranslate[1]+transformInc[1]}px) skew(${currSkew[0]+skewInc[0]}deg, ${currSkew[1]+skewInc[1]}deg)`; 
            var blurString = `blur(${currBlur + blurInc}px)`;
    
            n.style.opacity = currOpacity-opacityInc;
            n.style.transform = transformString;
            n.style.filter = blurString;
        
        });

        for (var i =0; i< cracksPerIteration; i++){
            createCrack();
        }
    
    }, 1000);
    
}



