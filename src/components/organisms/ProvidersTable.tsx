// src/components/organisms/ProvidersTable.tsx

import React, { useState } from 'react';
import { Provider } from '../../types/Provider';

interface ProvidersTableProps {
  providers: Provider[];
  onEdit: (provider: Provider) => void;
  onDelete: (providerId: number) => void;
}

const ProvidersTable = ({ providers, onEdit, onDelete }: ProvidersTableProps) => {
  // Estado para controlar qué fila de proveedor está expandida para ver sus especies
  const [expandedProviderId, setExpandedProviderId] = useState<number | null>(null);

  const handleToggleExpand = (providerId: number) => {
    // Si ya está expandido, lo cerramos. Si no, lo expandimos.
    setExpandedProviderId(expandedProviderId === providerId ? null : providerId);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Proveedor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Especies Ofrecidas</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Teléfono</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Dirección</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {providers.length > 0 ? (
            providers.map((provider) => (
              <React.Fragment key={provider.id}>
                {/* Fila principal del proveedor */}
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{provider.name}</div>
                    {provider.providerType === 'company' && (
                      <div className="text-xs text-gray-500">{provider.companyName}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button 
                      onClick={() => handleToggleExpand(provider.id)} 
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {provider.species.length} Especie(s) ({expandedProviderId === provider.id ? 'Ocultar' : 'Ver'})
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{provider.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{provider.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                    <button onClick={() => onEdit(provider)} className="text-indigo-600 hover:text-indigo-900">Editar</button>
                    <button onClick={() => onDelete(provider.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
                  </td>
                </tr>
                {/* Fila de detalles (expandible) */}
                {expandedProviderId === provider.id && (
                  <tr>
                    <td colSpan={5} className="p-0">
                      <div className="p-4 bg-gray-50">
                        <h4 className="font-semibold text-sm text-gray-700 mb-2">Detalle de Precios:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {provider.species.map((specie) => (
                            <li key={specie.id} className="text-sm text-gray-600">
                              <span className="font-medium">{specie.woodTypeName}:</span> ${specie.pricePerBoardFoot.toFixed(2)} / pie tablar
                            </li>
                          ))}
                          {provider.species.length === 0 && (
                            <li className="text-sm text-gray-500 italic">Este proveedor no tiene especies registradas.</li>
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-6 text-sm text-gray-500">
                No hay proveedores registrados. Haz clic en "+ Registrar Proveedor" para comenzar.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProvidersTable;