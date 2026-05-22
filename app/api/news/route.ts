import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const rssUrl = 'https://es.motorsport.com/rss/f1/news/';
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`, {
      next: { revalidate: 3600 } // Caché de 1 hora
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener RSS de noticias');
    }
    
    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error('Respuesta no válida del conversor RSS');
    }
    
    // Formatear los 3 primeros artículos
    const articles = data.items.slice(0, 3).map((item: any) => ({
      title: item.title,
      // Limpiar etiquetas HTML de la descripción y acortar a 120 caracteres
      excerpt: item.description.replace(/<[^>]+>/g, '').substring(0, 120) + '...',
      link: item.link,
      thumbnail: item.enclosure?.link || 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=800&q=80',
      pubDate: item.pubDate
    }));

    return NextResponse.json({ success: true, data: articles });
  } catch (error: any) {
    console.error("News API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
