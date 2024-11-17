document.getElementById("buscar-feedback-btn").addEventListener("click", function () {
    const buscaNome = document.getElementById("busca_nome").value.trim();

    if (buscaNome === "") {
        alert("Por favor, insira um nome para a busca.");
        return;
    }

    // Faz a requisição para o arquivo PHP usando fetch
    fetch(`/pwebpucpr-main/php/consulta_feedbacks.php?busca_nome=${encodeURIComponent(buscaNome)}`)
        .then(response => response.json())
        .then(data => {
            const tabelaResultado = document.getElementById("resultado-tabela");
            tabelaResultado.innerHTML = ""; // Limpa os resultados anteriores

            if (data.status === "sucesso" && data.dados && data.dados.length > 0) {
                data.dados.forEach(feedback => {
                    const tr = document.createElement("tr");

                    // Preenche os dados do feedback na tabela
                    tr.innerHTML = `
                        <td>${feedback.nome_cliente}</td>
                        <td>${feedback.nome_produto}</td>
                        <td>${feedback.comentario}</td>
                        <td>${feedback.nota}</td>
                        <td>
                            <button onclick="atualizarFeedback(${feedback.id_feedback}, '${feedback.nome_cliente}', '${feedback.nome_produto}', '${feedback.comentario}', ${feedback.nota})">Atualizar</button>
                            <button onclick="deletarFeedback(${feedback.id_feedback})">Deletar</button>
                        </td>
                    `;
                    tabelaResultado.appendChild(tr);
                });
            } else {
                const tr = document.createElement("tr");
                tr.innerHTML = "<td colspan='5'>Nenhum feedback encontrado.</td>";
                tabelaResultado.appendChild(tr);
            }
        })
        .catch(error => {
            console.error("Erro na consulta:", error);
            alert("Ocorreu um erro ao buscar os feedbacks. Detalhes no console.");
        });
});

// Função de deletar feedback
function deletarFeedback(id) {
    if (!id) {
        console.error("Erro: ID do feedback não fornecido.");
        alert("ID do feedback não fornecido.");
        return;
    }

    if (confirm("Você tem certeza que deseja deletar este feedback?")) {
        fetch(`/pwebpucpr-main/php/deletar_feedback.php?id=${id}`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "sucesso") {
                    alert("Feedback deletado com sucesso!");
                    document.getElementById("buscar-feedback-btn").click(); // Recarrega a lista
                } else {
                    alert("Erro ao deletar feedback.");
                    console.error("Erro ao deletar feedback:", data.mensagem);
                }
            })
            .catch(error => {
                console.error("Erro ao deletar feedback:", error);
                alert("Ocorreu um erro ao deletar o feedback. Detalhes no console.");
            });
    }
}

// Função de atualizar feedback
function atualizarFeedback(id, nomeCliente, nomeProduto, comentario, nota) {
    const nomeAtualizado = prompt("Atualize o nome do cliente", nomeCliente);
    const produtoAtualizado = prompt("Atualize o nome do produto", nomeProduto);
    const comentarioAtualizado = prompt("Atualize o comentário", comentario);
    const notaAtualizada = prompt("Atualize a nota (1-5)", nota);

    if (
        nomeAtualizado &&
        produtoAtualizado &&
        comentarioAtualizado &&
        notaAtualizada &&
        notaAtualizada >= 1 &&
        notaAtualizada <= 5
    ) {
        fetch('/pwebpucpr-main/php/atualizar_feedback.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                id_feedback: id,
                nome_cliente: nomeAtualizado,
                nome_produto: produtoAtualizado,
                comentario: comentarioAtualizado,
                nota: notaAtualizada,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "sucesso") {
                    alert("Feedback atualizado com sucesso!");
                    document.getElementById("buscar-feedback-btn").click(); // Recarrega a lista
                } else {
                    alert("Erro ao atualizar feedback.");
                    console.error("Erro ao atualizar feedback:", data.mensagem);
                }
            })
            .catch(error => {
                console.error("Erro ao atualizar feedback:", error);
                alert("Ocorreu um erro ao atualizar o feedback. Detalhes no console.");
            });
    } else {
        alert("Todos os campos devem ser preenchidos corretamente.");
    }
}
document.getElementById("buscar-feedback-btn").addEventListener("click", function () {
    const buscaNome = document.getElementById("busca_nome").value.trim();

    if (buscaNome === "") {
        alert("Por favor, insira um nome para a busca.");
        return;
    }

    // Faz a requisição para o arquivo PHP usando fetch
    fetch(`/pwebpucpr-main/php/consulta_feedbacks.php?busca_nome=${encodeURIComponent(buscaNome)}`)
        .then(response => response.json())
        .then(data => {
            const tabelaResultado = document.getElementById("resultado-tabela");
            tabelaResultado.innerHTML = ""; // Limpa os resultados anteriores

            if (data.status === "sucesso" && data.dados && data.dados.length > 0) {
                data.dados.forEach(feedback => {
                    const tr = document.createElement("tr");

                    // Preenche os dados do feedback na tabela
                    tr.innerHTML = `
                        <td>${feedback.nome_cliente}</td>
                        <td>${feedback.nome_produto}</td>
                        <td>${feedback.comentario}</td>
                        <td>${feedback.nota}</td>
                        <td>
                            <button onclick="atualizarFeedback(${feedback.id_feedback}, '${feedback.nome_cliente}', '${feedback.nome_produto}', '${feedback.comentario}', ${feedback.nota})">Atualizar</button>
                            <button onclick="deletarFeedback(${feedback.id_feedback})">Deletar</button>
                        </td>
                    `;
                    tabelaResultado.appendChild(tr);
                });
            } else {
                const tr = document.createElement("tr");
                tr.innerHTML = "<td colspan='5'>Nenhum feedback encontrado.</td>";
                tabelaResultado.appendChild(tr);
            }
        })
        .catch(error => {
            console.error("Erro na consulta:", error);
            alert("Ocorreu um erro ao buscar os feedbacks. Detalhes no console.");
        });
});

