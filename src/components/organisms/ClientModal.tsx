import { useState, useEffect } from 'react';
import { Client } from '../../types/Client';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Label from '../atoms/Label';

interface ClientModalProps {
  onClose: () => void;
  onSave: (client: Omit<Client, 'id'> & { id?: number }) => void;
  initialData?: Client | null;
}

const ClientModal = ({ onClose, onSave, initialData }: ClientModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const isEditing = initialData != null;

  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: initialData.name,
        phone: initialData.phone,
        address: initialData.address,
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
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}</h2>
        <div className="space-y-4">
          <div>
            <Label>Nombre Completo</Label>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <Label>Teléfono</Label>
            <Input name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div>
            <Label>Dirección</Label>
            <Input name="address" value={formData.address} onChange={handleChange} />
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

export default ClientModal;