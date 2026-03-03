import { Concepto } from '../types';

interface Props {
  conceptos: Concepto[];
}

export function ResumenCalculos({ conceptos }: Props) {
  const calcularSubtotal = () => {
    return conceptos.reduce((total, concepto) => {
      return total + concepto.cantidad * concepto.precioUnitario;
    }, 0);
  };

  const subtotal = calcularSubtotal();
  const igic = subtotal * 0.07;
  const total = subtotal + igic;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-end max-w-sm ml-auto">
        <div className="w-full">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900 font-medium">{subtotal.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">IGIC (7%)</span>
            <span className="text-gray-900 font-medium">{igic.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between py-3 bg-gray-50 px-3 -mx-3 rounded">
            <span className="text-gray-900 font-semibold text-lg">Total</span>
            <span className="text-gray-900 font-bold text-lg">{total.toFixed(2)} €</span>
          </div>
        </div>
      </div>
    </div>
  );
}
