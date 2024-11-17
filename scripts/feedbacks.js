// Função para atualizar um feedback
function atualizarFeedback(idFeedback) {
    window.location.href = `atualizar_feedback.php?id=${idFeedback}`;
}

// Função para deletar um feedback
function deletarFeedback(idFeedback) {
    if (confirm('Tem certeza que deseja deletar este feedback?')) {
        window.location.href = `deletar_feedback.php?id=${idFeedback}`;
    }
}