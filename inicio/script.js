const slide = document.getElementById('slide');
const imagens = slide.querySelectorAll('img');
const totalSlides = imagens.length;
let index = 0;
let intervalo;

function atualizarSlide() {
  // Translate de acordo com a largura 100vw
  slide.style.transform = `translateX(-${index * 100}vw)`;
}

function avancarSlide() {
  index = (index + 1) % totalSlides;
  atualizarSlide();
  resetarIntervalo(); // Reinicia o intervalo após ação do usuário
}

function voltarSlide() {
  index = (index - 1 + totalSlides) % totalSlides;
  atualizarSlide();
  resetarIntervalo();
}

function iniciarCarrossel() {
  intervalo = setInterval(() => {
    avancarSlide();
  }, 5000);
}

function resetarIntervalo() {
  clearInterval(intervalo);
  iniciarCarrossel();
}

// Inicializa
atualizarSlide();
iniciarCarrossel();
