export default async function TeacherLoadPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/reports/teacher-load`, { cache: 'no-store' });
  const data = await response.json();

  return (
    <div className="p-8 bg-[#F5EFEB] min-h-screen">
      <h1 className="text-2xl font-bold text-[#2F4156] mb-6">Carga Docente Actual</h1>
      <div className="overflow-hidden rounded-lg border border-[#2F4156] shadow-md">
        <table className="w-full bg-white text-left">
          <thead className="bg-[#567C8D] text-white">
            <tr>
              <th className="p-4">Profesor</th>
              <th className="p-4">Periodo</th>
              <th className="p-4 text-center">Total Grupos</th>
              <th className="p-4 text-center">Total Alumnos</th>
            </tr>
          </thead>
          <tbody>
            {data.map((teacher: any, idx: number) => (
              <tr key={idx} className="border-t border-[#C8D9E6] hover:bg-[#F5EFEB]">
                <td className="p-4 text-[#2F4156] font-medium">{teacher.teacher_name}</td>
                <td className="p-4">{teacher.term}</td>
                <td className="p-4 text-center">{teacher.total_groups}</td>
                <td className="p-4 text-center font-bold">{teacher.total_students}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}