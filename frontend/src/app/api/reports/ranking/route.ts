import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const { rows } = await query(
      `SELECT * FROM vw_rank_students 
       WHERE student_name ILIKE $1 OR program ILIKE $1 
       ORDER BY position ASC 
       LIMIT $2 OFFSET $3`,
      [`%${search}%`, limit, offset]
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}