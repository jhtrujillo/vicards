<?php
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
require_once 'config.php';

$action = $_POST['action'] ?? '';

// Función auxiliar para guardar imagen
function saveImage($fileInfo) {
    if ($fileInfo && $fileInfo['error'] === UPLOAD_ERR_OK && $fileInfo['size'] > 0) {
        $uniqueName = time() . '-' . preg_replace('/\s+/', '_', basename($fileInfo['name']));
        // El script está en public/api-php/, subimos un nivel a public/images/
        $targetDir = __DIR__ . '/../images/';
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }
        $targetFile = $targetDir . $uniqueName;
        
        if (move_uploaded_file($fileInfo['tmp_name'], $targetFile)) {
            return '/images/' . $uniqueName;
        }
    }
    return null;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($action === 'create') {
        $name = $_POST['name'] ?? '';
        $price = floatval($_POST['price'] ?? 0);
        $categoryId = intval($_POST['categoryId'] ?? 1);
        
        $imageUrl = saveImage($_FILES['image'] ?? null) ?: '/images/placeholder.jpg';

        $stmt = $pdo->prepare('INSERT INTO Product (name, price, categoryId, image, updatedAt) VALUES (?, ?, ?, ?, NOW())');
        $stmt->execute([$name, $price, $categoryId, $imageUrl]);
        $productId = $pdo->lastInsertId();

        // Galería (simplificado, asumiendo un array de files si fuera posible, pero FormData en JS a veces envía multiple)
        if (!empty($_FILES['galleryImages']['name'][0])) {
            foreach ($_FILES['galleryImages']['name'] as $key => $filename) {
                $file = [
                    'name' => $_FILES['galleryImages']['name'][$key],
                    'type' => $_FILES['galleryImages']['type'][$key],
                    'tmp_name' => $_FILES['galleryImages']['tmp_name'][$key],
                    'error' => $_FILES['galleryImages']['error'][$key],
                    'size' => $_FILES['galleryImages']['size'][$key],
                ];
                $galleryUrl = saveImage($file);
                if ($galleryUrl) {
                    $galStmt = $pdo->prepare('INSERT INTO ProductImage (url, productId) VALUES (?, ?)');
                    $galStmt->execute([$galleryUrl, $productId]);
                }
            }
        }
        echo json_encode(['success' => true, 'id' => $productId]);
        exit;
    }
    
    if ($action === 'update') {
        $id = intval($_POST['id']);
        $name = $_POST['name'] ?? '';
        $price = floatval($_POST['price'] ?? 0);
        $categoryId = intval($_POST['categoryId'] ?? 1);

        $imageUrl = saveImage($_FILES['image'] ?? null);

        if ($imageUrl) {
            $stmt = $pdo->prepare('UPDATE Product SET name = ?, price = ?, categoryId = ?, image = ?, updatedAt = NOW() WHERE id = ?');
            $stmt->execute([$name, $price, $categoryId, $imageUrl, $id]);
        } else {
            $stmt = $pdo->prepare('UPDATE Product SET name = ?, price = ?, categoryId = ?, updatedAt = NOW() WHERE id = ?');
            $stmt->execute([$name, $price, $categoryId, $id]);
        }

        // Galería
        if (!empty($_FILES['galleryImages']['name'][0])) {
            foreach ($_FILES['galleryImages']['name'] as $key => $filename) {
                $file = [
                    'name' => $_FILES['galleryImages']['name'][$key],
                    'type' => $_FILES['galleryImages']['type'][$key],
                    'tmp_name' => $_FILES['galleryImages']['tmp_name'][$key],
                    'error' => $_FILES['galleryImages']['error'][$key],
                    'size' => $_FILES['galleryImages']['size'][$key],
                ];
                $galleryUrl = saveImage($file);
                if ($galleryUrl) {
                    $galStmt = $pdo->prepare('INSERT INTO ProductImage (url, productId) VALUES (?, ?)');
                    $galStmt->execute([$galleryUrl, $id]);
                }
            }
        }
        echo json_encode(['success' => true]);
        exit;
    }
    
    if ($action === 'delete_image') {
        $imageId = intval($_POST['imageId']);
        $stmt = $pdo->prepare('DELETE FROM ProductImage WHERE id = ?');
        $stmt->execute([$imageId]);
        echo json_encode(['success' => true]);
        exit;
    }

    if ($action === 'delete_product') {
        $id = intval($_POST['id']);
        // ProductImage tiene ON DELETE CASCADE en la BD, así que solo borramos el producto
        $stmt = $pdo->prepare('DELETE FROM Product WHERE id = ?');
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        exit;
    }
}
?>
