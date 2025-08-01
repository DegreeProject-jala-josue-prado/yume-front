// src/pages/WoodTypesPage.tsx
import { useState, useEffect } from 'react';
import { WoodType } from '../types/WoodType';
import Button from '../components/atoms/Button';
import WoodTypeModal from '../components/organisms/WoodTypeModal'; // Modal para crear/editar
import WoodTypesTable from '../components/organisms/WoodTypesTable';
import WoodTypeDetailsModal from '../components/organisms/WoodTypeDetailsModal'; // Modal para ver detalles

const WOODTYPES_STORAGE_KEY = 'woodtypes_data';

// Datos iniciales actualizados con la nueva estructura
const initialData: WoodType[] = [
  { 
    id: 1, 
    commonName: 'Roble Americano', 
    scientificName: 'Quercus alba',
    technicalSheet: {
      family: 'Fagaceae',
      origin: 'América del Norte',
      color: 'Marrón claro a medio',
      grain: 'Recta',
      texture: 'Media a gruesa'
    } 
  },
  { 
    id: 2, 
    commonName: 'Pino Oregón', 
    scientificName: 'Pseudotsuga menziesii',
    technicalSheet: {
      family: 'Pinaceae',
      origin: 'América del Norte',
      color: 'Amarillo rojizo',
      grain: 'Recta',
      texture: 'Media'
    }
  },
];


const WoodTypesPage = () => {
  const [woodTypes, setWoodTypes] = useState<WoodType[]>(() => {
    const saved = localStorage.getItem(WOODTYPES_STORAGE_KEY);
    // Se parsea y si no existe, se usan los datos iniciales
    return saved ? JSON.parse(saved) : initialData;
  });
  
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingWoodType, setEditingWoodType] = useState<WoodType | null>(null);
  
  // --- NUEVO: Estado para el modal de detalles ---
  const [viewingWoodType, setViewingWoodType] = useState<WoodType | null>(null);

  useEffect(() => {
    localStorage.setItem(WOODTYPES_STORAGE_KEY, JSON.stringify(woodTypes));
  }, [woodTypes]);

  // handleSave ahora recibe el objeto completo, incluyendo technicalSheet
  const handleSave = (woodTypeData: WoodType) => {
    if (editingWoodType) { // Editando existente
      setWoodTypes(woodTypes.map(w => w.id === editingWoodType.id ? { ...woodTypeData, id: editingWoodType.id } : w));
    } else { // Creando nuevo
      setWoodTypes([...woodTypes, { ...woodTypeData, id: Date.now() }]);
    }
  };

  const handleAddNew = () => {
    setEditingWoodType(null); // Limpiamos para asegurar que es un formulario nuevo
    setEditModalOpen(true);
  };
  
  const handleEdit = (woodType: WoodType) => {
    setEditingWoodType(woodType);
    setEditModalOpen(true);
  };

  const handleDelete = (woodTypeId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este tipo de madera?')) {
      setWoodTypes(woodTypes.filter(w => w.id !== woodTypeId));
    }
  };
  
  // --- NUEVO: Manejador para abrir el modal de detalles ---
  const handleViewDetails = (woodType: WoodType) => {
    setViewingWoodType(woodType);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditingWoodType(null);
  };

  // --- NUEVO: Manejador para cerrar el modal de detalles ---
  const handleCloseDetailsModal = () => {
    setViewingWoodType(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Tipos de Madera</h1>
      <div className="flex justify-end mb-4">
        <Button 
          onClick={handleAddNew} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          + Añadir Tipo de Madera
        </Button>
      </div>
      <WoodTypesTable 
        woodTypes={woodTypes} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
        onViewDetails={handleViewDetails} // <-- Pasamos la nueva prop
      />
      
      {/* Modal para Crear/Editar */}
      {isEditModalOpen && (
        <WoodTypeModal 
          onClose={handleCloseEditModal} 
          onSave={handleSave}
          initialData={editingWoodType}
        />
      )}

      {/* NUEVO: Modal para ver los detalles */}
      {viewingWoodType && (
        <WoodTypeDetailsModal
          onClose={handleCloseDetailsModal}
          woodType={viewingWoodType}
        />
      )}
    </div>
  );
};

export default WoodTypesPage;