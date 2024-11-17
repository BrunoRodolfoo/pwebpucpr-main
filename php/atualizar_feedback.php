<?php
// Inclui a conexão com o banco de dados
require_once 'conexao.php'; // Certifique-se de que o caminho está correto

if (!$conexao) {
    die(json_encode(["status" => "erro", "mensagem" => "Conexão com o banco de dados não foi estabelecida."]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtém os dados enviados na requisição
    $id_feedback = $_POST['id_feedback'] ?? null;
    $nome_cliente = $_POST['nome_cliente'] ?? '';
    $nome_produto = $_POST['nome_produto'] ?? '';
    $comentario = $_POST['comentario'] ?? '';
    $nota = $_POST['nota'] ?? null;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (empty($id_feedback) || empty($nome_cliente) || empty($nome_produto) || empty($comentario) || empty($nota)) {
        echo json_encode(["status" => "erro", "mensagem" => "Todos os campos são obrigatórios."]);
        exit;
    }

    // Validação extra: nota deve ser um número entre 1 e 5
    if ($nota < 1 || $nota > 5) {
        echo json_encode(["status" => "erro", "mensagem" => "A nota deve estar entre 1 e 5."]);
        exit;
    }

    // Prepara a consulta SQL para atualizar o feedback
    $sql = "UPDATE feedbacks SET nome_cliente = ?, nome_produto = ?, comentario = ?, nota = ? WHERE id_feedback = ?";

    // Prepara a declaração SQL
    if ($stmt = $conexao->prepare($sql)) {
        // Faz o bind dos parâmetros
        $stmt->bind_param("sssii", $nome_cliente, $nome_produto, $comentario, $nota, $id_feedback);

        // Executa a consulta
        if ($stmt->execute()) {
            echo json_encode(["status" => "sucesso", "mensagem" => "Feedback atualizado com sucesso."]);
        } else {
            echo json_encode(["status" => "erro", "mensagem" => "Erro ao atualizar feedback: " . $stmt->error]);
        }

        // Fecha a declaração
        $stmt->close();
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Erro na preparação da consulta: " . $conexao->error]);
    }

    // Fecha a conexão com o banco de dados
    $conexao->close();
}
?>
