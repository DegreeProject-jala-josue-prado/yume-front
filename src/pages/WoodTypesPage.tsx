import { useState, useEffect } from 'react';
import { WoodType } from '../types/WoodType';
import Button from '../components/atoms/Button';
import WoodTypeModal from '../components/organisms/WoodTypeModal';
import WoodTypesTable from '../components/organisms/WoodTypesTable';

const WOODTYPES_STORAGE_KEY = 'woodtypes_data';

const WoodTypesPage = () => {
  const [woodTypes, setWoodTypes] = useState<WoodType[]>(() => {
    const saved = localStorage.getItem(WOODTYPES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [
      { id: 1, commonName: 'Roble', scientificName: 'Quercus robur' },
      { id: 2, commonName: 'Pino', scientificName: 'Pinus sylvestris' },
    ];
  });
  
  const [showModal, setShowModal] = useState(false);
  const [editingWoodType, setEditingWoodType] = useState<WoodType | null>(null);

  useEffect(() => {
    localStorage.setItem(WOODTYPES_STORAGE_KEY, JSON.stringify(woodTypes));
  }, [woodTypes]);

  const handleSave = (woodTypeData: Omit<WoodType, 'id'> & { id?: number }) => {
    if (woodTypeData.id) { 
      setWoodTypes(woodTypes.map(w => w.id === woodTypeData.id ? { ...w, ...woodTypeData } as WoodType : w));
    } else { 
      setWoodTypes([...woodTypes, { ...woodTypeData, id: Date.now() }]);
    }
  };

  const handleAddNew = () => {
    setEditingWoodType(null);
    setShowModal(true);
  };
  
  const handleEdit = (woodType: WoodType) => {
    setEditingWoodType(woodType);
    setShowModal(true);
  };

  const handleDelete = (woodTypeId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este tipo de madera?')) {
      setWoodTypes(woodTypes.filter(w => w.id !== woodTypeId));
    }
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingWoodType(null);
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
      <WoodTypesTable woodTypes={woodTypes} onEdit={handleEdit} onDelete={handleDelete} />
      {showModal && (
        <WoodTypeModal 
          onClose={handleCloseModal} 
          onSave={handleSave}
          initialData={editingWoodType}
        />
      )}
    </div>
  );
};

export default WoodTypesPage;