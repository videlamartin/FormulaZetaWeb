// public/js/main.js
document.addEventListener("DOMContentLoaded", () => {
  // 1. Inicializar Lucide Icons
  const initLucide = () => {
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  };

  initLucide();

  // 2. Efecto de Scroll en el Header (Navbar)
  const header = document.getElementById("main-header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header.className = "fixed top-0 w-full z-50 transition-all duration-300 bg-black/80 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl";
      } else {
        header.className = "fixed top-0 w-full z-50 transition-all duration-300 bg-gradient-to-b from-black/80 to-transparent py-5";
      }
    });
  }

  // 3. Menú Móvil
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenuDropdown = document.getElementById("mobile-menu-dropdown");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");

  if (mobileMenuBtn && mobileMenuDropdown) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = mobileMenuDropdown.classList.contains("max-h-96");

      if (isOpen) {
        // Cerrar menú
        mobileMenuDropdown.classList.remove("max-h-96", "opacity-100");
        mobileMenuDropdown.classList.add("max-h-0", "opacity-0");
        menuIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
      } else {
        // Abrir menú
        mobileMenuDropdown.classList.remove("max-h-0", "opacity-0");
        mobileMenuDropdown.classList.add("max-h-96", "opacity-100");
        menuIcon.classList.add("hidden");
        closeIcon.classList.remove("hidden");
      }
    });

    // Cerrar menú al hacer clic en un enlace de navegación
    const navLinks = document.querySelectorAll(".mobile-nav-link");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenuDropdown.classList.remove("max-h-96", "opacity-100");
        mobileMenuDropdown.classList.add("max-h-0", "opacity-0");
        menuIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
      });
    });
  }

  // Helper: Filtrar carreras en cliente (Igual a la lógica de PHP)
  const filterRacesClient = (racesList) => {
    const now = new Date();
    const upcoming = racesList.filter(race => {
      const timeString = race.time || "00:00:00Z";
      const raceDate = new Date(`${race.date}T${timeString}`);
      
      // Permitir mostrar hasta 2 horas después de comenzar
      const hideTime = new Date(raceDate.getTime() + 2 * 60 * 60 * 1000);
      return hideTime > now;
    });

    // Fallback si todas pasaron
    if (upcoming.length === 0 && racesList.length > 0) {
      return racesList.slice(-3);
    }
    return upcoming.slice(0, 3);
  };

  // Helper: Generar vídeos de prueba en cliente (Estilo Next.js original)
  const getDummyVideosClient = () => {
    return [
      {
        id: 1,
        title: "Configuración Requerida",
        excerpt: "Agrega tu YOUTUBE_API_KEY a las variables de entorno para ver los videos reales de tu canal.",
        youtube_id: "dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?auto=format&fit=crop&w=800&q=80",
        published_at: new Date().toISOString(),
      },
      {
        id: 2,
        title: "Test de Pretemporada",
        excerpt: "Nos infiltramos en el paddock para traerte todos los secretos.",
        youtube_id: "dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=800&q=80",
        published_at: new Date().toISOString(),
      },
      {
        id: 3,
        title: "Test de Pretemporada 2",
        excerpt: "Nos infiltramos en el paddock para traerte todos los secretos.",
        youtube_id: "dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=800&q=80",
        published_at: new Date().toISOString(),
      }
    ];
  };

  // RENDERIZADORES DE HTML

  const renderVideos = (videos, container) => {
    let html = "";
    videos.forEach(post => {
      const formattedDate = new Date(post.published_at).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });

      html += `
        <div class="group bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,0,0.15)] hover:-translate-y-2 flex flex-col">
          <div class="relative h-56 w-full overflow-hidden">
            <img src="${post.thumbnail}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div class="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div class="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,0,0,0.6)] backdrop-blur-sm">
                <i data-lucide="play" class="w-6 h-6 text-white ml-1 fill-current"></i>
              </div>
            </div>
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs font-bold bg-white/10 px-2 py-1 rounded text-gray-300">Análisis</span>
              <span class="text-xs text-gray-500">${formattedDate}</span>
            </div>
            <h4 class="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">${post.title}</h4>
            <p class="text-gray-400 text-sm line-clamp-3 mb-6 flex-1">${post.excerpt}</p>
            <a href="https://youtube.com/watch?v=${post.youtube_id}" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-primary transition-colors uppercase tracking-wider">
              Ver Video <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </a>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;

    // Actualizar botón del hero CTA
    const heroCtaBtn = document.getElementById("hero-cta-btn");
    if (heroCtaBtn && videos[0] && videos[0].youtube_id) {
      heroCtaBtn.href = `https://youtube.com/watch?v=${videos[0].youtube_id}`;
    }
    initLucide();
  };

  const renderCalendar = (races, container) => {
    let html = "";
    races.forEach((race, index) => {
      const isNext = index === 0;
      const raceDate = new Date(`${race.date}T${race.time || "00:00:00Z"}`);

      const formattedDate = raceDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
      const formattedTime = raceDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) + ' hs';

      const cardClass = isNext 
        ? 'bg-gradient-to-b from-black to-primary/10 border-primary/30 relative overflow-hidden transform md:scale-105 shadow-[0_0_30px_rgba(255,0,0,0.15)] z-10' 
        : 'bg-black border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,0,0,0.1)]';

      const tagText = isNext 
        ? '<div class="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">PRÓXIMA CARRERA</div>' 
        : '';

      const circuitName = race.Circuit?.circuitName || 'Circuito Desconocido';
      const locality = race.Circuit?.Location?.locality || 'Localidad Desconocida';

      html += `
        <div class="border rounded-2xl p-6 transition-all group ${cardClass}">
          ${tagText}
          <div class="flex justify-between items-start mb-6">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider ${isNext ? 'text-primary' : 'text-gray-400'}">Ronda ${race.round}</span>
              <h4 class="text-xl font-bold mt-1 transition-colors ${isNext ? 'text-white' : 'group-hover:text-primary'}">${race.raceName}</h4>
            </div>
          </div>
          <div class="space-y-3 mb-6">
            <div class="flex items-center gap-3 text-sm ${isNext ? 'text-gray-200' : 'text-gray-300'}">
              <i data-lucide="map-pin" class="w-4 h-4 ${isNext ? 'text-primary' : 'text-gray-500'}"></i> ${circuitName}, ${locality}
            </div>
            <div class="flex items-center gap-3 text-sm ${isNext ? 'text-gray-200' : 'text-gray-300'}">
              <i data-lucide="calendar" class="w-4 h-4 ${isNext ? 'text-primary' : 'text-gray-500'}"></i> ${formattedDate}
            </div>
            <div class="flex items-center gap-3 text-sm ${isNext ? 'text-gray-200' : 'text-gray-300'}">
              <i data-lucide="clock" class="w-4 h-4 ${isNext ? 'text-primary' : 'text-gray-500'}"></i> ${formattedTime} (Tu Hora Local)
            </div>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
    initLucide();
  };

  const renderNews = (news, container) => {
    const featured = news[0];
    const listItems = news.slice(1);

    const featuredDate = new Date(featured.pubDate).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });

    let htmlFeatured = `
      <a href="${featured.link}" target="_blank" rel="noreferrer" class="group relative rounded-3xl overflow-hidden border border-white/10 aspect-video lg:aspect-auto hover:border-primary/50 transition-all flex flex-col justify-end min-h-[350px]">
        <img src="${featured.thumbnail}" alt="${featured.title}" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 -z-10" />
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent -z-10"></div>
        <div class="p-6 sm:p-8 w-full">
          <span class="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded mb-4 uppercase tracking-wider">Última Hora</span>
          <h4 class="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-2 group-hover:text-primary transition-colors drop-shadow-md">${featured.title}</h4>
          <p class="text-gray-300 line-clamp-2 text-sm md:text-base drop-shadow">${featured.excerpt}</p>
        </div>
      </a>
    `;

    let htmlList = `<div class="flex flex-col gap-6">`;
    listItems.forEach(n => {
      const dateStr = new Date(n.pubDate).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });

      htmlList += `
        <a href="${n.link}" target="_blank" rel="noreferrer" class="group flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-transparent hover:border-white/10 transition-all">
          <div class="relative w-full sm:w-32 h-40 sm:h-24 rounded-xl overflow-hidden shrink-0">
            <img src="${n.thumbnail}" alt="${n.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div class="flex flex-col justify-center flex-1">
            <div class="flex items-center gap-3 mb-1">
              <span class="text-xs font-bold text-accent uppercase">Actualidad</span>
              <span class="text-xs text-gray-500 flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5"></i> ${dateStr}</span>
            </div>
            <h5 class="font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">${n.title}</h5>
          </div>
        </a>
      `;
    });
    htmlList += `</div>`;

    container.innerHTML = htmlFeatured + htmlList;
    initLucide();
  };

  // FUNCIONES DE CARGA CON FALLBACKS DE CLIENTE (HYBRID FETCH)

  // 4. Cargar videos de YouTube
  const fetchVideos = async () => {
    const container = document.getElementById("videos-container");
    if (!container) return;

    let videos = [];
    try {
      // 1. Intentar backend
      const response = await fetch("?route=api/youtube");
      const result = await response.json();
      if (result && result.data && result.data.length > 0) {
        videos = result.data;
      }
    } catch (err) {
      console.warn("Backend YouTube fetch failed, using client fallback", err);
    }

    if (videos.length === 0) {
      videos = getDummyVideosClient();
    }
    renderVideos(videos, container);
  };

  // 5. Cargar Calendario F1 (Con fallback directo del navegador por CORS)
  const fetchCalendar = async () => {
    const container = document.getElementById("calendar-container");
    if (!container) return;

    let races = [];
    try {
      // 1. Intentar backend
      const response = await fetch("?route=api/calendar");
      if (response.ok) {
        const result = await response.json();
        if (result && result.success && result.data && result.data.length > 0) {
          races = result.data;
        }
      }
    } catch (err) {
      console.warn("Backend Calendar fetch failed, trying direct browser API fetch...", err);
    }

    // 2. Si falló el backend (ej. cortafuegos local en Apache), hacer consulta directa desde el navegador (soporta CORS)
    if (races.length === 0) {
      try {
        const response = await fetch("https://api.jolpi.ca/ergast/f1/current.json");
        if (response.ok) {
          const data = await response.json();
          if (data.MRData && data.MRData.RaceTable && data.MRData.RaceTable.Races) {
            races = filterRacesClient(data.MRData.RaceTable.Races);
          }
        }
      } catch (directErr) {
        console.error("Direct browser fetch for calendar failed:", directErr);
      }
    }

    // 3. Renderizar o error
    if (races.length > 0) {
      renderCalendar(races, container);
    } else {
      container.innerHTML = `<div class="col-span-full text-center text-red-500">Error al cargar el calendario de Fórmula 1.</div>`;
    }
  };

  // 6. Cargar Noticias (Con fallback directo del navegador por CORS a rss2json)
  const fetchNews = async () => {
    const container = document.getElementById("news-container");
    if (!container) return;

    let newsData = [];
    try {
      // 1. Intentar backend
      const response = await fetch("?route=api/news");
      if (response.ok) {
        const result = await response.json();
        if (result && result.success && result.data && result.data.length > 0) {
          newsData = result.data;
        }
      }
    } catch (err) {
      console.warn("Backend News fetch failed, trying direct browser API fetch...", err);
    }

    // 2. Si falló el backend, consultar al agregador de RSS desde el navegador (CORS)
    if (newsData.length === 0) {
      try {
        const response = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://es.motorsport.com/rss/f1/news/");
        if (response.ok) {
          const data = await response.json();
          if (data.status === 'ok' && data.items && data.items.length > 0) {
            newsData = data.items.slice(0, 3).map(item => {
              let excerpt = (item.description || '').replace(/<[^>]+>/g, '');
              excerpt = excerpt.replace(/\s+/g, ' ').trim();
              if (excerpt.length > 120) {
                excerpt = excerpt.substring(0, 120) + '...';
              }
              const thumbnail = item.enclosure?.link 
                || item.thumbnail 
                || 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=800&q=80';
              return {
                title: item.title,
                excerpt: excerpt,
                link: item.link,
                thumbnail: thumbnail,
                pubDate: item.pubDate
              };
            });
          }
        }
      } catch (directErr) {
        console.error("Direct browser fetch for news failed:", directErr);
      }
    }

    // 3. Renderizar o error
    if (newsData.length > 0) {
      renderNews(newsData, container);
    } else {
      container.innerHTML = `<div class="col-span-full text-center text-red-500">Error al cargar noticias de Motorsport.</div>`;
    }
  };

  // Cargar todos los datos AJAX al iniciar la página
  fetchVideos();
  fetchCalendar();
  fetchNews();
});
