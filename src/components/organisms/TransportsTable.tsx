import { Transport } from '../../types/Transport';

interface TransportsTableProps {
  transports: Transport[];
  onEdit: (transport: Transport) => void;
  onDelete: (transportId: number) => void;
}

const TransportsTable = ({ transports, onEdit, onDelete }: TransportsTableProps) => (
  <div className="bg-white shadow rounded-lg overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chofer</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehículo</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placa</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {transports.map((transport) => (
          <tr key={transport.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transport.driver.fullName}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transport.vehicle.brand}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transport.vehicle.plate}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
              <button onClick={() => onEdit(transport)} className="text-indigo-600 hover:text-indigo-900">Editar</button>
              <button onClick={() => onDelete(transport.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
            </td>
          </tr>
        ))}
        {transports.length === 0 && (
          <tr>
            <td colSpan={4} className="text-center py-4 text-sm text-gray-500">
              No hay datos de transporte registrados.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default TransportsTable;