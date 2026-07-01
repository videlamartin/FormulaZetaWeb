<?php
// src/Models/CalendarModel.php
namespace App\Models;

class CalendarModel {
    private $apiUrl = "https://api.jolpi.ca/ergast/f1/current.json";
    private $cacheFile;
    private $cacheTime = 3600; // 1 hora

    public function __construct() {
        $this->cacheFile = CACHE_DIR . '/calendar.json';
    }

    public function getUpcomingRaces() {
        // Verificar caché
        if (file_exists($this->cacheFile) && (time() - filemtime($this->cacheFile) < $this->cacheTime)) {
            $cacheData = json_decode(file_get_contents($this->cacheFile), true);
            if ($cacheData) {
                return ['success' => true, 'data' => $this->filterRaces($cacheData), 'cached' => true];
            }
        }

        // Obtener de API
        try {
            $response = $this->fetchUrl($this->apiUrl);
            if (!$response) {
                throw new \Exception("Error al conectar con la API de Jolpi F1.");
            }

            $data = json_decode($response, true);
            if (!isset($data['MRData']['RaceTable']['Races'])) {
                throw new \Exception("Respuesta inválida de la API de Jolpi.");
            }

            $races = $data['MRData']['RaceTable']['Races'];

            // Guardar el calendario completo en la caché
            file_put_contents($this->cacheFile, json_encode($races));

            return ['success' => true, 'data' => $this->filterRaces($races), 'cached' => false];

        } catch (\Exception $e) {
            // Cargar caché vieja si falla la API
            if (file_exists($this->cacheFile)) {
                $cacheData = json_decode(file_get_contents($this->cacheFile), true);
                if ($cacheData) {
                    return ['success' => true, 'data' => $this->filterRaces($cacheData), 'cached' => true, 'stale' => true, 'error' => $e->getMessage()];
                }
            }

            return ['success' => false, 'error' => $e->getMessage(), 'data' => []];
        }
    }

    private function filterRaces($races) {
        $now = new \DateTime();
        $upcoming = [];

        foreach ($races as $race) {
            $timeString = isset($race['time']) ? $race['time'] : '00:00:00Z';
            $raceDate = new \DateTime($race['date'] . 'T' . $timeString);

            // Permitir mostrar hasta 2 horas después de comenzar
            $hideTime = clone $raceDate;
            $hideTime->modify('+2 hours');

            if ($hideTime > $now) {
                // Asegurarse de que existan los campos del circuito para evitar warnings de PHP
                $circuitName = isset($race['Circuit']['circuitName']) ? $race['Circuit']['circuitName'] : 'Circuito Desconocido';
                $locality = isset($race['Circuit']['Location']['locality']) ? $race['Circuit']['Location']['locality'] : 'Localidad Desconocida';
                
                $upcoming[] = $race;
            }
        }

        // Si no hay carreras futuras (por ejemplo, fin de temporada o año de API desactualizado),
        // mostrar las últimas 3 carreras de la lista como fallback para que el calendario no se vea vacío.
        if (empty($upcoming) && !empty($races)) {
            $upcoming = array_slice($races, -3);
        } else {
            $upcoming = array_slice($upcoming, 0, 3);
        }

        return $upcoming;
    }

    private function fetchUrl($url) {
        $userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

        if (function_exists('curl_init')) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Evita fallos de SSL en XAMPP local
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($ch, CURLOPT_USERAGENT, $userAgent); // Evita bloqueos por falta de User-Agent
            $response = curl_exec($ch);
            curl_close($ch);
            return $response;
        }

        // Stream context fallback para file_get_contents
        $options = [
            'http' => [
                'header' => "User-Agent: " . $userAgent . "\r\n",
                'timeout' => 10
            ],
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
            ]
        ];
        $context = stream_context_create($options);
        return @file_get_contents($url, false, $context);
    }
}
