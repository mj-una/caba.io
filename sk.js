const memo = [[], []]; // qaby, paty
const fondo = document.querySelectorAll(".dd");

function preload() {
  
  for (let i = 1; i < 6; i++) {
    memo[0].push(loadImage(`qaby/${i}.png`));  
    memo[1].push(loadImage(`paty/${i}.png`));  
  }
} 

function setup() {

  createCanvas(500, 600)
    .parent("sk")
    .id("cnvSk");
  windowResized(); // (*)
  colorMode(HSB, 100, 100, 100);
  frameRate(3);
}

function draw() {  
  
  let imgs;
  let rb = random(40, 60); // limite brillo
  
  if (mouseIsPressed) imgs = memo[1];
  else imgs = memo[0];

  background(255);
  
  for (let x = 0; x < 500; x+= 100) { // filas
    for (let y = 0; y < 600; y += 100) { // columnas
      for (let i = 0; i < imgs.length; i++) { // capas
        
        tint(
          random(-10, 160), // tono
          random(90, 100), // saturacion
          random(rb, 100) // brillo
        );
        
        image(
          imgs[i], // src
          x, y, 100, 100, // pos y tam en canvas
          x, y, 100, 100 // pos y tam dentro de src
        );
      }
    }
  }

  const hh = random(6, 360);
  const ss = random(90, 100);
  const ll = random(56, 66);

  const f = (p, m) => `repeating-linear-gradient(
    ${((frameCount % 36) * (p ? 10 : -10))}deg,
    hsl(${m ? 20 : 260}, 80%, 60%) 0rem,
    hsl(${hh}, ${ss}%, ${ll}%) 1rem,
    hsl(${m ? 260 : 20}, 80%, 60%) 2rem
  )`;

  for (i = 0; i < 4; i++) {
    fondo[i].style.background = f(i % 2 == 0, i >= 2);
  } 
}

let evitarClickS = false;
function touchStarted() {

  // prevenir doble accion
  if (evitarClickS) return;
  evitarClickS = true;
  setTimeout(function() {
    evitarClickS = false;
  }, 110);

  // pausa
  noLoop();

  // actualizar ahora
  // (no espera 3fps)
  draw();
}

let evitarClickE = false;
function touchEnded() {

  // prevenir doble accion
  if (evitarClickE) return;
  evitarClickE = true;
  setTimeout(function() {
    evitarClickE = false;
  }, 110);

  // reanudar
  loop();

  // actualizar ahora
  // (no espera 3fps)
  draw();
}

// responsive ! ! copiar y pegar ! !
// (*)llamar despues de createCanvas
function windowResized() {
  
  const pag = document.querySelector("body");
  const cnv = document.querySelector("#cnvSk");
  const mrg = 2; // margen
  
  pag.style.overflow = "hidden";
  pag.style.display = "flex";
  pag.style.justifyContent = "center";
  pag.style.alignItems = "center";
  pag.style.height = "100svh";
 
  if (windowWidth * height > windowHeight * width) {
    cnv.style.height = (100 - mrg * 2) + "svh";
    cnv.style.width = ((100 - mrg * 2) / height) * width + "svh";
  }
  else {
    cnv.style.width = (100 - mrg * 2) + "vw";
    cnv.style.height = ((100 - mrg * 2) / width) * height + "vw";
  }
}
