import React, { useState, useEffect } from 'react';
import { Provider } from '../../types/Provider';
import { WoodType } from '../../types/WoodType';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Label from '../atoms/Label';

type ProviderFormData = Omit<Provider, 'id'>;

interface ProviderModalProps {
  onClose: () => void;
  onSave: (provider: ProviderFormData & { id?: number }) => void;
  initialData?: Provider | null;
  allWoodTypes: WoodType[]; // NUEVO PROP: Recibimos la lista maestra de maderas
}

const ProviderModal = ({ onClose, onSave, initialData, allWoodTypes }: ProviderModalProps) => {
  const isEditing = initialData != null;

  const [formData, setFormData] = useState<ProviderFormData>({
    providerType: 'company',
    name: '',
    companyName: '',
    phone: '',
    address: '',
    species: [],
  });

  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        providerType: initialData.providerType,
        name: initialData.name,
        companyName: initialData.companyName || '',
        phone: initialData.phone,
        address: initialData.address,
        species: initialData.species,
      });
    }
  }, [initialData, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSpeciesChange = (offeringId: number, field: 'woodTypeId' | 'pricePerBoardFoot', value: string) => {
    const updatedSpecies = formData.species.map(specie => {
      if (specie.id === offeringId) {
        if (field === 'woodTypeId') {
          const selectedWood = allWoodTypes.find(w => w.id === Number(value));
          return {
            ...specie,
            woodTypeId: Number(value),
            woodTypeName: selectedWood ? selectedWood.commonName : '',
          };
        }
        if (field === 'pricePerBoardFoot') {
          return { ...specie, pricePerBoardFoot: value === '' ? 0 : Number(value) };
        }
      }
      return specie;
    });
    setFormData(prev => ({ ...prev, species: updatedSpecies }));
  };
  
  const handleAddSpecies = () => {
    setFormData(prev => ({
      ...prev,
      species: [
        ...prev.species,
        { id: Date.now(), woodTypeId: 0, woodTypeName: '', pricePerBoardFoot: 0 }
      ]
    }));
  };
  
  const handleRemoveSpecies = (speciesId: number) => {
    setFormData(prev => ({
      ...prev,
      species: prev.species.filter(s => s.id !== speciesId)
    }));
  };
  
  const handleSubmit = () => {
    // Filtramos cualquier fila de especie que no tenga un tipo de madera seleccionado
    const validFormData = {
      ...formData,
      species: formData.species.filter(s => s.woodTypeId !== 0)
    }
    onSave({ ...validFormData, id: initialData?.id });
    onClose();
  };

  const isCompanyType = formData.providerType === 'company';

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto p-4">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-2xl transform transition-all">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{isEditing ? 'Editar Proveedor' : 'Registrar Nuevo Proveedor'}</h2>
        
        <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {/* ... campos de datos generales (sin cambios) ... */}
          <div>
            <Label htmlFor="providerType">Tipo de Proveedor</Label>
            <select id="providerType" name="providerType" value={formData.providerType} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              <option value="company">Empresa (Representante)</option>
              <option value="individual">Individual (Solitario)</option>
            </select>
          </div>
          <div>
            <Label htmlFor="name">{isCompanyType ? 'Nombre del Contacto' : 'Nombre del Proveedor'}</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>
          {isCompanyType && (
            <div>
              <Label htmlFor="companyName">Nombre de la Empresa</Label>
              <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} />
            </div>
          )}
          <div>
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="address">Dirección</Label>
            <Input id="address" name="address" value={formData.address} onChange={handleChange} />
          </div>
        </fieldset>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Especies de Madera y Precio unitario (Pie tablar)</h3>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
            {formData.species.map((specie) => {
               // Filtra las maderas que ya están seleccionadas por este proveedor
               const availableOptions = allWoodTypes.filter(wood => 
                !formData.species.some(s => s.woodTypeId === wood.id && s.id !== specie.id)
               );

              return (
                <div key={specie.id} className="grid grid-cols-12 gap-2 items-center p-2 bg-gray-50 rounded-md border border-gray-200">
                  <div className="col-span-6">
                    <select
                      value={specie.woodTypeId}
                      onChange={(e) => handleSpeciesChange(specie.id, 'woodTypeId', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value={0} disabled>-- Seleccione una madera --</option>
                      
                      {specie.woodTypeId !== 0 && (
                        <option value={specie.woodTypeId}>{specie.woodTypeName}</option>
                      )}
                      {availableOptions.map(wood => (
                        <option key={wood.id} value={wood.id}>{wood.commonName}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-5 relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">Bs</span>
                    <Input
                      type="number"
                      placeholder="Precio"
                      className="pl-7"
                      value={specie.pricePerBoardFoot}
                      onChange={(e) => handleSpeciesChange(specie.id, 'pricePerBoardFoot', e.target.value)}
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button type="button" onClick={() => handleRemoveSpecies(specie.id)} className="text-red-500 hover:text-red-700 font-bold">×</button>
                  </div>
                </div>
              )
            })}
             {formData.species.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">Aún no se han agregado especies.</p>
            )}
          </div>
          <Button onClick={handleAddSpecies} className="mt-3 bg-green-100 text-green-800 hover:bg-green-200 text-sm font-semibold py-1 px-3 rounded-md">
            + Agregar Especie
          </Button>
        </div>

        <div className="flex justify-end space-x-4 mt-8 pt-4 border-t">
          <Button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md">Cancelar</Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Guardar Cambios</Button>
        </div>
      </div>
    </div>
  );
};

export default ProviderModal;