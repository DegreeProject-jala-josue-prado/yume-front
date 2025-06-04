import { useState, useEffect } from 'react';
import Button from '../components/atoms/Button';
import FilterForm from '../components/molecules/FilterForm';
import Sale from '../types/Sale';
import SalesTable from '../components/organisms/SalesTable';
import SaleModal from '../components/organisms/SalesModal';

const buttonClassStile = "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
const SALES_STORAGE_KEY = import.meta.env.VITE_SALES_STORAGE_KEY;

const SalesPage = () => {
  const [sales, setSales] = useState<Sale[]>(() => {
    const savedSales = localStorage.getItem(SALES_STORAGE_KEY);
    return savedSales ? JSON.parse(savedSales) : [{
      id: 1,
      species: 'Pino',
      saleDate: '2023-11-01',
      client: ' Martin Suarez',
      clientLocation: 'La Paz',
      productType: 'Tablon',
      totalAmount: 2800,
    }];
  });

  const [filteredSales, setFilteredSales] = useState(sales);
  const [filters, setFilters] = useState({ species: '', date: '' });
  const [showModal, setShowModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  useEffect(() => {
    localStorage.setItem(SALES_STORAGE_KEY, JSON.stringify(sales));
    setFilteredSales(sales);
  }, [sales]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const applyFilters = () => {
    setFilteredSales(
      sales.filter(s =>
        (!filters.species || s.species.toLowerCase().includes(filters.species.toLowerCase())) &&
        (!filters.date || s.saleDate === filters.date)
      )
    );
  };

  const handleSaveSale = (newSale: Sale) => {
    const updated = [...sales, { ...newSale, id: Date.now() }];
    setSales(updated);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestión de Ventas</h1>
      <FilterForm filters={filters} onChange={handleFilterChange} onFilter={applyFilters} />
      <Button onClick={() => setShowModal(true)} className={`bg-green-500 hover:bg-green-700 text-white mb-4 ${buttonClassStile}`}>
        + Registrar Nueva Venta
      </Button>
      <SalesTable sales={filteredSales} onView={setSelectedSale} />
      {showModal && <SaleModal onClose={() => setShowModal(false)} onSave={handleSaveSale} />}
      {selectedSale && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-start pt-10">
          <div className="bg-white p-6 rounded shadow-lg max-w-xl">
            <h3 className="text-xl font-bold mb-2">Detalles de la Venta</h3>
            <p><strong>Cliente:</strong> {selectedSale.client} ({selectedSale.clientLocation})</p>
            <p><strong>Producto:</strong> {selectedSale.species} ({selectedSale.productType})</p>
            <p><strong>Fecha de venta:</strong> {selectedSale.saleDate}</p>
            <p><strong>Monto Total:</strong> ${selectedSale.totalAmount.toFixed(2)}</p>
            <div className="flex justify-end mt-4">
              <Button onClick={() => setSelectedSale(null)} className={`bg-gray-500 hover:bg-gray-700 text-white ${buttonClassStile}`}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPage;