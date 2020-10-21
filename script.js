const renderDropdown = () => {
    fetch('https://www.trackcorona.live/api/provinces')
        .then(response => response.json())
        .then(jsonData => {
            let stateArray = []
            jsonData.data.forEach(function (state) {
                if (state.country_code === 'us') {
                    stateArray.push(state.location)
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