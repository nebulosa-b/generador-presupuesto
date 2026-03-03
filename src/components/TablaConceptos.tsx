import { Concepto } from '../types';
import { Plus, X } from 'lucide-react';

interface Props {
  conceptos: Concepto[];
  onChange: (conceptos: Concepto[]) => void;
}

export function TablaConceptos({ conceptos, onChange }: Props) {
  const agregarFila = () => {
    const nuevoConcepto: Concepto = {
      id: Date.now().toString(),
      descripcion: '',
      cantidad: 1,
      precioUnitario: 0,
    };
    onChange([...conceptos, nuevoConcepto]);
  };

  const eliminarFila = (id: string) => {
    onChange(conceptos.filter((c) => c.id !== id));
  };

  const actualizar = (id: string, campo: keyof Concepto, valor: any) => {
    onChange(
      conceptos.map((c) =>
        c.id === id ? { ...c, [campo]: valor } : c
      )
    );
  };

  const calcularTotal = (concepto: Concepto) => {
    return concepto.cantidad * concepto.precioUnitario;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Conceptos</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Descripción
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700 w-24">
                Cantidad
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700 w-32">
                Precio unitario
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700 w-32">
                Total
              </th>
              <th className="text-center py-3 px-4 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {conceptos.map((concepto) => (
              <tr key={concepto.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <input
                    type="text"
                    value={concepto.descripcion}
                    onChange={(e) =>
                      actualizar(concepto.id, 'descripcion', e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Descripción del servicio/producto"
                  />
                </td>
                <td className="py-3 px-4">
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={concepto.cantidad}
                    onChange={(e) =>
                      actualizar(concepto.id, 'cantidad', parseFloat(e.target.value) || 0)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="py-3 px-4">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={concepto.precioUnitario}
                    onChange={(e) =>
                      actualizar(concepto.id, 'precioUnitario', parseFloat(e.target.value) || 0)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="py-3 px-4 text-right font-medium text-gray-900">
                  {calcularTotal(concepto).toFixed(2)} €
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => eliminarFila(concepto.id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Eliminar fila"
                  >
                    <X size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={agregarFila}
        className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        <Plus size={18} />
        Añadir concepto
      </button>
    </div>
  );
}
