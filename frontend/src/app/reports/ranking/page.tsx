import { query } from '@/lib/db';

export default async function RankingPage({ searchParams }: { searchParams: Promise<any> }) {
  const params = await searchParams;
  const program = params.program || 'Sistemas';

  const { rows } = await query(
    `SELECT * FROM vw_rank_students WHERE program = $1 ORDER BY position ASC`,
    [program]
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Ranking: {program}</h1>
      <div className="space-y-2">
        {rows.map((r: any, i: number) => (
          <div key={i} className="p-4 border rounded flex justify-between items-center">
            <span>{r.position}. <strong>{r.student_name}</strong></span>
            <span className="text-blue-600 font-bold">{r.final_grade}</span>
          </div>
        ))}
      </div>
    </div>
  );
}