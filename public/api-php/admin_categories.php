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

// Intentar crear la columna isFeatured si no existe
try {
    $pdo->exec("ALTER TABLE Category ADD COLUMN isFeatured BOOLEAN DEFAULT FALSE");
} catch (Exception $e) {}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($action === 'create') {
        $name = $_POST['name'] ?? '';
        $slug = $_POST['slug'] ?? '';
        $isFeatured = isset($_POST['isFeatured']) && $_POST['isFeatured'] === '1' ? 1 : 0;
        
        $imageUrl = saveImage($_FILES['image'] ?? null) ?: '';

        $stmt = $pdo->prepare('INSERT INTO Category (name, slug, image, isFeatured, updatedAt) VALUES (?, ?, ?, ?, NOW())');
        $stmt->execute([$name, $slug, $imageUrl, $isFeatured]);
        
        echo json_encode(['success' => true]);
        exit;
    }
    
    if ($action === 'update') {
        $id = intval($_POST['id']);
        $name = $_POST['name'] ?? '';
        $slug = $_POST['slug'] ?? '';
        $isFeatured = isset($_POST['isFeatured']) && $_POST['isFeatured'] === '1' ? 1 : 0;

        $imageUrl = saveImage($_FILES['image'] ?? null);

        if ($imageUrl) {
            $stmt = $pdo->prepare('UPDATE Category SET name = ?, slug = ?, image = ?, isFeatured = ?, updatedAt = NOW() WHERE id = ?');
            $stmt->execute([$name, $slug, $imageUrl, $isFeatured, $id]);
        } else {
            $stmt = $pdo->prepare('UPDATE Category SET name = ?, slug = ?, isFeatured = ?, updatedAt = NOW() WHERE id = ?');
            $stmt->execute([$name, $slug, $isFeatured, $id]);
        }

        echo json_encode(['success' => true]);
        exit;
    }

    if ($action === 'delete_category') {
        $id = intval($_POST['id']);
        try {
            $stmt = $pdo->prepare('DELETE FROM Category WHERE id = ?');
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'error' => 'No se puede eliminar esta categoría porque aún tiene productos asignados.']);
        }
        exit;
    }
}
?>
