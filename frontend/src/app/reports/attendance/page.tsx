export default async function AttendancePage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/reports/attendance`, { 
    cache: 'no-store' 
  });
  const data = await response.json();

  return (
    <div className="p-8 bg-[#F5EFEB] min-h-screen">
      <h1 className="text-2xl font-bold text-[#2F4156] mb-6">Reporte de Asistencia por Grupo</h1>
      <div className="overflow-hidden rounded-lg border border-[#2F4156] shadow-md">
        <table className="w-full bg-white text-left">
          <thead className="bg-[#567C8D] text-white">
            <tr>
              <th className="p-4">ID Grupo</th>
              <th className="p-4">Curso</th>
              <th className="p-4 text-center">Tasa de Asistencia</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => (
              <tr key={item.group_id} className="border-t border-[#C8D9E6] hover:bg-[#F5EFEB]">
                <td className="p-4 text-[#2F4156]">#{item.group_id}</td>
                <td className="p-4 font-medium">{item.course_name}</td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-[100px]">
                      <div 
                        className="bg-[#2F4156] h-2.5 rounded-full" 
                        style={{ width: `${item.attendance_rate}%` }}
                      ></div>
                    </div>
                    <span className="font-bold">{Number(item.attendance_rate).toFixed(1)}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}