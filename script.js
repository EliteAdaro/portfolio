document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#sidebar .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});

let duplicateCooldown = false;
let isCleared = false;
let btnDuplicateSvg;

window.onload = function () {
    btnDuplicateSvg = document.getElementById('btnDuplicateSvg');
    console.log(btnDuplicateSvg);
    btnDuplicateSvg.onclick = btnDuplicateSvg_onclick;
}

const svgs = [
    '<svg id="person-walking" xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-walking bi-animated" viewBox="0 0 16 16"><path d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M6.44 3.752A.75.75 0 0 1 7 3.5h1.445c.742 0 1.32.643 1.243 1.38l-.43 4.083a1.8 1.8 0 0 1-.088.395l-.318.906.213.242a.8.8 0 0 1 .114.175l2 4.25a.75.75 0 1 1-1.357.638l-1.956-4.154-1.68-1.921A.75.75 0 0 1 6 8.96l.138-2.613-.435.489-.464 2.786a.75.75 0 1 1-1.48-.246l.5-3a.75.75 0 0 1 .18-.375l2-2.25Z" /><path d="M6.25 11.745v-1.418l1.204 1.375.261.524a.8.8 0 0 1-.12.231l-2.5 3.25a.75.75 0 1 1-1.19-.914zm4.22-4.215-.494-.494.205-1.843.006-.067 1.124 1.124h1.44a.75.75 0 0 1 0 1.5H11a.75.75 0 0 1-.531-.22Z" /></svg>',
    '<svg id="person-arms-up" xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-arms-up bi-animated" viewBox="0 0 16 16"><path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" /><path d="m5.93 6.704-.846 8.451a.768.768 0 0 0 1.523.203l.81-4.865a.59.59 0 0 1 1.165 0l.81 4.865a.768.768 0 0 0 1.523-.203l-.845-8.451A1.5 1.5 0 0 1 10.5 5.5L13 2.284a.796.796 0 0 0-1.239-.998L9.634 3.84a.7.7 0 0 1-.33.235c-.23.074-.665.176-1.304.176-.64 0-1.074-.102-1.305-.176a.7.7 0 0 1-.329-.235L4.239 1.286a.796.796 0 0 0-1.24.998l2.5 3.216c.317.316.475.758.43 1.204Z" /></svg>',
    '<svg id="person-raised-hand" xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-raised-hand bi-animated" viewBox="0 0 16 16"><path d="M6 6.207v9.043a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H6.236a1 1 0 0 1-.447-.106l-.33-.165A.83.83 0 0 1 5 2.488V.75a.75.75 0 0 0-1.5 0v2.083c0 .715.404 1.37 1.044 1.689L5.5 5c.32.32.5.754.5 1.207" /><path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" /></svg>'
];

function startAnimation() {
    const elementToSpawn = document.getElementById('moving-label');

    if (isCleared || elementToSpawn.children.length >= 12) {
        duplicateCooldown = false;
        isCleared = false;
        elementToSpawn.innerHTML = '';
    }

    elementToSpawn.innerHTML = svgs[0];
}

function animate() {
    const elementsToAnimate = document.querySelectorAll('.bi-animated');
    elementsToAnimate.forEach(element => {
        // Toon een willekeurige originele SVG
        let randomIndex = Math.floor(Math.random() * svgs.length);

        element.outerHTML = svgs[randomIndex];
    });

    // setTimeout(() => {
    //     animate();
    // }, 1000);
}

function switchSVG() {
    animate();
}

function clearAll() {
    const elementToSpawn = document.getElementById('moving-label');

    elementToSpawn.innerHTML = '';
    isCleared = true;
}

function btnDuplicateSvg_onclick() {

    // Voorkom duplicatie als Clear All is ingedrukt of in cooldown
    if (duplicateCooldown)
        return;

    duplicateCooldown = true;

    console.log('Dupliceren...');

    // Animaties FIXEN
    const animationSvgsContainer = document.getElementById('moving-label');
    let currentSvgs = animationSvgsContainer.getElementsByClassName('bi-animated');

    if (currentSvgs.length === 0) {
        animationSvgsContainer.innerHTML += svgs[0];
        return;
    }

    if (currentSvgs.length >= 12) {
        console.log('Maximaal aantal animaties bereikt.');
        return;
    }

    let left = currentSvgs[currentSvgs.length - 1].getBoundingClientRect().left;
    if (left < 75) {
        console.log('Hoofdanimatie bevindt zich te dicht bij de beginpositie. Duplicatie geblokkeerd.');
        duplicateCooldown = false;
        return;
    }

    animationSvgsContainer.innerHTML += svgs[0];

    // Wacht 1 miliseconde voordat duplicatie weer mogelijk is
    setTimeout(() => {
        duplicateCooldown = false
    }, 100);
}




// const originalAnimation = document.querySelector('.walking-animation');
// const computedStyle = window.getComputedStyle(originalAnimation);

// // Haal de huidige positie (bijvoorbeeld 'left') van de hoofdanimatie op
// const currentLeft = parseFloat(computedStyle.getPropertyValue('left')) || 0;

// // Controleer of de hoofdanimatie tussen 0px en 20px van de beginpositie is
// if (currentLeft >= 0 && currentLeft <= 50) {
//     console.log('Hoofdanimatie bevindt zich te dicht bij de beginpositie. Duplicatie geblokkeerd.');
//     return;
// }
// /* */
// duplicateCooldown = true;


// const svgContainer = document.getElementById('svg-container');
// const clone = originalAnimation.cloneNode(true);
// clone.classList.add('clone');

// // Voeg variatie toe aan de kloon
// clone.style.animation = "move-walk 15s linear infinite"; // Pas animatieduur aan
// clone.style.left = "0"; // Start aan de linkerkant

// svgContainer.appendChild(clone);

// // Verwijder de kloon na een tijd
// setTimeout(() => clone.remove(), 14000); // Na 14 seconden
// }

/*=============================================*/
/* darkmode settings */
/*=============================================*/

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Load the saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    } else {
        body.classList.add('light-mode'); // Default to light mode
    }

    // Toggle the theme and save the preference in localStorage
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
    });
});
