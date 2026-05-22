import { NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
// Reemplazamos 'UC' por 'UU' para obtener el ID de la lista de reproducción de subidas (Uploads)
const UPLOADS_PLAYLIST_ID = "UUjBSltnahL1em-O7KCEfFUQ";

export async function GET() {
  if (!YOUTUBE_API_KEY) {
    // Si no hay clave API, devolvemos datos falsos (dummy) para que la UI no se rompa
    return NextResponse.json({
      success: false,
      message: "Falta YOUTUBE_API_KEY en las variables de entorno. Mostrando datos de prueba.",
      data: [
        {
          id: 1,
          title: "VÍDEO DE PRUEBA 1 (Requiere API Key)",
          excerpt: "Configura tu clave de YouTube Data API v3 en .env.local para ver los videos reales.",
          youtube_id: "dQw4w9WgXcQ",
          thumbnail: "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?auto=format&fit=crop&w=800&q=80",
          published_at: new Date().toISOString(),
        },
        {
          id: 2,
          title: "VÍDEO DE PRUEBA 2",
          excerpt: "Esperando configuración de YOUTUBE_API_KEY.",
          youtube_id: "dQw4w9WgXcQ",
          thumbnail: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=800&q=80",
          published_at: new Date().toISOString(),
        },
        {
          id: 3,
          title: "VÍDEO DE PRUEBA 3",
          excerpt: "Esperando configuración de YOUTUBE_API_KEY.",
          youtube_id: "dQw4w9WgXcQ",
          thumbnail: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=800&q=80",
          published_at: new Date().toISOString(),
        }
      ]
    });
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=3&playlistId=${UPLOADS_PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`;
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Caché por 1 hora
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Error al obtener videos de YouTube");
    }

    const videos = data.items.map((item: any, index: number) => {
      const snippet = item.snippet;
      return {
        id: index + 1,
        title: snippet.title,
        excerpt: snippet.description.substring(0, 150) + "...",
        youtube_id: snippet.resourceId.videoId,
        thumbnail: snippet.thumbnails?.maxres?.url || snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
        published_at: snippet.publishedAt,
      };
    });

    return NextResponse.json({ success: true, data: videos });
  } catch (error: any) {
    console.error("YouTube API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