// Função de deletar feedback
function deletarFeedback(id) {
    if (!id) {
        console.error("Erro: ID do feedback não fornecido.");
        alert("ID do feedback não fornecido.");
        return;
    }

    if (confirm("Você tem certeza que deseja deletar este feedback?")) {
        fetch(`/pwebpucpr-main/php/deletar_feedback.php?id=${id}`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "sucesso") {
                    alert("Feedback deletado com sucesso!");
                    document.getElementById("buscar-feedback-btn").click(); // Recarrega a lista
                } else {
                    alert("Erro ao deletar feedback.");
                    console.error("Erro ao deletar feedback:", data.mensagem);
                }
            })
            .catch(error => {
                console.error("Erro ao deletar feedback:", error);
                alert("Ocorreu um erro ao deletar o feedback. Detalhes no console.");
            });
    }
}

// Função de atualizar feedback
function atualizarFeedback(id, nomeCliente, nomeProduto, comentario, nota) {
    const nomeAtualizado = prompt("Atualize o nome do cliente", nomeCliente);
    const produtoAtualizado = prompt("Atualize o nome do produto", nomeProduto);
    const comentarioAtualizado = prompt("Atualize o comentário", comentario);
    const notaAtualizada = prompt("Atualize a nota (1-5)", nota);

    if (
        nomeAtualizado &&
        produtoAtualizado &&
        comentarioAtualizado &&
        notaAtualizada &&
        notaAtualizada >= 1 &&
        notaAtualizada <= 5
    ) {
        fetch('/pwebpucpr-main/php/atualizar_feedback.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                id_feedback: id,
                nome_cliente: nomeAtualizado,
                nome_produto: produtoAtualizado,
                comentario: comentarioAtualizado,
                nota: notaAtualizada,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === "sucesso") {
                    alert("Feedback atualizado com sucesso!");
                    document.getElementById("buscar-feedback-btn").click(); // Recarrega a lista
                } else {
                    alert("Erro ao atualizar feedback.");
                    console.error("Erro ao atualizar feedback:", data.mensagem);
                }
            })
            .catch(error => {
                console.error("Erro ao atualizar feedback:", error);
                alert("Ocorreu um erro ao atualizar o feedback. Detalhes no console.");
            });
    } else {
        alert("Todos os campos devem ser preenchidos corretamente.");
    }
}

fetch('/pwebpucpr-main/php/atualizar_feedback.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
        id_feedback: id,
        nome_cliente: nomeAtualizado,
        nome_produto: produtoAtualizado,
        comentario: comentarioAtualizado,
        nota: notaAtualizada,
    }),
})

function deletarFeedback(id) {
    if (confirm("Tem certeza que deseja deletar este feedback?")) {
        fetch(`/pwebpucpr-main/php/deletar_feedback.php?id=${id}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'sucesso') {
                    alert(data.mensagem);
                    // Atualiza a lista de feedbacks na página
                    carregarFeedbacks(); // Função para recarregar os feedbacks
                } else {
                    alert(data.mensagem);
                }
            })
            .catch(error => {
                console.error("Erro ao deletar feedback:", error);
                alert("Erro ao deletar feedback.");
            });
    }
}

