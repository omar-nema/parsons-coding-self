document.addEventListener("DOMContentLoaded", async function() {

    let data = await d3.csv('./journal-abstraction.csv', d=> d);
    let floatingData = await d3.csv('./rawfragments.csv', d=> d);
    console.log(data, floatingData);

    function getGroupElement(groupNum){
        let filtered = data.filter(d=> parseInt(d.group) == groupNum);
        return filtered[Math.floor(Math.random() * filtered.length)];
    }

    function createGroupText(groupNum){
        el = getGroupElement(groupNum);
        let elText = '';
        for (var j=0; j<el.heightfactor*2.5; j++){
            elText += el.trend + '. ';
        }
        return `<div class="entry-text">${elText}</div>`;
    }
    
    function createEntry(date){
        let groupStructure = [[0, 1], [1, parseInt(Math.random()*7)], [2, 1]];
        let entryStart = `<div class="entry"><div class='entry-date'>${date}</div>`
        let entryText = '';
        groupStructure.forEach(d=> {
            let groupNum = d[0];
            for (let j=0; j<d[1]; j++){
                entryText += createGroupText(groupNum);
            };
        })
        let entryEnd = '</div>';
        return `${entryStart}${entryText}${entryEnd}` 
    }


    let weekVal = -12;
    let numEntries = 24;
    let startDate = '01-01';
    for (var i=0; i<numEntries; i++){
        let date;
        if (weekVal < 0){
            date = `${Math.abs(weekVal)}  weeks ago`;
        } else if (weekVal ==0){
            date = `this week`;
        } else {
            date = `In ${Math.abs(weekVal)} weeks`;
        }
        let entry = createEntry(date);
        d3.select('main').append('div').html(entry);
        weekVal ++;
    }


    
    
    // let windowCenter = {x: window.innerWidth/2, y: window.innerHeight/2};
    let floatingDivs = [];
    function createFloatingDiv(txt){
        d3.select('main').append('div').attr('class', 'floating-text')
            .text(txt)
            .style('left', `${parseInt(-200 - Math.random()*300)}px`)
            .style('top', `${parseInt(-200 - Math.random()*300)}px`)
    };
    function initDivs(){
        floatingData.forEach(d=> {
            createFloatingDiv(d.fragment);
        })
    };
    initDivs();
    d3.selectAll('.floating-text').each(function(d) {
        let div = d3.select(this);
        let pos = div.node().getBoundingClientRect();
        let divObj = {
            div: div,
            top: 0,
            left: 0,        
            center: {
                x: parseInt(window.innerWidth - pos.width),
                y: parseInt(window.innerHeight - pos.height)
            },
        };
        floatingDivs.push(divObj);
    });
    function moveDivToCenter(divObj){
        let sel = divObj.div;

        sel.transition().duration(1500)
            .style('top', `${parseInt(Math.random()*divObj.center.y)}px`)
            .style('left', `${parseInt(Math.random()*divObj.center.x)}px`)
            .on('end', d=> {
                setTimeout(()=>{
                    sel.transition().duration(1000).style('opacity', '0').on('end', e=> {
                        sel.style('left', `${parseInt(-50 - Math.random()*300)}px`)
                        .style('top', `${parseInt(-50 - Math.random()*300)}px`)
                        .style('opacity', 1)
                    });

                }, 1500)
             
            });
    };
    function getRandomFloatingDiv(){
        return floatingDivs[Math.floor(Math.random() * floatingDivs.length)];
    }

    let scrollCap = 5;
    let currScroll = 0;

    let scrollAmt = 0;
    let lastScroll = 0;
    window.onscroll = function(e) {
        scrollAmt += Math.abs(window.scrollY - lastScroll);
        if (scrollAmt > 1500){
            moveDivToCenter(getRandomFloatingDiv());
            scrollAmt = 0;
        }
        lastScroll = window.scrollY;
      }

  
});
