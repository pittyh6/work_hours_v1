const nav_btn = document.querySelector('.nav_btn')
const nav_items = document.querySelector('.nav-items')


/*GET screen size and add the hide/show class*/
window.onload = function () {
    const window_width = window.innerWidth
    if (window_width <= 1279) {
        nav_items.classList.add('hide')
        nav_items.classList.remove('show')
        nav_btn.classList.remove('show')
        nav_btn.classList.add('show')
    } else {
        nav_items.classList.remove('hide')
        nav_items.classList.add('show')
        nav_btn.classList.remove('show')
        nav_btn.classList.add('hide')
    }
}

/*--------------------------------------------*/

/*add class on hamburg menu click*/
nav_btn.addEventListener('click', () => {
    if (nav_items.classList.contains('hide')) {
        nav_items.classList.remove('hide')
        nav_items.classList.add('show')
    } else {
        nav_items.classList.remove('show')
        nav_items.classList.add('hide')
    }
})
/*--------------------------------------------*/
