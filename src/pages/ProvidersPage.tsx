// src/pages/ProvidersPage.tsx

import React, { useState, useEffect } from 'react';
import { Provider } from '../types/Provider';
import { WoodType } from '../types/WoodType'; // Importamos el tipo de madera
import Button from '../components/atoms/Button';
import ProviderModal from '../components/organisms/ProviderModal';
import ProvidersTable from '../components/organisms/ProvidersTable';

const PROVIDERS_STORAGE_KEY = 'providers_data_v3'; // Incrementa la versión para evitar conflictos
const WOODTYPES_STORAGE_KEY = 'woodtypes_data'; // La clave que usa tu WoodTypesPage

const ProvidersPage = () => {
  const [providers, setProviders] = useState<Provider[]>(() => {
    try {
      const saved = localStorage.getItem(PROVIDERS_STORAGE_KEY);
      // Actualizamos los datos de ejemplo a la nueva estructura
      return saved ? JSON.parse(saved) : [
        { 
          id: 1, 
          providerType: 'company',
          name: 'Juan Pérez', 
          companyName: 'Maderas del Norte', 
          phone: '111-2222', 
          address: 'Bosque Lejano 45, Valdivia',
          species: [
            { id: 101, woodTypeId: 1, woodTypeName: 'Roble', pricePerBoardFoot: 8.20 },
            { id: 102, woodTypeId: 2, woodTypeName: 'Pino', pricePerBoardFoot: 3.50 },
          ]
        },
      ];
    } catch (error) {
      console.error("Error al leer datos de proveedores:", error);
      return [];
    }
  });

  // NUEVO ESTADO: para almacenar la lista maestra de tipos de madera
  const [allWoodTypes, setAllWoodTypes] = useState<WoodType[]>([]);
  
  const [showModal, setShowModal] = useState(false);
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null);

  // NUEVO useEffect: para cargar los tipos de madera al montar la página
  useEffect(() => {
    try {
      const savedWoodTypes = localStorage.getItem(WOODTYPES_STORAGE_KEY);
      if (savedWoodTypes) {
        setAllWoodTypes(JSON.parse(savedWoodTypes));
      }
    } catch (error) {
      console.error("Error al leer tipos de madera:", error);
      setAllWoodTypes([]);
    }
  }, []); // El array vacío asegura que se ejecute solo una vez

  useEffect(() => {
    localStorage.setItem(PROVIDERS_STORAGE_KEY, JSON.stringify(providers));
  }, [providers]);

  const handleSave = (providerData: Omit<Provider, 'id'> & { id?: number }) => {
    if (providerData.id) {
      setProviders(providers.map(p => 
        p.id === providerData.id ? { ...p, ...providerData, id: providerData.id } : p
      ));
    } else {
      const newProvider: Provider = {
        id: Date.now(),
        providerType: providerData.providerType,
        name: providerData.name,
        companyName: providerData.companyName,
        phone: providerData.phone,
        address: providerData.address,
        species: providerData.species,
      };
      setProviders([...providers, newProvider]);
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
    <div className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Proveedores</h1>
        <Button 
          onClick={handleAddNew} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          + Registrar Proveedor
        </Button>
      </header>
      
      <main>
        <ProvidersTable providers={providers} onEdit={handleEdit} onDelete={handleDelete} />
      </main>

      {showModal && (
        <ProviderModal 
          onClose={handleCloseModal} 
          onSave={handleSave} 
          initialData={editingProvider}
          allWoodTypes={allWoodTypes} // PASAMOS EL PROP AL MODAL
        />
      )}
    </div>
  );
};

export default ProvidersPage;