import { Presupuesto } from '../types';
import { X, Download } from 'lucide-react';
import { generarPDF } from '../utils/pdfGenerator';

interface Props {
  presupuesto: Presupuesto;
  onClose: () => void;
}

export function VistaPrevia({ presupuesto, onClose }: Props) {
  const calcularSubtotal = () => {
    return presupuesto.conceptos.reduce((total, concepto) => {
      return total + concepto.cantidad * concepto.precioUnitario;
    }, 0);
  };

  const subtotal = calcularSubtotal();
  const igic = subtotal * 0.07;
  const total = subtotal + igic;

  const handleDescargar = async () => {
    await generarPDF(presupuesto);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header del modal */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-2xl font-semibold text-gray-900">Vista previa</h2>
          <div className="flex gap-3 items-center">
            <button
              onClick={handleDescargar}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm font-medium"
            >
              <Download size={18} />
              Descargar
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Contenido del presupuesto */}
        <div className="p-8 bg-white" id="presupuesto-preview">
          {/* Encabezado */}
          <div className="border-b border-gray-300 pb-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">PRESUPUESTO</h1>
            <p className="text-gray-600">Nº {presupuesto.numeroPresupuesto}</p>
            <p className="text-gray-600">{presupuesto.fecha}</p>
          </div>

          {/* Datos del emisor y cliente */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">EMISOR</h3>
              <p className="font-semibold text-gray-900">{presupuesto.misDatos.nombre}</p>
              <p className="text-sm text-gray-600">NIF: {presupuesto.misDatos.nif}</p>
              <p className="text-sm text-gray-600">{presupuesto.misDatos.direccion}</p>
              <p className="text-sm text-gray-600">{presupuesto.misDatos.telefono}</p>
              <p className="text-sm text-gray-600">{presupuesto.misDatos.email}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">CLIENTE</h3>
              <p className="font-semibold text-gray-900">{presupuesto.datosCliente.nombre}</p>
              {presupuesto.datosCliente.empresa && (
                <p className="text-sm text-gray-600">{presupuesto.datosCliente.empresa}</p>
              )}
              <p className="text-sm text-gray-600">NIF: {presupuesto.datosCliente.nif}</p>
              <p className="text-sm text-gray-600">{presupuesto.datosCliente.email}</p>
            </div>
          </div>

          {/* Tabla de conceptos */}
          <div className="mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-t-2 border-b border-gray-300">
                  <th className="text-left py-3 font-semibold text-gray-900">
                    Descripción
                  </th>
                  <th className="text-center py-3 font-semibold text-gray-900 w-20">
                    Cantidad
                  </th>
                  <th className="text-right py-3 font-semibold text-gray-900 w-24">
                    Precio unit.
                  </th>
                  <th className="text-right py-3 font-semibold text-gray-900 w-24">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {presupuesto.conceptos.map((concepto) => (
                  <tr key={concepto.id} className="border-b border-gray-200">
                    <td className="py-3 text-gray-900">{concepto.descripcion}</td>
                    <td className="text-center py-3 text-gray-900">
                      {concepto.cantidad}
                    </td>
                    <td className="text-right py-3 text-gray-900">
                      {concepto.precioUnitario.toFixed(2)} €
                    </td>
                    <td className="text-right py-3 text-gray-900 font-medium">
                      {(concepto.cantidad * concepto.precioUnitario).toFixed(2)} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Resumen */}
          <div className="flex justify-end mb-8">
            <div className="w-64">
              <div className="flex justify-between py-2 border-b border-gray-300">
                <span className="text-gray-700">Subtotal</span>
                <span className="text-gray-900 font-medium">
                  {subtotal.toFixed(2)} €
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300">
                <span className="text-gray-700">IGIC (7%)</span>
                <span className="text-gray-900 font-medium">{igic.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between py-3 bg-gray-100 px-3 -mx-3 rounded font-semibold">
                <span className="text-gray-900">TOTAL</span>
                <span className="text-gray-900">{total.toFixed(2)} €</span>
              </div>
            </div>
          </div>

          {/* Pie */}
          <div className="text-center text-xs text-gray-500 pt-6 border-t border-gray-200">
            <p>Este presupuesto es válido hasta 30 días desde su emisión.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
