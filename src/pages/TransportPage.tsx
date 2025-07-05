import { useState, useEffect } from 'react';
import { Transport } from '../types/Transport';
import Button from '../components/atoms/Button';
import TransportModal from '../components/organisms/TransportModal';
import TransportsTable from '../components/organisms/TransportsTable';

const TRANSPORT_STORAGE_KEY = 'transport_data';

const TransportPage = () => {
  const [transports, setTransports] = useState<Transport[]>(() => {
    const saved = localStorage.getItem(TRANSPORT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        driver: { fullName: 'Carlos Gómez', idNumber: 'V-12.345.678', contact: '555-8765' },
        vehicle: { plate: 'ABC-123', brand: 'Volvo', vin: 'VIN123456789' },
      },
      {
        id: 2,
        driver: { fullName: 'Luis Martínez', idNumber: 'V-98.765.432', contact: '555-4321' },
        vehicle: { plate: 'XYZ-789', brand: 'Scania', vin: 'VIN987654321' },
      },
    ];
  });
  
  const [showModal, setShowModal] = useState(false);
  const [editingTransport, setEditingTransport] = useState<Transport | null>(null);

  useEffect(() => {
    localStorage.setItem(TRANSPORT_STORAGE_KEY, JSON.stringify(transports));
  }, [transports]);

  const handleSave = (transportData: Omit<Transport, 'id'> & { id?: number }) => {
    if (transportData.id) { // Editing
      setTransports(transports.map(t => t.id === transportData.id ? { ...t, ...transportData } as Transport : t));
    } else { // Creating
      setTransports([...transports, { ...transportData, id: Date.now() }]);
    }
  };

  const handleAddNew = () => {
    setEditingTransport(null);
    setShowModal(true);
  };
  
  const handleEdit = (transport: Transport) => {
    setEditingTransport(transport);
    setShowModal(true);
  };

  const handleDelete = (transportId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar estos datos de transporte?')) {
      setTransports(transports.filter(t => t.id !== transportId));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTransport(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Gestión de Transporte</h1>
       <div className="flex justify-end mb-4">
        <Button 
          onClick={handleAddNew} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          + Registrar Transporte
        </Button>
      </div>
      <TransportsTable transports={transports} onEdit={handleEdit} onDelete={handleDelete} />
      {showModal && (
        <TransportModal 
          onClose={handleCloseModal} 
          onSave={handleSave} 
          initialData={editingTransport}
        />
      )}
    </div>
  );
};

export default TransportPage;
