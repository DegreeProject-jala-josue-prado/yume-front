import { Provider } from '../../types/Provider';

interface ProvidersTableProps {
  providers: Provider[];
  onEdit: (provider: Provider) => void;
  onDelete: (providerId: number) => void;
}

const ProvidersTable = ({ providers, onEdit, onDelete }: ProvidersTableProps) => (
  <div className="bg-white shadow rounded-lg overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Contacto</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {providers.map((provider) => (
          <tr key={provider.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{provider.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{provider.companyName}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{provider.phone}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
              <button onClick={() => onEdit(provider)} className="text-indigo-600 hover:text-indigo-900">Editar</button>
              <button onClick={() => onDelete(provider.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
            </td>
          </tr>
        ))}
        {providers.length === 0 && (
          <tr>
            <td colSpan={4} className="text-center py-4 text-sm text-gray-500">
              No hay proveedores registrados.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default ProvidersTable;