<?php
// Inclui a conexão com o banco de dados
require_once 'conexao.php'; // Certifique-se de que o caminho está correto

if (!$conexao) {
    die(json_encode(["status" => "erro", "mensagem" => "Conexão com o banco de dados não foi estabelecida."]));
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $busca_nome = $_GET['busca_nome'] ?? '';

    // Verifica se o campo de busca foi preenchido
    if (empty($busca_nome)) {
        echo json_encode(["status" => "erro", "mensagem" => "O campo de busca é obrigatório."]);
        exit;
    }

    // Consulta SQL para buscar clientes pelo nome
    $sql = "SELECT id_cliente, nome, email, telefone, endereco FROM clientes WHERE nome LIKE ?";
    $stmt = $conexao->prepare($sql);

    if (!$stmt) {
        echo json_encode(["status" => "erro", "mensagem" => "Erro na preparação da consulta: " . $conexao->error]);
        exit;
    }

    $busca_nome = "%" . $busca_nome . "%";
    $stmt->bind_param("s", $busca_nome);

    if ($stmt->execute()) {
        $result = $stmt->get_result();

        $clientes = [];
        while ($row = $result->fetch_assoc()) {
            $clientes[] = $row;
        }

        if (empty($clientes)) {
            echo json_encode(["status" => "sucesso", "mensagem" => "Nenhum cliente encontrado."]);
        } else {
            echo json_encode(["status" => "sucesso", "dados" => $clientes]);
        }
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Erro ao executar consulta: " . $stmt->error]);
    }

    $stmt->close();
    $conexao->close();
}
?>
