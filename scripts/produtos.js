// Função para atualizar um produto
function atualizarProduto(idProduto) {
    window.location.href = `atualizar_produto.php?id=${idProduto}`;
}

// Função para deletar um produto
function deletarProduto(idProduto) {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
        window.location.href = `deletar_produto.php?id=${idProduto}`;
    }
}

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(idProduto) {
    // Aqui você pode enviar uma solicitação AJAX para adicionar ao carrinho
    fetch(`adicionar_ao_carrinho.php?id=${idProduto}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Produto adicionado ao carrinho com sucesso!');
        } else {
            alert('Falha ao adicionar o produto ao carrinho.');
        }
    })
    .catch(error => {
        console.error('Erro ao adicionar ao carrinho:', error);
    });
}