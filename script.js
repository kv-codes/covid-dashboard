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
// renders the stats 
document.querySelector('#states').addEventListener('change', (event) => {

    fetch('https://www.trackcorona.live/api/provinces')
        .then(response => response.json())
        .then(jsonData => {
            jsonData.data.forEach(function (state) {
                if (state.location === event.target.value) {
                    initMap(state.latitude, state.longitude)
                    let statsDiv = document.querySelector('#stats')
                    statsDiv.innerHTML = `
                    Confirmed cases: ${state.confirmed}
                    Deceased: ${state.dead}
                    Recovered: ${state.recovered}
                    Last Updated: ${state.updated}
                    `

                    console.log(state)
                }
            })
        })
})



// this is the heat map

let map, heatmap;

function initMap(lat = 37.782, long = -122.447) {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 9,
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

// Heatmap data: 500 Points
function getPoints(arr) {
    //new google.maps.LatLng(37.782, -122.447)


    return [];
}

let test = () => {
    fetch('https://www.trackcorona.live/api/cities')
        .then(response => response.json())
        .then(jsonData => {
            return jsonData.data.filter((item) => item.country_code === 'us')
        })
        .then(filteredArr => {
            filteredArr.map((i) => new google.maps.LatLng(i.latitude, i.longitude))
        })
        .then(mappedArr => getPoints(mappedArr))


}

test()



// new google.maps.LatLng(37.782, -122.447)


// new google.maps.LatLng(43.8041334, -120.5542012)