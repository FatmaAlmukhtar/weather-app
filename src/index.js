import {createForm} from "./website";

const content = document.getElementById('content');
const weatherDiv = document.createElement('div');
weatherDiv.classList.add('weather-info');

content.appendChild(createForm())
content.appendChild(weatherDiv)

