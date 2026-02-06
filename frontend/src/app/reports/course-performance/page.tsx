// src/app/reports/course-performance/page.tsx
import { query } from '@/lib/db';

export default async function CoursePerformancePage({ 
  searchParams 
}: { 
  searchParams: Promise<{ term?: string }> 
}) {
  const params = await searchParams; // Paso obligatorio en Next.js 15
  const term = params.term;

  if (!term) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Seleccione un Periodo</h1>
        <div className="flex gap-4">
          <a href="?term=2024-1" className="px-4 py-2 bg-blue-600 text-white rounded">Ver 2024-1</a>
          <a href="?term=2024-2" className="px-4 py-2 bg-blue-600 text-white rounded">Ver 2024-2</a>
        </div>
      </div>
    );
  }

  // Ejecución de la query
  const { rows } = await query(
    `SELECT * FROM vw_course_performance WHERE term = $1`, 
    [term]
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Desempeño: {term}</h1>
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Curso</th>
            <th className="border p-2">Promedio</th>
            <th className="border p-2">Reprobados</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r: any, i: number) => (
            <tr key={i} className="border-b">
              {/* IMPORTANTE: Usar los nombres exactos de tu SQL */}
              <td className="p-2 border">{r.course_name}</td>
              <td className="p-2 border text-center">{r.average_grade}</td>
              <td className="p-2 border text-center text-red-600">{r.failed_students}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}