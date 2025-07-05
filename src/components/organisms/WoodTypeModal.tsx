import { useState, useEffect } from 'react';
import { WoodType } from '../../types/WoodType';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Label from '../atoms/Label';

interface WoodTypeModalProps {
  onClose: () => void;
  onSave: (woodType: Omit<WoodType, 'id'> & { id?: number }) => void;
  initialData?: WoodType | null;
}

const WoodTypeModal = ({ onClose, onSave, initialData }: WoodTypeModalProps) => {
  const [formData, setFormData] = useState({
    commonName: '',
    scientificName: '',
  });

  const isEditing = initialData != null;

  useEffect(() => {
    if (isEditing) {
      setFormData({
        commonName: initialData.commonName,
        scientificName: initialData.scientificName,
      });
    }
  }, [initialData, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave({ ...formData, id: initialData?.id });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Editar Tipo de Madera' : 'Añadir Tipo de Madera'}</h2>
        <div className="space-y-4">
          <div>
            <Label>Nombre Común</Label>
            <Input name="commonName" value={formData.commonName} onChange={handleChange} />
          </div>
          <div>
            <Label>Nombre Científico</Label>
            <Input name="scientificName" value={formData.scientificName} onChange={handleChange} />
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancelar</Button>
          <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar</Button>
        </div>
      </div>
    </div>
  );
};

export default WoodTypeModal;