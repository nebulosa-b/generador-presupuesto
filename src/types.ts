// Interfaz para los datos del usuario/empresa
export interface MisDatos {
  nombre: string;
  nif: string;
  direccion: string;
  telefono: string;
  email: string;
}

// Interfaz para los datos del cliente
export interface DatosCliente {
  nombre: string;
  empresa: string;
  nif: string;
  email: string;
}

// Interfaz para cada concepto/línea del presupuesto
export interface Concepto {
  id: string;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
}

// Interfaz para el presupuesto completo
export interface Presupuesto {
  numeroPresupuesto: string;
  fecha: string;
  misDatos: MisDatos;
  datosCliente: DatosCliente;
  conceptos: Concepto[];
}
