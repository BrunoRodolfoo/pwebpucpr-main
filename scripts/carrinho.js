// Simulação de um carrinho de produtos (usando localStorage para persistência)
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para renderizar os produtos no carrinho
function renderizarCarrinho() {
    const carrinhoItems = document.getElementById('carrinho-items');
    carrinhoItems.innerHTML = ''; // Limpa o carrinho

    carrinho.forEach(produto => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('gallery-item');
        itemDiv.innerHTML = `
            <h3>${produto.nome}</h3>
            <p>Preço: R$${produto.preco.toFixed(2)}</p>
            <button onclick="removerDoCarrinho(${produto.id})">Remover</button>
        `;
        carrinhoItems.appendChild(itemDiv);
    });

    atualizarPrecoTotal();
}

// Função para remover um produto do carrinho
function removerDoCarrinho(idProduto) {
    carrinho = carrinho.filter(produto => produto.id !== idProduto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    renderizarCarrinho();
}

// Função para calcular o preço total
function calcularPrecoTotal() {
    return carrinho.reduce((total, produto) => total + produto.preco, 0);
}

// Função para aplicar o desconto e atualizar o preço total
function atualizarPrecoTotal() {
    let precoTotal = calcularPrecoTotal();
    const codigoCupom = document.getElementById('codigo_cupom').value.trim().toUpperCase();

    // Simulação de cupons válidos (pode ser substituído pela validação do servidor)
    const cuponsValidos = {
        'DESCONTO10': 10,
        'DESCONTO20': 20
    };

    if (cuponsValidos[codigoCupom]) {
        const desconto = cuponsValidos[codigoCupom];
        precoTotal *= (1 - desconto / 100);
    }

    document.getElementById('preco-total').textContent = precoTotal.toFixed(2);
}

// Função para finalizar a compra
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return false;
    }
    
    const nomeCliente = document.getElementById('nome_cliente').value;
    if (!nomeCliente) {
        alert('Por favor, insira o nome do cliente.');
        return false;
    }

    // Opcional: Enviar informações para o servidor ou armazenar na tabela de pedidos

    alert('Compra finalizada com sucesso!');
    localStorage.removeItem('carrinho'); // Limpa o carrinho
    window.location.href = 'pedidos.html'; // Redireciona para a página de pedidos
    return false; // Impede o envio real do formulário
}

// Renderiza o carrinho na inicialização
renderizarCarrinho();