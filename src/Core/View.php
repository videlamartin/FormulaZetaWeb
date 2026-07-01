<?php
// src/Core/View.php
namespace App\Core;

class View {
    /**
     * Renderiza una plantilla Mustache.
     * 
     * @param string $template Nombre del archivo de plantilla (sin extensión .mustache).
     * @param array $data Datos a pasar a la plantilla.
     */
    public static function render($template, $data = []) {
        $mustache = new \Mustache\Engine([
            'loader' => new \Mustache\Loader\FilesystemLoader(VIEWS_DIR),
            'partials_loader' => new \Mustache\Loader\FilesystemLoader(VIEWS_DIR . '/partials'),
            'entity_flags' => ENT_QUOTES
        ]);

        echo $mustache->render($template, $data);
    }
}
