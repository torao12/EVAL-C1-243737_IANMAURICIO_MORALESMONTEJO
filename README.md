# Sistema de Gestión de Reportes Académicos

Este proyecto implementa una solución para el control de indicadores escolares utilizando Next.js y PostgreSQL, orquestado con Docker. El sistema permite la visualización de datos académicos mediante vistas SQL automatizadas.

## Guía de Instalación

### 1. Clonar el repositorio
Para obtener una copia local del proyecto, ejecute el siguiente comando en su terminal:

```bash
git clone [https://github.com/tu-usuario/tu-proyecto.git](https://github.com/tu-usuario/tu-proyecto.git)
cd tu-proyecto

### Pasos de Configuración y Despliegue 

Una vez clonado el proyecto, sigue estos pasos para configurar el entorno y levantarlo:

**Paso 2: Configuración del archivo de entorno**
El archivo `.env` real no se incluye en el repositorio por seguridad. Debes crearlo manualmente:
1. Localiza el archivo `.env.example` en la raíz del proyecto.
2. Crea una copia de este archivo y renómbrala exactamente como `.env`.
3. Comando sugerido: `cp .env.example .env`.
4. Abre el archivo `.env` y verifica que las credenciales (`POSTGRES_PASSWORD`, `DATABASE_URL`, etc.) coincidan con lo que requiere tu configuración local.

**Paso 3: Despliegue de la infraestructura**
Con el archivo `.env` configurado, construye e inicia los contenedores. Este comando inicializará automáticamente la base de datos con los scripts SQL (esquema, datos, roles y vistas):
```bash
docker compose down -v && docker compose up --build