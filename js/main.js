// La versión de producción ya incluye el contenido; fetch solo se usa en desarrollo.
async function loadHTML(file) {
    const response = await fetch(file);
    if (!response.ok) throw new Error(file + ': HTTP ' + response.status);
    return response.text();
}

async function loadComponent(id, file) {
    const container = document.getElementById(id);
    try { container.innerHTML = await loadHTML(file); }
    catch (error) { console.error(error); container.textContent = 'No se pudo cargar este contenido. Recarga la página para intentarlo de nuevo.'; }
}

async function init() {
    if (document.body.dataset.static !== 'true') {
        const sections = ['hero', 'grid', 'kits', 'cta', 'profile'];
        await Promise.all([
            loadComponent('navbar', 'components/navbar.html'),
            loadComponent('footer', 'components/footer.html'),
            Promise.all(sections.map(async name => {
                try { return await loadHTML('sections/' + name + '.html'); }
                catch (error) { console.error(error); return '<section id="' + (name === 'kits' ? 'projects' : name) + '" role="status"><p>No se pudo cargar esta sección. Recarga la página para intentarlo de nuevo.</p></section>'; }
            })).then(parts => document.querySelector('main').insertAdjacentHTML('beforeend', parts.join('')))
        ]);
        const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (target) target.scrollIntoView();
    }
    initMobileMenu();
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('close', () => document.body.classList.remove('modal-open'));
        modal.addEventListener('click', event => {
            if (event.target !== modal) return;
            const rect = modal.getBoundingClientRect();
            if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeModal();
        });
    }
}

function initMobileMenu() {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    const setOpen = open => {
        menu.classList.toggle('hidden', !open);
        btn.setAttribute('aria-expanded', String(open));
        btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    };
    btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('click', event => {
        if (!btn.contains(event.target) && !menu.contains(event.target)) setOpen(false);
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { setOpen(false); btn.focus(); }
    });
    matchMedia('(min-width: 1024px)').addEventListener('change', () => setOpen(false));
}

const modalData = {

    ABP_1: {
        title: "Aprendizaje Basado en Proyectos (ABP)",
        text: "El Aprendizaje Basado en Proyectos (ABP), según Guerrero (2024), desarrolla el pensamiento crítico al involucrar a los estudiantes en la solución de problemas reales. Se basa en contenidos significativos, una pregunta guía, participación activa del estudiante y habilidades como comunicación, colaboración y creatividad. Incluye investigación, revisión constante y culmina con la presentación del proyecto ante una audiencia real.",
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
        title: "Design Thinking e Ingeniería Inversa",
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

function openModal(method) {
    const data = modalData[method];
    const modal = document.getElementById('modal');
    if (!data || !modal) return;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalText').textContent = data.text;
    const image = document.getElementById('modalImage');
    image.src = data.image;
    image.alt = 'Ilustración de ' + data.title;
    modal.showModal();
    modal.scrollTop = 0;
    document.body.classList.add('modal-open');
}

function closeModal() {
    document.getElementById('modal')?.close();
}

init().catch(console.error);
