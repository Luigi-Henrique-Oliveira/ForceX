const produtos = [
  {
    id: 1,
    nome: "WHEY GOLD (1KG) - SABOR CHOCOLATE",
    preco: 129.90,
  imagem: "../assets/pngwing.com.png",
    quantidade: 0,
  },
  {
    id: 2,
    nome: "CREATINA POWDER (300G) - 100% PURA",
    preco: 89.90,
    imagem: "../assets/pngwing.com (1).png",
    quantidade: 0,
  },
  {
    id: 3,
    nome: "VITAMINA BCAA (345G) - AÇÃO INSTANTÂNEA",
    preco: 79.90,
    imagem: "../assets/pngwing.com (3).png",
    quantidade: 0,
  },
  {
    id: 4,
    nome: "KIT ALFA 100% PURO (10KG) - DE PURA EMOÇÃO",
    preco: 499.90,
    imagem: "../assets/png-transparent-dietary-supplement-bodybuilding-supplement-gainer-whey-protein-bodybuilding-nutrition-whey-sports-thumbnail-removebg-preview.png",
    quantidade: 0,
  }
];


const carrinhoItensContainer = document.getElementById("carrinho-itens");
const subtotalSpan = document.getElementById("subtotal");
const totalSpan = document.getElementById("total");

function formatarPreco(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

function atualizarResumo() {
  let subtotal = produtos.reduce((acc, produto) => acc + produto.preco * produto.quantidade, 0);
  subtotalSpan.innerText = formatarPreco(subtotal);
  totalSpan.innerText = formatarPreco(subtotal); // frete é grátis
}

function criarItemCarrinho(produto) {
  const item = document.createElement("div");
  item.classList.add("carrinho-item");
  item.style.display = "flex";
  item.style.justifyContent = "space-between";
  item.style.alignItems = "center";
  item.style.borderBottom = "1px solid #ddd";
  item.style.padding = "15px 0";

  item.innerHTML = `
    <div style="display: flex; align-items: center; gap: 20px;">
      <img src="${produto.imagem}" alt="${produto.nome}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;" />
      <div>
        <h4 style="margin-bottom: 5px;">${produto.nome}</h4>
        <p style="color: #666;">${formatarPreco(produto.preco)}</p>
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 10px;">
      <button class="btn-quantidade" onclick="alterarQuantidade(${produto.id}, -1)">−</button>
      <span id="quantidade-${produto.id}">${produto.quantidade}</span>
      <button class="btn-quantidade" onclick="alterarQuantidade(${produto.id}, 1)">+</button>
    </div>
  `;

  carrinhoItensContainer.appendChild(item);
}

function alterarQuantidade(id, delta) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  produto.quantidade += delta;
 if (produto.quantidade < 0) produto.quantidade = 0;

  document.getElementById(`quantidade-${produto.id}`).innerText = produto.quantidade;
  atualizarResumo();
}

function carregarCarrinho() {
  carrinhoItensContainer.innerHTML = "";
  produtos.forEach(produto => criarItemCarrinho(produto));
  atualizarResumo();
}

carregarCarrinho();
