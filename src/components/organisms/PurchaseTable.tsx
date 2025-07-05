// src/components/organisms/PurchaseTable.tsx

import { Purchase } from "../../types/Purchase";

interface PurchasesTableProps {
  purchases: Purchase[];
  onEdit: (purchase: Purchase) => void;
  onDelete: (purchaseId: number) => void;
}

const PurchasesTable = ({ purchases, onEdit, onDelete }: PurchasesTableProps) => (
  <div className="bg-white shadow rounded-lg overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Especie</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Proveedor</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Costo Total</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {purchases.map((purchase) => (
          <tr key={purchase.id}>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{purchase.species}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{purchase.PurchaseDate}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{purchase.supplier}</td>
            <td className="px-6 py-4 text-sm text-gray-500">${(purchase.totalCost || 0).toFixed(2)}</td>
            <td className="px-6 py-4 text-sm font-medium space-x-4">
              <button onClick={() => onEdit(purchase)} className="text-indigo-600 hover:text-indigo-900">Editar</button>
              <button onClick={() => onDelete(purchase.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
            </td>
          </tr>
        ))}
        {purchases.length === 0 && (
          <tr>
            <td colSpan={5} className="text-center py-4 text-sm text-gray-500">
              No hay compras registradas que coincidan con los filtros.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default PurchasesTable;