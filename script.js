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