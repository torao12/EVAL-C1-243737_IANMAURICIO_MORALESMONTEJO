import Link from 'next/link';

export default function Dashboard() {
  const reports = [
    { id: 'course-performance', name: 'Desempeño de Cursos', desc: 'Promedios y reprobados por periodo.' },
    { id: 'teacher-load', name: 'Carga Docente', desc: 'Grupos y alumnos por profesor.' },
    { id: 'students-at-risk', name: 'Alumnos en Riesgo', desc: 'Filtro por bajo promedio o inasistencia.' },
    { id: 'attendance', name: 'Asistencia por Grupo', desc: 'Métricas de puntualidad grupal.' },
    { id: 'ranking', name: 'Ranking de Alumnos', desc: 'Mejores estudiantes por carrera.' },
  ];

  return (
    <main className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-900">Dashboard de Analítica</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Link key={report.id} href={`/reports/${report.id}`} 
                className="block p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-200">
            <h2 className="text-xl font-bold mb-2 text-gray-800">{report.name}</h2>
            <p className="text-gray-600">{report.desc}</p>
            <span className="mt-4 inline-block text-blue-600 font-medium">Ver Reporte →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}