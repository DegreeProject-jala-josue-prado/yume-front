import React, { useState } from 'react';

// Datos de ejemplo para la tabla
const sampleSales = [
  {
    id: 1,
    species: 'Roble Seco',
    saleDate: '2023-11-01',
    client: 'Constructora Central',
    clientLocation: 'Ciudad Capital',
    productType: 'Tablones',
    totalAmount: 2800.00,
  },
  {
    id: 2,
    species: 'Pino Tratado',
    saleDate: '2023-11-05',
    client: 'Carpintería Fina',
    clientLocation: 'Pueblo Maderero',
    productType: 'Vigas',
    totalAmount: 1500.00,
  },
];

const SalesPage: React.FC = () => {
  const [showAddSaleModal, setShowAddSaleModal] = useState(false);

  const commonInputStyle = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const commonLabelStyle = "block text-gray-700 text-sm font-bold mb-2";
  const commonButtonStyle = "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
  const modalButtonCancelStyle = "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestión de Ventas</h1>

      {/* Filtros y Búsqueda */}
      <div className="mb-6 p-4 bg-white shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Filtrar Ventas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="speciesFilterSale" className={commonLabelStyle}>Especie de Madera / Producto</label>
            <input type="text" id="speciesFilterSale" placeholder="Ej: Tablones de Roble" className={commonInputStyle} />
          </div>
          <div>
            <label htmlFor="dateFilterSale" className={commonLabelStyle}>Fecha de Venta</label>
            <input type="date" id="dateFilterSale" className={commonInputStyle} />
          </div>
          <div className="flex items-end">
            <button className={`${commonButtonStyle} w-full md:w-auto`}>
              Buscar / Filtrar
            </button>
          </div>
        </div>
      </div>

      {/* Botón para agregar nueva venta */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddSaleModal(true)}
          className={commonButtonStyle}
        >
          + Registrar Nueva Venta
        </button>
      </div>

      {/* Tabla de Ventas */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto / Especie</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Venta</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sampleSales.map((sale) => (
              <tr key={sale.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.species} ({sale.productType})</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.saleDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.client} ({sale.clientLocation})</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${sale.totalAmount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-3">Ver Detalles</a>
                  {/* <a href="#" className="text-red-600 hover:text-red-900">Anular</a> */}
                </td>
              </tr>
            ))}
             {sampleSales.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">No hay ventas registradas.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para Registrar Nueva Venta */}
      {showAddSaleModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-gray-800">Registrar Nueva Venta</h3>
                 <button
                    onClick={() => setShowAddSaleModal(false)}
                    className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
                >×</button>
            </div>
           
            <form className="space-y-6">
              <div>
                <label htmlFor="saleProduct" className={commonLabelStyle}>Producto / Especie de Madera</label>
                <select id="saleProduct" className={commonInputStyle}>
                  <option value="">Seleccione un producto</option>
                  <option value="roble_tablones">Tablones de Roble</option>
                  <option value="pino_vigas">Vigas de Pino</option>
                  {/* ... más productos */}
                </select>
              </div>

              <fieldset className="border p-4 rounded-md">
                <legend className="text-lg font-semibold text-gray-700 px-2">Cliente</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label htmlFor="clientName" className={commonLabelStyle}>Nombre del Cliente</label>
                    <input type="text" id="clientName" className={commonInputStyle} />
                  </div>
                  <div>
                    <label htmlFor="clientLocation" className={commonLabelStyle}>Ubicación / Contacto</label>
                    <input type="text" id="clientLocation" className={commonInputStyle} />
                  </div>
                </div>
              </fieldset>
              
              <div>
                <label htmlFor="saleDate" className={commonLabelStyle}>Fecha de Venta</label>
                <input type="date" id="saleDate" className={commonInputStyle} />
              </div>

              {/* Detalles del Producto Vendido (Simplificado) */}
              <fieldset className="border p-4 rounded-md">
                <legend className="text-lg font-semibold text-gray-700 px-2">Detalles del Producto</legend>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div>
                    <label htmlFor="quantitySold" className={commonLabelStyle}>Cantidad</label>
                    <input type="number" id="quantitySold" step="1" className={commonInputStyle} />
                  </div>
                  <div>
                    <label htmlFor="unitSalePrice" className={commonLabelStyle}>Precio Unitario</label>
                    <input type="number" id="unitSalePrice" step="0.01" className={commonInputStyle} />
                  </div>
                  <div>
                    <label className={commonLabelStyle}>Subtotal (Calculado)</label>
                    <input type="text" readOnly value="$0.00" className={`${commonInputStyle} bg-gray-100`} />
                  </div>
                </div>
                 <button type="button" className="mt-2 text-sm text-green-600 hover:text-green-800">+ Agregar otro producto</button>
              </fieldset>

              <div className="mt-4">
                <label className={commonLabelStyle}>Monto Total Venta (Calculado)</label>
                <input type="text" readOnly value="$0.00" className={`${commonInputStyle} bg-gray-100 text-xl font-bold`} />
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddSaleModal(false)}
                  className={modalButtonCancelStyle}
                >
                  Cancelar
                </button>
                <button
                  type="submit" // Cambiar a type="button"
                  onClick={(e) => { e.preventDefault(); setShowAddSaleModal(false); /* Lógica de guardado aquí */ }}
                  className={commonButtonStyle}
                >
                  Guardar Venta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPage;