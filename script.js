// renders the drop down options for states

const renderDropdown = () => {
    fetch('https://www.trackcorona.live/api/provinces')
        .then(response => response.json())
        .then(jsonData => {
            jsonData.data.forEach(function (state) {
                if (state.country_code === 'us') {
                    let statesDropdown = document.querySelector('#states')
                    let newOption = document.createElement('option')
                    newOption.setAttribute('value', state.location)
                    newOption.innerHTML = state.location
                    statesDropdown.appendChild(newOption)
                }
            })

        })

}

renderDropdown()


// renders the stats for each state 
document.querySelector('#states').addEventListener('change', (event) => {


    fetch('https://www.trackcorona.live/api/provinces')
        .then(response => response.json())
        .then(jsonData => {

            jsonData.data.forEach(function (state) {

                if (state.location === event.target.value) {

                    let statsDiv = document.querySelector('#stats')
                    initMap(state.latitude, state.longitude, 6)

                    statsDiv.innerHTML = `
                    Confirmed cases: ${state.confirmed}
                    Deceased: ${state.dead}
                    Last Updated: ${state.updated.split(' ')[0]}
                    `
                }

            })
        })
})

// renders the global data upon page load 
let globalData = () => {
    fetch('https://www.trackcorona.live/api/countries')
        .then(response => response.json())
        .then(jsonData => {
            jsonData.data.forEach((country) => {
                if (country.country_code === 'us') {
                    let globalDiv = document.querySelector('#global-stats')
                    globalDiv.innerHTML = `
                        Total US Confirmed: ${country.confirmed}
                        Total US Recovered: ${country.recovered}
                        Total US deceased: ${country.dead}
                
                    `

                }
            })
        })

}
globalData()


// functionality for the map 

let map, heatmap;


function initMap(lat = 37.0902, long = -95.7129, zoom = 4) {
    map = new google.maps.Map(document.getElementById("map"), {
        zoomControl: true,


        zoom: zoom,

        center: {
            lat: lat,
            lng: long
        },

        mapTypeId: "satellite",
    });

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map,
    });


}

function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}




function changeGradient() {
    const gradient = [
        "rgba(0, 255, 255, 0)",
        "rgba(0, 255, 255, 1)",
        "rgba(0, 191, 255, 1)",
        "rgba(0, 127, 255, 1)",
        "rgba(0, 63, 255, 1)",
        "rgba(0, 0, 255, 1)",
        "rgba(0, 0, 223, 1)",
        "rgba(0, 0, 191, 1)",
        "rgba(0, 0, 159, 1)",
        "rgba(0, 0, 127, 1)",
        "rgba(63, 0, 91, 1)",
        "rgba(127, 0, 63, 1)",
        "rgba(191, 0, 31, 1)",
        "rgba(255, 0, 0, 1)",
    ];
    heatmap.set("gradient", heatmap.get("gradient") ? null : gradient);
}

function changeRadius() {
    heatmap.set("radius", heatmap.get("radius") ? null : 20);
}

function changeOpacity() {
    heatmap.set("opacity", heatmap.get("opacity") ? null : 0.2);
}




// populates longitude and latitude for the heat map

function getPoints() {
    let heatMapArray = []
    fetch("https://www.trackcorona.live/api/cities")
        .then(response => response.json())
        .then(data => data.data)
        .then(dataObject => dataObject.filter(data => data.country_code == "us"))
        .then(filtered => filtered.forEach(element => {
            heatMapArray.push({
                location: new google.maps.LatLng(element.latitude, element.longitude),
                weight: element.confirmed / 1000
            })

        }))

    return heatMapArray

}