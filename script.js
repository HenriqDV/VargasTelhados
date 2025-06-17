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

    // Função para mover o carrossel
function moverCarrossel(direcao) {
  if (direcao === 'proximo') {
    var $item = $carouselInner.find(".carousel-item").first();
    $item.fadeOut(200, function () {
      $item.appendTo($carouselInner).show();
      updateActive();
      centerActive();
    });
  } else {
    var $item = $carouselInner.find(".carousel-item").last();
    $item.hide().prependTo($carouselInner).fadeIn(200, function () {
      updateActive();
      centerActive();
    });
  }
}

// Botão "Próximo"
    $(".carousel-control-next").on("click", function () { // Ao clicar no botão próximo
        moverCarrossel('proximo');
    });

    // Botão "Anterior"
    $(".carousel-control-prev").on("click", function () { // Ao clicar no botão anterior
        moverCarrossel('anterior');
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

// Função de cálculo com a fórmula detalhada para pré-orçamento
function calcular() {
  const base = parseFloat(document.getElementById('base').value);
  const altura = parseFloat(document.getElementById('altura').value);
  const valorMaoDeObra = 200; // V = valor do serviço por m² (ajuste se necessário)
  const valorManta = 60;      // ma = valor da manta asfáltica por m² (ajuste se necessário)
  const resultadoDiv = document.getElementById('resultado');

  if (isNaN(base) || isNaN(altura)) {
    resultadoDiv.style.display = 'block';
    resultadoDiv.innerHTML = "Por favor, preencha todos os campos corretamente.";
    return;
  } 

  // Cálculos
  const area = base * altura; // A
  const maoDeObra = area * valorMaoDeObra; // M = A * V
  const material = (area + (0.6 * area)) * valorManta; // mt = (A + 60%A) * ma
  const valorTotal = maoDeObra + material; // VT = M + mt

  resultadoDiv.style.display = 'block';
  resultadoDiv.innerHTML = `
    <strong>Área do telhado:</strong> ${area} m²<br>
    <strong>Mão de obra:</strong> R$ ${maoDeObra.toFixed(2)}<br>
    <strong>Material:</strong> R$ ${material.toFixed(2)}<br>
    <hr>
    <strong>Total aproximado:</strong> <span style="color:green"><b>R$ ${valorTotal.toFixed(2)}</b></span><br>
    <hr>
    <small style="color:#888;">  
      * Valor do material por m²: R$ ${valorManta.toFixed(2)}<br>
      * Valor mão de obra por m²: R$ ${valorMaoDeObra.toFixed(2)}<br>
      * Valores podem variar conforme o tipo de telha e condições do local.
    </small>
    <br><br>
    Para um orçamento mais detalhado, entre em contato:<br>
    <!-- Facebook -->
    <a class="btn" style="background-color: #3b589800; color:black;"
      href="https://www.facebook.com/vargastelhados/?locale=pt_BR" role="button"><i
        class="fab fa-facebook-f fa-3x"></i></a>
    <!-- Instagram -->
    <a class="btn" style="background-color: #ac2bac00; color:black;"
      href="https://www.instagram.com/vargas_telhados/" role="button"><i class="fab fa-instagram fa-3x"></i></a>
    <!-- Whatsapp -->
    <a class="btn" style="background-color: #25d36500; color:black;" href="https://wa.me/5551985380601"
      role="button"><i class="fab fa-whatsapp fa-3x"></i></a>
  `;
}
