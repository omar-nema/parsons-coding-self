

// these seven lines maybe the only lines you need to edit
// you should put in your own access token
// you can change the style of the tiles
// as well as the center and the zoom

// but note that way down below this is a method that auto centers and zooms:
// map.fitBounds(turf.bbox(infoData), { padding: 120, linear: true })
//If you want to control the centering and zoom yourself, comment out that line.
    
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var map = new mapboxgl.Map({
    container: 'map', // HTML container ID
    style: 'mapbox://styles/mapbox/outdoors-v10', // style URL
    center: [-21.9270884, 64.1436456], // starting position as [lng, lat]
    zoom: 13
});
map.addControl(new mapboxgl.NavigationControl(), 'top-left');

// all of this JavaScript manages what's displayed on hover and click
var popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });

let hoverCurrentId = null
var datalayer;

function updateStory(e) {
    let feature = e.features[0]
    document.getElementById("storyPlace").innerHTML = feature.properties.story
}
function updateHead(e) {
    let feature = e.features[0]
    map.getCanvas().style.cursor = 'pointer';
    document.getElementById("headPlace").innerHTML = feature.properties.placeName

}
function removeHead(e) {
    document.getElementById("headPlace").innerHTML = "&nbsp;"
    map.getCanvas().style.cursor = '';

}

function startHover(e) {
    let feature = e.features[0]

    if (hoverCurrentId) {
        map.setFeatureState({ source: 'datalayer', id: hoverCurrentId }, { hover: false });
    }
    hoverCurrentId = feature.id
    map.setFeatureState({ source: 'datalayer', id: hoverCurrentId }, { hover: true });
}

function stopHover(e) {
    if (hoverCurrentId) {
        map.setFeatureState({ source: 'datalayer', id: hoverCurrentId }, { hover: false });
    }
    hoverCurrentId = null;
}

function drawPopup(e) {
    let feature = e.features[0]
    map.getCanvas().style.cursor = 'pointer';

    var coordinates = feature.geometry.coordinates.slice();
    var placeName = feature.properties.placeName;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    popup.setLngLat(coordinates)
        .setHTML(`<h4>${placeName}</h4>`)
        .addTo(map);
}

function removePopup(e) {
    map.getCanvas().style.cursor = '';
    popup.remove();
}

map.on('load', function () {
    for (let i = 0; i < infoData.features.length; i++) {
        infoData.features[i]['id'] = i + 1
    }
// the JavaScript below sets up the styles of the colors based on your properties
// color, radius


    datalayer = map.addLayer({
        id: "datalayer",
        type: "circle",
        source: {
            type: "geojson",
            data: infoData,
        },
        paint: {
            'circle-radius': ['to-number', ['get', 'radius']],
            'circle-stroke-color': 'white',
            'circle-stroke-width': 2,
            'circle-color': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                '#666',
                ['get', 'color'],
            ],
            'circle-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0.5
            ]
        }
    });
// these functions control Mouse actions
// they make the pop-up placeName or update the story text
    // When we move the mouse over, draw the popup and change the hover style
    map.on('mouseenter', 'datalayer', function (e) {
        startHover(e)
// uncomment this line to get pop-ups
// 				drawPopup(e)
        updateHead(e)
    });

    // When we move the mouse away from a point, turn off the hovering and popup
    map.on('mouseleave', 'datalayer', function (e) {
        stopHover(e)
// uncomment this line to get pop-ups
// 				removePopup(e)
        removeHead(e)
    });

    // When we click, update the story (the right-hand side)
    map.on('click', 'datalayer', function (e) {
        updateStory(e)
    })

// very important!! this automatically centers the map and zooms it

    map.fitBounds(turf.bbox(infoData), { padding: 120, linear: true })
})


// this part is J query / with some mapbox JavaScript
// it changes what is displayed based on the pulldown menu
var groupsObj = {};

$(document).ready(function () {
    infoData.features.forEach(function (feature) {
        groupsObj[feature.properties.group_id] = feature.properties.group_name;
    })

    $.each(groupsObj, function (key, value) {
        $('#select-menu')
            .append($("<option></option>")
                .attr("value", value)
                .text(value));
    });

    $('#select-menu').change(function () {
        var selectedGroup = $('#select-menu').val();

        if (!selectedGroup) {
            map.setFilter('datalayer', null);
        } else {
            map.setFilter('datalayer', ['==', ['get', 'group_name'], selectedGroup]);
        }
    });

    var scrolly = scrollama();

    scrolly
    .setup({
      step: ".card",
      offset: 0.7
    })
    .onStepEnter((r) => {
      elusiveHover = true;

        document.querySelector('#map').classList.remove('inactive');
        document.querySelector('#map').classList.remove('inactive-last');
    
        if (r.element.classList.contains('card-golf')){
        
            map.flyTo({
                center: infoData.features[0].geometry.coordinates,essential: true, zoom: 17
            });
        }
        else if (r.element.classList.contains('card-dining')){
     
            map.flyTo({
                center: infoData.features[1].geometry.coordinates,essential: true, zoom: 17
            });
        }
        else if (r.element.classList.contains('card-driving-intro')){
            map.flyTo({
                center: infoData.features[1].geometry.coordinates,essential: true, zoom: 15
            });
        }
        else if (r.element.classList.contains('card-driving-one')){
            map.flyTo({
                center: infoData.features[6].geometry.coordinates,essential: true, zoom: 17
            });
        }        
        else if (r.element.classList.contains('card-driving-two')){
            map.flyTo({
                center: infoData.features[7].geometry.coordinates,essential: true, zoom: 17
            });
        }     
        else if (r.element.classList.contains('card-mosque')){
            map.flyTo({
                center: infoData.features[3].geometry.coordinates,essential: true, zoom: 17
            });
        }
        else if (r.element.classList.contains('card-house')){
            map.flyTo({
                center: infoData.features[4].geometry.coordinates,essential: true, zoom: 17
            });
        }               
        else if (r.element.classList.contains('card-aramco-intro')){
           
            map.flyTo({
                center: infoData.features[5].geometry.coordinates,essential: true, zoom: 13
            });
        }        
        else if (r.element.classList.contains('card-aramco')){
            document.querySelector('#map').classList.add('inactive');
            map.flyTo({
                center: infoData.features[5].geometry.coordinates,essential: true, zoom: 13
            });
        }  
        
        else if (r.element.classList.contains('card-last')){
            document.querySelector('#map').classList.add('inactive-last');
        }    
     
    })
    .onStepExit((r) => {
 
    });

});