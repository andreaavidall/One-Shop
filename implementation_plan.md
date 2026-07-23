# Plan de Implementación de OneShop B2B MVP

Este plan detalla el diseño, la estructura de datos y los cambios necesarios para convertir el prototipo básico en un MVP premium completamente navegable para OneShop, una plataforma agregadora inteligente B2B para el sector odontológico peruano.

## User Review Required

> [!IMPORTANT]
> **Base de Datos y Autenticación**: Para asegurar que el prototipo funcione de manera instantánea en cualquier navegador sin requerir credenciales activas de Supabase (lo cual facilitará su presentación a inversores y odontólogos), crearemos un simulador robusto de Supabase en memoria acoplado a `localStorage`. Esto permitirá registrar cuentas, iniciar sesión, cambiar roles y guardar el catálogo/pedidos en la sesión local.
> 
> **Cambio de Roles**: Añadiremos un selector de roles visible en la interfaz (Comprador, Proveedor, Administrador) para que los evaluadores puedan alternar instantáneamente entre los distintos dashboards y ver los flujos completos.

## Open Questions

Actualmente, no hay preguntas abiertas críticas, ya que la dirección visual (azul marino principal, turquesa secundario, marfil claro para fondo, verde para ahorro, dorado suave para rewards) y las prioridades de producto están completamente alineadas con las especificaciones.

---

## Proposed Changes

Dividiremos los cambios en componentes clave del sistema:

### 1. Datos del Sistema (Mock Data)

#### [MODIFY] [mockData.ts](file:///c:/Users/avida/OneDrive/Escritorio/One%20Shop/One-Shop/src/data/mockData.ts)
*   **Proveedores**: Expandir a 10 distribuidores peruanos: *Dental Express Perú, ProDental Supply, DentMarket, OdontoImport, BioDental, Equipamiento Dental Lima, EndoSupply, OrthoMarket, Implant Perú, Clínica Supply*.
*   **Productos**: Incrementar a 50 productos reales/realistas de marcas reconocidas (*3M ESPE, Woodpecker, Hu-Friedy, Maillefer, Angelus, SDI, W&H, NSK, Medit, Dentsply Sirona, Morelli, OrthoClassic, Coltene, Lascod, Zeyco*) cubriendo las 10 categorías: *Operatoria, Endodoncia, Ortodoncia, Cirugía, Implantología, Bioseguridad, Instrumental, Equipamiento, Esterilización, Odontología digital*.
*   **Kits**: Expandir a 8 kits procedimentales con desglose de ítems específicos.
*   **Propuestas**: Ajustar el generador de propuestas inteligencias para que calcule de manera exacta las opciones de *Económica*, *Recomendada (Calidad-Precio)*, y *Premium* a partir de los datos.

### 2. Autenticación y Control de Roles (State Management)

#### [NEW] [UserContext.tsx](file:///c:/Users/avida/OneDrive/Escritorio/One%20Shop/One-Shop/src/context/UserContext.tsx)
*   Crear el contexto global para la sesión de usuario de OneShop.
*   Manejar datos de la clínica activa (comprador), el proveedor asignado (proveedor), o la cuenta administrativa.
*   Controlar el rol de usuario activo: `comprador` | `proveedor` | `administrador`.
*   Gestionar el saldo de puntos de *OneRewards* y el progreso de los niveles (Essential, Plus, Pro, Elite), historial de transacciones y referidos.

#### [MODIFY] [CartContext.tsx](file:///c:/Users/avida/OneDrive/Escritorio/One%20Shop/One-Shop/src/context/CartContext.tsx)
*   Integrar con `UserContext` para acumular puntos al comprar.
*   Manejar la conversión de puntos a descuentos (S/. 1 por cada 100 puntos) en el checkout.
*   Habilitar la creación de órdenes de compra con múltiples subpedidos asociados a los respectivos proveedores.

### 3. Interfaz del Cliente / Comprador

#### [MODIFY] [App.tsx](file:///c:/Users/avida/OneDrive/Escritorio/One%20Shop/One-Shop/src/App.tsx)
*   Reestructurar la navegación general para que responda dinámicamente según el rol activo.
*   Añadir en el encabezado de doble fila los enlaces de categorías, marcas, proveedores, centro de recompensas y el selector del rol del usuario.
*   Integrar los nuevos paneles de *OneRewards*, *Mis Pedidos*, *Panel del Proveedor*, y *Panel del Administrador*.

#### [MODIFY] [LandingPage.tsx](file:///c:/Users/avida/OneDrive/Escritorio/One%20Shop/One-Shop/src/panels/LandingPage.tsx)
*   Mejorar la columna derecha del Hero para incluir un carrusel dinámico interactivo con tarjetas de comparación (mismo producto en varios proveedores) y tarjetas de equivalencia (resinas 3M Filtek vs Tokuyama Omnichroma).
*   Desplegar chips de búsquedas rápidas.

