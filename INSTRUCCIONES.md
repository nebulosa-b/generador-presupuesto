# Generador de Presupuestos para Autónomos

Aplicación web para crear presupuestos profesionales de forma rápida y sencilla, sin necesidad de backend.

## Características

- **Mis datos**: Guarda tu información (nombre/empresa, NIF, dirección, teléfono, email)
- **Datos del cliente**: Información del cliente que recibirá el presupuesto
- **Tabla de conceptos**: Añade servicios/productos con cantidad y precio
- **Cálculos automáticos**: Subtotal, IGIC (7%) y total final se calculan automáticamente
- **Vista previa**: Visualiza el presupuesto antes de descargarlo
- **Exportar a PDF**: Descarga el presupuesto como archivo PDF profesional

## Cómo usar

### 1. Rellena tus datos
En la sección "Mis datos", completa:
- Tu nombre o nombre de la empresa
- Tu NIF
- Tu dirección completa
- Teléfono de contacto
- Email

### 2. Datos del cliente
Introduce la información del cliente:
- Nombre del cliente
- Empresa (opcional)
- NIF del cliente
- Email del cliente

### 3. Número de presupuesto y fecha
- **Número**: Asigna un número único (ej: PRES-2024-001)
- **Fecha**: Se rellena automáticamente con la fecha de hoy, pero puedes modificarla

### 4. Añade conceptos
En la tabla de conceptos:
1. Haz clic en "Añadir concepto"
2. Describe el servicio/producto
3. Indica la cantidad
4. Introduce el precio unitario
5. El total se calcula automáticamente

Puedes añadir tantos conceptos como necesites.

### 5. Revisa el cálculo
La sección de resumen muestra:
- Subtotal de todos los conceptos
- IGIC (7%)
- Total final

### 6. Vista previa
Haz clic en "Vista previa" para ver cómo quedará el PDF antes de descargarlo.

### 7. Descargar PDF
Haz clic en "Descargar PDF" para generar y descargar el archivo.

## Validaciones

La aplicación verificará que:
- Hay un número de presupuesto
- Tus datos estén completos (nombre, NIF, email)
- Los datos del cliente estén completos (nombre, NIF)
- Hay al menos un concepto
- Todos los conceptos tienen descripción, cantidad y precio válidos

## Notas

- Todo funciona en el navegador, sin enviar datos a servidores externos
- Los presupuestos se pueden descargar en cualquier momento
- No se guarda historial, cada sesión es independiente
- El IGIC aplicado es del 7% (impuesto que aplica en Canarias)

## Tecnologías usadas

- React + TypeScript
- Tailwind CSS para estilos
- jsPDF + html2canvas para generar PDFs
