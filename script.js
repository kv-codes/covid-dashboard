const button = document.getElementById('test')

async function getData() {
    const response = await fetch('https://api.covidtracking.com/v1/states/current.json')
    const data = await response.json()
    return data
}



button.addEventListener('click', () => {


    getData()
        .then(data => {

            data.forEach((state) => {
                console.log(state.positive + ' ' + state.state)
            })

        })

})