const button = document.getElementById('test')

async function getData() {
    const response = await fetch('https://api.covidtracking.com/v1/states/current.json')
    const moreData = await response.json()
    return moreData
}



button.addEventListener('click', () => {


    getData()
        .then(moreData => {

            moreData.forEach((state) => {
                console.log(state.positive + ' ' + state.state)
            })

        })

})