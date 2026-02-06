import { query } from '@/lib/db';

export default async function StudentsAtRiskPage({ searchParams }: { searchParams: any }) {
  const params = await searchParams;
  const search = params.search || '';

  const { rows } = await query(
    `SELECT * FROM vw_students_at_risk 
     WHERE name ILIKE $1 OR email ILIKE $1 
     ORDER BY average_grade ASC`,
    [`%${search}%`]
  );

  return (
    <div className="p-8 bg-[#F5EFEB] min-height-screen">
      <h1 className="text-2xl font-bold text-[#2F4156] mb-6">Alumnos en Riesgo Académico</h1>
      
      <div className="overflow-hidden rounded-lg border border-[#2F4156] shadow-md">
        <table className="w-full bg-white">
          <thead className="bg-[#2F4156] text-white">
            <tr>
              <th className="p-4 text-left">Estudiante</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-center">Promedio</th>
              <th className="p-4 text-center">Faltas</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500 italic">No se encontraron alumnos en riesgo.</td>
              </tr>
            ) : (
              rows.map((student) => (
                <tr key={student.id} className="border-t border-[#C8D9E6] hover:bg-[#F5EFEB] transition-colors">
                  <td className="p-4 text-[#2F4156] font-medium">{student.name}</td>
                  <td className="p-4 text-[#567C8D]">{student.email}</td>
                  <td className="p-4 text-center font-bold text-red-600">
                    {Number(student.average_grade).toFixed(2)}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded ${student.total_absences > 3 ? 'bg-orange-200 text-orange-800' : 'text-[#2F4156]'}`}>
                      {student.total_absences}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}