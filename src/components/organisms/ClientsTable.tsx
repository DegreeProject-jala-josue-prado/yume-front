import { Client } from "../../types/Client";


interface ClientsTableProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (clientId: number) => void;
}

const ClientsTable = ({ clients, onEdit, onDelete }: ClientsTableProps) => (
  <div className="bg-white shadow rounded-lg overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {clients.map((client) => (
          <tr key={client.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.phone}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.address}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
              <button onClick={() => onEdit(client)} className="text-indigo-600 hover:text-indigo-900">Editar</button>
              <button onClick={() => onDelete(client.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
            </td>
          </tr>
        ))}
        {clients.length === 0 && (
          <tr>
            <td colSpan={4} className="text-center py-4 text-sm text-gray-500">
              No hay clientes registrados.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default ClientsTable;