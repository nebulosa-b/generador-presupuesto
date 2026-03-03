import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Presupuesto } from '../types';

export async function generarPDF(presupuesto: Presupuesto) {
  // Crear un elemento temporal con el contenido
  const element = document.createElement('div');
  element.innerHTML = generarHTML(presupuesto);
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  element.style.width = '210mm';
  element.style.background = 'white';
  element.style.padding = '20mm';
  element.style.fontFamily = 'Arial, sans-serif';
  document.body.appendChild(element);

  try {
    // Convertir HTML a canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    // Crear PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Descargar
    pdf.save(`presupuesto-${presupuesto.numeroPresupuesto}.pdf`);
  } finally {
    document.body.removeChild(element);
  }
}

function generarHTML(presupuesto: Presupuesto): string {
  const calcularSubtotal = () => {
    return presupuesto.conceptos.reduce((total, concepto) => {
      return total + concepto.cantidad * concepto.precioUnitario;
    }, 0);
  };

  const subtotal = calcularSubtotal();
  const igic = subtotal * 0.07;
  const total = subtotal + igic;

  const filasConceptos = presupuesto.conceptos
    .map(
      (concepto) => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 12px; text-align: left;">${concepto.descripcion}</td>
      <td style="padding: 12px; text-align: center; width: 80px;">${concepto.cantidad}</td>
      <td style="padding: 12px; text-align: right; width: 100px;">${concepto.precioUnitario.toFixed(2)} €</td>
      <td style="padding: 12px; text-align: right; width: 100px; font-weight: bold;">
        ${(concepto.cantidad * concepto.precioUnitario).toFixed(2)} €
      </td>
    </tr>
  `
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <!-- Encabezado -->
      <div style="border-bottom: 2px solid #9ca3af; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 style="font-size: 32px; font-weight: bold; margin: 0 0 10px 0;">PRESUPUESTO</h1>
        <p style="margin: 5px 0; color: #6b7280;">Nº ${presupuesto.numeroPresupuesto}</p>
        <p style="margin: 5px 0; color: #6b7280;">${presupuesto.fecha}</p>
      </div>

      <!-- Datos del emisor y cliente -->
      <div style="display: flex; gap: 40px; margin-bottom: 40px;">
        <div style="flex: 1;">
          <h3 style="font-size: 12px; font-weight: bold; color: #4b5563; margin: 0 0 15px 0; text-transform: uppercase;">Emisor</h3>
          <p style="margin: 0 0 5px 0; font-weight: bold; font-size: 14px;">${presupuesto.misDatos.nombre}</p>
          <p style="margin: 0; font-size: 12px; color: #6b7280;">NIF: ${presupuesto.misDatos.nif}</p>
          <p style="margin: 0; font-size: 12px; color: #6b7280;">${presupuesto.misDatos.direccion}</p>
          <p style="margin: 0; font-size: 12px; color: #6b7280;">${presupuesto.misDatos.telefono}</p>
          <p style="margin: 0; font-size: 12px; color: #6b7280;">${presupuesto.misDatos.email}</p>
        </div>

        <div style="flex: 1;">
          <h3 style="font-size: 12px; font-weight: bold; color: #4b5563; margin: 0 0 15px 0; text-transform: uppercase;">Cliente</h3>
          <p style="margin: 0 0 5px 0; font-weight: bold; font-size: 14px;">${presupuesto.datosCliente.nombre}</p>
          ${presupuesto.datosCliente.empresa ? `<p style="margin: 0; font-size: 12px; color: #6b7280;">${presupuesto.datosCliente.empresa}</p>` : ''}
          <p style="margin: 0; font-size: 12px; color: #6b7280;">NIF: ${presupuesto.datosCliente.nif}</p>
          <p style="margin: 0; font-size: 12px; color: #6b7280;">${presupuesto.datosCliente.email}</p>
        </div>
      </div>

      <!-- Tabla de conceptos -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 13px;">
        <thead>
          <tr style="border-top: 2px solid #d1d5db; border-bottom: 1px solid #d1d5db;">
            <th style="padding: 12px; text-align: left; font-weight: bold; color: #111827;">Descripción</th>
            <th style="padding: 12px; text-align: center; font-weight: bold; color: #111827; width: 80px;">Cantidad</th>
            <th style="padding: 12px; text-align: right; font-weight: bold; color: #111827; width: 100px;">Precio unit.</th>
            <th style="padding: 12px; text-align: right; font-weight: bold; color: #111827; width: 100px;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${filasConceptos}
        </tbody>
      </table>

      <!-- Resumen -->
      <div style="display: flex; justify-content: flex-end; margin-bottom: 40px;">
        <div style="width: 250px;">
          <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #d1d5db; font-size: 13px;">
            <span style="color: #6b7280;">Subtotal</span>
            <span style="color: #111827; font-weight: bold;">${subtotal.toFixed(2)} €</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #d1d5db; font-size: 13px;">
            <span style="color: #6b7280;">IGIC (7%)</span>
            <span style="color: #111827; font-weight: bold;">${igic.toFixed(2)} €</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 12px; background-color: #f3f4f6; border-radius: 4px; font-size: 14px; font-weight: bold;">
            <span style="color: #111827;">TOTAL</span>
            <span style="color: #111827;">${total.toFixed(2)} €</span>
          </div>
        </div>
      </div>

      <!-- Pie -->
      <div style="text-align: center; font-size: 11px; color: #9ca3af; padding-top: 20px; border-top: 1px solid #d1d5db;">
        <p>Este presupuesto es válido hasta 30 días desde su emisión.</p>
      </div>
    </div>
  `;
}
