const nav_btn = document.querySelector('.nav_btn')
const nav_items = document.querySelector('.nav-items')


nav_btn.addEventListener('click', ()=>{
    if(nav_items.classList.contains('hide')){
        console.log("entou if")
        nav_items.classList.remove('hide')
        nav_items.classList.add('show')
    }else{
        console.log("entou else")
        nav_items.classList.remove('show')
        nav_items.classList.add('hide')
    }
})