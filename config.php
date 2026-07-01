<?php
// config.php
session_start();

// 1. Cargar variables de entorno desde .env.local
if (file_exists(__DIR__ . '/.env.local')) {
    $lines = file(__DIR__ . '/.env.local', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        // Ignorar comentarios
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        
        // Dividir por el primer signo '='
        $parts = explode('=', $line, 2);
        if (count($parts) === 2) {
            $name = trim($parts[0]);
            $value = trim($parts[1]);
            
            // Quitar comillas si existen
            $value = trim($value, '"\'');
            
            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
            putenv("$name=$value");
        }
    }
}

// 2. Registrar el Autoloader de Mustache (PSR-4)
spl_autoload_register(function ($class) {
    $prefix = 'Mustache\\';
    $base_dir = __DIR__ . '/lib/mustache/src/';

    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relative_class = substr($class, $len);
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    if (file_exists($file)) {
        require $file;
    }
});

// 3. Constantes de Directorios
define('SRC_DIR', __DIR__ . '/src');
define('VIEWS_DIR', __DIR__ . '/src/Views');
define('CACHE_DIR', __DIR__ . '/cache');

// 4. Crear carpeta de caché si no existe
if (!is_dir(CACHE_DIR)) {
    mkdir(CACHE_DIR, 0777, true);
}

// Autoloader para nuestras clases MVC bajo el namespace App
spl_autoload_register(function ($class) {
    // Namespace prefijo
    $prefix = 'App\\';
    $base_dir = __DIR__ . '/src/';

    // ¿La clase usa este prefijo de namespace?
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return; // No, pasar al siguiente autoloader registrado
    }

    // Obtener el nombre relativo de la clase
    $relative_class = substr($class, $len);

    // Reemplazar el prefijo del namespace con el directorio base,
    // reemplazar separadores de namespace con separadores de directorio,
    // y añadir .php
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    // Si el archivo existe, requerirlo
    if (file_exists($file)) {
        require $file;
    }
});
