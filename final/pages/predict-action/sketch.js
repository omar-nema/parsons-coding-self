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
});
