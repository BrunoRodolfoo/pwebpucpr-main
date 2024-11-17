<?php
$servidor = "localhost"; // ou o IP do servidor
$usuario = "root";
$senha = "";
$banco = "database";

// Cria a conexão
$conexao = new mysqli($servidor, $usuario, $senha, $banco);

// Verifica se há erros
if ($conexao->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conexao->connect_error);
}
?>
