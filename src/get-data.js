const weatherObj = (city, weather, weatherDescription, scaleType) => {
    const description = weatherDescription.description
    const humidity = weather.humidity
    let temperature
    let feelslike
    let min
    let max

    temperature = Math.round((weather.temp - 273.15) * 10) /10
    feelslike = Math.round((weather.feels_like - 273.15) * 10) / 10
    min = Math.round((weather.temp_min - 273.15) * 10) / 10
    max = Math.round((weather.temp_max - 273.15) * 10) / 10
    
    return {
        city,
        description,
        temperature,
        feelslike,
        min,
        max,
        humidity
    }
}

async function processWeather(locationName) {
    try {
        let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${locationName}&APPID=78d36d58a15bd9581b441f7e0a2b6faa`, {mode: 'cors'})
        let data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export {processWeather, weatherObj}