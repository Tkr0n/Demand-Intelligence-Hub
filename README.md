# Demand Intelligence Hub (DIH)

## Introducción

El **Demand Intelligence Hub (DIH)** es un monorepo que contiene múltiples stacks tecnológicos diseñados para la optimización de redes publicitarias y análisis de demanda. El proyecto sigue los principios de **Arquitectura Limpia** con clara separación de responsabilidades.

### Objetivo del Proyecto

Optimizar la distribución de inventario publicitario entre múltiples redes publicitarias para maximizar los ingresos a través de:
- Análisis inteligente de demanda
- Simulación de rendimiento de redes
- Reglas de negocio configurables
- Métricas y análisis en tiempo real

## Stack Tecnológico

- **.NET** - APIs y servicios backend
- **Python** - Procesos ETL y procesamiento de datos (en capa de Infraestructura)
- **React/Next.js 14** - Capa de presentación frontend
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos y diseño
- **pnpm** - Gestor de paquetes
- **BigQuery** - Almacenamiento de datos en GCP
- **Google Cloud Platform** - Infraestructura en la nube

## Arquitectura del Proyecto

```
DIH/
├── DIH.Api/          # APIs Web .NET
├── DIH.Application/  # Servicios de aplicación y casos de uso (.NET)
├── DIH.Domain/       # Modelos de dominio y lógica de negocio (.NET)
├── DIH.Infrastructure/ # Acceso a datos, servicios externos, ETL (.NET/Python)
├── DIH.Presentation/ # Aplicación frontend React (Next.js)
└── docs/             # Documentación
```

**Nota**: Los procesos ETL estarán ubicados dentro de la capa de Infraestructura, siguiendo los principios de Arquitectura Limpia.

**Estado Actual**: Solo está implementada la capa de Presentación (React). Las demás capas se agregarán progresivamente.

## Comenzando

### Prerrequisitos

- **Node.js** 18+ 
- **pnpm** (gestor de paquetes preferido)
- **Git**

### Instalación y Ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone <repository-url>
   cd DIH
   ```

2. **Navegar a la capa de presentación:**
   ```bash
   cd DIH.Presentation
   ```

3. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

4. **Ejecutar en modo desarrollo:**
   ```bash
   pnpm dev
   ```

5. **Abrir en el navegador:**
   ```
   http://localhost:3000
   ```

### Comandos Disponibles

#### Capa de Presentación (React/Next.js)

```bash
# Servidor de desarrollo
pnpm dev

# Construir para producción
pnpm build

# Ejecutar servidor de producción
pnpm start

# Ejecutar linting
pnpm lint
```

#### Comandos Futuros (Cuando se agreguen otras capas)

```bash
# Capa API .NET (futuro)
cd DIH.Api
dotnet run
dotnet build
dotnet test

# Capa ETL Python (futuro) - Ubicada en Infrastructure
cd DIH.Infrastructure/ETL
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
python main.py
```

## Construcción y Pruebas

### Estado Actual

Actualmente no hay comandos de prueba configurados. Cuando se agreguen las pruebas:

**Frontend (React):**
```bash
# Pruebas unitarias
pnpm test

# Pruebas E2E
pnpm test:e2e

# Prueba específica
pnpm test -- ComponentName.test.tsx
```

**Backend (.NET)** (futuro):
```bash
# Pruebas unitarias
dotnet test

# Pruebas de integración
dotnet test --filter Category=Integration
```

**ETL (Python)** (futuro):
```bash
# Pruebas unitarias
pytest

# Pruebas de integración
pytest tests/integration/
```

### Comandos de Despliegue GCP (Futuro)

```bash
# Desplegar servicios en Cloud Run
gcloud run deploy dih-api --source DIH.Api
gcloud run deploy dih-presentation --source DIH.Presentation

# Construir con Cloud Build
gcloud builds submit --config cloudbuild.yaml

# Desplegar trabajos ETL a Cloud Functions/Cloud Run
gcloud functions deploy dih-etl-ironsource --runtime python39
gcloud functions deploy dih-etl-admob --runtime python39
gcloud functions deploy dih-etl-applovin --runtime python39
```

## Contribuir

### Estructura de Ramas

- `main` - Rama principal (producción)
- `develop` - Rama de desarrollo
- `feature/*` - Nuevas características
- `bugfix/*` - Corrección de errores
- `hotfix/*` - Correcciones urgentes

### Proceso de Contribución

1. Crear una rama desde `develop`
2. Realizar los cambios
3. Ejecutar pruebas y linting
4. Crear Pull Request hacia `develop`
5. Revisión de código
6. Merge después de aprobación

### Estándares de Código

- Seguir las convenciones de TypeScript/React
- Usar componentes funcionales con hooks
- Implementar manejo de errores apropiado
- Escribir código auto-documentado
- Seguir principios de Arquitectura Limpia

## Arquitectura y Patrones

### Conceptos del Dominio

- **Redes Publicitarias** (`AdNetwork`): Enfoque en IronSource, AdMob y AppLovin
- **Formatos de Anuncios** (`AdFormat`): Tipos de anuncios (banners, intersticiales, video premiado, nativo)
- **Geografías** (`Geography`): Segmentación regional
- **Reglas de Demanda** (`DemandRule`): Lógica de negocio para selección de redes
- **Motor de Simulación**: Herramientas para predicción de rendimiento
- **Recolección de Métricas**: Obtención diaria de eCPM, FillRate, Revenue, CTR e Impressions
- **Almacenamiento de Datos**: BigQuery en GCP para todas las métricas y datos de análisis

### Flujo de Datos Actual

1. **Hooks Personalizados** (`hooks/use-*.ts`) usan React Query para obtención de datos
2. **Capa de Servicios** (`services/*-api.ts`) maneja llamadas API (actualmente mock)
3. **Componentes** consumen datos a través de hooks personalizados
4. **Tipos** (`types/*.ts`) definen contratos de datos

## Documentación Adicional

- [Guía de Arquitectura Limpia](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Next.js 14 Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)
