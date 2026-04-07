const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.navbar ul');
const links = document.querySelectorAll('.navbar ul li a');

// abrir / cerrar menú
toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// cerrar menú cuando se haga click en un link
links.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});