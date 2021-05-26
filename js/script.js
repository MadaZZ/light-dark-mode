const themeSwitch = document.querySelector("input[type='checkbox']");

const uiElementsObj = {
    navbar: document.getElementById('nav'),
    toggleIcon: document.getElementById('toggle-icon'),
    textBox: document.getElementById('text-box'),
    images: document.getElementsByTagName('img')
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


// Set the mode onload of the application
window.onload = function () {
    let mode = window.localStorage.getItem('mode');
    if (mode === 'dark') {
        themeSwitch.checked = true;
        toggleDarkLightMode(true);
    } else {
        toggleDarkLightMode(false);
    }
}