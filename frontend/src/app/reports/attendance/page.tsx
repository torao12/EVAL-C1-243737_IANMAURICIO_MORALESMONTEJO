import { query } from '@/lib/db';

export default async function AttendancePage({ searchParams }: { searchParams: Promise<any> }) {
  await searchParams; 

  const { rows } = await query(`SELECT * FROM vw_attendance_by_group`);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Asistencia por Grupo</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Curso</th>
            <th className="p-2 border">Porcentaje</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r: any, i: number) => (
            <tr key={i} className="border-t">
              <td className="p-2 border">{r.course_name}</td>
              <td className="p-2 border font-bold">{Number(r.attendance_rate).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}