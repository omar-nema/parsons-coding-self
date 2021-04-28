document.addEventListener("DOMContentLoaded", async function() {

    let data = await d3.csv('./action.csv', d=> d);

    //process data
    let dataVec = [];
    data.forEach(d=> {
        let arr = Object.values(d);
        arr.shift();
        arr = arr.map(z=> z = parseFloat(z));
        dataVec.push(arr);
    });
    let emotions = data.columns.filter(d=> d != 'activity');
    let vecLength = emotions.length;


    ///test
    let sampleVec = [1,0,1,0,0];
    emotions.forEach(d=> {sampleVec.push(Math.random())});
 
    function calcSimilarity(v1, v2) {
        totalD = 0;
        for (i=0; i<vecLength; i++){
            distanceSquared = Math.pow((v1[i] - v2[i]), 2);
            totalD += distanceSquared;
        }
        return Math.sqrt(totalD);
    };

    console.log(emotions)

    function getMostSimilarActivity(moodVec){
        let minDist = 10000;
        let minIndex= 5000;
        dataVec.forEach((activityVec, i) => {
            let sim = calcSimilarity(activityVec, moodVec);
            if (sim < minDist){
                minDist = sim;
                minIndex = i;
            }
        })
        return data[minIndex].activity;
    }

    // let minIndex = getMostSimilarActivity(sampleVec);
    // let minActivity = data[minIndex].activity;
    // console.log(minIndex, minActivity);

    sliders = [];
    slideGrps =d3.select('.card.params').select('.card-body').selectAll('.slider-group').data(emotions).join('div').attr('class', 'slider-group');
    slideGrps.append('div').attr('class', 'slider-label').text(d=> d);
    slideGrps.append('div').attr('class', 'slider')
        .each(function(d){
            sliders.push(this);
            noUiSlider.create(this, {
                start: 0,
                connect: 'lower',
                range: {
                    'min': 0,
                    'max': 100
                }
            });
        })
    ;

    d3.select('.card-footer').on('click', () => {
        let currVec = [];
        sliders.forEach(d=> {
            currVec.push(d.noUiSlider.get()/100);
        })
        d3.select('#result').text(getMostSimilarActivity(currVec))
        console.log(currVec);
     
    })

    // newSlider = d3.select('.card-body').append('div').node();
    // console.log(newSlider)
    // var startSlider = document.getElementById('range');

 

    // console.log(startSlider.noUiSlider.get());
    // console.log(calcSimilarity(vec1, vec2));
    // console.log(calcSimilarity(vec2, vec3));
    // console.log(calcSimilarity(vec2, vec4));
    // console.log(calcSimilarity(vec2, vec2));
  
});
