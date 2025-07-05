import { useState, useEffect } from 'react';
import Button from '../components/atoms/Button';
import PurchaseModal from '../components/organisms/PurchaseModal';
import PurchasesTable from '../components/organisms/PurchaseTable';
import { Purchase } from '../types/Purchase';
import { Provider } from '../types/Provider';
import { Transport } from '../types/Transport';
import PurchaseFilterForm from '../components/molecules/PurchaseFilterForm';

// Claves de Local Storage
const PURCHASES_STORAGE_KEY = 'purchases_data';
const PROVIDERS_STORAGE_KEY = 'providers_data';
const TRANSPORT_STORAGE_KEY = 'transport_data';

const buttonClassStile = "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

const PurchasesPage = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [transports, setTransports] = useState<Transport[]>([]);

  const [filteredPurchases, setFilteredPurchases] = useState<Purchase[]>([]);
  const [filters, setFilters] = useState({ species: '', date: '' });
  const [showModal, setShowModal] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState<Purchase | null>(null);

  // Cargar todos los datos desde localStorage al iniciar
  useEffect(() => {
    const savedPurchases = localStorage.getItem(PURCHASES_STORAGE_KEY);
    setPurchases(savedPurchases ? JSON.parse(savedPurchases) : []);
    
    const savedProviders = localStorage.getItem(PROVIDERS_STORAGE_KEY);
    setProviders(savedProviders ? JSON.parse(savedProviders) : []);

    const savedTransports = localStorage.getItem(TRANSPORT_STORAGE_KEY);
    setTransports(savedTransports ? JSON.parse(savedTransports) : []);
  }, []);

  const applyFilters = () => {
    setFilteredPurchases(
      purchases.filter(p =>
        (!filters.species || p.species.toLowerCase().includes(filters.species.toLowerCase())) &&
        (!filters.date || p.PurchaseDate === filters.date)
      )
    );
  };

  
  const handleSavePurchase = (purchaseData: Omit<Purchase, 'id'> & { id?: number }) => {
    if (purchaseData.id) { 
      setPurchases(purchases.map(p => 
        p.id === purchaseData.id ? { ...p, ...purchaseData } as Purchase : p
      ));
    } else { 
      setPurchases([...purchases, { ...purchaseData, id: Date.now() }]);
    }
  };

  const handleAddNew = () => {
    setEditingPurchase(null);
    setShowModal(true);
  };
  
  const handleEdit = (purchase: Purchase) => {
    setEditingPurchase(purchase);
    setShowModal(true);
  };

  const handleDelete = (purchaseId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta compra?')) {
      setPurchases(purchases.filter(p => p.id !== purchaseId));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPurchase(null);
  };

    const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestión de Compras</h1>
      
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <PurchaseFilterForm filters={filters} onChange={handleFilterChange} onFilter={applyFilters} />
      </div>

      <div className="flex justify-end mb-4">
        <Button 
          onClick={handleAddNew} 
          className={`bg-green-500 hover:bg-green-700 text-white ${buttonClassStile}`}
        >
          + Registrar Nueva Compra
        </Button>
      </div>

      <PurchasesTable 
        purchases={filteredPurchases} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <PurchaseModal 
          onClose={handleCloseModal} 
          onSave={handleSavePurchase} 
          initialData={editingPurchase}
          providers={providers}
          transports={transports}
        />
      )}
    </div>
  );
};

export default PurchasesPage;