import SearchFilters from '@/components/SearchFilters';
import Link from 'next/link';

export default async function StudentsAtRiskPage({ searchParams }: { searchParams: any }) {
  const params = await searchParams;
  const search = params.search || '';
  const page = parseInt(params.page || '1');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/reports/students-at-risk?search=${search}&page=${page}`,
    { cache: 'no-store' }
  );
  
  const students = await response.json();

  return (
    <div className="p-8 bg-[#F5EFEB] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#2F4156]">Alumnos en Riesgo Académico</h1>
        <p className="text-[#567C8D]">Listado de estudiantes con promedio inferior a 7.0 o más de 3 inasistencias.</p>
      </div>
      
      {/* Barra de búsqueda reutilizable */}
      <SearchFilters />

      <div className="overflow-hidden rounded-lg border border-[#2F4156] shadow-md bg-white">
        <table className="w-full text-left">
          <thead className="bg-[#2F4156] text-white">
            <tr>
              <th className="p-4">Estudiante</th>
              <th className="p-4">Email</th>
              <th className="p-4 text-center">Promedio</th>
              <th className="p-4 text-center">Faltas</th>
            </tr>
          </thead>
          <tbody>
            {students.error ? (
               <tr><td colSpan={4} className="p-10 text-center text-red-500">Error al conectar con la base de datos.</td></tr>
            ) : students.length === 0 ? (
              <tr><td colSpan={4} className="p-10 text-center text-gray-500 italic">No se encontraron estudiantes que coincidan con la búsqueda.</td></tr>
            ) : (
              students.map((student: any) => (
                <tr key={student.id} className="border-t border-[#C8D9E6] hover:bg-[#F5EFEB] transition-colors">
                  <td className="p-4 text-[#2F4156] font-medium">{student.name}</td>
                  <td className="p-4 text-[#567C8D]">{student.email}</td>
                  <td className="p-4 text-center font-bold text-red-600">
                    {Number(student.average_grade).toFixed(2)}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${student.total_absences > 3 ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-[#2F4156]'}`}>
                      {student.total_absences} inasistencias
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <Link
          href={`?search=${search}&page=${Math.max(page - 1, 1)}`}
          className={`px-4 py-2 rounded font-medium transition-all ${
            page <= 1 ? 'bg-gray-300 text-gray-500 pointer-events-none' : 'bg-[#2F4156] text-white hover:bg-[#1f2b3a]'
          }`}
        >
          Anterior
        </Link>
        
        <div className="text-[#2F4156] font-semibold bg-white px-4 py-2 rounded-lg border border-[#C8D9E6]">
          Página {page}
        </div>

        <Link
          href={`?search=${search}&page=${page + 1}`}
          className={`px-4 py-2 rounded font-medium transition-all ${
            students.length < 10 ? 'bg-gray-300 text-gray-500 pointer-events-none' : 'bg-[#2F4156] text-white hover:bg-[#1f2b3a]'
          }`}
        >
          Siguiente
        </Link>
      </div>
    </div>
  );
}