<?php
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
require_once 'config.php';

$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(['error' => 'Missing ID']);
    exit;
}

$stmt = $pdo->prepare('SELECT * FROM Product WHERE id = ?');
$stmt->execute([$id]);
$product = $stmt->fetch();

if (!$product) {
    echo json_encode(['error' => 'Not found']);
    exit;
}

if (empty($product['image'])) {
    $product['image'] = '/images/placeholder.jpg';
}

$catStmt = $pdo->prepare('SELECT * FROM Category WHERE id = ?');
$catStmt->execute([$product['categoryId']]);
$product['category'] = $catStmt->fetch() ?: null;

$galStmt = $pdo->prepare('SELECT * FROM ProductImage WHERE productId = ?');
$galStmt->execute([$id]);
$product['gallery'] = $galStmt->fetchAll() ?: [];

$showPrices = true;
try {
    $setStmt = $pdo->query("SELECT setting_value FROM Settings WHERE setting_key = 'show_prices'");
    if ($setStmt) {
        $res = $setStmt->fetch();
        if ($res && ($res['setting_value'] === '0' || $res['setting_value'] == 0 || $res['setting_value'] === false)) {
            $showPrices = false;
        }
    }
} catch (Exception $e) {
    // Ignore if table doesn't exist yet
}

if (!$showPrices) {
    $product['price'] = null;
}

echo json_encode($product);
?>
