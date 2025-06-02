$(document).ready(function () { // Aguarda o carregamento do DOM

    var $carouselInner = $(".carousel-inner"); // Seleciona o container dos itens do carrossel
    var $carouselItems = $(".carousel-item");  // Seleciona todos os itens do carrossel
    var total = $carouselItems.length;         // Conta quantos itens existem no carrossel
    var current = 0;                           // Índice do item atualmente centralizado

    function centerActive() {
        $carouselItems.removeClass("active");                  // Remove a classe 'active' de todos os itens
        $carouselItems.eq(current).addClass("active");         // Adiciona a classe 'active' ao item atual
        // Centraliza o item ativo no carrossel
        var containerWidth = $carouselInner.width();           // Largura do container do carrossel
        var itemWidth = $carouselItems.eq(current).outerWidth(true); // Largura do item ativo (incluindo margem)
        // Calcula a posição para centralizar o item ativo
        var scrollTo = $carouselItems.eq(current).position().left + $carouselInner.scrollLeft() - (containerWidth/2) + (itemWidth/2);
        $carouselInner.animate({scrollLeft: scrollTo}, 500);   // Anima o scroll para centralizar o item ativo
    }

    // Inicializa o carrossel centralizando o primeiro item
    centerActive();

    // Botão "Próximo"
    $(".carousel-control-next").on("click", function () { // Ao clicar no botão próximo
        var $first = $carouselInner.find(".carousel-item").first(); // Seleciona o primeiro item
        $first.fadeOut(200, function () {                           // Faz o item desaparecer
            $first.appendTo($carouselInner).show();                 // Move o item para o final e mostra novamente
            updateActive();                                         // Atualiza a classe 'active'
            centerActive();                                         // Centraliza o novo item ativo
        });
    });

    // Botão "Anterior"
    $(".carousel-control-prev").on("click", function () { // Ao clicar no botão anterior
        var $last = $carouselInner.find(".carousel-item").last();   // Seleciona o último item
        $last.hide().prependTo($carouselInner).fadeIn(200, function () { // Move o item para o início e faz aparecer
            updateActive();                                         // Atualiza a classe 'active'
            centerActive();                                         // Centraliza o novo item ativo
        });
    });

    function updateActive() {
        var $items = $carouselInner.find(".carousel-item");         // Seleciona todos os itens do carrossel
        $items.removeClass("active");                               // Remove a classe 'active' de todos
        $items.eq(Math.floor($items.length / 2)).addClass("active");// Adiciona 'active' ao item central
    }

    function centerActive() {
        var $items = $carouselInner.find(".carousel-item");         // Seleciona todos os itens
        var $active = $items.filter(".active");                     // Seleciona o item ativo
        var containerWidth = $carouselInner.width();                // Largura do container
        var itemWidth = $active.outerWidth(true);                   // Largura do item ativo
        // Calcula a posição para centralizar o item ativo
        var scrollTo = $active.position().left + $carouselInner.scrollLeft() - (containerWidth / 2) + (itemWidth / 2);
        $carouselInner.animate({ scrollLeft: scrollTo }, 10);      // Anima o scroll para centralizar
    }

    // Inicializa o carrossel centralizando e ativando o item correto
    updateActive();
    centerActive();

    // Avança automaticamente o carrossel a cada 5 segundos
//    setInterval(function() {
//        $(".carousel-control-next").click(); // Simula o clique no botão "próximo"
//    }, 5000);


// EFEITO DE DEPOIMENTOS AUTOMÁTICO (slide com fade)
    const testimonials = document.querySelectorAll(".testimonial"); // Seleciona todos os depoimentos
    let currentIndex = 0; // Índice do depoimento atual

    setInterval(() => { // A cada 3 segundos
        
        testimonials[currentIndex].classList.remove("active"); // Remove a classe ativa do depoimento atual
        currentIndex = (currentIndex + 1) % testimonials.length; // Avança para o próximo depoimento (volta ao início se passar do último)
        testimonials[currentIndex].classList.add("active"); // Ativa o próximo depoimento
    }, 3000);
});





// modal de orçamento
// Abrir e fechar modal
document.getElementById('abrirModal').addEventListener('click', function () {
  document.getElementById('modal').style.display = 'block';
});

document.getElementById('fecharModal').addEventListener('click', function () {
  document.getElementById('modal').style.display = 'none';
});

window.onclick = function(event) {
  if (event.target == document.getElementById('modal')) {
    document.getElementById('modal').style.display = 'none';
  }
};

// Função de cálculo
function calcular() {
  const base = parseFloat(document.getElementById('base').value);
  const altura = parseFloat(document.getElementById('altura').value);
  const valorMetro = parseFloat(document.getElementById('valor').value);
  const resultadoDiv = document.getElementById('resultado');

  if (isNaN(base) || isNaN(altura) || isNaN(valorMetro)) {
    resultadoDiv.style.display = 'block';
    resultadoDiv.innerHTML = "Por favor, preencha todos os campos corretamente.";
    return;
  }

  const area = base * altura;
  const preco = area * valorMetro;

  resultadoDiv.style.display = 'block';
  resultadoDiv.innerHTML = `
    <strong>Área do Telhado:</strong> ${area.toFixed(2)} m²<br>
    <strong>Orçamento Estimado:</strong> R$ ${preco.toFixed(2)}
  `;
}
