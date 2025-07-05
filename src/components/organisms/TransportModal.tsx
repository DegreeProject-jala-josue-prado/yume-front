import { useState, useEffect } from 'react';
import { Transport } from '../../types/Transport';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Label from '../atoms/Label';

interface TransportModalProps {
  onClose: () => void;
  onSave: (transport: Omit<Transport, 'id'> & { id?: number }) => void;
  initialData?: Transport | null;
}

const TransportModal = ({ onClose, onSave, initialData }: TransportModalProps) => {
  const [formData, setFormData] = useState<Omit<Transport, 'id'>>({
    driver: { fullName: '', idNumber: '', contact: '' },
    vehicle: { plate: '', brand: '', vin: '' },
  });

  const isEditing = initialData != null;

  useEffect(() => {
    if (isEditing) {
      setFormData({
        driver: initialData.driver,
        vehicle: initialData.vehicle,
      });
    }
  }, [initialData, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.'); // e.g., "driver.fullName"

    if (section === 'driver' || section === 'vehicle') {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    }
  };

  const handleSubmit = () => {
    onSave({ ...formData, id: initialData?.id });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-start pt-10 z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Editar Transporte' : 'Registrar Transporte'}</h2>
        <div className="space-y-6">
          <fieldset className="border p-4 rounded-md">
            <legend className="text-lg font-semibold text-gray-700 px-2">Datos del Chofer</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <Label>Nombre Completo</Label>
                <Input name="driver.fullName" value={formData.driver.fullName} onChange={handleChange} />
              </div>
              <div>
                <Label>N° de Identificación (Cédula/Licencia)</Label>
                <Input name="driver.idNumber" value={formData.driver.idNumber} onChange={handleChange} />
              </div>
              <div>
                <Label>Contacto (Teléfono)</Label>
                <Input name="driver.contact" value={formData.driver.contact} onChange={handleChange} />
              </div>
            </div>
          </fieldset>
          
          <fieldset className="border p-4 rounded-md">
            <legend className="text-lg font-semibold text-gray-700 px-2">Datos del Vehículo</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <Label>N° de Placa</Label>
                <Input name="vehicle.plate" value={formData.vehicle.plate} onChange={handleChange} />
              </div>
              <div>
                <Label>Marca</Label>
                <Input name="vehicle.brand" value={formData.vehicle.brand} onChange={handleChange} />
              </div>
              <div>
                <Label>N° de Identificación (VIN)</Label>
                <Input name="vehicle.vin" value={formData.vehicle.vin} onChange={handleChange} />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancelar</Button>
          <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar</Button>
        </div>
      </div>
    </div>
  );
};

export default TransportModal;