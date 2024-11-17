// Função para atualizar um cupom
function atualizarCupom(idCupom) {
    window.location.href = `atualizar_cupom.php?id=${idCupom}`;
}

// Função para deletar um cupom
function deletarCupom(idCupom) {
    if (confirm('Tem certeza que deseja deletar este cupom?')) {
        window.location.href = `deletar_cupom.php?id=${idCupom}`;
    }
}