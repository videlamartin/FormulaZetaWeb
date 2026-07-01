<?php
// src/Models/NewsModel.php
namespace App\Models;

class NewsModel {
    private $rssUrl = "https://es.motorsport.com/rss/f1/news/";
    private $cacheFile;
    private $cacheTime = 3600; // 1 hora

    public function __construct() {
        $this->cacheFile = CACHE_DIR . '/news.json';
    }

    public function getLatestNews() {
        // Verificar caché
        if (file_exists($this->cacheFile) && (time() - filemtime($this->cacheFile) < $this->cacheTime)) {
            $cacheData = json_decode(file_get_contents($this->cacheFile), true);
            if ($cacheData) {
                return ['success' => true, 'data' => $cacheData, 'cached' => true];
            }
        }

        // 1. Intentar obtener el RSS directo y parsearlo con SimpleXML (Nativo, rápido y sin límites)
        try {
            $response = $this->fetchUrl($this->rssUrl);
            if ($response) {
                $useInternalErrors = libxml_use_internal_errors(true);
                $xml = simplexml_load_string($response);
                
                if ($xml) {
                    $articles = [];
                    $items = isset($xml->channel->item) ? $xml->channel->item : [];
                    $count = 0;
                    
                    foreach ($items as $item) {
                        if ($count >= 3) break;
                        
                        $title = (string)$item->title;
                        $link = (string)$item->link;
                        $pubDate = (string)$item->pubDate;
                        $description = (string)$item->description;
                        
                        // Limpiar descripción para el extracto
                        $excerpt = strip_tags($description);
                        $excerpt = html_entity_decode($excerpt, ENT_QUOTES, 'UTF-8');
                        $excerpt = trim(preg_replace('/\s+/', ' ', $excerpt));
                        if (mb_strlen($excerpt) > 120) {
                            $excerpt = mb_substr($excerpt, 0, 120) . '...';
                        }
                        
                        // Intentar obtener la miniatura (enclosure, media:content, o buscar img en la descripción)
                        $thumbnail = '';
                        if (isset($item->enclosure) && isset($item->enclosure['url'])) {
                            $thumbnail = (string)$item->enclosure['url'];
                        }
                        
                        if (empty($thumbnail)) {
                            // Buscar namespaces como media:content o media:thumbnail
                            $media = $item->children('media', true);
                            if (isset($media->content) && isset($media->content->attributes()->url)) {
                                $thumbnail = (string)$media->content->attributes()->url;
                            } elseif (isset($media->thumbnail) && isset($media->thumbnail->attributes()->url)) {
                                $thumbnail = (string)$media->thumbnail->attributes()->url;
                            }
                        }
                        
                        if (empty($thumbnail)) {
                            // Buscar etiqueta img en el HTML de la descripción
                            if (preg_match('/<img[^>]+src=["\']([^"\']+)["\']/i', $description, $matches)) {
                                $thumbnail = $matches[1];
                            }
                        }
                        
                        if (empty($thumbnail)) {
                            $thumbnail = 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=800&q=80';
                        }
                        
                        $articles[] = [
                            'title' => $title,
                            'excerpt' => $excerpt,
                            'link' => $link,
                            'thumbnail' => $thumbnail,
                            'pubDate' => $pubDate
                        ];
                        $count++;
                    }
                    
                    libxml_use_internal_errors($useInternalErrors);
                    
                    if (count($articles) > 0) {
                        file_put_contents($this->cacheFile, json_encode($articles));
                        return ['success' => true, 'data' => $articles, 'cached' => false, 'method' => 'SimpleXML'];
                    }
                }
                libxml_use_internal_errors($useInternalErrors);
            }
        } catch (\Exception $e) {
            // Ignorar error del método principal y proceder al fallback
        }

        // 2. Fallback: Usar el servicio externo rss2json si SimpleXML falla o no está disponible
        try {
            $apiUrl = "https://api.rss2json.com/v1/api.json?rss_url=" . urlencode($this->rssUrl);
            $response = $this->fetchUrl($apiUrl);

            if (!$response) {
                throw new \Exception("Error al conectar con el agregador de RSS.");
            }

            $data = json_decode($response, true);
            if (!isset($data['status']) || $data['status'] !== 'ok' || !isset($data['items'])) {
                throw new \Exception("Respuesta inválida del agregador RSS.");
            }

            $articles = [];
            $items = array_slice($data['items'], 0, 3);
            
            foreach ($items as $item) {
                $excerpt = strip_tags($item['description'] ?? '');
                $excerpt = html_entity_decode($excerpt, ENT_QUOTES, 'UTF-8');
                $excerpt = trim(preg_replace('/\s+/', ' ', $excerpt));
                
                if (mb_strlen($excerpt) > 120) {
                    $excerpt = mb_substr($excerpt, 0, 120) . '...';
                }

                $thumbnail = '';
                if (isset($item['enclosure']['link'])) {
                    $thumbnail = $item['enclosure']['link'];
                } elseif (isset($item['thumbnail'])) {
                    $thumbnail = $item['thumbnail'];
                } else {
                    $thumbnail = 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=800&q=80';
                }

                $articles[] = [
                    'title' => $item['title'] ?? 'Sin título',
                    'excerpt' => $excerpt,
                    'link' => $item['link'] ?? '#',
                    'thumbnail' => $thumbnail,
                    'pubDate' => $item['pubDate'] ?? date('Y-m-d H:i:s')
                ];
            }

            // Guardar en la caché
            file_put_contents($this->cacheFile, json_encode($articles));

            return ['success' => true, 'data' => $articles, 'cached' => false, 'method' => 'rss2json'];

        } catch (\Exception $e) {
            // Cargar de caché vieja si falla
            if (file_exists($this->cacheFile)) {
                $cacheData = json_decode(file_get_contents($this->cacheFile), true);
                if ($cacheData) {
                    return ['success' => true, 'data' => $cacheData, 'cached' => true, 'stale' => true, 'error' => $e->getMessage()];
                }
            }

            return ['success' => false, 'error' => $e->getMessage(), 'data' => []];
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
}
