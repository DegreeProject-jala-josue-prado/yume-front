import { useState, useEffect } from 'react';
import { Provider } from '../types/Provider';
import Button from '../components/atoms/Button';
import ProviderModal from '../components/organisms/ProviderModal';
import ProvidersTable from '../components/organisms/ProvidersTable';

const PROVIDERS_STORAGE_KEY = 'providers_data';

const ProvidersPage = () => {
  const [providers, setProviders] = useState<Provider[]>(() => {
    const saved = localStorage.getItem(PROVIDERS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Juan Pérez', phone: '111-2222', companyName: 'Maderas del Norte', address: 'Bosque Lejano 45' },
      { id: 2, name: 'Ana López', phone: '333-4444', companyName: 'Forestal Sur', address: 'Valle Verde 88' },
    ];
  });
  
  const [showModal, setShowModal] = useState(false);
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null);

  useEffect(() => {
    localStorage.setItem(PROVIDERS_STORAGE_KEY, JSON.stringify(providers));
  }, [providers]);

  const handleSave = (providerData: Omit<Provider, 'id'> & { id?: number }) => {
    if (providerData.id) { // Editing
      setProviders(providers.map(p => p.id === providerData.id ? { ...p, ...providerData } as Provider : p));
    } else { // Creating
      setProviders([...providers, { ...providerData, id: Date.now() }]);
    }
  };

  const handleAddNew = () => {
    setEditingProvider(null);
    setShowModal(true);
  };
  
  const handleEdit = (provider: Provider) => {
    setEditingProvider(provider);
    setShowModal(true);
  };

  const handleDelete = (providerId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este proveedor?')) {
      setProviders(providers.filter(p => p.id !== providerId));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProvider(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Gestión de Proveedores</h1>
      <div className="flex justify-end mb-4">
        <Button 
          onClick={handleAddNew} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          + Registrar Proveedor
        </Button>
      </div>
      <ProvidersTable providers={providers} onEdit={handleEdit} onDelete={handleDelete} />
      {showModal && (
        <ProviderModal 
          onClose={handleCloseModal} 
          onSave={handleSave} 
          initialData={editingProvider}
        />
      )}
    </div>
  );
};

export default ProvidersPage;