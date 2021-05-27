const themeSwitch = document.querySelector("input[type='checkbox']");

const uiElementsObj = {
    navbar: document.getElementById('nav'),
    toggleIcon: document.getElementById('toggle-icon'),
    textBox: document.getElementById('text-box'),
    images: document.getElementsByTagName('img'),
    sections: document.getElementsByTagName('section')
}

/** 
 * Toggle the illustration images b/w dark and light mode
 * {Param}: string (dark, light)
*/
const setImageColor = (color) => {
    uiElementsObj.images.image1.src = `assets/undraw_proud_coder_${color}.svg`;
    uiElementsObj.images.image2.src = `assets/undraw_feeling_proud_${color}.svg`;
    uiElementsObj.images.image3.src = `assets/undraw_conceptual_idea_${color}.svg`;
}

/** 
 * Toggle the theme b/w dark and light mode
 * {Param}: boolean (dark-true, light-false)
*/
const toggleDarkLightMode = (isDark) => {
    isDark ? document.documentElement.setAttribute('data-theme', 'dark') : document.documentElement.setAttribute('data-theme', 'light');
    uiElementsObj.navbar.style.backgroundColor = isDark ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';
    uiElementsObj.textBox.style.backgroundColor = isDark ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
    uiElementsObj.toggleIcon.children[0].textContent = isDark ? 'Dark Mode' : 'Light Mode';
    isDark ? uiElementsObj.toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon') : uiElementsObj.toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    isDark ? setImageColor('dark') : setImageColor('light');
    isDark ? window.localStorage.setItem('mode', 'dark') : window.localStorage.setItem('mode', 'light');
}

// Onclick of theme switch
themeSwitch.addEventListener('change', (e) => {
    e.target.checked ? toggleDarkLightMode(true) : toggleDarkLightMode(false);
});


/**
 * Method to Create a navbar dynamically, depends on the sections in the HTML.
 */
const createNavbar = () => {
    const sections = Array.from(uiElementsObj.sections);
    const navbar = document.getElementById('nav');
    const frag = document.createDocumentFragment();
    sections.forEach(element => {
        let a = document.createElement('a');
        // a.setAttribute('href', `#${element.id.toLowerCase()}`); // No need of href property, due to js scroll implementation
        a.textContent = element.id.toUpperCase();

        // Added smooth scroll using js
        a.addEventListener('click', function () {
            element.scrollIntoView({ behavior: "smooth" });
        });

        frag.appendChild(a);
    });
    navbar.appendChild(frag);
}

// Set the mode onload of the application
window.onload = function () {

    // Call to create navbar
    createNavbar();

    // Change the mode of site according to saved preference
    let mode = window.localStorage.getItem('mode');
    if (mode === 'dark') {
        themeSwitch.checked = true;
        toggleDarkLightMode(true);
    } else {
        toggleDarkLightMode(false);
    }
}

/**
 * Nav activation functionality START.
 */

// Config for intersection observer
const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.6
}

// Callback method for Intersection Observer, Handles the activation logic
const callback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let id = entry.target.id;
            const navElements = Array.from(document.getElementsByTagName('a'));
            navElements.forEach(ele => {
                if (ele.textContent === id.toUpperCase()) {
                    ele.classList.add('active');
                } else {
                    ele.classList.remove('active');
                }
            })
        }
    });
};

// Defined the observer
const observer = new IntersectionObserver(callback, options);

// Trigger the activation logic on scroll event.
window.addEventListener('scroll', function () {
    const sections = Array.from(uiElementsObj.sections);
    sections.forEach(section => observer.observe(section))
})
/**
 * Nav activation functionality END.
*/


