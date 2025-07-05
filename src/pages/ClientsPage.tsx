import { useState, useEffect } from 'react';
import { Client } from '../types/Client';
import Button from '../components/atoms/Button';
import ClientModal from '../components/organisms/ClientModal';
import ClientsTable from '../components/organisms/ClientsTable';

const CLIENTS_STORAGE_KEY = 'clients_data';

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem(CLIENTS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Constructora XYZ', phone: '555-1234', address: 'Calle Falsa 123' },
      { id: 2, name: 'Mueblería El Buen Diseño', phone: '555-5678', address: 'Av. Siempre Viva 742' },
    ];
  });

  const [filteredClients, setFilteredClients] = useState<Client[]>(clients);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clients));
    const filtered = clients.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClients(filtered);
  }, [clients, searchTerm]);

  const handleSaveClient = (clientData: Omit<Client, 'id'> & { id?: number }) => {
    if (clientData.id) { // Editing
      setClients(clients.map(c => c.id === clientData.id ? { ...c, ...clientData } as Client : c));
    } else { // Creating
      setClients([...clients, { ...clientData, id: Date.now() }]);
    }
  };

  const handleAddNew = () => {
    setEditingClient(null);
    setShowModal(true);
  };
  
  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setShowModal(true);
  };

  const handleDelete = (clientId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      setClients(clients.filter(c => c.id !== clientId));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingClient(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Gestión de Clientes</h1>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre o dirección..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded shadow-sm w-1/3"
        />
        <Button 
          onClick={handleAddNew} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          + Registrar Nuevo Cliente
        </Button>
      </div>
      <ClientsTable clients={filteredClients} onEdit={handleEdit} onDelete={handleDelete} />
      {showModal && (
        <ClientModal 
          onClose={handleCloseModal} 
          onSave={handleSaveClient} 
          initialData={editingClient} 
        />
      )}
    </div>
  );
};

export default ClientsPage;