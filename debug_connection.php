<?php
// debug_connection.php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<html><head><title>Diagnóstico de Red - FormulaZeta</title></head><body style='font-family:sans-serif; background:#111; color:#eee; padding:20px;'>";
echo "<h1>Diagnóstico de Conexión de Red en PHP</h1>";

$url = "https://api.jolpi.ca/ergast/f1/current.json";
echo "<p>Intentando conectar a: <code>$url</code></p>";
echo "<hr style='border:1px solid #333;' />";

// 1. Probar cURL
echo "<h2>1. Probando cURL...</h2>";
if (function_exists('curl_init')) {
    echo "<p style='color:#55ff55;'>✓ cURL está habilitado en php.ini.</p>";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    $response = curl_exec($ch);
    if ($response === false) {
        echo "<p style='color:#ff5555; font-weight:bold;'>✗ cURL falló. Error: " . curl_error($ch) . " (Código: " . curl_errno($ch) . ")</p>";
    } else {
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        echo "<p style='color:#55ff55;'>✓ cURL funcionó!</p>";
        echo "<ul>";
        echo "<li>Código HTTP: " . $http_code . "</li>";
        echo "<li>Tamaño de respuesta: " . strlen($response) . " bytes</li>";
        echo "</ul>";
        echo "<pre style='background:#222; padding:10px; border-radius:5px; max-height:150px; overflow:auto;'>";
        echo htmlspecialchars(substr($response, 0, 300)) . "...";
        echo "</pre>";
    }
    curl_close($ch);
} else {
    echo "<p style='color:#ff5555; font-weight:bold;'>✗ cURL NO está habilitado en este PHP.</p>";
}

echo "<hr style='border:1px solid #333;' />";

// 2. Probar file_get_contents
echo "<h2>2. Probando file_get_contents...</h2>";
if (ini_get('allow_url_fopen')) {
    echo "<p style='color:#55ff55;'>✓ allow_url_fopen está habilitado en php.ini.</p>";
    
    $options = [
        'http' => [
            'header' => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\r\n",
            'timeout' => 10
        ],
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
        ]
    ];
    $context = stream_context_create($options);
    
    // Capturar errores
    $response = @file_get_contents($url, false, $context);
    if ($response === false) {
        $last_error = error_get_last();
        echo "<p style='color:#ff5555; font-weight:bold;'>✗ file_get_contents falló.</p>";
        echo "<p><strong>Último error de PHP:</strong> " . ($last_error ? htmlspecialchars($last_error['message']) : 'Ninguno registrado') . "</p>";
    } else {
        echo "<p style='color:#55ff55;'>✓ file_get_contents funcionó!</p>";
        echo "<p>Tamaño de respuesta: " . strlen($response) . " bytes</p>";
    }
} else {
    echo "<p style='color:#ff5555; font-weight:bold;'>✗ allow_url_fopen está DESHABILITADO en php.ini.</p>";
}

echo "<hr style='border:1px solid #333;' />";

// 3. DNS Lookup
echo "<h2>3. Probando resolución de DNS (api.jolpi.ca)</h2>";
$ip = gethostbyname('api.jolpi.ca');
if ($ip === 'api.jolpi.ca') {
    echo "<p style='color:#ff5555; font-weight:bold;'>✗ No se pudo resolver el host 'api.jolpi.ca' a una dirección IP. (Fallo de DNS o sin conexión a internet desde PHP)</p>";
} else {
    echo "<p style='color:#55ff55;'>✓ DNS resuelto con éxito. IP de api.jolpi.ca: <code>$ip</code></p>";
}

echo "</body></html>";
