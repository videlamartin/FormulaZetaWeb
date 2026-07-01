<?php
// src/Core/Controller.php
namespace App\Core;

class Controller {
    /**
     * Envía una respuesta JSON formateada.
     */
    protected function jsonResponse($data, $statusCode = 200) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code($statusCode);
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
}
