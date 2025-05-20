// src/pages/StockPage.tsx
import React, { useState } from 'react';

// Datos de ejemplo para la tabla de stock
const sampleStock = [
  {
    id: 'SKU-ROB-001',
    woodType: 'Roble (Tronca)',
    availableQuantity: 150, // Podría ser m³, unidades, Pie Tablar
    unit: 'm³',
    lastChange: 'Compra #123 - 2023-10-15',
  },
  {
    id: 'SKU-PIN-002',
    woodType: 'Pino (Tablones)',
    availableQuantity: 800,
    unit: 'Pie Tablar',
    lastChange: 'Venta #45 - 2023-11-05',
  },
  {
    id: 'SKU-CED-003',
    woodType: 'Cedro (Madera Seca)',
    availableQuantity: 50,
    unit: 'm³',
    lastChange: 'Ajuste Manual - 2023-11-10',
  }
];

// Datos de ejemplo para historial (simplificado)
const sampleHistory = {
  'SKU-ROB-001': [
    { date: '2023-10-15', type: 'Compra', change: '+150 m³', details: 'Compra #123' },
    { date: '2023-10-20', type: 'Proceso', change: '-50 m³ (a tablones)', details: 'Orden P-01' },
  ],
  'SKU-PIN-002': [
    { date: '2023-10-20', type: 'Compra', change: '+1000 Pie Tablar', details: 'Compra #124' },
    { date: '2023-11-05', type: 'Venta', change: '-200 Pie Tablar', details: 'Venta #45' },
  ]
};

type StockItem = typeof sampleStock[0];
type StockHistoryItem = { date: string; type: string; change: string; details: string };

const StockPage: React.FC = () => {
  const [showUpdateStockModal, setShowUpdateStockModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedStockItem, setSelectedStockItem] = useState<StockItem | null>(null);
  const [currentHistory, setCurrentHistory] = useState<StockHistoryItem[]>([]);

  const commonInputStyle = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const commonLabelStyle = "block text-gray-700 text-sm font-bold mb-2";
  const commonButtonStyle = "bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
  const modalButtonCancelStyle = "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

  const handleOpenUpdateModal = (item: StockItem) => {
    setSelectedStockItem(item);
    setShowUpdateStockModal(true);
  };

  const handleOpenHistoryModal = (itemId: string) => {
    // @ts-ignore // Ignorando ts para la key dinámica en sampleHistory
    setCurrentHistory(sampleHistory[itemId] || []);
    const item = sampleStock.find(s => s.id === itemId);
    setSelectedStockItem(item || null);
    setShowHistoryModal(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestión de Stock</h1>

      {/* Filtros y Búsqueda */}
      <div className="mb-6 p-4 bg-white shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Filtrar Stock</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="woodTypeFilter" className={commonLabelStyle}>Tipo de Madera / Producto</label>
            <input type="text" id="woodTypeFilter" placeholder="Ej: Roble, Tablones de Pino" className={commonInputStyle} />
          </div>
          {/* Podrías agregar más filtros si es necesario */}
          <div className="flex items-end col-start-3">
            <button className={`${commonButtonStyle} w-full md:w-auto`}>
              Buscar / Filtrar
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de Stock */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Madera / Producto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad Disponible</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Cambio / Referencia</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sampleStock.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.woodType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">{item.availableQuantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.unit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lastChange}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => handleOpenUpdateModal(item)}
                    className="text-yellow-600 hover:text-yellow-900 mr-3"
                  >
                    Actualizar Cantidad
                  </button>
                  <button
                    onClick={() => handleOpenHistoryModal(item.id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Ver Historial
                  </button>
                </td>
              </tr>
            ))}
            {sampleStock.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">No hay items en stock.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para Actualizar Stock Manualmente */}
      {showUpdateStockModal && selectedStockItem && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-lg shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-gray-800">Actualizar Stock: {selectedStockItem.woodType}</h3>
                <button
                    onClick={() => setShowUpdateStockModal(false)}
                    className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
                >×</button>
            </div>
            <form className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Cantidad Actual: <span className="font-bold">{selectedStockItem.availableQuantity} {selectedStockItem.unit}</span></p>
              </div>
              <div>
                <label htmlFor="newQuantity" className={commonLabelStyle}>Nueva Cantidad Disponible</label>
                <input type="number" id="newQuantity" className={commonInputStyle} defaultValue={selectedStockItem.availableQuantity} />
              </div>
              <div>
                <label htmlFor="updateReason" className={commonLabelStyle}>Motivo del Ajuste (Opcional)</label>
                <textarea id="updateReason" rows={3} className={commonInputStyle} placeholder="Ej: Conteo físico, merma, etc."></textarea>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowUpdateStockModal(false)}
                  className={modalButtonCancelStyle}
                >
                  Cancelar
                </button>
                <button
                  type="submit" // Cambiar a type="button"
                  onClick={(e) => { e.preventDefault(); setShowUpdateStockModal(false); /* Lógica guardado */ }}
                  className={commonButtonStyle}
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

       {/* Modal para Ver Historial de Stock */}
       {showHistoryModal && selectedStockItem && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-gray-800">Historial de: {selectedStockItem.woodType}</h3>
                <button
                    onClick={() => setShowHistoryModal(false)}
                    className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
                >×</button>
            </div>
            {currentHistory.length > 0 ? (
                <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                    {currentHistory.map((entry, index) => (
                        <li key={index} className="py-3">
                            <p className="text-sm font-medium text-gray-900">Fecha: {entry.date}</p>
                            <p className="text-sm text-gray-600">Tipo: {entry.type}</p>
                            <p className="text-sm text-gray-600">Cambio: <span className={entry.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>{entry.change}</span></p>
                            <p className="text-sm text-gray-500">Detalles: {entry.details}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">No hay historial disponible para este item.</p>
            )}
            <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowHistoryModal(false)}
                  className={modalButtonCancelStyle}
                >
                  Cerrar
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockPage;