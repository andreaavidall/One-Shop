# Lista de Tareas para la Implementación de OneShop B2B MVP

- [x] 1. Ampliación y Enriquecimiento de Datos de Prueba (mockData.ts)
  - [x] Agregar 4 proveedores adicionales para completar 10 proveedores peruanos.
  - [x] Expandir la lista a 50 productos en total, cubriendo todas las categorías (Operatoria, Endodoncia, Ortodoncia, Cirugía, Implantología, Bioseguridad, Instrumental, Equipamiento, Esterilización, Odontología digital) y 15 marcas de renombre.
  - [x] Agregar listados realistas que distribuyan el stock y los precios entre proveedores para demostrar comparación y equivalencias.
  - [x] Expandir a 8 kits estructurados con sus respectivas 3 propuestas (Económica, Calidad-Precio, Premium).

- [x] 2. Gestión de Sesión y Contexto de Usuario (UserContext.tsx)
  - [x] Crear UserContext.tsx para soportar cambio de roles (Comprador, Proveedor, Administrador) y guardar información de la clínica/proveedor en localStorage.
  - [x] Administrar saldo de puntos OneRewards (balance, nivel, referidos, historial de transacciones).

- [x] 3. Integración de Contextos y Logística de Compra (CartContext.tsx)
  - [x] Conectar CartContext con UserContext para ganar puntos por compras.
  - [x] Añadir soporte para cupones y canje de puntos de OneRewards en el checkout.
  - [x] Simular órdenes consolidadas con subpedidos vinculados a los respectivos proveedores.

- [x] 4. Navegación Principal y Shell Multi-Rol (App.tsx)
  - [x] Reestructurar App.tsx para desplegar pestañas y barras de navegación personalizadas basadas en el rol activo (Comprador, Proveedor, Administrador).
  - [x] Añadir selector de roles global en el pie del Sidebar para propósitos del prototipo MVP.
  - [x] Registrar las rutas y pestañas para los nuevos paneles.

- [x] 5. Mejoras Premium en Páginas del Cliente
  - [x] **LandingPage.tsx**: Diseñar columna de carrusel interactiva comparativa/de equivalencias en el Hero y chips de búsqueda rápida.
  - [x] **SmartSearch.tsx**: Agregar la barra lateral de filtros avanzada y ordenamiento. Enriquecer tarjetas de producto y añadir modales de comparación (mismo producto en múltiples proveedores e ítems equivalentes con advertencia médica).
  - [x] **AIAssistant.tsx**: Desarrollar la conversación guiada completa con cotizador que compare las 3 propuestas inteligentes y permita intercambiar ítems.
  - [x] **Kits.tsx**: Implementar los 8 kits procedimentales interactivos.
  - [x] **Cart.tsx**: Diseñar popup "Optimizar mi carrito" con antes/después detallado y el checkout paso a paso (Facturación, Dirección, Subpedidos por proveedor, Métodos de Pago, Canje de Puntos, Confirmación).

- [x] 6. Nuevas Pantallas de Fidelización e Historial
  - [x] **OneRewardsCenter.tsx**: Implementar centro de fidelidad con saldo de puntos, nivel de cliente (Essential, Plus, Pro, Elite), historial de puntos, canje de recompensas y enlace de referido.
  - [x] **OrdersPage.tsx**: Página con listado de pedidos consolidado, detalles de subpedidos por proveedor, seguimiento y opciones de soporte.

- [x] 7. Dashboards para Socios y Administradores
  - [x] **SupplierPanel.tsx**: Crear panel del proveedor (ventas, pedidos, control de inventario, gestor de catálogo e importación de catálogo CSV simulada).
  - [x] **AdminPanel.tsx**: Diseñar panel de control de OneShop (GMV, comisiones, ticket promedio, aprobación de proveedores y promociones de puntos).

- [x] 8. Verificación y Pulido de Detalles
  - [x] Probar el flujo de compra de principio a fin, verificar el cálculo de ahorro, el aumento de puntos y la respuesta de la interfaz ante errores o búsquedas vacías.
  - [x] Optimizar estilos responsivos para asegurar compatibilidad móvil y de escritorio con la paleta de colores.

