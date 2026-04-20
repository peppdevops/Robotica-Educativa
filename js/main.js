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
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // evita que el click se propague al document
            menu.classList.toggle("hidden");
        });

        // evitar que clicks dentro del menú lo cierren
        menu.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        // cerrar menú al hacer click en un link
        const links = menu.querySelectorAll("a");

        links.forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.add("hidden");
            });
        });

        // 👇 Cerrar menú al hacer click fuera
        document.addEventListener("click", () => {
            if(!menu.classList.contains("hidden")){
                menu.classList.add("hidden");
            }
        });

    }

}

// ===============================
// DATOS DEL MODAL
// ===============================

const modalData = {

    ABP_1: {
        title: "Aprendizaje Basado en Proyectos (ABP)",
        text: "El Aprendizaje Basado en Proyectos (ABP), según Guerrero (2024), desarrolla el pensamiento crítico al involucrar a los estudiantes en la solución de problemas reales.Se basa en contenidos significativos, una pregunta guía, participación activa del estudiante y habilidades como comunicación, colaboración y creatividad. Incluye investigación, revisión constante y culmina con la presentación del proyecto ante una audiencia real.",
        image: "assets/images/ABP_1.jpg"
    },

    ABP_2: {
        title: "Aprendizaje Basado en Problemas (ABP)",
        text: "El ABP invierte el proceso tradicional: primero se plantea el problema, luego se identifica la información necesaria y finalmente se busca la solución. Se desarrolla de forma colaborativa en pequeños grupos, promoviendo el intercambio de experiencias y la reflexión. Además, requiere una secuencia didáctica que incluye inspiración, conexión con el currículo, creación y evaluación.",
        image: "assets/images/ABP_2.jpg"
    },

    AC: {
        title: "Aprendizaje Colaborativo",
        text: "Ordaya y Sarmiento (2019) destacan que el aprendizaje colaborativo junto con la robótica educativa potencia el aprendizaje al enfocarse en “aprender haciendo”, superando la memorización tradicional sin sentido práctico. Señalan que este enfoque promueve la creatividad, el aprendizaje activo y la colaboración entre estudiantes. Además, herramientas como RoboMind y Arduino facilitan la construcción y programación de robots, fomentando habilidades mediante el uso de software educativo y su incorporación en las instituciones para acercar a los estudiantes a nuevas tendencias tecnológicas.",
        image: "assets/images/AC.jpg"
    },

    DTII: {
        title: "Desing Thinking e Ingeniería Inversa",
        text: "Rosa y Neto (2020) plantean que el pensamiento de diseño, aplicado a la robótica educativa, permite desarrollar habilidades de orden superior al enfrentar a los estudiantes con problemas reales y guiarlos hacia soluciones innovadoras. Este enfoque se centra en el usuario, promoviendo la experimentación, el modelado, la creación de prototipos y su mejora continua mediante retroalimentación e ingeniería inversa. Además, sigue las cinco etapas del design thinking: empatizar, definir, idear, prototipar y evaluar, destacando la importancia de la creatividad, el análisis y la práctica en el aprendizaje.",
        image: "assets/images/DTII.png"
    },

    AI: {
        title: "Aula Invertida",
        text: "Lescano-Veloz (2024) señala que el aula invertida en robótica permite a los estudiantes aprender la teoría de forma autónoma antes de clase, dejando el tiempo presencial para la práctica y experimentación. Este enfoque favorece el trabajo colaborativo, el pensamiento crítico y el desarrollo de habilidades como el diseño, la programación y el control de robots. Además, Rodríguez Jiménez (2024) y Villalba (2018) destacan la importancia de estructurar la clase en tres momentos: antes, durante y después.",
        image: "assets/images/AI.jpg"
    },

    STEM: {
        title: "STEM",
        text: "Álvarez (2024) destaca que la educación STEM fomenta un aprendizaje significativo al resolver problemas mediante trabajo en equipo, toma de decisiones, respeto, análisis, formulación de hipótesis y aplicación de programación. Este enfoque integra diversas áreas del conocimiento, promueve la cooperación y permite validar soluciones con prototipos, generando un aprendizaje integral, motivador y alineado con el currículo.",
        image: "assets/images/stem.png"
    },

    ABR: {
        title: "Aprendizaje Basado en Retos (ABR):",
        text: "Estrada y Martínez (2020) señalan que la enseñanza práctica de la robótica mediante el Aprendizaje Basado en Retos impulsa la innovación y la proyección social, al motivar a los estudiantes a crear soluciones a problemáticas de su entorno usando TIC y tecnologías con enfoque en el beneficio colectivo.",
        image: "assets/images/ABR.jpg"
    },

    LG: {
        title: "La Gamificación",
        text: "La gamificación en educación ayuda a reducir la desmotivación y la apatía, generando experiencias positivas y aprendizajes significativos (Vázquez-Ramos, 2020). Se estructura en tres niveles: dinámicas (narrativa), mecánicas (retos, recompensas, cooperación) y componentes (puntos, insignias, rankings) (Werbach y Hunter, 2012; Torá, 2024). Además, el uso de videojuegos en robótica educativa potencia la creatividad, el pensamiento crítico y habilidades técnicas, permitiendo fortalecer tanto competencias académicas como habilidades blandas (Sánchez-Rivas et al., 2024).",
        image: "assets/images/LG.jpg"
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