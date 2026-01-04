// ============================================
// VARIABLES GLOBALES
// ============================================
let currentLanguage = 'es';

// ============================================
// ACTUALIZAR AÑO EN FOOTER AUTOMÁTICAMENTE
// ============================================
function updateCopyrightYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }
}

// Ejecutar al cargar la página
updateCopyrightYear();

// ============================================
// MENÚ HAMBURGUESA
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Abrir/cerrar menú hamburguesa con animación
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevenir scroll cuando el menú está abierto en móvil
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Cerrar menú al hacer clic fuera de él
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ============================================
// HEADER CON EFECTO DE SCROLL
// ============================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// SISTEMA DE TRADUCCIÓN - SOLO ES/EN
// ============================================
const langToggle = document.getElementById('langToggle');
const langText = document.querySelector('.lang-text');

langToggle.addEventListener('click', () => {
    // Cambiar idioma
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    
    // Actualizar botón - mostrar el OTRO idioma disponible
    langText.textContent = currentLanguage === 'es' ? 'EN' : 'ES';
    
    // Traducir todo el contenido
    translatePage(currentLanguage);
    
    // Animación del botón
    langToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
        langToggle.style.transform = 'scale(1)';
    }, 150);
});

function translatePage(lang) {
    // Obtener todos los elementos con atributos de traducción
    const elements = document.querySelectorAll('[data-lang-es][data-lang-en]');
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-lang-${lang}`);
        
        // Si el elemento es un input o tiene placeholder
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } 
        // Si es el párrafo del footer con el año
        else if (element.id === 'currentYear' || element.querySelector('#currentYear')) {
            const yearSpan = document.getElementById('currentYear');
            const currentYear = new Date().getFullYear();
            const translatedText = text.replace('<span id=\'currentYear\'></span>', currentYear);
            element.innerHTML = translatedText.replace(currentYear, `<span id="currentYear">${currentYear}</span>`);
        }
        // Si es un botón o enlace con icono
        else if (element.querySelector('i')) {
            const icon = element.querySelector('i').cloneNode(true);
            element.textContent = text;
            element.insertBefore(icon, element.firstChild);
            element.insertBefore(document.createTextNode(' '), element.childNodes[1]);
        }
        // Si es solo texto
        else {
            element.textContent = text;
        }
    });
    
    // Asegurar que el año sigue visible después de traducir
    updateCopyrightYear();
    
    // Actualizar atributos title de botones flotantes
    const btnDownload = document.getElementById('btnDownload');
    const btnScrollTop = document.getElementById('btnScrollTop');
    
    if (btnDownload) {
        btnDownload.title = lang === 'es' ? 'Descargar CV' : 'Download CV';
    }
    
    if (btnScrollTop) {
        btnScrollTop.title = lang === 'es' ? 'Volver arriba' : 'Back to top';
    }
    
    // Guardar preferencia de idioma
    localStorage.setItem('preferredLanguage', lang);
}

// Cargar idioma guardado al iniciar
window.addEventListener('load', () => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== 'es') {
        currentLanguage = savedLang;
        langText.textContent = 'ES';
        translatePage(savedLang);
    }
});

// ============================================
// ANIMACIONES AL HACER SCROLL
// ============================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Agregar delay escalonado para efecto en cascada
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

// Observar todas las tarjetas y categorías de habilidades
const cards = document.querySelectorAll('.card, .skill-category');
cards.forEach(card => observer.observe(card));

// ============================================
// BOTONES FLOTANTES
// ============================================
const btnScrollTop = document.getElementById('btnScrollTop');
const btnWhatsapp = document.getElementById('btnWhatsapp');
const btnDownload = document.getElementById('btnDownload');
const floatingButtons = document.querySelectorAll('.floating-btn');

// Mostrar/ocultar botones según el scroll con animación escalonada
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        floatingButtons.forEach((btn, index) => {
            setTimeout(() => {
                btn.classList.add('visible');
            }, index * 100);
        });
    } else {
        floatingButtons.forEach((btn) => {
            btn.classList.remove('visible');
        });
    }
});

// Botón de scroll hacia arriba con animación suave
if (btnScrollTop) {
    btnScrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Animación de click
        btnScrollTop.style.transform = 'scale(0.85)';
        setTimeout(() => {
            btnScrollTop.style.transform = 'scale(1)';
        }, 200);
    });
}

// Botón de WhatsApp con animación
if (btnWhatsapp) {
    btnWhatsapp.addEventListener('click', () => {
        window.open('https://wa.me/34689320393', '_blank');
        
        // Animación de click
        btnWhatsapp.style.transform = 'scale(0.85)';
        setTimeout(() => {
            btnWhatsapp.style.transform = 'scale(1)';
        }, 300);
    });
}

// Botón de descarga de CV con animación
if (btnDownload) {
    btnDownload.addEventListener('click', () => {
        // IMPORTANTE: Reemplaza 'CV-Tatiana-Mendoza.pdf' con la ruta real de tu archivo PDF
        const link = document.createElement('a');
        link.href = 'CV-Tatiana-Mendoza.pdf'; // Cambia esto por la ruta real
        link.download = 'CV-Tatiana-Mendoza-Molinos.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Animación de click
        btnDownload.style.transform = 'scale(0.85)';
        setTimeout(() => {
            btnDownload.style.transform = 'scale(1)';
        }, 200);
        
        // Mensaje en consola
        console.log('Descargando CV...');
    });
}

// ============================================
// EFECTO PARALLAX EN HERO
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero-content');
    const heroPattern = document.querySelector('.hero-bg-pattern');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.4}px)`;
        hero.style.opacity = 1 - (scrolled * 0.002);
    }
    
    if (heroPattern && scrolled < window.innerHeight) {
        heroPattern.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// ============================================
// ANIMACIÓN INICIAL DE TARJETAS CON STAGGER
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        const firstCards = document.querySelectorAll('.card, .skill-category');
        firstCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            }, 100);
        });
    }, 300);
});

// ============================================
// SMOOTH SCROLL PARA TODOS LOS ENLACES INTERNOS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// DETECCIÓN DE DISPOSITIVO Y AJUSTES
// ============================================
function detectDevice() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768 && window.innerWidth <= 1024;
    
    if (isMobile) {
        document.body.classList.add('is-mobile');
    }
    
    if (isTablet) {
        document.body.classList.add('is-tablet');
    }
}

detectDevice();

// ============================================
// REDIMENSIÓN DE VENTANA - AJUSTES RESPONSIVE
// ============================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Cerrar menú móvil si cambia a desktop
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Redetectar dispositivo
        detectDevice();
    }, 250);
});

// ============================================
// PREVENCION DE ZOOM EN iOS
// ============================================
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

// ============================================
// PERFORMANCE: LAZY LOADING DE IMÁGENES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c👋 ¡Hola! Soy Tatiana Mendoza', 'color: #2E7DB5; font-size: 20px; font-weight: bold;');
console.log('%cTécnico Superior en Imagen para el Diagnóstico y Medicina Nuclear', 'color: #3DBEBD; font-size: 14px;');
console.log('%c📧 tatty99mendoza@gmail.com', 'color: #5F6C7B; font-size: 12px;');
