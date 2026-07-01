<?php
// test_api.php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/config.php';

echo "<html><head><title>Prueba de Endpoints - FormulaZeta</title></head><body style='font-family:sans-serif; background:#111; color:#eee; padding:20px;'>";
echo "<h1>Prueba de Endpoints - Diagnóstico</h1>";

echo "<hr style='border:1px solid #333;' />";

echo "<h2>1. Probando Calendario (CalendarModel)</h2>";
try {
    $calendarModel = new \App\Models\CalendarModel();
    $res = $calendarModel->getUpcomingRaces();
    echo "<strong>Respuesta:</strong>";
    echo "<pre style='background:#222; padding:10px; border-radius:5px; overflow:auto;'>";
    print_r($res);
    echo "</pre>";
} catch (\Exception $e) {
    echo "<p style='color:#ff5555;'><strong>Excepción en Calendario:</strong> " . $e->getMessage() . "</p>";
}

echo "<hr style='border:1px solid #333;' />";

echo "<h2>2. Probando Noticias (NewsModel)</h2>";
try {
    $newsModel = new \App\Models\NewsModel();
    $res = $newsModel->getLatestNews();
    echo "<strong>Respuesta:</strong>";
    echo "<pre style='background:#222; padding:10px; border-radius:5px; overflow:auto;'>";
    print_r($res);
    echo "</pre>";
} catch (\Exception $e) {
    echo "<p style='color:#ff5555;'><strong>Excepción en Noticias:</strong> " . $e->getMessage() . "</p>";
}

echo "<hr style='border:1px solid #333;' />";

echo "<h2>3. Probando YouTube (YoutubeModel)</h2>";
try {
    $youtubeModel = new \App\Models\YoutubeModel();
    $res = $youtubeModel->getLatestVideos();
    echo "<strong>Respuesta:</strong>";
    echo "<pre style='background:#222; padding:10px; border-radius:5px; overflow:auto;'>";
    print_r($res);
    echo "</pre>";
} catch (\Exception $e) {
    echo "<p style='color:#ff5555;'><strong>Excepción en YouTube:</strong> " . $e->getMessage() . "</p>";
}

echo "</body></html>";
