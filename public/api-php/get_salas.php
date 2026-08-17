<?php
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
require_once 'config.php';
$stmt = $pdo->query('SELECT * FROM Experience ORDER BY id DESC');
echo json_encode($stmt->fetchAll());
?>
