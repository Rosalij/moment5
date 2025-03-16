"use strict";


var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 100,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);


let inputEl = document.querySelector("input")
inputEl.addEventListener('input', fetchMapData)

async function fetchMapData(locationInput) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?<${locationInput}>`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);
        return data;
       
    } catch (error) {
        console.error(error);
        return [];
    }
}