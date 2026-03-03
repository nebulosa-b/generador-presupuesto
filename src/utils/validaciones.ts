import { MisDatos, DatosCliente, Concepto } from '../types';

export function validarPresupuesto(
  numeroPresupuesto: string,
  misDatos: MisDatos,
  datosCliente: DatosCliente,
  conceptos: Concepto[]
): string | null {
  if (!numeroPresupuesto.trim()) {
    return 'Por favor, ingresa un número de presupuesto';
  }

  if (!misDatos.nombre.trim()) {
    return 'Por favor, completa tu nombre/empresa en "Mis datos"';
  }

  if (!misDatos.nif.trim()) {
    return 'Por favor, ingresa tu NIF en "Mis datos"';
  }

  if (!misDatos.email.trim()) {
    return 'Por favor, ingresa tu email en "Mis datos"';
  }

  if (!datosCliente.nombre.trim()) {
    return 'Por favor, completa el nombre del cliente';
  }

  if (!datosCliente.nif.trim()) {
    return 'Por favor, ingresa el NIF del cliente';
  }

  if (conceptos.length === 0) {
    return 'Por favor, añade al menos un concepto';
  }

  // Validar que todos los conceptos tengan descripción y precio
  const conceptoInvalido = conceptos.find(
    (c) => !c.descripcion.trim() || c.precioUnitario <= 0 || c.cantidad <= 0
  );

  if (conceptoInvalido) {
    return 'Todos los conceptos deben tener descripción, cantidad y precio válidos';
  }

  return null;
}
