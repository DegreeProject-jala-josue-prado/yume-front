import React, { useState } from 'react';

// Datos de ejemplo para la tabla
const samplePurchases = [
  {
    id: 1,
    species: 'Roble',
    registrationDate: '2023-10-15',
    supplier: 'Maderas del Norte',
    supplierLocation: 'Región Norte',
    extractor: 'Juan Pérez',
    entryDate: '2023-10-14',
    driver: 'Carlos Gómez',
    plate: 'ABC-123',
    brand: 'Volvo',
    cefo: 'CEFO-001',
    totalCost: 5500.00,
  },
  {
    id: 2,
    species: 'Pino',
    registrationDate: '2023-10-20',
    supplier: 'Forestal Sur',
    supplierLocation: 'Región Sur',
    extractor: 'Ana López',
    entryDate: '2023-10-19',
    driver: 'Luis Martínez',
    plate: 'XYZ-789',
    brand: 'Scania',
    cefo: 'CEFO-002',
    totalCost: 3200.00,
  },
];

const PurchasesPage: React.FC = () => {
  const [showAddPurchaseModal, setShowAddPurchaseModal] = useState(false);

  const commonInputStyle = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const commonLabelStyle = "block text-gray-700 text-sm font-bold mb-2";
  const commonButtonStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
  const modalButtonCancelStyle = "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestión de Compras</h1>

      {/* Filtros y Búsqueda */}
      <div className="mb-6 p-4 bg-white shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Filtrar Compras</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="speciesFilter" className={commonLabelStyle}>Especie de Madera</label>
            <input type="text" id="speciesFilter" placeholder="Ej: Roble" className={commonInputStyle} />
          </div>
          <div>
            <label htmlFor="dateFilter" className={commonLabelStyle}>Fecha de Registro</label>
            <input type="date" id="dateFilter" className={commonInputStyle} />
          </div>
          <div className="flex items-end">
            <button className={`${commonButtonStyle} w-full md:w-auto`}>
              Buscar / Filtrar
            </button>
          </div>
        </div>
      </div>

      {/* Botón para agregar nueva compra */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddPurchaseModal(true)}
          className={commonButtonStyle}
        >
          + Agregar Nueva Compra
        </button>
      </div>

      {/* Tabla de Compras */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especie</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Registro</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proveedor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transporte (Chofer/Placa)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costo Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {samplePurchases.map((purchase) => (
              <tr key={purchase.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.species}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.registrationDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {purchase.supplier} ({purchase.supplierLocation})
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.driver} / {purchase.plate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${purchase.totalCost.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-3">Ver Detalles</a>
                  {/* <a href="#" className="text-red-600 hover:text-red-900">Eliminar</a> */}
                </td>
              </tr>
            ))}
            {samplePurchases.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">No hay compras registradas.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para Agregar Nueva Compra */}
      {showAddPurchaseModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-gray-800">Registrar Nueva Compra</h3>
                <button
                    onClick={() => setShowAddPurchaseModal(false)}
                    className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
                >×</button>
            </div>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="purchaseSpecies" className={commonLabelStyle}>Especie de Madera</label>
                <select id="purchaseSpecies" className={commonInputStyle}>
                  <option value="">Seleccione una especie</option>
                  <option value="roble">Roble</option>
                  <option value="pino">Pino</option>
                  <option value="cedro">Cedro</option>
                  {/* ... más especies */}
                </select>
              </div>

              <div>
                <label className={commonLabelStyle}>Estado de Madera de la Compra</label>
                <div className="flex items-center space-x-4 mt-1">
                    <label className="flex items-center">
                        <input type="radio" name="woodState" value="tronca" className="form-radio h-4 w-4 text-blue-600"/>
                        <span className="ml-2 text-sm text-gray-700">Tronca (materia prima)</span>
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="woodState" value="seca_tablones" className="form-radio h-4 w-4 text-blue-600"/>
                        <span className="ml-2 text-sm text-gray-700">Madera seca / Tablones (producto comercial)</span>
                    </label>
                </div>
              </div>

              <fieldset className="border p-4 rounded-md">
                <legend className="text-lg font-semibold text-gray-700 px-2">Proveedor</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label htmlFor="supplierName" className={commonLabelStyle}>Nombre del Proveedor</label>
                    <input type="text" id="supplierName" className={commonInputStyle} />
                  </div>
                  <div>
                    <label htmlFor="supplierLocation" className={commonLabelStyle}>Lugar</label>
                    <input type="text" id="supplierLocation" className={commonInputStyle} />
                  </div>
                  <div>
                    <label htmlFor="extractor" className={commonLabelStyle}>Extractor</label>
                    <input type="text" id="extractor" className={commonInputStyle} />
                  </div>
                  <div>
                    <label htmlFor="entryDate" className={commonLabelStyle}>Fecha de Ingreso</label>
                    <input type="date" id="entryDate" className={commonInputStyle} />
                  </div>
                </div>
              </fieldset>

              <fieldset className="border p-4 rounded-md">
                <legend className="text-lg font-semibold text-gray-700 px-2">Datos de Transporte</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label htmlFor="driverName" className={commonLabelStyle}>Chofer</label>
                    <input type="text" id="driverName" className={commonInputStyle} />
                  </div>
                  <div>
                    <label htmlFor="plateNumber" className={commonLabelStyle}>Nr de Placa</label>
                    <input type="text" id="plateNumber" className={commonInputStyle} />
                  </div>
                  <div>
                    <label htmlFor="vehicleBrand" className={commonLabelStyle}>Marca</label>
                    <input type="text" id="vehicleBrand" className={commonInputStyle} />
                  </div>
                  <div>
                    <label htmlFor="cefoNumber" className={commonLabelStyle}>Número de CEFO</label>
                    <input type="text" id="cefoNumber" className={commonInputStyle} />
                  </div>
                </div>
              </fieldset>
              
              <div>
                <label htmlFor="unitPrice" className={commonLabelStyle}>Precio Unitario (por Pie Tablar o m³)</label>
                <input type="number" id="unitPrice" step="0.01" className={commonInputStyle} />
              </div>

              <fieldset className="border p-4 rounded-md">
                <legend className="text-lg font-semibold text-gray-700 px-2">Dimensiones de Unidades de Madera</legend>
                {/* Ejemplo de un set de dimensiones, esto podría ser dinámico */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 border-b pb-4 mb-4">
                  <div>
                    <label htmlFor="dimensionDiameter" className={commonLabelStyle}>Diámetro/Ancho (pulgadas)</label>
                    <input type="number" id="dimensionDiameter" step="0.1" className={commonInputStyle} />
                  </div>
                  <div>
                    <label htmlFor="dimensionLength" className={commonLabelStyle}>Largo (Pies)</label>
                    <input type="number" id="dimensionLength" step="0.1" className={commonInputStyle} />
                  </div>
                  <div>
                    <label className={commonLabelStyle}>Pie Tablar (Calculado)</label>
                    <input type="text" readOnly value="0.00" className={`${commonInputStyle} bg-gray-100`} />
                  </div>
                  <div>
                    <label className={commonLabelStyle}>Costo Pie Tablar (Calculado)</label>
                    <input type="text" readOnly value="$0.00" className={`${commonInputStyle} bg-gray-100`} />
                  </div>
                </div>
                <button type="button" className="text-sm text-blue-600 hover:text-blue-800">+ Agregar otra dimensión</button>
              </fieldset>

              <div className="mt-4">
                <label className={commonLabelStyle}>Costo Total (Calculado)</label>
                <input type="text" readOnly value="$0.00" className={`${commonInputStyle} bg-gray-100 text-xl font-bold`} />
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddPurchaseModal(false)}
                  className={modalButtonCancelStyle}
                >
                  Cancelar
                </button>
                <button
                  type="submit" // Cambiar a type="button" si no hay submit real
                  onClick={(e) => { e.preventDefault(); setShowAddPurchaseModal(false); /* Lógica de guardado aquí */ }}
                  className={commonButtonStyle}
                >
                  Guardar Compra
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchasesPage;