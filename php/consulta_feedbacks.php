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

    // Consulta SQL para buscar feedbacks pelo nome do cliente ou produto
    $sql = "SELECT id_feedback, nome_cliente, nome_produto, comentario, nota 
            FROM feedbacks 
            WHERE nome_cliente LIKE ? OR nome_produto LIKE ?";
    $stmt = $conexao->prepare($sql);

    if (!$stmt) {
        echo json_encode(["status" => "erro", "mensagem" => "Erro na preparação da consulta: " . $conexao->error]);
        exit;
    }

    $busca_nome = "%" . $busca_nome . "%";
    $stmt->bind_param("ss", $busca_nome, $busca_nome);

    if ($stmt->execute()) {
        $result = $stmt->get_result();

        $feedbacks = [];
        while ($row = $result->fetch_assoc()) {
            $feedbacks[] = $row;
        }

        if (empty($feedbacks)) {
            echo json_encode(["status" => "sucesso", "mensagem" => "Nenhum feedback encontrado."]);
        } else {
            echo json_encode(["status" => "sucesso", "dados" => $feedbacks]);
        }
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Erro ao executar consulta: " . $stmt->error]);
    }

    $stmt->close();
    $conexao->close();
}
?>
