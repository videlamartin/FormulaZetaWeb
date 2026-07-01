<?php
// src/Core/Router.php
namespace App\Core;

class Router {
    protected $routes = [];

    public function add($route, $controllerAction) {
        $this->routes[$route] = $controllerAction;
    }

    public function dispatch() {
        $route = isset($_GET['route']) ? $_GET['route'] : 'home';
        
        // Limpiar la ruta
        $route = trim($route, '/');
        if ($route === '') {
            $route = 'home';
        }

        if (array_key_exists($route, $this->routes)) {
            $controllerAction = $this->routes[$route];
            list($controllerName, $action) = explode('@', $controllerAction);
            
            $controllerClass = "App\\Controllers\\" . $controllerName;
            
            if (class_exists($controllerClass)) {
                $controller = new $controllerClass();
                if (method_exists($controller, $action)) {
                    $controller->$action();
                    return;
                }
            }
        }
        
        // 404 Not Found
        header("HTTP/1.0 404 Not Found");
        echo "404 Not Found";
    }
}
