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
        $city = $_POST['city'] ?? '';
        $title = $_POST['title'] ?? '';
        $description = $_POST['description'] ?? '';
        
        $imageUrl = saveImage($_FILES['image'] ?? null) ?: '';

        $stmt = $pdo->prepare('INSERT INTO Experience (city, title, description, image, updatedAt) VALUES (?, ?, ?, ?, NOW())');
        $stmt->execute([$city, $title, $description, $imageUrl]);
        
        echo json_encode(['success' => true]);
        exit;
    }
    
    if ($action === 'update') {
        $id = intval($_POST['id']);
        $city = $_POST['city'] ?? '';
        $title = $_POST['title'] ?? '';
        $description = $_POST['description'] ?? '';

        $imageUrl = saveImage($_FILES['image'] ?? null);

        if ($imageUrl) {
            $stmt = $pdo->prepare('UPDATE Experience SET city = ?, title = ?, description = ?, image = ?, updatedAt = NOW() WHERE id = ?');
            $stmt->execute([$city, $title, $description, $imageUrl, $id]);
        } else {
            $stmt = $pdo->prepare('UPDATE Experience SET city = ?, title = ?, description = ?, updatedAt = NOW() WHERE id = ?');
            $stmt->execute([$city, $title, $description, $id]);
        }

        echo json_encode(['success' => true]);
        exit;
    }
    
    if ($action === 'delete') {
        $id = intval($_POST['id']);
        $stmt = $pdo->prepare('DELETE FROM Experience WHERE id = ?');
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        exit;
    }
}
?>
