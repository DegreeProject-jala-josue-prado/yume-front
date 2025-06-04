import { Purchase } from "../../types/Purchase";

interface PurchasesTableProps {
  purchases: Purchase[];
  onView: (purchase: Purchase) => void;
}

const PurchasesTable = ({ purchases, onView }: PurchasesTableProps) => (
  <div className="bg-white shadow rounded-lg overflow-x-auto mb-6">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especie</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Compra</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proveedor</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transporte</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costo Total</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {purchases.map((purchase) => (
          <tr key={purchase.id}>
            <td className="px-6 py-4 text-sm text-gray-900">{purchase.species}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{purchase.PurchaseDate}</td>
            <td className="px-6 py-4 text-sm text-gray-500">
              {purchase.supplier} ({purchase.supplierLocation})
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">{purchase.driver} / {purchase.plate}</td>
            <td className="px-6 py-4 text-sm text-gray-500">${(purchase.totalCost || 0).toFixed(2)}</td>
            <td className="px-6 py-4 text-sm">
              <button 
                className="text-indigo-600 hover:text-indigo-900" 
                onClick={() => onView(purchase)}
              >
                Ver Detalles
              </button>
            </td>
          </tr>
        ))}
        {purchases.length === 0 && (
          <tr>
            <td colSpan={6} className="text-center py-4 text-sm text-gray-500">
              No hay compras registradas.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default PurchasesTable;