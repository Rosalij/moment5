"use strict";  //rosali Johansson, Mittuniversitetet 2025-02-06


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
async function fetchData() {
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
    const courses = await fetchData();

    const showCourses = courses.filter(course => course.type === "Kurs");

    showCourses.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

    const topCourses = showCourses.slice(0, 6);

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
    const programs = await fetchData();

    const showPrograms = programs.filter(data => data.type === "Program");

    showPrograms.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

    const topPrograms = showPrograms.slice(0, 5);
console.log(topPrograms)

Chart.register(Colors);
    const ctx = document.getElementById('myProgramChart')
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: topPrograms.map(program => program.name),
            datasets: [{
                label: 'Totalt antal sökande',
                data: topPrograms.map(program => program.applicantsTotal),
                backgroundColor: 'rgba(181, 143, 21, 0.8)',
                backgroundColor: 'rgba(77, 73, 59, 0.8)',
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


if (canvasEl) {createCourseChart(), createProgramChart()};
