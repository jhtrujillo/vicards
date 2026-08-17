<?php
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');

require_once 'config.php';
$stmt = $pdo->query('
    SELECT c.*, COUNT(p.id) as product_count 
    FROM Category c 
    LEFT JOIN Product p ON c.id = p.categoryId 
    GROUP BY c.id 
    ORDER BY c.name ASC
');
$categories = $stmt->fetchAll();

foreach ($categories as &$cat) {
    $cat['_count'] = [
        'products' => (int)$cat['product_count']
    ];
    unset($cat['product_count']);
}

echo json_encode($categories);
?>
