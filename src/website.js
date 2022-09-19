import { processWeather, weatherObj } from "./get-data"

function createForm() {

    const headerDiv = document.createElement('div')
    headerDiv.classList.add('header')

    const header = document.createElement('h2')
    header.textContent = 'Weather Forecast'

    const formDiv = document.createElement('div')
    formDiv.classList.add('form')

    const inputField = document.createElement('input')
    inputField.type = 'text'
    inputField.placeholder = 'Enter a city'

    const submitButton = document.createElement('button')
    submitButton.type = 'button'
    submitButton.textContent = 'Submit'


    formDiv.append(inputField, submitButton)

    submitButton.addEventListener('click', () => {
        let locationName = inputField.value[0].toUpperCase() + inputField.value.slice(1).toLowerCase()
        displayWeather(locationName)
    })

    headerDiv.append(header, formDiv)

    return headerDiv
}

async function displayWeather(locationName) {
    let scaleType = 'C'

    let data = await processWeather(locationName)
    let Obj = weatherObj(data.name, data.main, data.weather[0], scaleType)
    
    const weatherDiv = document.querySelector('.weather-info')
    
    while(weatherDiv.firstChild) {
        weatherDiv.removeChild(weatherDiv.firstChild)
    }

    const scaleButtons = document.createElement('div')
    scaleButtons.classList.add('scale-buttons')

    const celsiusButton = document.createElement('button')
    celsiusButton.type = 'button'
    celsiusButton.classList.add('celsius', 'active')
    celsiusButton.textContent = 'C'

    const fahrenheitButton = document.createElement('button')
    fahrenheitButton.type = 'button'
    fahrenheitButton.classList.add('fahrenheit')
    fahrenheitButton.textContent = 'F'

    scaleButtons.append(celsiusButton, fahrenheitButton)

    celsiusButton.addEventListener('click', () => {
        if (scaleType === 'F') {
            scaleType = 'C'
            toggleTemperatureScale(scaleType)
            fahrenheitButton.classList.remove('active')
            celsiusButton.classList.add('active')
        }
        
    })
    fahrenheitButton.addEventListener('click', () => {
        if (scaleType === 'C') {
            scaleType = 'F'
            toggleTemperatureScale(scaleType)
            fahrenheitButton.classList.add('active')
            celsiusButton.classList.remove('active')
        }
    })
    
    const cityName = document.createElement('p')
    cityName.classList.add('city-name')
    cityName.textContent = Obj.city.toUpperCase()

    const currentTemperature = document.createElement('p')
    currentTemperature.classList.add('temperature', 'current')
    currentTemperature.textContent = Obj.temperature + '\xB0' 

    const weatherDescription = document.createElement('p')
    weatherDescription.textContent = Obj.description

    /*
    const feelsLikeTemperature = document.createElement('p')
    feelsLikeTemperature.classList.add('temperature')
    feelsLikeTemperature.textContent = Obj.feelslike
*/
    const minmaxDiv = document.createElement('div')
    minmaxDiv.classList.add('temperature-limits')

    const minTemperature = document.createElement('p')
    minTemperature.classList.add('temperature', 'L')
    minTemperature.textContent = 'L:' + Obj.min + '\xB0'

    const maxTemperature = document.createElement('p')
    maxTemperature.classList.add('temperature', 'H')
    maxTemperature.textContent = 'H:' + Obj.max + '\xB0'

    minmaxDiv.append(maxTemperature, minTemperature)

    const humidity = document.createElement('p')
    humidity.textContent = 'Humidity: ' + Obj.humidity + '%'

    weatherDiv.append(scaleButtons, cityName, currentTemperature, weatherDescription, minmaxDiv, humidity)

    const content = document.getElementById('content')
    content.appendChild(weatherDiv)
}

function toggleTemperatureScale(scale) {
    const temperatures = document.querySelectorAll('.temperature')
    let temperature

    if (scale === 'C') {
        temperatures.forEach(element => {
            if (element.classList.contains('H')) {
                temperature = element.textContent.split(':')[1]
                element.textContent = 'H:' + Math.round(((parseInt(temperature) - 32) * 5/9) * 10) / 10 + '\xB0'
            } else if (element.classList.contains('L')) {
                temperature = element.textContent.split(':')[1]
                element.textContent = 'L:' + Math.round(((parseInt(temperature) - 32) * 5/9) * 10) / 10 + '\xB0'
            } else {
                temperature = element.textContent
                element.textContent = Math.round(((parseInt(temperature) - 32) * 5/9) * 10) / 10 + '\xB0'
            }
        });
    } else {
        temperatures.forEach(element => {
            if (element.classList.contains('H')) {
                temperature = element.textContent.split(':')[1]
                element.textContent = 'H:' + Math.round(((parseInt(temperature) * 9/5) + 32) * 10) / 10 + '\xB0'
            } else if (element.classList.contains('L')) {
                temperature = element.textContent.split(':')[1]
                element.textContent = 'L:' + Math.round(((parseInt(temperature) * 9/5) + 32) * 10) / 10 + '\xB0'
            } else {
                temperature = element.textContent
                element.textContent = Math.round(((parseInt(temperature) * 9/5) + 32) * 10) / 10 + '\xB0'
            }
        });
    }
}
export {createForm}