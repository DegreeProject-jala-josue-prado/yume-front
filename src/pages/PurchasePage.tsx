// src/pages/PurchasesPage.tsx

import { useState, useEffect } from 'react';
import Button from '../components/atoms/Button';
import PurchaseModal from '../components/organisms/PurchaseModal';
import { Purchase } from '../types/Purchase';
import { Provider } from '../types/Provider';
import { Transport } from '../types/Transport';
import PurchaseFilterForm from '../components/molecules/PurchaseFilterForm';
import PurchasesTable from '../components/organisms/PurchaseTable';

// Claves de Local Storage
const PURCHASES_STORAGE_KEY = 'purchases_data';
const PROVIDERS_STORAGE_KEY = 'providers_data';
const TRANSPORT_STORAGE_KEY = 'transport_data';

const buttonClassStile = "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

// --- DATOS POR DEFECTO CORREGIDOS Y COMPLETOS ---
const defaultProviders: Provider[] = [
  {
    id: 101, name: 'Aserradero del Norte', companyName: 'Aserradero del Norte S.A.', address: 'Ruta 5, Km 340, Tacuarembó',
    providerType: 'company',
    phone: '',
    species: []
  },
  {
    id: 102, name: 'Maderas del Sur', companyName: 'Maderas del Sur S.R.L.', address: 'Av. Italia 5432, Montevideo',
    providerType: 'company',
    phone: '',
    species: []
  }
];

const defaultTransports: Transport[] = [
  { id: 201, driver: {
    fullName: 'Juan Pérez',
    idNumber: '',
    contact: ''
  }, vehicle: {
    plate: 'ABC-123', brand: 'Volvo',
    vin: ''
  } },
  { id: 202, driver: {
    fullName: 'Maria Gómez',
    idNumber: '',
    contact: ''
  }, vehicle: {
    plate: 'XYZ-789', brand: 'Scania',
    vin: ''
  } }
];

const defaultPurchases: Purchase[] = [
  {
    id: 1,
    species: 'Roble',
    PurchaseDate: '2023-10-25',
    supplier: 'Aserradero del Norte',
    supplierLocation: 'Ruta 5, Km 340, Tacuarembó',
    extractor: 'Aserradero del Norte',
    driver: 'Juan Pérez',
    plate: 'ABC-123',
    brand: 'Volvo',
    cefo: 'CEFO-001A',
    woodState: 'tronca',
    dimensions: [
      { diameter: 12, length: 12, boardFoot: 12.00 },
      { diameter: 14, length: 16, boardFoot: 21.78 }
    ],
    totalCost: 1500,
  },
  {
    id: 2,
    species: 'Pino',
    PurchaseDate: '2023-11-02',
    supplier: 'Maderas del Sur',
    supplierLocation: 'Av. Italia 5432, Montevideo',
    extractor: 'Maderas del Sur',
    driver: 'Maria Gómez',
    plate: 'XYZ-789',
    brand: 'Scania',
    cefo: 'CEFO-002B',
    woodState: 'seca_tablones',
    dimensions: [
      { diameter: 10, length: 10, boardFoot: 6.94 }
    ],
    totalCost: 850.50,
  }
];

const PurchasesPage = () => {
  const [purchases, setPurchases] = useState<Purchase[]>(() => {
    const saved = localStorage.getItem(PURCHASES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultPurchases;
  });

  const [providers, ] = useState<Provider[]>(() => {
    const saved = localStorage.getItem(PROVIDERS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultProviders;
  });

  const [transports, ] = useState<Transport[]>(() => {
    const saved = localStorage.getItem(TRANSPORT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultTransports;
  });

  const [filteredPurchases, setFilteredPurchases] = useState<Purchase[]>([]);
  const [filters, setFilters] = useState({ species: '', date: '' });
  const [showModal, setShowModal] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState<Purchase | null>(null);

  useEffect(() => {
    localStorage.setItem(PURCHASES_STORAGE_KEY, JSON.stringify(purchases));
    localStorage.setItem(PROVIDERS_STORAGE_KEY, JSON.stringify(providers));
    localStorage.setItem(TRANSPORT_STORAGE_KEY, JSON.stringify(transports));
  }, [purchases, providers, transports]);

  useEffect(() => {
    const filtered = purchases.filter(p =>
      (!filters.species || p.species.toLowerCase().includes(filters.species.toLowerCase())) &&
      (!filters.date || p.PurchaseDate === filters.date)
    );
    setFilteredPurchases(filtered);
  }, [filters, purchases]);

  const handleSavePurchase = (purchaseData: Omit<Purchase, 'id'> & { id?: number }) => {
    if (editingPurchase && purchaseData.id) { 
      setPurchases(purchases.map(p => 
        p.id === purchaseData.id ? { ...p, ...purchaseData } as Purchase : p
      ));
    } else { 
      const newPurchase = { ...purchaseData, id: Date.now() } as Purchase;
      setPurchases([...purchases, newPurchase]);
    }
    handleCloseModal();
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

  const handleFilterChange = (key: 'species' | 'date', value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestión de Compras</h1>
      
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <PurchaseFilterForm filters={filters} onChange={handleFilterChange} onFilter={function (): void {
          throw new Error('Function not implemented.');
        } } />
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