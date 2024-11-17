// Simulação de um conjunto de pedidos (usando localStorage ou um array para persistência)
let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

// Função para renderizar os pedidos na galeria
function renderizarPedidos() {
    const pedidosItems = document.getElementById('pedidos-items');
    pedidosItems.innerHTML = ''; // Limpa os itens

    pedidos.forEach(pedido => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('gallery-item');
        itemDiv.innerHTML = `
            <h3>Pedido #${pedido.id}</h3>
            <p>Cliente: ${pedido.cliente}</p>
            <p>Total: R$${pedido.total.toFixed(2)}</p>
        `;
        itemDiv.onclick = () => mostrarDetalhesPedido(pedido.id);
        pedidosItems.appendChild(itemDiv);
    });
}

// Função para mostrar os detalhes do pedido selecionado
function mostrarDetalhesPedido(idPedido) {
    const pedido = pedidos.find(p => p.id === idPedido);
    if (!pedido) {
        alert('Pedido não encontrado.');
        return;
    }

    document.getElementById('cliente').value = pedido.cliente;
    document.getElementById('valor_total').value = pedido.total;
    document.getElementById('status_pedido').value = pedido.status;
    document.getElementById('detalhes-pedido').style.display = 'block';

    // Armazena o ID do pedido para atualização posterior
    document.getElementById('form-detalhes').dataset.id = idPedido;
}

// Função para atualizar os detalhes do pedido
function atualizarPedido() {
    const idPedido = document.getElementById('form-detalhes').dataset.id;
    const pedidoIndex = pedidos.findIndex(p => p.id == idPedido);
    if (pedidoIndex === -1) {
        alert('Erro ao atualizar o pedido.');
        return false;
    }

    // Atualiza os dados do pedido
    pedidos[pedidoIndex].cliente = document.getElementById('cliente').value;
    pedidos[pedidoIndex].total = parseFloat(document.getElementById('valor_total').value);
    pedidos[pedidoIndex].status = document.getElementById('status_pedido').value;

    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    alert('Pedido atualizado com sucesso!');
    renderizarPedidos();
    document.getElementById('detalhes-pedido').style.display = 'none';
    return false; // Previne o envio real do formulário
}

// Renderiza os pedidos na inicialização
renderizarPedidos();