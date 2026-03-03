# 🧾 Generador de Presupuestos

Aplicación web para que autónomos y pequeños negocios generen presupuestos profesionales en PDF sin necesidad de Word ni Excel.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38BDA0?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-build-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

## ✨ ¿Qué hace?

- Rellenas los datos de tu negocio y del cliente
- Añades las líneas de servicios o productos con cantidad y precio
- La app calcula automáticamente subtotal, IVA (21%) y total
- Previsualizas el presupuesto antes de descargarlo
- Descargas un PDF limpio y profesional listo para enviar

## 🚀 Demo

🔗 [Ver demo en vivo](https://generador-presupuestos.vercel.app) <!-- Actualiza con tu URL de Vercel -->

## 📸 Captura

<!-- Añade una captura de pantalla aquí cuando la tengas -->
<!-- ![Captura de la app](./screenshot.png) -->

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| React 18 | Framework principal |
| Tailwind CSS | Estilos |
| jsPDF | Generación del PDF |
| html2canvas | Renderizado del PDF |
| Vite | Build tool |

## ⚙️ Instalación local

```bash
# Clona el repositorio
git clone https://github.com/nebulosa-b/generador-presupuestos.git

# Entra en la carpeta
cd generador-presupuestos

# Instala dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`

## 📋 Funcionalidades actuales (v1)

- [x] Formulario con datos del emisor y cliente
- [x] Tabla de conceptos dinámica (añadir y eliminar líneas)
- [x] Cálculo automático de subtotal, IVA y total
- [x] Número de presupuesto manual
- [x] Fecha automática (editable)
- [x] Exportación a PDF

## 🗺️ Roadmap

- [ ] Numeración automática de presupuestos
- [ ] Guardar presupuestos anteriores (localStorage)
- [ ] Subir logo del negocio
- [ ] Duplicar presupuesto existente
- [ ] Múltiples plantillas de diseño

## 🤝 Contribuir

Las contribuciones son bienvenidas. Si encuentras un bug o tienes una idea, abre un Issue.

## 📄 Licencia

MIT © [nebulosa-b](https://github.com/nebulosa-b)
