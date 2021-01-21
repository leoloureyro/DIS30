const dbEventos = {
  "Martes 15/10": [
    // {
    //   "titulo": "Maratón cortos",
    //   "aula": "S. Feldman",
    //   "horario": "9 a 13hs"
    // },
    {
      "titulo": "Encandilan las luces",
      "aula": "S. Feldman",
      "horario": "16 a 18hs",
      "descripcion": "Proyección. DIS A. Gallo"
    },
    {
      "titulo": "Diseñadores de sonido",
      "aula": "Aula Magna",
      "horario": "19hs",
      "descripcion": "Ale Seba"
    }
  ],
  "Miércoles 16/10": [
    {
      "titulo": "Los personajes animados de García Ferre",
      "aula": "S. Feldman",
      "horario": "10:30 a 12:30hs",
      "descripcion": "Susy Landau, Tamara Acorinti, Alicia Roshental"
    },
    {
      "titulo": "Las Facultades",
      "aula": "S. Feldman",
      "horario": "17 a 19hs",
      "descripcion": "Proyección. DIS A. Gallo"
    },
    {
      "titulo": "Diseño y mujeres",
      "aula": "S. Feldman",
      "horario": "19hs",
      "descripcion": "Mónica Acosta"
    }
  ],
  "Jueves 17/10": [
    // {
    //   "titulo": "Maratón cortos",
    //   "aula": "S. Feldman",
    //   "horario": "9 a 13hs"
    // },
    {
      "titulo": "Ganadores FIDBA 2019",
      "aula": "S. Feldman",
      "horario": "16 a 18hs",
      "descripcion": "'CAPA MADRE' Sofía Monardo - 'THE END OF ETERNITY' Pablo Radice"
    },
    {
      "titulo": "Asociaciones",
      "aula": "S. Feldman",
      "horario": "19:30 a 22:30hs",
      "descripcion": "Directores / Actores / Productores / SICA - Alberto Masliah"
    }
  ],
  "Viernes 18/10": [
    {
      "titulo": "Nuevas tecnologías de diseño",
      "aula": "S. Feldman",
      "horario": "9 a 11hs",
      "descripcion": "Programación de interface web y contenido 360°. DGPC Díaz Cortez"
    },
    {
      "titulo": "Música y medios AV",
      "aula": "S. Feldman",
      "horario": "11 a 13hs",
      "descripcion": "Martín Alomar"
    },
    {
      "titulo": "Escrituras AV y Perspectiva de Género",
      "aula": "Aula Magna",
      "horario": "14 a 16hs",
      "descripcion": "Moderadora Irene Ickowicz"
    },
    {
      "titulo": "Reflexiones sobre el tiempo",
      "aula": "Aula Magna",
      "horario": "16:30 a 17:30hs",
      "descripcion": "Ch. Gonzalez - C. Saitta"
    },
    {
      "titulo": "Homenaje",
      "aula": "Aula Magna",
      "horario": "17:30 a 18:30hs"
    },
    {
      "titulo": "Charla",
      "aula": "Aula Magna",
      "horario": "19 a 21hs",
      "descripcion": "Luis Ortega - DIS Rosario Suarez"
    },
    {
      "titulo": "Evento Retroproyección",
      "aula": "Ext. FADU",
      "horario": "21:30hs",
    }
  ]
};

// Añadir eventos al Cronograma
const cronograma = document.getElementById("cronograma");
class Evento{
  constructor(ev){
    this.marco = document.createElement("div");
    this.marco.classList.add("actividad");

    this.titulo = ev.titulo;
    this.descripcion = ev.descripcion || "";
    this.aula = ev.aula || "";
    this.horario = ev.horario || "";
    this.imagen = ev.imagen || "";

    this.imprimirEvento();
    return this.marco;
  }

