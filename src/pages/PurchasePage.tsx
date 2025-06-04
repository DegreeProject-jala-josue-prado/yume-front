import { useState, useEffect } from 'react';
import Button from '../components/atoms/Button';
import PurchaseModal from '../components/organisms/PurchaseModal';
import PurchasesTable from '../components/organisms/PurchaseTable';
import { Purchase } from '../types/Purchase';
import PurchaseFilterForm from '../components/molecules/PurchaseFilterForm';

const PURCHASES_STORAGE_KEY = import.meta.env.VITE_PURCHASES_STORAGE_KEY;
const buttonClassStile = "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

const PurchasesPage = () => {
  const [purchases, setPurchases] = useState<Purchase[]>(() => {
    const savedPurchases = localStorage.getItem(PURCHASES_STORAGE_KEY);
    return savedPurchases ? JSON.parse(savedPurchases) : [
      {
        id: 1,
        species: 'Roble',
        PurchaseDate: '2023-10-15',
        supplier: 'Maderas del Norte',
        supplierLocation: 'Región Norte',
        extractor: 'Juan Pérez',
        entryDate: '2023-10-14',
        driver: 'Carlos Gómez',
        plate: 'ABC-123',
        brand: 'Volvo',
        cefo: 'CEFO-001',
        totalCost: 5500.00,
      },
      {
        id: 2,
        species: 'Pino',
        PurchaseDate: '2023-10-20',
        supplier: 'Forestal Sur',
        supplierLocation: 'Región Sur',
        extractor: 'Ana López',
        entryDate: '2023-10-19',
        driver: 'Luis Martínez',
        plate: 'XYZ-789',
        brand: 'Scania',
        cefo: 'CEFO-002',
        totalCost: 3200.00,
      }
    ];
  });

  const [filteredPurchases, setFilteredPurchases] = useState(purchases);
  const [filters, setFilters] = useState({ species: '', date: '' });
  const [showModal, setShowModal] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);

  useEffect(() => {
    localStorage.setItem(PURCHASES_STORAGE_KEY, JSON.stringify(purchases));
    setFilteredPurchases(purchases);
  }, [purchases]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const applyFilters = () => {
    setFilteredPurchases(
      purchases.filter(p =>
        (!filters.species || p.species.toLowerCase().includes(filters.species.toLowerCase())) &&
        (!filters.date || p.PurchaseDate === filters.date)
      )
    );
  };

  const handleSavePurchase = (newPurchase: Purchase) => {
    const updated = [...purchases, { ...newPurchase, id: Date.now() }];
    setPurchases(updated);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestión de Compras</h1>
      <PurchaseFilterForm filters={filters} onChange={handleFilterChange} onFilter={applyFilters} />
      <Button 
        onClick={() => setShowModal(true)} 
        className={`bg-green-500 hover:bg-green-700 text-white mb-4 ${buttonClassStile}`}
      >
        + Registrar Nueva Compra
      </Button>
      <PurchasesTable purchases={filteredPurchases} onView={setSelectedPurchase} />
      {showModal && <PurchaseModal onClose={() => setShowModal(false)} onSave={handleSavePurchase} />}
      {selectedPurchase && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-start pt-10">
          <div className="bg-white p-6 rounded shadow-lg max-w-xl">
            <h3 className="text-xl font-bold mb-2">Detalles de la Compra</h3>
            <p><strong>Especie:</strong> {selectedPurchase.species}</p>
            <p><strong>Proveedor:</strong> {selectedPurchase.supplier} ({selectedPurchase.supplierLocation})</p>
            <p><strong>Extractor:</strong> {selectedPurchase.extractor}</p>
            <p><strong>Fecha de compra:</strong> {selectedPurchase.PurchaseDate}</p>
            <p><strong>Transporte:</strong> {selectedPurchase.driver} / {selectedPurchase.plate} ({selectedPurchase.brand})</p>
            <p><strong>CEFO:</strong> {selectedPurchase.cefo}</p>
            <p><strong>Costo Total:</strong> ${selectedPurchase.totalCost.toFixed(2)}</p>
            <div className="flex justify-end mt-4">
              <Button 
                onClick={() => setSelectedPurchase(null)} 
                className={`bg-gray-500 hover:bg-gray-700 text-white ${buttonClassStile}`}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchasesPage;