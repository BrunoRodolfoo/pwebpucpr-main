<?php
// Inclui a conexão com o banco de dados
require_once 'conexao.php'; // Certifique-se de que o caminho está correto

if (!$conexao) {
    die("Erro: Conexão com o banco de dados não foi estabelecida.");
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';
    $telefone = $_POST['telefone'] ?? '';
    $endereco = $_POST['endereco'] ?? '';

    // Verifica se os campos obrigatórios estão preenchidos
    if (empty($nome) || empty($email)) {
        echo json_encode(["status" => "erro", "mensagem" => "Nome e email são obrigatórios."]);
        exit;
    }

    $sql = "INSERT INTO clientes (nome, email, telefone, endereco) VALUES (?, ?, ?, ?)";
    $stmt = $conexao->prepare($sql);

    if (!$stmt) {
        echo json_encode(["status" => "erro", "mensagem" => "Erro na preparação da consulta: " . $conexao->error]);
        exit;
    }

    $stmt->bind_param("ssss", $nome, $email, $telefone, $endereco);

    if ($stmt->execute()) {
        echo json_encode(["status" => "sucesso", "mensagem" => "Cliente cadastrado com sucesso."]);
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Erro ao cadastrar cliente: " . $stmt->error]);
    }

    $stmt->close();
    $conexao->close();
}
?>