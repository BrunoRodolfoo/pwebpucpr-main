<?php
// Inclui a conexão com o banco de dados
require_once 'conexao.php'; // Certifique-se de que o caminho está correto

if (!$conexao) {
    die(json_encode(["status" => "erro", "mensagem" => "Conexão com o banco de dados não foi estabelecida."]));
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Verifica se o ID do feedback foi fornecido
    $id_feedback = $_GET['id'] ?? '';

    if (empty($id_feedback)) {
        echo json_encode(["status" => "erro", "mensagem" => "ID do feedback não fornecido."]);
        exit;
    }

    // Consulta SQL para deletar o feedback
    $sql = "DELETE FROM feedbacks WHERE id_feedback = ?";

    // Prepara a consulta
    $stmt = $conexao->prepare($sql);

    if (!$stmt) {
        echo json_encode(["status" => "erro", "mensagem" => "Erro na preparação da consulta: " . $conexao->error]);
        exit;
    }

    // Vincula o parâmetro ID
    $stmt->bind_param("i", $id_feedback);

    if ($stmt->execute()) {
        echo json_encode(["status" => "sucesso", "mensagem" => "Feedback deletado com sucesso."]);
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Erro ao executar a exclusão: " . $stmt->error]);
    }

    // Fecha a declaração e a conexão
    $stmt->close();
    $conexao->close();
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Método HTTP inválido."]);
}
?>