  imprimirEvento(){
    if(this.imagen != ""){
      let imagen = document.createElement("div");
      imagen.classList.add("pic");
      imagen.style.backgroundImage = this.imagen;
      this.marco.appendChild(imagen);
    };

    let info = document.createElement("div");
    info.classList.add("info");

    let titulo = document.createElement("p");
    let descripcion = document.createElement("p");
    let detalles = document.createElement("p");
    titulo.classList.add("title");
    titulo.classList.add("descripcion");
    titulo.classList.add("detalles");

    titulo.textContent = this.titulo;
    descripcion.textContent = this.descripcion;
    detalles.textContent = `${this.aula} | ${this.horario}`;

    info.appendChild(titulo);
    info.appendChild(descripcion);
    info.appendChild(detalles);

    this.marco.appendChild(info);
  }
}

(function cargaEventos(){
  for(let dia in dbEventos){
    let tituloDia = document.createElement("h2");
    tituloDia.textContent = dia;
    cronograma.appendChild(tituloDia);
    for(let evento of dbEventos[dia]){
      cronograma.appendChild(new Evento(evento))
    };
  }
})();

HTMLElement.prototype.animateTo = function (property, durationMs, timingFunction = "ease", fillMode = "forwards") {
  let from = {};
  let to = {};
  for(let prop in property){
    from[prop] = window.getComputedStyle(this, null).getPropertyValue(prop) || this.style.prop || undefined;
    to[prop] = property[prop];
  };
  this.animate([from, to], {
    duration: durationMs,
    easing: timingFunction,
    fill: fillMode
  });

  return this;
}

// MENU
const sandwitch = document.querySelector("#sandwitch");
const menu = document.querySelector("#menu");
const menuItems = document.querySelector("#menu-items");

sandwitch.addEventListener("click", ()=>{
  menu.classList.add("active");
})
menu.addEventListener("mouseleave", ()=>{
  menu.classList.remove("active");
});
menuItems.addEventListener("click", ()=>{
  menu.classList.remove("active");
});

// CONVERTIR EL SPLASH EN UNA ESCENA
var scene = new Scene("splash");

// ANIMAR TITULOS DINÁMICOS PARA EL SPLASH
const splashElements = document.getElementsByClassName("scene-element");
for(let elem of splashElements){
  elem.addEventListener("mouseover", function(){
    let element = this.getAttribute("id");
    document.querySelector(`.section-holder.${element}`).classList.add("active");
  });
  elem.addEventListener("mouseout", function(){
    let element = this.getAttribute("id");
    document.querySelector(`.section-holder.${element}`).classList.remove("active");
  });
}

// CUENTA REGRESIVA
var countDown = new Date("Oct 15, 2019 09:00:00").getTime();
var x = setInterval(function() {
  let ahora = new Date().getTime();
  let distancia = countDown - ahora;
  let dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  let horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  let segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  document.getElementById("dias").textContent = dias;
  document.getElementById("hs").textContent = horas;
  document.getElementById("mins").textContent = minutos;
  document.getElementById("segs").textContent = segundos;

  if (distancia < 0) {
    clearInterval(x);
    // document.getElementById("hs").textContent = "00";
    // document.getElementById("mins").textContent = "00";
    // document.getElementById("segs").textContent = "00";
    document.getElementById("cuenta-regresiva").textContent = "En la FADU ahora...";
  }
}, 1000);

// LOADER
const loader = new ImgLoader();
const loaderElement = document.getElementById("big-loader");

loader.onChange = function(){
  // console.log(`cargando ${loader.percentage}%`);
  loaderElement.querySelector("#loading").textContent = `cargando ${loader.percentage}%`;
}
loader.onLoad = function(){
  loaderElement.querySelector("#loading").textContent = "presenta";
  loaderElement.classList.add("loaded");
  setTimeout(function(){
    loaderElement.style.pointerEvents = "none";
    loaderElement.animateTo({"opacity": "0"}, 1000);
    setTimeout(function(){
      loaderElement.style.display = "none";
    }, 1000)
  }, 1000);
};
loader.init();

// SHADERS
var vhsAnimation;
const vhsNoise = document.querySelector(".vhs-noise");
window.addEventListener("scroll", () => {
  clearTimeout(vhsAnimation);
  vhsNoise.style.display = "block";
  vhsAnimation = setTimeout(function(){
    vhsNoise.style.display = "none";
  }, 500);
})
