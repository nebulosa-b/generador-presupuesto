import { useState } from 'react';
import { FormularioMisDatos } from './components/FormularioMisDatos';
import { FormularioDatosCliente } from './components/FormularioDatosCliente';
import { TablaConceptos } from './components/TablaConceptos';
import { ResumenCalculos } from './components/ResumenCalculos';
import { VistaPrevia } from './components/VistaPrevia';
import { generarPDF } from './utils/pdfGenerator';
import { validarPresupuesto } from './utils/validaciones';
import { MisDatos, DatosCliente, Concepto, Presupuesto } from './types';
import { Eye, Download, AlertCircle } from 'lucide-react';

function App() {
  // Estado para los datos del usuario
  const [misDatos, setMisDatos] = useState<MisDatos>({
    nombre: '',
    nif: '',
    direccion: '',
    telefono: '',
    email: '',
  });

  // Estado para los datos del cliente
  const [datosCliente, setDatosCliente] = useState<DatosCliente>({
    nombre: '',
    empresa: '',
    nif: '',
    email: '',
  });

  // Estado para los conceptos/líneas
  const [conceptos, setConceptos] = useState<Concepto[]>([]);

  // Estado para los datos del presupuesto
  const [numeroPresupuesto, setNumeroPresupuesto] = useState('');
  const [fecha, setFecha] = useState(
    new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  );

  // Estado para mostrar/ocultar vista previa
  const [mostrarPrevia, setMostrarPrevia] = useState(false);

  // Estado para mostrar errores de validación
  const [error, setError] = useState<string | null>(null);

  // Construir objeto presupuesto completo
  const presupuestoActual: Presupuesto = {
    numeroPresupuesto,
    fecha,
    misDatos,
    datosCliente,
    conceptos,
  };

  // Función para generar y descargar PDF
  const handleDescargarPDF = async () => {
    setError(null);

    const errorValidacion = validarPresupuesto(
      numeroPresupuesto,
      misDatos,
      datosCliente,
      conceptos
    );

    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }

    try {
      await generarPDF(presupuestoActual);
      setError(null);
    } catch (err) {
      console.error('Error al generar PDF:', err);
      setError('Error al generar el PDF. Intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Encabezado */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Generador de Presupuestos</h1>
          <p className="text-gray-600 mt-1">Crea presupuestos profesionales en minutos</p>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mensaje de error */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
            <p className="text-red-800">{error}</p>
          </div>
        )}
        {/* Sección de número y fecha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de presupuesto
            </label>
            <input
              type="text"
              value={numeroPresupuesto}
              onChange={(e) => setNumeroPresupuesto(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: PRES-2024-001"
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha
            </label>
            <input
              type="text"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="DD/MM/YYYY"
            />
          </div>
        </div>

        {/* Formularios de datos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <FormularioMisDatos datos={misDatos} onChange={setMisDatos} />
          <FormularioDatosCliente datos={datosCliente} onChange={setDatosCliente} />
        </div>

        {/* Tabla de conceptos */}
        <div className="mb-8">
          <TablaConceptos conceptos={conceptos} onChange={setConceptos} />
        </div>

        {/* Resumen de cálculos */}
        <div className="mb-8">
          <ResumenCalculos conceptos={conceptos} />
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4 justify-end">
          <button
            onClick={() => setMostrarPrevia(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 transition font-medium"
          >
            <Eye size={20} />
            Vista previa
          </button>
          <button
            onClick={handleDescargarPDF}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition font-medium"
          >
            <Download size={20} />
            Descargar PDF
          </button>
        </div>
      </main>

      {/* Modal de vista previa */}
      {mostrarPrevia && (
        <VistaPrevia
          presupuesto={presupuestoActual}
          onClose={() => setMostrarPrevia(false)}
        />
      )}
    </div>
  );
}

export default App;
