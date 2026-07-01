import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.jolpi.ca/ergast/f1/current.json', { 
      next: { revalidate: 3600 } // Caché por 1 hora
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener datos de Jolpi API');
    }
    
    const data = await response.json();
    const races = data.MRData.RaceTable.Races;
    
    // Filtrar carreras pasadas y obtener las próximas 3
    const now = new Date();
    
    const upcomingRaces = races.filter((race: any) => {
      // race.date (YYYY-MM-DD) y race.time (HH:MM:SSZ) 
      const timeString = race.time || "00:00:00Z";
      const raceDate = new Date(`${race.date}T${timeString}`);
      
      // Permitir que la carrera se siga mostrando hasta 2 horas después de su hora de inicio
      const hideTime = new Date(raceDate.getTime() + 2 * 60 * 60 * 1000);
      
      return hideTime > now;
    }).slice(0, 3);
    
    return NextResponse.json({ success: true, data: upcomingRaces });
  } catch (error: any) {
    console.error("F1 Calendar API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
