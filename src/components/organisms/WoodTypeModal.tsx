// src/components/organisms/WoodTypeModal.tsx
import { useState, useEffect, FormEvent } from 'react';
import { WoodType } from '../../types/WoodType';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

interface WoodTypeModalProps {
  onClose: () => void;
  onSave: (woodTypeData: WoodType) => void;
  initialData: WoodType | null;
}

const emptyWoodType: Omit<WoodType, 'id'> = {
  commonName: '',
  scientificName: '',
  technicalSheet: {
    family: '',
    origin: '',
    color: '',
    grain: '',
    texture: '',
  },
};

const WoodTypeModal = ({ onClose, onSave, initialData }: WoodTypeModalProps) => {
  const [formData, setFormData] = useState<Omit<WoodType, 'id'>>(emptyWoodType);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(emptyWoodType);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTechSheetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      technicalSheet: {
        ...prev.technicalSheet,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData as WoodType);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{initialData ? 'Editar' : 'Añadir'} Tipo de Madera</h2>
        <form onSubmit={handleSubmit}>
          
          <fieldset className="border p-4 rounded-md mb-6">
            <legend className="text-lg font-semibold px-2 text-gray-700">Información General</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Común</label>
                <Input name="commonName" value={formData.commonName} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Científico</label>
                <Input name="scientificName" value={formData.scientificName} onChange={handleChange} required />
              </div>
            </div>
          </fieldset>
          
          <fieldset className="border p-4 rounded-md">
            <legend className="text-lg font-semibold px-2 text-gray-700">Ficha Técnica</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Familia</label>
                <Input name="family" value={formData.technicalSheet.family} onChange={handleTechSheetChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Origen</label>
                <Input name="origin" value={formData.technicalSheet.origin} onChange={handleTechSheetChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <Input name="color" value={formData.technicalSheet.color} onChange={handleTechSheetChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Veta (Grain)</label>
                <Input name="grain" value={formData.technicalSheet.grain} onChange={handleTechSheetChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Textura</label>
                <Input name="texture" value={formData.technicalSheet.texture} onChange={handleTechSheetChange} />
              </div>
            </div>
          </fieldset>

          <div className="flex justify-end mt-6 space-x-4">
            <Button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800">
              Cancelar
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-700 text-white">
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WoodTypeModal;