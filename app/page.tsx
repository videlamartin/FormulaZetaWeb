"use client";

import Image from "next/image";
import { supabase } from "./lib/supabase";
import { useEffect, useState } from "react";

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
              title: "Video de Prueba 1",
              excerpt: "Los mejores momentos de la F1",
              youtube_id: "dQw4w9WgXcQ",
              thumbnail: "https://via.placeholder.com/400x225",
              published_at: new Date().toISOString(),
            },
          ]);
        }
      } catch (err) {
        // Datos de prueba en caso de error
        setPosts([
          {
            id: 1,
            title: "Video de Prueba 1",
            excerpt: "Los mejores momentos de la F1",
            youtube_id: "dQw4w9WgXcQ",
            thumbnail: "https://via.placeholder.com/400x225",
            published_at: new Date().toISOString(),
          },
        ]);
      }
    }
    
    fetchPosts();
  }, []);

  return (
    <main className="space-y-16">
      {/* Hero */}
      <section
        className="h-screen bg-cover bg-center flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1551846365-b2c70b9bd6c4?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="bg-black/60 p-8 rounded-lg backdrop-blur-sm">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary animate-glow">FormulaZeta</h1>
          <p className="mt-4 text-xl text-lightGray">
            Centro de contenido premium de F1 – velocidad, adrenalina, tecnología.
          </p>
          <a
            href="#videos"
            className="inline-block mt-6 px-6 py-3 bg-primary text-white rounded-full hover:bg-accent transition"
          >
            Ver Último Video
          </a>
        </div>
      </section>

      {/* Latest Videos */}
      <section id="videos" className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-display text-primary mb-8">Últimos Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-darkBG rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="w-full h-48"
                src={`https://www.youtube.com/embed/${post.youtube_id}`}
                title={post.title}
                allowFullScreen
              ></iframe>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-lightGray">{post.title}</h3>
                <p className="text-sm text-gray-400 mt-2">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Calendar placeholder */}
      <section id="calendar" className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-display text-primary mb-8">Calendario de F1</h2>
        <p className="text-lightGray">[El calendario estático se agregará pronto]</p>
      </section>
    </main>
  );
}
