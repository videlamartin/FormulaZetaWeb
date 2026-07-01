<?php
// src/Models/YoutubeModel.php
namespace App\Models;

class YoutubeModel {
    private $playlistId = "UUjBSltnahL1em-O7KCEfFUQ";
    private $cacheFile;
    private $cacheTime = 3600; // 1 hora en segundos

    public function __construct() {
        $this->cacheFile = CACHE_DIR . '/youtube.json';
    }

    public function getLatestVideos() {
        $apiKey = isset($_ENV['YOUTUBE_API_KEY']) ? $_ENV['YOUTUBE_API_KEY'] : getenv('YOUTUBE_API_KEY');

        if (!$apiKey) {
            // Sin API key, devolver datos dummy
            return [
                'success' => false,
                'message' => 'Falta YOUTUBE_API_KEY en las variables de entorno. Mostrando datos de prueba.',
                'data' => $this->getDummyVideos()
            ];
        }

        // Verificar si la caché es válida
        if (file_exists($this->cacheFile) && (time() - filemtime($this->cacheFile) < $this->cacheTime)) {
            $cacheData = json_decode(file_get_contents($this->cacheFile), true);
            if ($cacheData) {
                return ['success' => true, 'data' => $cacheData, 'cached' => true];
            }
        }

        // Cargar desde la API
        try {
            $url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=3&playlistId={$this->playlistId}&key={$apiKey}";
            $response = $this->fetchUrl($url);
            
            if (!$response) {
                throw new \Exception("No se pudo conectar con la API de YouTube.");
            }

            $data = json_decode($response, true);
            
            if (isset($data['error'])) {
                throw new \Exception($data['error']['message'] ?? "Error desconocido de YouTube API.");
            }

            $videos = [];
            if (isset($data['items'])) {
                foreach ($data['items'] as $index => $item) {
                    $snippet = isset($item['snippet']) ? $item['snippet'] : [];
                    
                    // Elegir la mejor miniatura disponible de forma segura (sin warnings de PHP)
                    $thumbnail = 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?auto=format&fit=crop&w=800&q=80';
                    if (isset($snippet['thumbnails']['maxres']['url'])) {
                        $thumbnail = $snippet['thumbnails']['maxres']['url'];
                    } elseif (isset($snippet['thumbnails']['high']['url'])) {
                        $thumbnail = $snippet['thumbnails']['high']['url'];
                    } elseif (isset($snippet['thumbnails']['default']['url'])) {
                        $thumbnail = $snippet['thumbnails']['default']['url'];
                    }

                    $videos[] = [
                        'id' => $index + 1,
                        'title' => isset($snippet['title']) ? $snippet['title'] : 'Video sin título',
                        'excerpt' => mb_substr(isset($snippet['description']) ? $snippet['description'] : '', 0, 150) . '...',
                        'youtube_id' => isset($snippet['resourceId']['videoId']) ? $snippet['resourceId']['videoId'] : '',
                        'thumbnail' => $thumbnail,
                        'published_at' => isset($snippet['publishedAt']) ? $snippet['publishedAt'] : date('c')
                    ];
                }
            }

            // Guardar en la caché
            file_put_contents($this->cacheFile, json_encode($videos));

            return ['success' => true, 'data' => $videos, 'cached' => false];

        } catch (\Exception $e) {
            // Si falla la API y tenemos caché vieja, usarla
            if (file_exists($this->cacheFile)) {
                $cacheData = json_decode(file_get_contents($this->cacheFile), true);
                if ($cacheData) {
                    return ['success' => true, 'data' => $cacheData, 'cached' => true, 'stale' => true, 'error' => $e->getMessage()];
                }
            }

            return [
                'success' => false,
                'error' => $e->getMessage(),
                'data' => $this->getDummyVideos()
            ];
        }
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

    private function getDummyVideos() {
        return [
            [
                'id' => 1,
                'title' => 'VÍDEO DE PRUEBA 1 (Requiere API Key)',
                'excerpt' => 'Configura tu clave de YouTube Data API v3 en .env.local para ver los videos reales.',
                'youtube_id' => 'dQw4w9WgXcQ',
                'thumbnail' => 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?auto=format&fit=crop&w=800&q=80',
                'published_at' => date('c')
            ],
            [
                'id' => 2,
                'title' => 'VÍDEO DE PRUEBA 2',
                'excerpt' => 'Esperando configuración de YOUTUBE_API_KEY.',
                'youtube_id' => 'dQw4w9WgXcQ',
                'thumbnail' => 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=800&q=80',
                'published_at' => date('c')
            ],
            [
                'id' => 3,
                'title' => 'VÍDEO DE PRUEBA 3',
                'excerpt' => 'Esperando configuración de YOUTUBE_API_KEY.',
                'youtube_id' => 'dQw4w9WgXcQ',
                'thumbnail' => 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=800&q=80',
                'published_at' => date('c')
            ]
        ];
    }
}
