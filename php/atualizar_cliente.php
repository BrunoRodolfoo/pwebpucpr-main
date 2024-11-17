<?php
// Inclui a conexão com o banco de dados
require_once 'conexao.php'; // Certifique-se de que o caminho está correto

if (!$conexao) {
    die(json_encode(["status" => "erro", "mensagem" => "Conexão com o banco de dados não foi estabelecida."]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verifica se os dados foram passados corretamente
    $id_cliente = $_POST['id_cliente'] ?? null;
    $nome = $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';
    $telefone = $_POST['telefone'] ?? '';
    $endereco = $_POST['endereco'] ?? '';

    if (empty($id_cliente) || empty($nome) || empty($email) || empty($telefone) || empty($endereco)) {
        echo json_encode(["status" => "erro", "mensagem" => "Todos os campos são obrigatórios."]);
        exit;
    }

    // Prepara a consulta SQL para atualizar o cliente
    $sql = "UPDATE clientes SET nome = ?, email = ?, telefone = ?, endereco = ? WHERE id_cliente = ?";

    // Prepara a declaração SQL
    if ($stmt = $conexao->prepare($sql)) {
        // Faz o bind dos parâmetros
        $stmt->bind_param("ssssi", $nome, $email, $telefone, $endereco, $id_cliente);

        // Executa a consulta
        if ($stmt->execute()) {
            echo json_encode(["status" => "sucesso", "mensagem" => "Cliente atualizado com sucesso."]);
        } else {
            echo json_encode(["status" => "erro", "mensagem" => "Erro ao atualizar cliente."]);
        }

        // Fecha a declaração
        $stmt->close();
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Erro na preparação da consulta."]);
    }

    // Fecha a conexão com o banco de dados
    $conexao->close();
}
?>
