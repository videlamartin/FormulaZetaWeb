"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Play, Calendar, ChevronRight, MapPin, Clock, Trophy, ArrowUpRight, Newspaper } from "lucide-react";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  youtube_id: string;
  thumbnail: string;
  published_at: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [races, setRaces] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/youtube');
        const result = await response.json();

        if (result.success && result.data && result.data.length > 0) {
          setPosts(result.data as Post[]);
        } else {
          throw new Error("No data from API");
        }
      } catch (err) {
        setPosts([
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
        ]);
      }
    }

    async function fetchRaces() {
      try {
        const response = await fetch('/api/calendar');
        const result = await response.json();
        if (result.success && result.data) {
          setRaces(result.data);
        }
      } catch (err) {
        console.error("Error fetching races:", err);
      }
    }

    async function fetchNews() {
      try {
        const response = await fetch('/api/news');
        const result = await response.json();
        if (result.success && result.data) {
          setNews(result.data);
        }
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    }

    fetchPosts();
    fetchRaces();
    fetchNews();
  }, []);

  return (
    <main className="flex-1 bg-[#050505] text-white selection:bg-primary selection:text-white relative">
      {/* HERO SECTION */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#050505]">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1551846365-b2c70b9bd6c4?auto=format&fit=crop&w=1920&q=80"
            alt="F1 Background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 opacity-20 mix-blend-screen bg-repeat" style={{ backgroundImage: "url('/images/telemetry-bg.png')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] opacity-90"></div>
          {/* Glowing Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">Creador de contenido</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tighter mb-6">
            <span className="block text-white drop-shadow-2xl">Página oficial</span>
            <span className="block text-white animate-glow">Fórmula Zeta</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-10 tracking-wide font-light">
            Análisis, telemetría, noticias y la mejor cobertura de la Formula 1, directo al grano.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={posts.length > 0 ? `https://youtube.com/watch?v=${posts[0].youtube_id}` : "https://youtube.com/@FormulaZeta"} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-full transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,0,0,0.4)] group hover:animate-pulseRed">
              <Play size={20} fill="currentColor" className="group-hover:scale-125 transition-transform duration-300" /> Ver Último Video
            </a>
            <a href="#sobre-mi" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-gray-600 hover:border-white hover:bg-white/5 text-white font-bold rounded-full transition-all flex items-center justify-center gap-2">
              Conocer Más
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">Scroll</span>
          <div className="w-[2px] h-12 bg-white/10 overflow-hidden relative rounded-full">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-primary to-transparent animate-scrollPulse"></div>
          </div>
        </div>
      </section>

      {/* LATEST VIDEOS SECTION */}
      <section id="videos" className="py-24 bg-darkBG relative border-t border-white/5">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Contenido Exclusivo</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold">Últimos Videos</h3>
            </div>
            <a href="https://youtube.com/@FormulaZeta" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
              Ir al canal <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.id} className="group bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,0,0.15)] hover:-translate-y-2 flex flex-col">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image src={post.thumbnail} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,0,0,0.6)] backdrop-blur-sm">
                      <Play size={24} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-gray-300">Análisis</span>
                    <span className="text-xs text-gray-500">{new Date(post.published_at).toLocaleDateString()}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h4>
                  <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-1">{post.excerpt}</p>
                  <a href={`https://youtube.com/watch?v=${post.youtube_id}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-primary transition-colors uppercase tracking-wider">
                    Ver Video <ChevronRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT & SOCIAL HUB */}
      <section id="sobre-mi" className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image / Branding */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 blur-2xl rounded-full opacity-50"></div>
              <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden border border-white/10">
                <Image src="/images/comunidad.jpg" alt="FormulaZeta Comunidad" fill className="object-cover transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                    <h3 className="font-display text-2xl font-bold mb-2">Comunidad Zeta</h3>
                    <p className="text-gray-300 text-sm">Apasionados compartiendo la locura por el automovilismo.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text & Socials */}
            <div>
              <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-2">Sobre mí</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">Detrás de FormulaZeta</h3>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                Soy Martin Zalazar, conductor de FormulaZeta. Estudio Comunicación Audiovisual y AMO la Fórmula 1. Me gusta analizar cada curva, cada mejora aerodinámica y cada estrategia para que vivas la F1 como si estuvieras en el muro de boxes.
              </p>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                Las redes me ayudaron mucho a crecer profesionalmente, por eso quiero compartir mis conocimientos y mi pasión con ustedes. <br />¡Un abrazo!</p>

              {/* Social Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <a href="https://youtube.com/@FormulaZeta" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-6 bg-white/5 hover:bg-[#FF0000]/20 rounded-2xl border border-white/5 hover:border-[#FF0000] transition-all group">
                  <svg className="w-8 h-8 mb-3 text-gray-400 group-hover:text-[#FF0000] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                  <span className="font-bold text-sm">YouTube</span>
                  <span className="text-xs text-gray-500 mt-1">Canal Oficial</span>
                </a>
                <a href="https://x.com/zetazalazar" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 hover:border-white transition-all group">
                  <svg className="w-8 h-8 mb-3 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  <span className="font-bold text-sm">X (Twitter)</span>
                  <span className="text-xs text-gray-500 mt-1">Personal</span>
                </a>
                <a href="https://www.instagram.com/formulazeta.ok" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-6 bg-white/5 hover:bg-[#E1306C]/20 rounded-2xl border border-white/5 hover:border-[#E1306C] transition-all group">
                  <svg className="w-8 h-8 mb-3 text-gray-400 group-hover:text-[#E1306C] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  <span className="font-bold text-sm">Instagram</span>
                  <span className="text-xs text-gray-500 mt-1">Oficial</span>
                </a>
                <a href="https://kick.com/formulazeta" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-6 bg-white/5 hover:bg-[#53FC18]/20 rounded-2xl border border-white/5 hover:border-[#53FC18] transition-all group">
                  <svg className="w-8 h-8 mb-3 text-gray-400 group-hover:text-[#53FC18] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M1.333 1.333v21.334h9.334v-2.667h-6.667V4h6.667V1.333H1.333zm12 0v2.667h2.667v2.667h2.667v2.667h2.667V12h-2.667v2.667h-2.667v2.667h-2.667v2.667h-2.667v2.667h12V1.333h-12z" /></svg>
                  <span className="font-bold text-sm">Kick</span>
                  <span className="text-xs text-gray-500 mt-1">Streams</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMUNIDAD SECTION */}
      <section id="comunidad" className="py-24 bg-darkBG relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Únete al Paddock</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">Comunidad FormulaZeta</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* YouTube Members */}
            <div className="bg-black border border-white/10 rounded-3xl p-8 hover:border-[#FF0000]/50 transition-all group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF0000]/10 rounded-bl-full -z-10 group-hover:bg-[#FF0000]/20 transition-colors"></div>
              <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-[#FF0000]">Socios</span> de YouTube
              </h4>
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                La mejor manera de apoyar mi trabajo es sumándote a la comunidad de MIEMBROS del canal en YouTube. Sé parte y accede a:
              </p>
              <ul className="space-y-3 mb-8 text-sm text-gray-400 flex-1">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF0000] mt-1">●</span> Reacciones en vivo durante prácticas libres, clasificaciones, sprints y F2.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF0000] mt-1">●</span> Videos y análisis exclusivos.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF0000] mt-1">●</span> Transmisiones SOLO SOCIOS en YouTube y más.
                </li>
              </ul>
              <p className="text-sm text-gray-400 mb-8 italic">
                Los tres niveles de socio acceden a los mismos beneficios. ¡Con sumarte ya alcanza!
              </p>
              <a href="https://www.youtube.com/channel/UCjBSltnahL1em-O7KCEfFUQ/join" target="_blank" rel="noreferrer" className="inline-block w-full text-center py-4 bg-[#FF0000] hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(255,0,0,0.3)]">
                Unirme Ahora
              </a>
            </div>

            {/* Discord */}
            <div className="bg-black border border-white/10 rounded-3xl p-8 hover:border-[#5865F2]/50 transition-all group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#5865F2]/10 rounded-bl-full -z-10 group-hover:bg-[#5865F2]/20 transition-colors"></div>
              <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-[#5865F2]">Discord</span> Oficial
              </h4>
              <div className="text-gray-300 mb-6 text-sm leading-relaxed space-y-4 flex-1">
                <p>¿Viste un meme muy divertido sobre la carrera?</p>
                <p>¿Armaste un compilado increíble de adelantos de Colapinto?</p>
                <p>¿Queres pasarle a Zeta un reel que viste sobre Ferrari?</p>
                <p className="font-bold text-white">Podes hacerlo en el canal de Discord OFICIAL de Formula Zeta.</p>
                <p>Además charlá con la comunidad, recibí alertas del F1 Fantasy y sugerí ideas para próximos videos.</p>
              </div>
              <a href="https://discord.com/invite/qBngBWzQK" target="_blank" rel="noreferrer" className="inline-block w-full text-center py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(88,101,242,0.3)] mt-auto">
                Ingresar al Servidor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CALENDAR SECTION */}
      <section id="calendario" className="py-24 bg-black border-t border-white/5 relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Próximos Eventos</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">Calendario F1 2026</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {races.length > 0 ? races.map((race, index) => {
              const isNext = index === 0;
              const raceDate = new Date(`${race.date}T${race.time || "00:00:00Z"}`);

              const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
              const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };

              const formattedDate = raceDate.toLocaleDateString('es-ES', dateOptions);
              const formattedTime = raceDate.toLocaleTimeString('es-ES', timeOptions) + ' hs';

              return (
                <div key={race.round} className={`border rounded-2xl p-6 transition-all group ${isNext ? 'bg-gradient-to-b from-black to-primary/10 border-primary/30 relative overflow-hidden transform md:scale-105 shadow-[0_0_30px_rgba(255,0,0,0.15)] z-10' : 'bg-black border-white/10 hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,0,0,0.1)]'}`}>
                  {isNext && <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">PRÓXIMA CARRERA</div>}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-wider ${isNext ? 'text-primary' : 'text-gray-400'}`}>Ronda {race.round}</span>
                      <h4 className={`text-xl font-bold mt-1 transition-colors ${isNext ? 'text-white' : 'group-hover:text-primary'}`}>{race.raceName}</h4>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className={`flex items-center gap-3 text-sm ${isNext ? 'text-gray-200' : 'text-gray-300'}`}>
                      <MapPin size={16} className={isNext ? 'text-primary' : 'text-gray-500'} /> {race.Circuit.circuitName}, {race.Circuit.Location.locality}
                    </div>
                    <div className={`flex items-center gap-3 text-sm ${isNext ? 'text-gray-200' : 'text-gray-300'}`}>
                      <Calendar size={16} className={isNext ? 'text-primary' : 'text-gray-500'} /> {formattedDate}
                    </div>
                    <div className={`flex items-center gap-3 text-sm ${isNext ? 'text-gray-200' : 'text-gray-300'}`}>
                      <Clock size={16} className={isNext ? 'text-primary' : 'text-gray-500'} /> {formattedTime} (Tu Hora Local)
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-gray-500 py-12 border border-white/10 rounded-2xl bg-white/5">
                Cargando próximos eventos...
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <a href="#calendario" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">
              Volver Arriba <ChevronRight size={16} className="-rotate-90" />
            </a>
          </div>
        </div>
      </section>

      {/* NEWS SECTION */}
      <section id="noticias" className="py-24 bg-black relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Paddock Insider</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold flex items-center gap-4">
                Últimas Noticias <Newspaper className="text-gray-600 hidden md:block" size={40} />
              </h3>
            </div>
            <a href="https://es.motorsport.com/f1/news/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
              Ir a Motorsport.com <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Featured News */}
            {news.length > 0 && (
              <a href={news[0].link} target="_blank" rel="noreferrer" className="group relative rounded-3xl overflow-hidden border border-white/10 aspect-video lg:aspect-auto hover:border-primary/50 transition-all">
                <Image src={news[0].thumbnail} alt={news[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
                  <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded mb-4 uppercase tracking-wider">Última Hora</span>
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-2 group-hover:text-primary transition-colors drop-shadow-md">{news[0].title}</h4>
                  <p className="text-gray-300 line-clamp-2 text-sm md:text-base drop-shadow">{news[0].excerpt}</p>
                </div>
              </a>
            )}

            {/* Smaller News list */}
            <div className="flex flex-col gap-6">
              {news.length > 0 ? news.slice(1).map((n, i) => {
                const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
                const formattedDate = new Date(n.pubDate).toLocaleDateString('es-ES', dateOptions);

                return (
                  <a href={n.link} target="_blank" rel="noreferrer" key={i} className="group flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-transparent hover:border-white/10 transition-all">
                    <div className="relative w-full sm:w-32 h-40 sm:h-24 rounded-xl overflow-hidden shrink-0">
                      <Image src={n.thumbnail} alt={n.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col justify-center flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-bold text-accent uppercase">Actualidad</span>
                        <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={12} /> {formattedDate}</span>
                      </div>
                      <h5 className="font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">{n.title}</h5>
                    </div>
                  </a>
                );
              }) : (
                <div className="text-center text-gray-500 py-12 flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  Cargando noticias desde el paddock...
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FANTASY SECTION */}
      <section id="fantasy" className="py-24 bg-darkBG relative border-t border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E10600]/10 to-transparent blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">F1 Fantasy</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">El Gran DT de la Fórmula 1</h3>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Tenés <strong>100 M</strong> para armar un equipo con 5 pilotos y 2 constructores. Jugar es <span className="font-bold text-white bg-primary/20 px-2 py-0.5 rounded">COMPLETAMENTE GRATUITO</span>. No hay apuestas, no hay ningún beneficio pago ni posibilidad de comprar nada.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h4 className="font-bold text-[#53FC18] flex items-center gap-2 mb-4">
                    <ArrowUpRight size={20} /> Sumás puntos si...
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-400">
                    <li className="flex items-start gap-2"><span className="text-[#53FC18] mt-1">•</span> Obtienen buen resultado en clasificación</li>
                    <li className="flex items-start gap-2"><span className="text-[#53FC18] mt-1">•</span> Adelantan a otros conductores</li>
                    <li className="flex items-start gap-2"><span className="text-[#53FC18] mt-1">•</span> Suman podios, victorias o vueltas rápidas</li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h4 className="font-bold text-[#FF0000] flex items-center gap-2 mb-4">
                    <Trophy size={20} /> OJO, perdés puntos si...
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-400">
                    <li className="flex items-start gap-2"><span className="text-[#FF0000] mt-1">•</span> Chocan y no terminan la carrera</li>
                    <li className="flex items-start gap-2"><span className="text-[#FF0000] mt-1">•</span> Pierden posiciones</li>
                    <li className="flex items-start gap-2"><span className="text-[#FF0000] mt-1">•</span> Son penalizados por la FIA</li>
                  </ul>
                </div>
              </div>

              <div className="bg-black/50 border border-primary/30 rounded-2xl p-8 mb-10 text-center relative overflow-hidden shadow-[0_0_30px_rgba(255,0,0,0.15)]">
                <p className="text-gray-300 mb-2 text-sm uppercase tracking-wider font-bold">Liga Oficial FormulaZeta</p>
                <div className="text-4xl md:text-5xl font-display font-bold text-white tracking-widest mb-4">P4VGMEKJ503</div>
                <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                  Las ligas oficiales suelen dar premios INCREÍBLES (ej: viajes todo pago a fábricas). ¡Armá tu equipo y competí contra la comunidad!
                </p>
                <a href="https://fantasy.formula1.com/en/" target="_blank" rel="noreferrer" className="inline-block px-8 py-4 bg-white hover:bg-gray-200 text-black font-bold rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                  Crear Mi Equipo
                </a>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative aspect-[4/5] lg:aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              <Image src="/images/fantasy.jpg" alt="F1 Fantasy" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-darkBG border-t border-white/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-12 h-12">
                  <Image src="/images/logo.png" alt="FormulaZeta Logo" fill className="object-contain drop-shadow-[0_0_15px_rgba(255,0,0,0.4)]" />
                </div>
                <span className="text-2xl font-display font-bold tracking-widest text-white">
                  FormulaZeta
                </span>
              </div>
              <p className="text-gray-400 text-sm max-w-sm mb-6">
                El ecosistema definitivo para los verdaderos apasionados del motor. Análisis, telemetría y noticias directas del paddock.
              </p>
              <div className="flex gap-4">
                {/* Social tiny icons */}
                {['YT', 'TW', 'IG', 'KCK'].map((s) => (
                  <a href="#" key={s} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all">
                    <span className="text-xs font-bold">{s}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Explorar</h4>
              <ul className="space-y-3">
                {['Inicio', 'Videos', 'Análisis', 'Calendario'].map(l => (
                  <li key={l}><a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Legal</h4>
              <ul className="space-y-3">
                {['Privacidad', 'Términos', 'Cookies', 'Contacto'].map(l => (
                  <li key={l}><a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} FormulaZeta. Todos los derechos reservados.
            </p>
            <p className="text-gray-600 text-sm flex items-center gap-1">
              Desarrollado con <MapPin size={12} className="text-primary" /> pasión por la velocidad.
            </p>
          </div>
        </div>
      </footer>

    </main>
  );
}
