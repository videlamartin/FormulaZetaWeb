# FormulaZeta – Versión PHP (MVC + Mustache + AJAX)

Este proyecto ha sido migrado de Next.js a una arquitectura **PHP** limpia basada en el patrón de diseño **MVC (Modelo-Vista-Controlador)**, utilizando el motor de plantillas **Mustache** y peticiones asíncronas **AJAX** para el consumo de datos externos.

## Características
1. **Patrón MVC**: Estructura de código limpia y modular dividida en Controladores, Modelos y Vistas.
2. **Motor de Plantillas Mustache**: Vistas desacopladas de la lógica mediante plantillas `.mustache` compiladas en el servidor.
3. **Carga Asíncrona (AJAX)**: Las secciones dinámicas (videos de YouTube, calendario F1, últimas noticias) se cargan del lado del cliente mediante llamadas de `fetch` a endpoints de PHP.
4. **Sistema de Caché Local**: Los datos obtenidos de APIs de terceros se guardan temporalmente como JSON en la carpeta `cache/` durante 1 hora (3600 segundos) para evitar bloqueos y acelerar la velocidad del sitio.
5. **Tailwind CSS & Lucide Icons**: Integración directa de estilos y animaciones con Tailwind Play CDN y renderizado de íconos en el cliente.
6. **Entorno Limpio**: Las variables se leen del archivo de configuración `.env.local` en el servidor y no se exponen al cliente.

---

## Estructura del Proyecto
```text
formulazeta-web/
├── config.php                 # Configuración de variables de entorno y autoloader de clases
├── index.php                  # Front Controller / Enrutador principal
├── .env.local                 # Variables de entorno locales (YOUTUBE_API_KEY, etc.)
├── cache/                     # Almacén de archivos de caché local (generado automáticamente)
├── images/                    # Activos e imágenes del sitio
├── lib/
│   └── mustache/              # Librería Mustache.php
├── public/
│   └── js/
│       └── main.js            # Lógica AJAX, renderizado móvil y control de vistas del cliente
├── src/
│   ├── Core/
│   │   ├── Controller.php     # Controlador Base
│   │   ├── Router.php         # Enrutador MVC
│   │   └── View.php           # Envolvedor del motor Mustache
│   ├── Controllers/
│   │   ├── HomeController.php # Renderiza la vista principal
│   │   └── ApiController.php  # Controlador para las APIs (JSON)
│   ├── Models/
│   │   ├── YoutubeModel.php   # Lógica e integración con YouTube API
│   │   ├── CalendarModel.php  # Obtiene el calendario de Jolpi F1 API
│   │   └── NewsModel.php      # Parseador RSS de Motorsport
│   └── Views/
│       ├── home.mustache      # Plantilla principal del sitio
│       └── partials/
│           ├── navbar.mustache# Encabezado responsive
│           └── footer.mustache# Pie de página y enlaces
└── nextjs-backup/             # Respaldo completo de la versión Next.js anterior
```

---

## Requisitos
- Servidor web con soporte de **PHP 7.4 o superior** (por ejemplo: Apache, Nginx, IIS o servidores locales como XAMPP, Laragon, MAMP).
- Conexión a Internet para la carga de CDNs (Tailwind CSS, Lucide Icons, fuentes de Google).

## Inicialización Local

1. Instala y activa un servidor local como **Laragon** o **XAMPP**.
2. Copia este directorio a la carpeta raíz de tu servidor local (ej. `C:/xampp/htdocs/formulazeta-web`).
3. Asegúrate de que el archivo `.env.local` contenga tu clave de la API de YouTube (`YOUTUBE_API_KEY`).
4. Abre el navegador web e ingresa a:
   `http://localhost/formulazeta-web/` (o la ruta correspondiente).

### Opcional: Servidor Incorporado de PHP
Si tienes PHP en tus variables de entorno globales del sistema, puedes iniciar el servidor incorporado directamente desde la terminal en esta carpeta:
```bash
php -S localhost:8000
```
Y abrir `http://localhost:8000` en tu navegador.

---

## Funcionamiento del Enrutador
El Front Controller (`index.php`) recibe todas las peticiones. Utiliza el parámetro de consulta `route` para invocar al controlador correspondiente:
- **Página de Inicio**: `index.php` (o `index.php?route=home`)
- **API YouTube**: `index.php?route=api/youtube`
- **API Calendario**: `index.php?route=api/calendar`
- **API Noticias**: `index.php?route=api/news`

Estas rutas de API son consultadas automáticamente en segundo plano por el archivo JavaScript `public/js/main.js` al cargar la página.
