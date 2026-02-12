export default async function CoursePerformancePage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/reports/course-performance`, { 
    cache: 'no-store' 
  });
  const courses = await response.json();

  return (
    <div className="p-8 bg-[#F5EFEB] min-h-screen">
      <h1 className="text-2xl font-bold text-[#2F4156] mb-6">Desempeño Global por Curso</h1>
      <div className="overflow-hidden rounded-lg border border-[#2F4156] shadow-md">
        <table className="w-full bg-white text-left">
          <thead className="bg-[#2F4156] text-white">
            <tr>
              <th className="p-4">Curso</th>
              <th className="p-4">Periodo</th>
              <th className="p-4 text-center">Total Alumnos</th>
              <th className="p-4 text-center">Promedio Final</th>
              <th className="p-4 text-center">Reprobados</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course: any, idx: number) => (
              <tr key={idx} className="border-t border-[#C8D9E6] hover:bg-[#F5EFEB] transition-colors">
                <td className="p-4 text-[#2F4156] font-medium">{course.course_name}</td>
                <td className="p-4">{course.term}</td>
                <td className="p-4 text-center">{course.total_students}</td>
                <td className="p-4 text-center font-bold text-[#567C8D]">
                  {Number(course.average_grade).toFixed(2)}
                </td>
                <td className="p-4 text-center">
                  <span className={`font-bold ${course.failed_students > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {course.failed_students}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}