<?php
// Inclui a conexão com o banco de dados
require_once 'conexao.php'; // Certifique-se de que o caminho está correto

if (!$conexao) {
    die("Erro: Conexão com o banco de dados não foi estabelecida.");
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome_cliente = $_POST['nome_cliente'] ?? '';
    $nome_produto = $_POST['nome_produto'] ?? '';
    $comentario = $_POST['comentario'] ?? '';
    $nota = $_POST['nota'] ?? '';

    // Verifica se os campos obrigatórios estão preenchidos
    if (empty($nome_cliente) || empty($nome_produto) || empty($comentario) || empty($nota)) {
        echo json_encode(["status" => "erro", "mensagem" => "Todos os campos são obrigatórios."]);
        exit;
    }

    $sql = "INSERT INTO feedbacks (nome_cliente, nome_produto, comentario, nota) VALUES (?, ?, ?, ?)";
    $stmt = $conexao->prepare($sql);

    if (!$stmt) {
        echo json_encode(["status" => "erro", "mensagem" => "Erro na preparação da consulta: " . $conexao->error]);
        exit;
    }

    $stmt->bind_param("sssi", $nome_cliente, $nome_produto, $comentario, $nota);

    if ($stmt->execute()) {
        echo json_encode(["status" => "sucesso", "mensagem" => "Feedback cadastrado com sucesso."]);
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Erro ao cadastrar feedback: " . $stmt->error]);
    }

    $stmt->close();
    $conexao->close();
}
?>
