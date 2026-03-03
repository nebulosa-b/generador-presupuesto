import { MisDatos } from '../types';

interface Props {
  datos: MisDatos;
  onChange: (datos: MisDatos) => void;
}

export function FormularioMisDatos({ datos, onChange }: Props) {
  const handleChange = (campo: keyof MisDatos, valor: string) => {
    onChange({ ...datos, [campo]: valor });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Mis datos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre/Empresa
          </label>
          <input
            type="text"
            value={datos.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tu nombre o empresa"
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

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dirección
          </label>
          <input
            type="text"
            value={datos.direccion}
            onChange={(e) => handleChange('direccion', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Calle, número, código postal, ciudad"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            type="tel"
            value={datos.telefono}
            onChange={(e) => handleChange('telefono', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+34 600 123 456"
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
            placeholder="tu@email.com"
          />
        </div>
      </div>
    </div>
  );
}
