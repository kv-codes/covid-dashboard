const button = document.getElementById('test')


button.addEventListener('click', () => {
    fetch('https://www.trackcorona.live/api/cities')
        .then(response => response.json())
        .then(jsonData => {
            jsonData.data.forEach(function (item) {
                if (item.country_code == 'us') {
                    console.log(item.location)
                }
            })
        })
})

const grabLocationId = () => {

}

const renderStats = () => {
    fetch('https://www.trackcorona.live/api/cities')
        .then(response => response.json())
        .then(jsonData => {
            console.log(jsonData.data[0])
        })
}