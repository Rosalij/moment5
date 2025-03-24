"use strict";  //rosali Johansson, Mittuniversitetet 2025-03-05


//code for mobile and tablet version, hamburgerbar show/hide
let openHamburgerEl = document.querySelector(".open-hamburger")
let closeHamburgerEl = document.querySelector(".close-hamburger")
let dogButtonEl = document.querySelector("#dogButton");
let dogDivEl = document.querySelector(".dogDiv")
let hamburgerMenuEl = document.querySelector(".hamburgermenu")
let canvasEl = document.getElementsByTagName("canvas")



if (dogButtonEl) {
    dogButtonEl.addEventListener("click", displayDogs)
}

if (openHamburgerEl) {
    openHamburgerEl.addEventListener("click", toggleMenu);
}
if (closeHamburgerEl) {
    closeHamburgerEl.addEventListener("click", toggleMenu)
}


function toggleMenu() {

    let style = window.getComputedStyle(hamburgerMenuEl)
    if (style.display === "none") {
        hamburgerMenuEl.style.display = "block";
    }
    else {
        hamburgerMenuEl.style.display = "none";
    }
}

function displayDogs() {
    dogButtonEl.style.display = "none";
    dogDivEl.style.display = "block";
}

/**
        * fetch university data
        * @function fetchData()
        * @throws {Error} if incorrect fetch
        * @returns {Array} Returns JSON array about university courses
        */
async function fetchCourseData() {
    try {
        const response = await fetch('https://studenter.miun.se/~mallar/dt211g/');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return []; 
    }
}


/**
        * Create chart of top six courses by applicants with chart.js
        * @function createCourseChart()
        */ 
async function createCourseChart() {
    const courses = await fetchCourseData();

    const showCourses = courses.filter(course => course.type === "Kurs");

    showCourses.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

    const topCourses = showCourses.slice(0, 6);

    //creates bar chart 
    const ctx = document.getElementById('myCourseChart')
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topCourses.map(course => course.name),
            datasets: [{
                label: 'Totalt antal sökande',
                data: topCourses.map(course => course.applicantsTotal),
                backgroundColor: 'rgba(181, 143, 21, 0.8)',
                borderColor: 'rgb(0, 0, 0)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });
}



/**
        * Create chart of top five courses by applicants with chart.js
        * @function createProgramChart()
        */ 
async function createProgramChart() {
    const programs = await fetchCourseData();

    const showPrograms = programs.filter(data => data.type === "Program");

    showPrograms.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

    const topPrograms = showPrograms.slice(0, 5);


//creates pie chart
    const ctx = document.getElementById('myProgramChart')
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: topPrograms.map(program => program.name),
            datasets: [{
                label: 'Totalt antal sökande',
                data: topPrograms.map(program => program.applicantsTotal),
                backgroundColor: colorScheme,
                borderColor: 'rgb(0, 0, 0)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {

                        stepSize: 20
                    }
                }
            }
        }
    });
}


if (canvasEl) {createCourseChart(), createProgramChart()};


/**
 * color Scheme for Diagrams
 */
const colorScheme = [
    "#25CCF7","#FD7272","#54a0ff","#00d2d3",
    "#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e",
    "#16a085","#27ae60","#2980b9","#8e44ad","#2c3e50",
    "#f1c40f","#e67e22","#e74c3c","#ecf0f1","#95a5a6",
    "#f39c12","#d35400","#c0392b","#bdc3c7","#7f8c8d",
    "#55efc4","#81ecec","#74b9ff","#a29bfe","#dfe6e9",
    "#00b894","#00cec9","#0984e3","#6c5ce7","#ffeaa7",
    "#fab1a0","#ff7675","#fd79a8","#fdcb6e","#e17055",
    "#d63031","#feca57","#5f27cd","#54a0ff","#01a3a4"
]
