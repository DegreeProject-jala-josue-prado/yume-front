// src/components/organisms/WoodTypesTable.tsx
import { WoodType } from '../../types/WoodType';

interface WoodTypesTableProps {
  woodTypes: WoodType[];
  onEdit: (woodType: WoodType) => void;
  onDelete: (woodTypeId: number) => void;
  onViewDetails: (woodType: WoodType) => void; // <-- Nueva prop
}

const WoodTypesTable = ({ woodTypes, onEdit, onDelete, onViewDetails }: WoodTypesTableProps) => (
  <div className="bg-white shadow rounded-lg overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Común</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Científico</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {woodTypes.map((woodType) => (
          <tr key={woodType.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{woodType.commonName}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{woodType.scientificName}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
              {/* --- NUEVO BOTÓN --- */}
              <button onClick={() => onViewDetails(woodType)} className="text-green-600 hover:text-green-900">Ver Ficha</button>
              <button onClick={() => onEdit(woodType)} className="text-indigo-600 hover:text-indigo-900">Editar</button>
              <button onClick={() => onDelete(woodType.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
            </td>
          </tr>
        ))}
        {woodTypes.length === 0 && (
          <tr>
            {/* --- colSpan actualizado a 3 --- */}
            <td colSpan={3} className="text-center py-4 text-sm text-gray-500">
              No hay tipos de madera registrados.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default WoodTypesTable;