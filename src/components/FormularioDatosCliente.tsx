import { DatosCliente } from '../types';

interface Props {
  datos: DatosCliente;
  onChange: (datos: DatosCliente) => void;
}

export function FormularioDatosCliente({ datos, onChange }: Props) {
  const handleChange = (campo: keyof DatosCliente, valor: string) => {
    onChange({ ...datos, [campo]: valor });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Datos del cliente</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del cliente
          </label>
          <input
            type="text"
            value={datos.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Empresa
          </label>
          <input
            type="text"
            value={datos.empresa}
            onChange={(e) => handleChange('empresa', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Empresa o negocio"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            NIF
          </label>
          <input
            type="text"
            value={datos.nif}
            onChange={(e) => handleChange('nif', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="12345678X"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={datos.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="cliente@email.com"
          />
        </div>
      </div>
    </div>
  );
}
