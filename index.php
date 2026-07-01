<?php
// index.php

// 1. Cargar la configuración de la aplicación
require_once __DIR__ . '/config.php';

// 2. Inicializar el Router
use App\Core\Router;

$router = new Router();

// 3. Registrar las rutas (MVC)
$router->add('home', 'HomeController@index');
$router->add('api/youtube', 'ApiController@youtube');
$router->add('api/calendar', 'ApiController@calendar');
$router->add('api/news', 'ApiController@news');

// 4. Despachar la ruta actual
$router->dispatch();
