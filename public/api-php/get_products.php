<?php
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
require_once 'config.php';

$q = $_GET['q'] ?? '';
$categoriaId = $_GET['categoriaId'] ?? '';
$min = $_GET['min'] ?? '';
$max = $_GET['max'] ?? '';

$sql = 'SELECT * FROM Product WHERE 1=1';
$params = [];

if ($q !== '') {
    $sql .= ' AND name LIKE ?';
    $params[] = '%' . $q . '%';
}
if ($categoriaId !== '') {
    $sql .= ' AND categoryId = ?';
    $params[] = $categoriaId;
}
if ($min !== '') {
    $sql .= ' AND price >= ?';
    $params[] = $min;
}
if ($max !== '') {
    $sql .= ' AND price <= ?';
    $params[] = $max;
}

$sql .= ' ORDER BY id DESC';

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$products = $stmt->fetchAll();

$showPrices = true;
try {
    $setStmt = $pdo->query("SELECT setting_value FROM Settings WHERE setting_key = 'show_prices'");
    if ($setStmt) {
        $res = $setStmt->fetch();
        if ($res && $res['setting_value'] === '0') {
            $showPrices = false;
        }
    }
} catch (Exception $e) {
    // Ignore if table doesn't exist yet
}

foreach ($products as &$p) {
    if (empty($p['image'])) {
        $p['image'] = '/images/placeholder.jpg';
    }
    if (!$showPrices) {
        $p['price'] = null;
    }
}

echo json_encode($products);
?>
