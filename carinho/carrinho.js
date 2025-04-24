// Recuperar carrinho do localStorage
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
const carrinhoItens = document.getElementById('carrinho-itens');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');
const btnFinalizar = document.querySelector('.btn-finalizar-compra');

// Função para renderizar itens do carrinho
function renderizarCarrinho() {
  carrinhoItens.innerHTML = '';
  
  if (carrinho.length === 0) {
    carrinhoItens.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio</p>';
    subtotalElement.textContent = 'R$ 0,00';
    totalElement.textContent = 'R$ 0,00';
    return;
  }
  
  let subtotal = 0;
  
  carrinho.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'item-carrinho';
    
    const precoTotal = item.preco * item.quantidade;
    subtotal += precoTotal;
    
    itemElement.innerHTML = `
      <div class="item-img">
        <img src="${item.imagem}" alt="${item.nome}">
      </div>
      <div class="item-info">
        <h3>${item.nome}</h3>
        <div class="item-controle">
          <button class="btn-diminuir" data-id="${item.id}">-</button>
          <span class="item-quantidade">${item.quantidade}</span>
          <button class="btn-aumentar" data-id="${item.id}">+</button>
        </div>
      </div>
      <div class="item-preco">
        <span>R$ ${precoTotal.toFixed(2)}</span>
        <button class="btn-remover" data-id="${item.id}">Remover</button>
      </div>
    `;
    
    carrinhoItens.appendChild(itemElement);
  });
  
  // Atualizar totais
  subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
  totalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
  
  // Adicionar eventos aos botões
  document.querySelectorAll('.btn-diminuir').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      alterarQuantidade(id, -1);
    });
  });
  
  document.querySelectorAll('.btn-aumentar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      alterarQuantidade(id, 1);
    });
  });
  
  document.querySelectorAll('.btn-remover').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      removerItem(id);
    });
  });
}

// Função para alterar quantidade
function alterarQuantidade(id, mudanca) {
  const itemIndex = carrinho.findIndex(item => item.id === id);
  
  if (itemIndex !== -1) {
    carrinho[itemIndex].quantidade += mudanca;
    
    // Remover item se quantidade for menor que 1
    if (carrinho[itemIndex].quantidade < 1) {
      carrinho.splice(itemIndex, 1);
    }
    
    // Atualizar localStorage e renderizar
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    renderizarCarrinho();
  }
}

// Função para remover item
function removerItem(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  renderizarCarrinho();
}

// Evento para finalizar compra
btnFinalizar.addEventListener('click', () => {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  
  alert('Compra finalizada com sucesso! Obrigado por comprar na ForceX.');
  carrinho = [];
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  renderizarCarrinho();
});

// Inicializar carrinho
document.addEventListener('DOMContentLoaded', renderizarCarrinho);