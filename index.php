<?php
header("Content-Type: application/json");
$file = 'toasts.json';
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // add new  toast
    $input = json_decode(file_get_contents("php://input"), true);

    if (isset($input['sender'], $input['message'])) {
        $toasts = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
        $toasts[] = [
            'sender' => htmlspecialchars($input['sender']),
            'message' => htmlspecialchars($input['message']),
        ];
        file_put_contents($file, json_encode($toasts, JSON_PRETTY_PRINT));
        echo json_encode(['message' => 'Toast saved successfully.']);
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'Invalid data']);
    }
} elseif ($method === 'GET') {
    if (file_exists($file)) {
        echo file_get_contents($file);
    } else {
        echo json_encode([]);
    }
} elseif ($method === 'DELETE') {
    //delete file with all toasts
    if (file_exists($file)) {
        if (unlink($file)) {
            echo json_encode(['message' => 'All toasts deleted.']);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Cannot delete toast.']);
        }
    } else {
        echo json_encode(['message' => 'File does not exist, toasts already deleted.']);
    }
}
?>