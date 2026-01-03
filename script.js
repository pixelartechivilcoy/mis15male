// =======================
// 🎵 MÚSICA
// =======================
const audio = document.getElementById("musica");
const musicBtn = document.getElementById("musicToggle");

if (audio && musicBtn) {
  // Estado inicial
  musicBtn.textContent = "▶";
  musicBtn.classList.add("paused");

  // Botón play / pausa
  musicBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().then(() => {
        musicBtn.textContent = "❚❚";
        musicBtn.classList.remove("paused");
      }).catch(err => console.warn("Error al reproducir:", err));
    } else {
      audio.pause();
      musicBtn.textContent = "▶";
      musicBtn.classList.add("paused");
    }
  });

  // Reproducir al ingresar desde index.html
  const shouldPlay = sessionStorage.getItem("playMusic");
  if (shouldPlay === "true") {
    audio.play().then(() => {
      musicBtn.textContent = "❚❚";
      musicBtn.classList.remove("paused");
      sessionStorage.removeItem("playMusic");
    }).catch(err => console.warn("Autoplay bloqueado:", err));
  }
}

// =======================
// 🎥 PARALLAX PORTADA
// =======================
const portadaImg = document.querySelector(".foto-portada img");
const fondoBlur = document.querySelector(".fondo-blur");
const heroText = document.querySelector(".hero-text");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

 if (portadaImg && scrollY <= window.innerHeight * 0.9) {
  portadaImg.style.transform = `translateY(${scrollY * 0.25}px)`;
}

if (fondoBlur && scrollY <= window.innerHeight * 0.9) {
  fondoBlur.style.transform = `scale(1.2) translateY(${scrollY * 0.15}px)`;
}

if (heroText && scrollY <= window.innerHeight * 0.9) {
  heroText.style.transform = `translateX(-50%) translateY(${scrollY * 0.08}px)`;
}
});

// =======================
// ⏳ CUENTA REGRESIVA
// =======================
// ⚠️ CAMBIÁ ESTA FECHA POR LA REAL
const targetDate = new Date("2026-01-17T21:30:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

// 🔥 CLAVE: ejecutar inmediatamente
updateCountdown();

// 🔁 y después cada segundo
setInterval(updateCountdown, 1000);


// =======================
// ⏳ CUENTA REGRESIVA AL HACER SCROLL
// =======================
const countdownWrapper = document.querySelector(".countdown-wrapper");

function showCountdownOnScroll() {
  if (!countdownWrapper) return;

  const triggerPoint = window.innerHeight * 0.95;
  const elementTop = countdownWrapper.getBoundingClientRect().top;

  if (elementTop < triggerPoint) {
    countdownWrapper.classList.add("visible");
    window.removeEventListener("scroll", showCountdownOnScroll);
  }
}

window.addEventListener("scroll", showCountdownOnScroll);

const fadeSections = document.querySelectorAll(".fade-section");

// =======================
// 🗺️ MAPA MODAL
// =======================
const mapaModal = document.getElementById("mapaModal");

function abrirMapa() {
  if (mapaModal) {
    mapaModal.classList.add("activo");
  }
}

function cerrarMapa() {
  if (mapaModal) {
    mapaModal.classList.remove("activo");
  }
}

let currentIndex = 0;

function moveSlide(button, direction) {
  const container = button.closest(".carousel-container");

  // Pausar autoplay al interactuar
  if (container.dataset.autoplay) {
    clearInterval(container.dataset.autoplay);
    container.dataset.autoplay = null;
  }

  slideCarousel(container, direction);
}


function slideCarousel(container, direction = 1) {
  const track = container.querySelector(".carousel-track");
  const items = container.querySelectorAll(".carousel-item");

  const isHorizontal = container.closest(".carousel-horizontal");
  const visibleItems = isHorizontal ? 1 : (window.innerWidth <= 768 ? 1 : 3);

  let index = container.dataset.index
    ? parseInt(container.dataset.index)
    : 0;

  const maxIndex = items.length - visibleItems;

  index += direction;

  if (index > maxIndex) index = 0;        // loop
  if (index < 0) index = maxIndex;

const style = getComputedStyle(items[0]);
const marginRight = parseFloat(style.marginRight);
const itemWidth = items[0].offsetWidth + marginRight;


  track.style.transform = `translateX(-${index * itemWidth}px)`;
  container.dataset.index = index;
}

function startAutoplay(container) {
  // Evitar duplicados
  if (container.dataset.autoplay) return;

  const interval = setInterval(() => {
    slideCarousel(container, 1);
  }, 3500);

  container.dataset.autoplay = interval;
}


document.querySelectorAll(".carousel-container").forEach(container => {
  const interval = setInterval(() => {
    slideCarousel(container, 1);
  }, 3500);

  // Guardamos el autoplay por si después querés pausarlo
  container.dataset.autoplay = interval;
});


// =======================
// REVEAL ON SCROLL
// =======================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((el) => {
  revealObserver.observe(el);
});

// ===== APARICIÓN DEL CARRUSEL + AUTOPLAY =====
const carousels = document.querySelectorAll('.carousel-container');

const carouselObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('carousel-hidden');
        entry.target.classList.add('carousel-visible');
      }
    });
  },
  { threshold: 0.4 }
);

carousels.forEach(carousel => {
  carouselObserver.observe(carousel);
});

// generar invitados
function generarPersonasUI() {
  const container = document.getElementById("personasContainer");
  const selectCantidad = document.getElementById("cantidadPersonas");

  if (!container || !selectCantidad) return;

  const cantidad = selectCantidad.value;
  container.innerHTML = "";

  if (!cantidad) return;

  for (let i = 1; i <= cantidad; i++) {
    container.innerHTML += `
      <div class="campo persona">
        <label class="label">Invitado ${i}</label>
        <input type="text" placeholder="Nombre">
        <input type="text" placeholder="Apellido">
        <select class="restriccion">
          <option value="">Sin restricción</option>
          <option value="Vegetariana">Vegetariana</option>
          <option value="Vegana">Vegana</option>
          <option value="Sin TACC">Sin TACC</option>
        </select>
      </div>
    `;
  }
}

document
  .getElementById("cantidadPersonas")
  ?.addEventListener("change", generarPersonasUI);

// antes de enviar
const form = document.getElementById("asistenciaForm");

const mensajeGracias = document.getElementById("mensajeGracias");

if (form && mensajeGracias) {
  form.addEventListener("submit", function () {
    setTimeout(() => {
      form.style.display = "none";
      mensajeGracias.classList.remove("oculto");
    }, 300);
  });
}

function actualizarInvitadosHidden() {
  const personas = document.querySelectorAll(".persona");
  let texto = "";

  personas.forEach((p, i) => {
    const nombre = p.querySelector('input[placeholder="Nombre"]')?.value || "";
    const apellido = p.querySelector('input[placeholder="Apellido"]')?.value || "";
    const restriccion =
      p.querySelector(".restriccion")?.value || "Sin restricción";

    if (nombre || apellido) {
      texto += `Invitado ${i + 1}: ${nombre} ${apellido} – ${restriccion}\n`;
    }
  });

  const hidden = document.getElementById("datosFinales");
  if (hidden) hidden.value = texto;
}

document.addEventListener("input", (e) => {
  if (e.target.closest("#personasContainer")) {
    actualizarInvitadosHidden();
  }
});

const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");

if (mensaje && contador) {
  const max = mensaje.maxLength;

  mensaje.addEventListener("input", () => {
    const restantes = max - mensaje.value.length;
    contador.textContent = `${restantes} caracteres restantes`;
  });
}

