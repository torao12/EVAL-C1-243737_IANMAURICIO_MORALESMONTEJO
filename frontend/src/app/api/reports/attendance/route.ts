import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const { rows } = await query('SELECT * FROM vw_attendance_by_group');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error en API Attendance:', error);
    return NextResponse.json({ error: 'Fallo al obtener los datos de asistencia' }, { status: 500 });
  }
}