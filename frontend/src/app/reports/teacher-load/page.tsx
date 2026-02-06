import { query } from '@/lib/db';

export default async function TeacherLoadPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const { rows } = await query(
    `SELECT * FROM vw_teacher_load LIMIT $1 OFFSET $2`, 
    [limit, offset]
  );

  return (
    <div className="p-8 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold border-b-4 border-teal inline-block pb-1">
          Carga Docente
        </h1>
        <p className="text-teal mt-2">Análisis de grupos y alumnos por profesor (Cláusula HAVING).</p>
      </header>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-skyblue">
        <table className="w-full text-left">
          <thead className="bg-navy text-white">
            <tr>
              <th className="p-4">Profesor</th>
              <th className="p-4 text-center">Periodo</th>
              <th className="p-4 text-center">Grupos</th>
              <th className="p-4 text-right">Total Alumnos</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r: any, i: number) => (
              <tr key={i} className="border-b border-skyblue/30 hover:bg-skyblue/10 transition-colors">
                <td className="p-4 font-semibold text-navy">{r.teacher_name}</td>
                <td className="p-4 text-center text-teal">{r.term}</td>
                <td className="p-4 text-center">
                   <span className="bg-skyblue/50 px-3 py-1 rounded-full text-navy font-bold">
                     {r.total_groups}
                   </span>
                </td>
                <td className="p-4 text-right font-bold text-navy">{r.total_students}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-sm text-teal font-medium">Mostrando página {page}</p>
        <div className="flex gap-2">
          {page > 1 && (
            <a href={`?page=${page - 1}`} className="px-4 py-2 bg-white border border-teal text-teal rounded-lg hover:bg-beige transition-colors">
              Anterior
            </a>
          )}
          <a href={`?page=${page + 1}`} className="px-4 py-2 bg-navy text-white rounded-lg hover:bg-teal transition-colors">
            Siguiente
          </a>
        </div>
      </div>
    </div>
  );
}