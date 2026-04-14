// ===============================
// CARGAR COMPONENTES
// ===============================

const loadComponent = async (id, file) => {

    const res = await fetch(file);
    const html = await res.text();

    document.getElementById(id).innerHTML = html;

    // activar menu hamburguesa cuando cargue el navbar
    if (id === "navbar") {
        initMobileMenu();
    }

};

// Navbar y footer
loadComponent("navbar", "components/navbar.html");
loadComponent("footer", "components/footer.html");


// ===============================
// CARGAR SECCIONES
// ===============================

const loadSections = async () => {

    const main = document.querySelector("main");

    const sections = [
        "sections/hero.html",
        "sections/grid.html",
        "sections/kits.html",
        "sections/cta.html",
        "sections/profile.html"
    ];

    for (let section of sections) {

        const res = await fetch(section);
        const html = await res.text();

        main.innerHTML += html;

    }

};

loadSections();


// ===============================
// MENU HAMBURGUESA
// ===============================

function initMobileMenu(){

    const btn = document.getElementById("menu-btn");
    const menu = document.getElementById("mobile-menu");

    if(btn && menu){

        // abrir / cerrar menú
        btn.addEventListener("click", () => {
            menu.classList.toggle("hidden");
        });

        // cerrar menú al hacer click en un link
        const links = menu.querySelectorAll("a");

        links.forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.add("hidden");
            });
        });

    }

}


// ===============================
// DATOS DEL MODAL
// ===============================

const modalData = {

    steam: {
        title: "STEAM",
        text: "Descripción de STEAM",
        image: "img/steam.jpg"
    },

    coding: {
        title: "Coding",
        text: "Descripción de Coding",
        image: "img/coding.jpg"
    },

    maker: {
        title: "Maker",
        text: "Descripción de Maker",
        image: "img/maker.jpg"
    },

    ai: {
        title: "Inteligencia Artificial",
        text: "Descripción de AI",
        image: "img/ai.jpg"
    },

    gamify: {
        title: "Gamificación",
        text: "Descripción de Gamify",
        image: "img/gamify.jpg"
    },

    robotica: {
        title: "Robótica",
        text: "Descripción de Robótica",
        image: "img/robotica.jpg"
    },

    proyectos: {
        title: "Proyectos",
        text: "Descripción de Proyectos",
        image: "img/proyectos.jpg"
    },

    model3d: {
        title: "Modelado 3D",
        text: "Descripción de Modelado 3D",
        image: "img/3d.jpg"
    }

};


// ===============================
// ABRIR MODAL
// ===============================

function openModal(method) {

    const modal = document.getElementById("modal");

    document.getElementById("modalTitle").innerText = modalData[method].title;

    document.getElementById("modalText").innerText = modalData[method].text;

    document.getElementById("modalImage").src = modalData[method].image;

    modal.classList.remove("hidden");
    modal.classList.add("flex");

}


// ===============================
// CERRAR MODAL
// ===============================

function closeModal() {

    const modal = document.getElementById("modal");

    modal.classList.add("hidden");
    modal.classList.remove("flex");

}