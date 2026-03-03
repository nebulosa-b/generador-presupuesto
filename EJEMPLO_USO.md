# Ejemplo de Uso del Generador de Presupuestos

## Escenario: Freelancer de Diseño Gráfico

A continuación, te mostramos un ejemplo paso a paso de cómo usar la aplicación.

### Paso 1: Rellenar "Mis datos"

**Datos del freelancer:**
- Nombre/Empresa: `Juan García Diseño Gráfico`
- NIF: `12345678A`
- Dirección: `Calle Principal 15, 28001 Madrid`
- Teléfono: `+34 600 123 456`
- Email: `info@juangarcia.com`

### Paso 2: Datos del cliente

**Información del cliente:**
- Nombre del cliente: `María López`
- Empresa: `Tienda Online Shop`
- NIF: `87654321B`
- Email: `maria@tiendaonline.com`

### Paso 3: Número de presupuesto y fecha

- **Número:** `PRES-2024-001`
- **Fecha:** `03/03/2024` (se rellena automáticamente)

### Paso 4: Añadir conceptos

Se añaden los siguientes servicios:

#### Concepto 1
- Descripción: `Diseño de logotipo y manual de marca`
- Cantidad: `1`
- Precio unitario: `500.00 €`
- **Total:** `500.00 €`

#### Concepto 2
- Descripción: `Diseño de tarjetas de visita (500 unidades)`
- Cantidad: `500`
- Precio unitario: `0.15 €`
- **Total:** `75.00 €`

#### Concepto 3
- Descripción: `Banner web y maqueta responsive`
- Cantidad: `1`
- Precio unitario: `300.00 €`
- **Total:** `300.00 €`

### Paso 5: Resumen automático

La aplicación calcula automáticamente:

```
Subtotal:    875.00 €
IGIC (7%):    61.25 €
─────────────────────
TOTAL:       936.25 €
```

### Paso 6: Vista previa

El usuario hace clic en "Vista previa" y ve:

```
╔═══════════════════════════════════════════════════════════════╗
║                      PRESUPUESTO                              ║
║                  Nº PRES-2024-001                             ║
║                  03/03/2024                                   ║
║───────────────────────────────────────────────────────────────║
║                                                               ║
║ EMISOR                          CLIENTE                       ║
║ Juan García Diseño Gráfico      María López                   ║
║ NIF: 12345678A                  Tienda Online Shop            ║
║ Calle Principal 15, 28001       NIF: 87654321B                ║
║ +34 600 123 456                 maria@tiendaonline.com        ║
║ info@juangarcia.com                                           ║
║                                                               ║
║───────────────────────────────────────────────────────────────║
║ DESCRIPCIÓN              CANT.  P. UNIT.   TOTAL              ║
║───────────────────────────────────────────────────────────────║
║ Diseño de logotipo...    1      500.00€    500.00€           ║
║ Diseño de tarjetas...    500    0.15€      75.00€            ║
║ Banner web y maqueta...  1      300.00€    300.00€           ║
║───────────────────────────────────────────────────────────────║
║                         Subtotal:         875.00€             ║
║                         IGIC (7%):         61.25€             ║
║                         TOTAL:            936.25€             ║
║───────────────────────────────────────────────────────────────║
║ Este presupuesto es válido hasta 30 días desde su emisión.    ║
╚═══════════════════════════════════════════════════════════════╝
```

### Paso 7: Descargar PDF

El usuario puede:
1. Hacer clic en "Descargar" desde la vista previa, o
2. Cerrar la vista previa y hacer clic en "Descargar PDF" en la página principal

El archivo se descarga como: `presupuesto-PRES-2024-001.pdf`

## Caso de uso: Modificar el presupuesto

Si el cliente pide cambios, el usuario puede:

1. **Modificar un concepto**: Cambiar descripción, cantidad o precio
   - La tabla se actualiza automáticamente
   - El total se recalcula al instante

2. **Eliminar un concepto**: Hacer clic en el botón X de la fila
   - El presupuesto se recalcula

3. **Añadir nuevos conceptos**: Clic en "Añadir concepto"

4. **Generar nuevo PDF**: Solo necesita clicar de nuevo en "Descargar PDF"

## Validaciones que ejecuta la aplicación

Si el usuario intenta descargar sin completar los datos necesarios, verá mensajes como:

- ❌ "Por favor, ingresa un número de presupuesto"
- ❌ "Por favor, completa tu nombre/empresa en 'Mis datos'"
- ❌ "Por favor, añade al menos un concepto"
- ❌ "Todos los conceptos deben tener descripción, cantidad y precio válidos"

## Ventajas de usar este generador

✅ Presupuestos profesionales en minutos
✅ Cálculos automáticos (sin errores)
✅ Funciona completamente offline (sin conexión a internet después de cargar)
✅ Sin necesidad de backend ni base de datos
✅ PDF profesional listo para enviar
✅ Interfaz limpia e intuitiva
✅ Diseño responsive para móvil y desktop
