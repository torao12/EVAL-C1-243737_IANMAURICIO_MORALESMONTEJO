import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const { rows } = await query('SELECT * FROM vw_course_performance');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error en API Course Performance:', error);
    return NextResponse.json({ error: 'Fallo al obtener el desempeño de cursos' }, { status: 500 });
  }
}