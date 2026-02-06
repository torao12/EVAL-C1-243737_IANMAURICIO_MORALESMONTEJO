#  Sistema de Gestión de Reportes Académicos (Examen Práctico)

Este proyecto implementa una solución full-stack para la administración escolar, centrada en la generación de indicadores de desempeño mediante procesamiento en base de datos. La arquitectura separa la persistencia de datos y la lógica de visualización mediante contenedores Docker.

## Descripción de la Práctica
El sistema gestiona el ciclo de vida académico: alumnos, docentes, materias, inscripciones, calificaciones y asistencia. El objetivo técnico es demostrar la capacidad de automatizar infraestructuras complejas y optimizar consultas mediante vistas SQL estratégicas.

##  Arquitectura del Proyecto
El despliegue se orquesta mediante **Docker Compose**, definiendo dos servicios en una red privada virtual (`cafeteria_net`):

- **Base de Datos (PostgreSQL 15-alpine):** Motor relacional con inicialización secuencial automática (Esquema -> Datos -> Roles -> Vistas -> Índices).
- **Aplicación Web (Next.js 16 + Node 20):** Frontend moderno con renderizado del lado del servidor (SSR) para reportes en tiempo real.

---

---

## Vistas Técnicas (Indicadores Académicos)
Se implementaron 5 vistas especializadas que procesan datos masivos para la toma de decisiones:

1. **vw_course_performance:** Estadísticas de aprobación y promedio por curso y periodo.
2. **vw_teacher_load:** Análisis de la carga de trabajo docente (grupos y alumnos totales).
3. **vw_students_at_risk:** Reporte crítico de alumnos con promedio < 7 o inasistencias superiores a 3.
4. **vw_attendance_by_group:** Cálculo porcentual de asistencia promedio por grupo escolar.
5. **vw_rank_students:** Clasificación académica utilizando funciones de ventana (`RANK() OVER`).

## Seguridad y Control de Acceso
Se implementó un modelo de privilegios mínimos:
- El usuario `app_user` es el propietario de las vistas y posee permisos exclusivos de lectura.
- Se configuró el acceso restringido al esquema público mediante roles específicos, evitando que la aplicación web use la cuenta de superusuario (`postgres`).

## Manual de Identidad Visual
El dashboard utiliza una paleta de colores institucional para facilitar la lectura de datos:
- **Navy (#2F4156):** Títulos, encabezados de tabla y elementos de navegación.
- **Teal (#567C8D):** Botones de acción y llamadas a la atención.
- **Beige (#F5EFEB):** Color de fondo para reducir la fatiga visual.
- **Sky Blue (#C8D9E6):** Bordes, separadores y hover de filas.

---

---

## Guía de Instalación Rápida

### 1. Variables de Entorno
Cree un archivo `.env` en la raíz del proyecto (use `.env.example` como referencia):
```env
POSTGRES_DB=cafeteria_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password_maestro_123
DATABASE_URL=postgresql://app_user:app_password_456@db:5432/cafeteria_db