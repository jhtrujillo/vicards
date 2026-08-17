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
    if ($action === 'update') {
        $id = intval($_POST['id']);
        $title1 = $_POST['title1'] ?? '';
        $title2 = $_POST['title2'] ?? '';
        $titleHighlight = $_POST['titleHighlight'] ?? '';
        $subtitle = $_POST['subtitle'] ?? '';
        $text1 = $_POST['text1'] ?? '';
        $text2 = $_POST['text2'] ?? '';

        $imageUrl = saveImage($_FILES['image'] ?? null);

        if ($imageUrl) {
            $stmt = $pdo->prepare('UPDATE HeroSlide SET title1=?, title2=?, titleHighlight=?, subtitle=?, text1=?, text2=?, image=?, updatedAt=NOW() WHERE id=?');
            $stmt->execute([$title1, $title2, $titleHighlight, $subtitle, $text1, $text2, $imageUrl, $id]);
        } else {
            $stmt = $pdo->prepare('UPDATE HeroSlide SET title1=?, title2=?, titleHighlight=?, subtitle=?, text1=?, text2=?, updatedAt=NOW() WHERE id=?');
            $stmt->execute([$title1, $title2, $titleHighlight, $subtitle, $text1, $text2, $id]);
        }

        echo json_encode(['success' => true]);
        exit;
    }
}
?>