#### [MODIFY] [SmartSearch.tsx](file:///c:/Users/avida/OneDrive/Escritorio/One%20Shop/One-Shop/src/panels/SmartSearch.tsx)
*   Implementar la barra lateral de filtros avanzada (marca, proveedor, rango de precio, disponibilidad, etc.).
*   Desplegar opciones de ordenamiento (menor precio, mejor calificación, entrega más rápida).
*   Enriquecer la tarjeta de producto con las etiquetas de stock limitado, más económico, etc., y el botón de favoritos.
*   Añadir el modal de comparación avanzado que soporte:
    1.  Mismo producto entre múltiples proveedores.
    2.  Alternativas de marcas equivalentes con advertencia de validación clínica.

#### [MODIFY] [AIAssistant.tsx](file:///c:/Users/avida/OneDrive/Escritorio/One%20Shop/One-Shop/src/panels/AIAssistant.tsx)
*   Desarrollar una conversación guiada interactiva.
*   Permitir introducir requerimientos personalizados y presupuestos específicos.
*   Proporcionar las 3 propuestas inteligentes en formato comparativo de tarjetas y permitir al comprador intercambiar productos por alternativas equivalentes antes de añadirlos al carrito.

#### [MODIFY] [Kits.tsx](file:///c:/Users/avida/OneDrive/Escritorio/One%20Shop/One-Shop/src/panels/Kits.tsx)
*   Visualizar los 8 kits con sus opciones (Económica, Recomendada, Premium) y desglose interactivo.

#### [MODIFY] [Cart.tsx](file:///c:/Users/avida/OneDrive/Escritorio/One%20Shop/One-Shop/src/panels/Cart.tsx)
*   Añadir el modal interactivo de "Optimizar mi carrito" que muestra el cálculo detallado de consolidación de proveedores y sustitución por alternativas más baratas.
*   Desplegar la interfaz de checkout paso a paso (Facturación, Dirección, Revisión por Proveedor, Métodos de Pago, Descuento de Puntos y Resumen Final).

#### [NEW] [OneRewardsCenter.tsx](file:///c:/Users/avida/OneDrive/Escritorio/One%20Shop/One-Shop/src/panels/OneRewardsCenter.tsx)
*   Desarrollar el Centro de Recompensas completo (saldo de puntos, equivalencia monetaria, nivel de fidelidad, barra de progreso, historial de puntos, premios canjeables y enlace de referidos).
*   Incluir el modal informativo de bienvenida a *OneRewards*.

#### [NEW] [OrdersPage.tsx](file:///c:/Users/avida/OneDrive/Escritorio/One%20Shop/One-Shop/src/panels/OrdersPage.tsx)
*   Visualizar el listado de pedidos consolidado.
*   Incluir el desglose de subpedidos por proveedor, con línea de seguimiento para cada uno.
*   Permitir descargar comprobantes, reportar incidencias y repetir compras anteriores.

### 4. Dashboards de Socios (Proveedor y Admin)

#### [NEW] [SupplierPanel.tsx](file:///c:/Users/avida/OneDrive/Escritorio/One%20Shop/One-Shop/src/panels/SupplierPanel.tsx)
*   Panel del Proveedor para gestionar catálogo (añadir, editar campos de marca, categoría, precio, stock y tiempos de entrega).
*   Estadísticas de ventas, productos sin stock, comisiones y volumen de visitas.
*   Herramienta de importación simulada de catálogo mediante archivo CSV.

#### [NEW] [AdminPanel.tsx](file:///c:/Users/avida/OneDrive/Escritorio/One%20Shop/One-Shop/src/panels/AdminPanel.tsx)
*   Panel Administrativo de OneShop.
*   Métricas del negocio: volumen bruto de ventas (GMV), comisiones generadas, ticket promedio, búsquedas sin resultados y ahorro generado.
*   Módulos de administración: aprobar proveedores, moderar productos, configurar campañas de puntos OneRewards.

---

## Verification Plan

### Manual Verification
1.  **Navegación de Roles**: Seleccionar alternativamente Comprador, Proveedor y Administrador desde el pie de página o la barra de navegación para verificar la carga correcta de sus respectivas pantallas.
2.  **Smart Search**: Buscar "resina" o "limas", aplicar filtros de precio y marca, y cambiar el orden para validar el motor de búsqueda.
3.  **Comparación de Proveedores**: Abrir un producto (por ejemplo, *Filtek Z350*) y comprobar que se visualizan los precios, stock y garantías de los proveedores disponibles para ese mismo producto.
4.  **Optimización del Carrito**: Añadir productos caros de diferentes proveedores al carrito y pulsar "Optimizar mi carrito" para visualizar la reducción del total y el desglose de los cambios propuestos.
5.  **Asistente AI**: En la sección "Ayúdame a comprar", hacer clic en "Tengo S/15,000 para equipar un consultorio" y validar que se generan 3 propuestas (Económica, Calidad-Precio, Premium).
6.  **Programa OneRewards**: Canjear puntos en el checkout para aplicar un descuento y copiar el enlace de referido desde el centro de recompensas.
