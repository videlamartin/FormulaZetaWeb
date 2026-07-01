<?php
// src/Controllers/ApiController.php
namespace App\Controllers;

use App\Core\Controller;
use App\Models\YoutubeModel;
use App\Models\CalendarModel;
use App\Models\NewsModel;

class ApiController extends Controller {
    
    public function __construct() {
        // Evitar que advertencias o avisos de PHP rompan el JSON de la API en XAMPP
        ini_set('display_errors', 0);
    }
    
    public function youtube() {
        $model = new YoutubeModel();
        $result = $model->getLatestVideos();
        
        if (isset($result['success']) && $result['success']) {
            $this->jsonResponse($result);
        } else {
            $this->jsonResponse($result, 500);
        }
    }

    public function calendar() {
        $model = new CalendarModel();
        $result = $model->getUpcomingRaces();
        
        if (isset($result['success']) && $result['success']) {
            $this->jsonResponse($result);
        } else {
            $this->jsonResponse($result, 500);
        }
    }

    public function news() {
        $model = new NewsModel();
        $result = $model->getLatestNews();
        
        if (isset($result['success']) && $result['success']) {
            $this->jsonResponse($result);
        } else {
            $this->jsonResponse($result, 500);
        }
    }
}
