<?php
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
header('Content-Type: application/json');
require_once 'config.php';

// Crear tabla de ajustes si no existe
$pdo->exec("
    CREATE TABLE IF NOT EXISTS `Settings` (
        `setting_key` VARCHAR(50) NOT NULL PRIMARY KEY,
        `setting_value` VARCHAR(255) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
");

// Insertar valor por defecto para show_prices si no existe
$pdo->exec("INSERT IGNORE INTO `Settings` (`setting_key`, `setting_value`) VALUES ('show_prices', '1')");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query("SELECT setting_value FROM Settings WHERE setting_key = 'show_prices'");
    $result = $stmt->fetch();
    
    echo json_encode([
        'show_prices' => ($result && $result['setting_value'] === '1') ? true : false
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['show_prices'])) {
        $val = $data['show_prices'] ? '1' : '0';
        $stmt = $pdo->prepare("UPDATE Settings SET setting_value = ? WHERE setting_key = 'show_prices'");
        $stmt->execute([$val]);
        
        echo json_encode(['success' => true, 'show_prices' => $data['show_prices']]);
    } else {
        echo json_encode(['error' => 'Missing show_prices parameter']);
    }
    exit;
}

echo json_encode(['error' => 'Invalid method']);
?>
