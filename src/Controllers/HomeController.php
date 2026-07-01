<?php
// src/Controllers/HomeController.php
namespace App\Controllers;

use App\Core\Controller;
use App\Core\View;

class HomeController extends Controller {
    public function index() {
        // Datos de configuración del sitio
        $data = [
            'site_title' => 'FormulaZeta – Contenido Premium de F1',
            'site_description' => 'Plataforma de alto rendimiento y mobile-first para el creador de Fórmula 1 FormulaZeta',
            'year' => date('Y'),
            'social' => [
                'youtube' => 'https://youtube.com/@FormulaZeta',
                'youtube_join' => 'https://www.youtube.com/channel/UCjBSltnahL1em-O7KCEfFUQ/join',
                'twitter' => 'https://x.com/zetazalazar',
                'instagram' => 'https://www.instagram.com/formulazeta.ok',
                'kick' => 'https://kick.com/formulazeta',
                'discord' => 'https://discord.com/invite/qBngBWzQK',
            ],
            'fantasy' => [
                'code' => 'P4VGMEKJ503',
                'link' => 'https://fantasy.formula1.com/en/'
            ]
        ];

        // Renderizar la vista home.mustache
        View::render('home', $data);
    }
}
