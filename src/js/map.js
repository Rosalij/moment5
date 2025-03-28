
"use strict";

/**
 * Leaflet map set at location Alfta latitude and longitude
 * @type {L.Map}
 */
var map = L.map('map').setView([
    61.3443897, 16.0582419], 15);


    /**
 * Tile layer for map
 * @type {L.TileLayer}
 */
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


/**
 * Marker placed on the map at the initial coordinates.
 * @type {L.Marker}
 */
var marker = L.marker([ 61.3443897, 16.0582419]).addTo(map);

let searchFormEl = document.getElementById("searchForm");
let searchInputEl = document.getElementById("searchInput");


/**
 * Event listener for search form submit.
 * Initiates search of location
 *
 * @event submit
 * @param {Event} event 
 */
searchFormEl.addEventListener('submit', function(event) {
    event.preventDefault();
    var input = searchInputEl.value;
    fetchLocation(input);
}); 

/**
        * fetch location data from input
        * using OSM nominatim API to search location
        * @async
        * @function fetchLocation()
        * @throws {Error} if incorrect fetch
        * @returns {Array} Returns JSON array about location information
        */
async function fetchLocation(inputLocation) {

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${inputLocation}&format=json`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
  
    let latitude = parseFloat(data[0].lat);
    let longitude = parseFloat(data[0].lon);
    searchPlace(latitude, longitude);
        return data;
 
    } catch (error) {
        console.error(error);
        return [];
    }

    }
/**
        * update location on map taking the latitude and longitude from fetchLocation()
        * @function searchPlace() 
        * @param {number} lat - latitude
        * @param {number} lon - longitude
        */

function searchPlace(lat, lon) {
    map.flyTo([lat, lon], 15)
    marker.setLatLng([lat, lon])
}