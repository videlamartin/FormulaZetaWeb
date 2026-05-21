"use client";

import Image from "next/image";
import { supabase } from "./lib/supabase";
import { useEffect, useState } from "react";
import { Play, Calendar, ChevronRight } from "lucide-react";

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

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("published_at", { ascending: false })
          .limit(3);

        if (error) throw error;

        if (data && data.length > 0) {
          setPosts(data as Post[]);
        } else {
          setPosts([
            {
              id: 1,
              title: "GRAN PREMIO DE MÓNACO - Análisis completo",
              excerpt: "Repasamos las mejores estrategias, adelantamientos y la polémica de la última vuelta en el circuito más exigente del calendario.",
              youtube_id: "dQw4w9WgXcQ",
              thumbnail: "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?auto=format&fit=crop&w=800&q=80",
              published_at: new Date().toISOString(),
            },
            {
              id: 2,
              title: "¿El fin de la era Red Bull?",
              excerpt: "Analizamos los datos de telemetría que demuestran el avance de Ferrari y McLaren en esta segunda mitad de temporada.",
              youtube_id: "dQw4w9WgXcQ",
              thumbnail: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=800&q=80",
              published_at: new Date().toISOString(),
            },
            {
              id: 3,
              title: "Test de Pretemporada: Lo que no viste",
              excerpt: "Nos infiltramos en el paddock para traerte todos los secretos y novedades aerodinámicas de los nuevos monoplazas.",
              youtube_id: "dQw4w9WgXcQ",
              thumbnail: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=800&q=80",
              published_at: new Date().toISOString(),
            },
          ]);
        }
      } catch (err) {
        setPosts([]);
      }
    }
    
    fetchPosts();
  }, []);

  return (
    <main className="flex-1 bg-black text-white selection:bg-primary selection:text-white">
      
      {/* HERO SECTION */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1551846365-b2c70b9bd6c4?auto=format&fit=crop&w=1920&q=80" 
            alt="F1 Background" 
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-4 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
            <span className="text-primary font-bold text-sm tracking-widest uppercase">Motor & Adrenalina</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tighter mb-6">
            <span className="block text-white drop-shadow-lg">El pulso de la</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-glow">Fórmula 1</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-10">
            Análisis, telemetría, noticias y la mejor cobertura del motorsport, directo al grano.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#videos" className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-red-700 text-white font-bold rounded-full transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,0,0,0.4)]">
              <Play size={20} fill="currentColor" /> Ver Último Video
            </a>
            <a href="#sobre-mi" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-gray-500 hover:border-white text-white font-bold rounded-full transition-all flex items-center justify-center gap-2">
              Conocer Más
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-xs text-gray-400 uppercase tracking-widest mb-2">Scroll</span>
          <div className="w-0.5 h-10 bg-gradient-to-b from-primary to-transparent"></div>
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
                <Image src="https://images.unsplash.com/photo-1533158307587-828f0a76cf46?auto=format&fit=crop&w=1000&q=80" alt="FormulaZeta Setup" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                    <h3 className="font-display text-2xl font-bold mb-2">Pasión por la F1</h3>
                    <p className="text-gray-300 text-sm">Desde el análisis técnico hasta las simulaciones virtuales.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text & Socials */}
            <div>
              <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-2">La Marca</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">Detrás de FormulaZeta</h3>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                No somos solo un canal de YouTube. Somos una comunidad de apasionados por la velocidad. Analizamos cada curva, cada mejora aerodinámica y cada estrategia para que vivas la Fórmula 1 como si estuvieras en el muro de boxes.
              </p>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                Únete a miles de aficionados en nuestras redes para debatir en vivo durante cada Gran Premio.
              </p>

              {/* Social Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <a href="#" className="flex flex-col items-center justify-center p-6 bg-white/5 hover:bg-[#FF0000]/20 rounded-2xl border border-white/5 hover:border-[#FF0000] transition-all group">
                  <svg className="w-8 h-8 mb-3 text-gray-400 group-hover:text-[#FF0000] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  <span className="font-bold text-sm">YouTube</span>
                  <span className="text-xs text-gray-500 mt-1">100k+ Subs</span>
                </a>
                <a href="#" className="flex flex-col items-center justify-center p-6 bg-white/5 hover:bg-[#1DA1F2]/20 rounded-2xl border border-white/5 hover:border-[#1DA1F2] transition-all group">
                  <svg className="w-8 h-8 mb-3 text-gray-400 group-hover:text-[#1DA1F2] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  <span className="font-bold text-sm">Twitter</span>
                  <span className="text-xs text-gray-500 mt-1">Directos</span>
                </a>
                <a href="#" className="flex flex-col items-center justify-center p-6 bg-white/5 hover:bg-[#E1306C]/20 rounded-2xl border border-white/5 hover:border-[#E1306C] transition-all group">
                  <svg className="w-8 h-8 mb-3 text-gray-400 group-hover:text-[#E1306C] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  <span className="font-bold text-sm">Instagram</span>
                  <span className="text-xs text-gray-500 mt-1">Backstage</span>
                </a>
                <a href="#" className="flex flex-col items-center justify-center p-6 bg-white/5 hover:bg-[#9146FF]/20 rounded-2xl border border-white/5 hover:border-[#9146FF] transition-all group">
                  <svg className="w-8 h-8 mb-3 text-gray-400 group-hover:text-[#9146FF] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/></svg>
                  <span className="font-bold text-sm">Twitch</span>
                  <span className="text-xs text-gray-500 mt-1">Watchalongs</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALENDAR SECTION (Placeholder) */}
      <section id="calendario" className="py-24 bg-darkBG border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Calendar size={48} className="mx-auto mb-6 text-gray-600" />
          <h2 className="text-4xl font-display font-bold mb-4">Calendario F1 2026</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Mantente al día con todas las fechas, horarios y resultados de la temporada actual. Próximamente integrado con datos en vivo.
          </p>
          <div className="p-8 border border-white/10 border-dashed rounded-2xl bg-black/50">
            <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">[ Integración con API en desarrollo ]</p>
          </div>
        </div>
      </section>
      
    </main>
  );
}
