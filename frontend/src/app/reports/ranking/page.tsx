import SearchFilters from '@/components/SearchFilters';
import Link from 'next/link';

export default async function RankingPage({ searchParams }: { searchParams: any }) {
  const params = await searchParams;
  const search = params.search || '';
  const page = parseInt(params.page || '1');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/reports/ranking?search=${search}&page=${page}`,
    { cache: 'no-store' }
  );
  const students = await response.json();

  return (
    <div className="p-8 bg-[#F5EFEB] min-h-screen">
      <h1 className="text-2xl font-bold text-[#2F4156] mb-2">Ranking Académico</h1>
      
      <SearchFilters />

      <div className="overflow-hidden rounded-lg border border-[#2F4156] shadow-md bg-white">
        <table className="w-full text-left">
          <thead className="bg-[#2F4156] text-white">
            <tr>
              <th className="p-4">Posición</th>
              <th className="p-4">Estudiante</th>
              <th className="p-4">Programa</th>
              <th className="p-4 text-center">Calificación</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student: any) => (
                <tr key={student.student_name} className="border-t border-[#C8D9E6] hover:bg-[#F5EFEB]">
                  <td className="p-4 font-bold text-[#567C8D]">#{student.position}</td>
                  <td className="p-4 text-[#2F4156]">{student.student_name}</td>
                  <td className="p-4">{student.program}</td>
                  <td className="p-4 text-center font-medium">{student.final_grade}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={4} className="p-10 text-center text-gray-500">No se encontraron resultados.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <Link
          href={`?search=${search}&page=${Math.max(page - 1, 1)}`}
          className={`px-4 py-2 rounded bg-[#2F4156] text-white ${page <= 1 ? 'opacity-50 pointer-events-none' : ''}`}
        >
          Anterior
        </Link>
        <span className="text-[#2F4156] font-medium">Página {page}</span>
        <Link
          href={`?search=${search}&page=${page + 1}`}
          className={`px-4 py-2 rounded bg-[#2F4156] text-white ${students.length < 10 ? 'opacity-50 pointer-events-none' : ''}`}
        >
          Siguiente
        </Link>
      </div>
    </div>
  );
}