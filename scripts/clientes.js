document.getElementById("buscar-cliente-btn").addEventListener("click", function() {
    let buscaNome = document.getElementById("busca_nome").value;
    if (buscaNome.trim() === "") {
        alert("Por favor, insira um nome para busca.");
        return;
    }

    // Envia a requisição para o PHP usando fetch
    fetch(`/pwebpucpr-main/php/consulta_clientes.php?busca_nome=${encodeURIComponent(buscaNome)}`)
        .then(response => response.json())
        .then(data => {
            const tabelaResultado = document.getElementById("resultado-tabela");
            tabelaResultado.innerHTML = ""; // Limpa os resultados anteriores

            if (data.status === "sucesso" && data.dados.length > 0) {
                data.dados.forEach(cliente => {
                    const tr = document.createElement("tr");

                    // Preenche os dados de cada cliente na tabela
                    tr.innerHTML = `
                        <td>${cliente.nome}</td>
                        <td>${cliente.email}</td>
                        <td>${cliente.telefone}</td>
                        <td>${cliente.endereco}</td>
                        <td>
                            <button onclick="atualizarCliente(${cliente.id_cliente}, '${cliente.nome}', '${cliente.email}', '${cliente.telefone}', '${cliente.endereco}')">Atualizar</button>
                            <button onclick="deletarCliente(${cliente.id_cliente})">Deletar</button>
                        </td>
                    `;
                    tabelaResultado.appendChild(tr);
                });
            } else {
                const tr = document.createElement("tr");
                tr.innerHTML = "<td colspan='5'>Nenhum cliente encontrado.</td>";
                tabelaResultado.appendChild(tr);
            }
        })
        .catch(error => {
            console.error("Erro na consulta:", error);
            alert("Ocorreu um erro ao buscar os clientes. Detalhes no console.");
        });
});

// Função de deletar cliente
function deletarCliente(id) {
    console.log("ID recebido para deletar: ", id); // Log para verificar o ID recebido
    if (!id) {
        console.error("Erro: ID do cliente não fornecido.");
        alert("ID do cliente não fornecido.");
        return;
    }

    if (confirm("Você tem certeza que deseja deletar este cliente?")) {
        // Envia a requisição de exclusão usando GET
        fetch(`/pwebpucpr-main/php/deletar_cliente.php?id=${id}`, {
            method: "GET", // Usando GET para enviar o id
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "sucesso") {
                alert("Cliente deletado com sucesso!");
                // Recarrega a lista de clientes após a exclusão
                document.getElementById("buscar-cliente-btn").click();
            } else {
                alert("Erro ao deletar cliente.");
                console.error("Erro ao deletar cliente:", data.mensagem); // Exibe a mensagem completa de erro
            }
        })
        .catch(error => {
            console.error("Erro ao deletar cliente:", error);
            alert("Ocorreu um erro ao deletar o cliente. Detalhes no console.");
        });
    }
}

// Função de atualizar cliente
function atualizarCliente(id, nome, email, telefone, endereco) {
    // Exibe um formulário ou campos de edição para o usuário
    // Você pode usar um modal ou campos de input, dependendo do seu design

    const nomeAtualizado = prompt("Atualize o nome", nome);
    const emailAtualizado = prompt("Atualize o email", email);
    const telefoneAtualizado = prompt("Atualize o telefone", telefone);
    const enderecoAtualizado = prompt("Atualize o endereço", endereco);

    if (nomeAtualizado && emailAtualizado && telefoneAtualizado && enderecoAtualizado) {
        // Envia os dados para atualização
        fetch('/pwebpucpr-main/php/atualizar_cliente.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                id_cliente: id,
                nome: nomeAtualizado,
                email: emailAtualizado,
                telefone: telefoneAtualizado,
                endereco: enderecoAtualizado,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "sucesso") {
                alert("Cliente atualizado com sucesso!");
                // Recarrega a lista de clientes após a atualização
                document.getElementById("buscar-cliente-btn").click();
            } else {
                alert("Erro ao atualizar cliente.");
                console.error("Erro ao atualizar cliente:", data.mensagem); // Exibe a mensagem completa de erro
            }
        })
        .catch(error => {
            console.error("Erro ao atualizar cliente:", error);
            alert("Ocorreu um erro ao atualizar o cliente. Detalhes no console.");
        });
    } else {
        alert("Todos os campos são obrigatórios para atualização.");
    }
}
