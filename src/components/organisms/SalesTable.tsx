import Sale from "../../types/Sale";

interface SalesTableProps {
  sales: Sale[];
  onView: (sale: Sale) => void;
}

const SalesTable = ({ sales, onView }: SalesTableProps) => (
  <div className="bg-white shadow rounded-lg overflow-x-auto mb-6">
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
        {sales.map((sale) => (
          <tr key={sale.id}>
            <td className="px-6 py-4 text-sm text-gray-900">{sale.species} ({sale.productType})</td>
            <td className="px-6 py-4 text-sm text-gray-500">{sale.saleDate}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{sale.client} ({sale.clientLocation})</td>
            <td className="px-6 py-4 text-sm text-gray-500">${sale.totalAmount.toFixed(2)}</td>
            <td className="px-6 py-4 text-sm">
              <button 
                className="text-indigo-600 hover:text-indigo-900" 
                onClick={() => onView(sale)}
              >
                Ver Detalles
              </button>
            </td>
          </tr>
        ))}
        {sales.length === 0 && (
          <tr>
            <td colSpan={5} className="text-center py-4 text-sm text-gray-500">
              No hay ventas registradas.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default SalesTable;
