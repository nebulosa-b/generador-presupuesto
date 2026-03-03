# Arquitectura del Generador de Presupuestos

## Estructura de carpetas

```
src/
├── components/              # Componentes React reutilizables
│   ├── FormularioMisDatos.tsx
│   ├── FormularioDatosCliente.tsx
│   ├── TablaConceptos.tsx
│   ├── ResumenCalculos.tsx
│   └── VistaPrevia.tsx
├── utils/                   # Funciones utilitarias
│   ├── pdfGenerator.ts      # Generación de PDFs
│   └── validaciones.ts      # Validaciones de datos
├── types.ts                 # Definiciones TypeScript
├── App.tsx                  # Componente principal
├── main.tsx                 # Punto de entrada
├── index.css                # Estilos globales
└── vite-env.d.ts           # Declaraciones de tipos Vite
```

## Flujo de datos

```
App.tsx (Estado Principal)
│
├── useState(misDatos)
├── useState(datosCliente)
├── useState(conceptos)
├── useState(numeroPresupuesto)
├── useState(fecha)
├── useState(mostrarPrevia)
└── useState(error)
│
├─> FormularioMisDatos
│   ├─ Recibe: datos, onChange
│   └─ Emite: cambios en datos
│
├─> FormularioDatosCliente
│   ├─ Recibe: datos, onChange
│   └─ Emite: cambios en datos
│
├─> TablaConceptos
│   ├─ Recibe: conceptos[], onChange
│   ├─ Permite: agregar/eliminar conceptos
│   └─ Emite: conceptos actualizados
│
├─> ResumenCalculos
│   ├─ Recibe: conceptos[]
│   ├─ Calcula: subtotal, IGIC, total
│   └─ Muestra: resultado
│
└─> VistaPrevia (Modal)
    ├─ Recibe: presupuesto completo
    ├─ Muestra: vista previa del PDF
    └─ Permite: descargar desde modal
```

## Componentes

### 1. **FormularioMisDatos.tsx**
- Formulario con campos para datos del usuario
- Campos: nombre/empresa, NIF, dirección, teléfono, email
- Actualización reactiva al cambiar valores

### 2. **FormularioDatosCliente.tsx**
- Formulario con campos para datos del cliente
- Campos: nombre, empresa, NIF, email
- Actualización reactiva al cambiar valores

### 3. **TablaConceptos.tsx**
- Tabla editable con conceptos/líneas
- Funcionalidades:
  - Agregar nuevas filas
  - Editar descripción, cantidad y precio
  - Eliminar filas con botón X
  - Cálculo automático del total por fila

### 4. **ResumenCalculos.tsx**
- Muestra cálculos finales
- Calcula:
  - Subtotal (suma de todos los totales)
  - IGIC 7% (impuesto)
  - Total final

### 5. **VistaPrevia.tsx**
- Modal con vista previa del presupuesto
- Muestra el documento con formato profesional
- Incluye botón para descargar directamente
- Contiene toda la información del presupuesto

## Tipos de datos (types.ts)

```typescript
interface MisDatos {
  nombre: string;
  nif: string;
  direccion: string;
  telefono: string;
  email: string;
}

interface DatosCliente {
  nombre: string;
  empresa: string;
  nif: string;
  email: string;
}

interface Concepto {
  id: string;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
}

interface Presupuesto {
  numeroPresupuesto: string;
  fecha: string;
  misDatos: MisDatos;
  datosCliente: DatosCliente;
  conceptos: Concepto[];
}
```

## Utilidades (utils/)

### pdfGenerator.ts
- Función `generarPDF(presupuesto)`
- Usa html2canvas para convertir HTML a imagen
- Usa jsPDF para crear el documento PDF
- Genera HTML con estilos inline
- Descarga automáticamente el archivo

### validaciones.ts
- Función `validarPresupuesto(...)`
- Verifica campos obligatorios
- Valida que los datos sean consistentes
- Retorna mensaje de error o null

## Librerías utilizadas

- **React 18.3**: Framework principal
- **TypeScript 5.5**: Tipado estático
- **Tailwind CSS 3.4**: Estilos
- **Lucide React 0.344**: Iconos
- **jsPDF 2.x**: Generación de PDFs
- **html2canvas 1.x**: Conversión HTML a imagen

## Ciclo de vida

1. **Inicialización**: App.tsx carga con estados vacíos
2. **Entrada de datos**: Usuario rellena formularios
3. **Reactividad**: Los componentes se actualizan al instante
4. **Cálculos**: ResumenCalculos se recalcula automáticamente
5. **Vista previa**: VistaPrevia muestra el documento formateado
6. **Generación PDF**: Se convierte a imagen y se crea el PDF
7. **Descarga**: El navegador descarga el archivo automáticamente

## Rendimiento

- ✅ Sin renderizaciones innecesarias (React.memo no es necesario para este caso)
- ✅ Estados bien separados
- ✅ Funciones de cálculo son eficientes
- ✅ PDF se genera en el navegador (sin servidor)
- ✅ Todo funciona offline después de cargar

## Seguridad

- ✅ No hay envío de datos a servidores
- ✅ PDF se genera completamente en el navegador
- ✅ Sin dependencias de terceros para datos sensibles
- ✅ Validación de entrada en el cliente

## Próximas mejoras posibles

- Guardar presupuestos en localStorage
- Plantillas de presupuestos
- Historial de presupuestos
- Edición avanzada de PDF
- Múltiples monedas/impuestos
- Importar/exportar datos
