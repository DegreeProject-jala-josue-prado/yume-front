import { useState, useMemo, useEffect } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import DimensionInputGroup from '../molecules/DimensionInputGroup';
import { Purchase, PurchaseFormData } from '../../types/Purchase';
import { Provider } from '../../types/Provider'; 
import { Transport } from '../../types/Transport';

const inputClassStile = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
const buttonClassStile = "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

interface PurchaseModalProps {
  onClose: () => void;
  onSave: (purchaseData: Omit<Purchase, 'id'> & { id?: number }) => void;
  initialData?: Purchase | null;
  providers: Provider[];
  transports: Transport[];
}

const PurchaseModal = ({ onClose, onSave, initialData, providers, transports }: PurchaseModalProps) => {
  const isEditing = initialData != null;

  const [formData, setFormData] = useState<PurchaseFormData>({
    species: '',
    PurchaseDate: new Date().toISOString().split('T')[0],
    providerId: '',
    transportId: '',
    cefo: '',
    woodState: 'tronca',
    unitPrice: 0,
    dimensions: [{ diameter: 0, length: 0 }]
  });

  useEffect(() => {
    if (isEditing) {
      const provider = providers.find(p => p.name === initialData.supplier);
      const transport = transports.find(t => t.vehicle.plate === initialData.plate);

      setFormData({
        species: initialData.species,
        PurchaseDate: initialData.PurchaseDate,
        providerId: provider ? String(provider.id) : '',
        transportId: transport ? String(transport.id) : '',
        cefo: initialData.cefo,
        woodState: initialData.woodState,
        unitPrice: 0, 
        dimensions: initialData.dimensions?.map(d => ({ diameter: d.diameter, length: d.length })) || [{ diameter: 0, length: 0 }],
      });
    }
  }, [initialData, isEditing, providers, transports]);


  const selectedProvider = useMemo(() => providers.find(p => String(p.id) === formData.providerId), [formData.providerId, providers]);
  const selectedTransport = useMemo(() => transports.find(t => String(t.id) === formData.transportId), [formData.transportId, transports]);

  const totalCost = useMemo(() => {
    const totalBoardFeet = formData.dimensions.reduce(
      (sum, dim) => sum + (dim.diameter * dim.diameter * dim.length) / 144, 
      0
    );
    return totalBoardFeet * formData.unitPrice;
  }, [formData.dimensions, formData.unitPrice]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDimensionChange = (index: number, field: 'diameter' | 'length', value: number) => {
    const updatedDimensions = [...formData.dimensions];
    updatedDimensions[index] = { ...updatedDimensions[index], [field]: value };
    setFormData(prev => ({ ...prev, dimensions: updatedDimensions }));
  };

  const handleAddDimension = () => {
    setFormData(prev => ({
      ...prev,
      dimensions: [...prev.dimensions, { diameter: 0, length: 0 }]
    }));
  };

  const handleSubmit = () => {
    if (!selectedProvider || !selectedTransport) {
      alert("Por favor, seleccione un proveedor y un transporte.");
      return;
    }

    const payload: Omit<Purchase, 'id'> = {
      species: formData.species,
      PurchaseDate: formData.PurchaseDate,
      supplier: selectedProvider.name,
      supplierLocation: selectedProvider.address,
      extractor: selectedProvider.name,
      driver: selectedTransport.driver.fullName,
      plate: selectedTransport.vehicle.plate,
      brand: selectedTransport.vehicle.brand,
      cefo: formData.cefo,
      totalCost,
      woodState: formData.woodState,
      dimensions: formData.dimensions.map(d => ({
        ...d,
        boardFoot: (d.diameter * d.diameter * d.length) / 144
      }))
    };
    
    onSave({ ...payload, id: initialData?.id });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-start pt-10 z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Editar Compra' : 'Registrar Nueva Compra'}</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Fecha de Compra</Label>
              <Input type="date" name="PurchaseDate" value={formData.PurchaseDate} onChange={handleChange} className={inputClassStile} />
            </div>
            <div>
              <Label>Especie de Madera</Label>
              <select name="species" value={formData.species} onChange={handleChange} className={`w-full ${inputClassStile}`}>
                <option value="">Seleccione una especie</option>
                <option value="Roble">Roble</option>
                <option value="Pino">Pino</option>
                <option value="Cedro">Cedro</option>
              </select>
            </div>
          </div>

          <fieldset className="border p-4 rounded-md">
            <legend className="text-lg font-semibold text-gray-700 px-2">Proveedor</legend>
            <select name="providerId" value={formData.providerId} onChange={handleChange} className={`w-full ${inputClassStile}`}>
              <option value="">Seleccione un proveedor</option>
              {providers.map(p => <option key={p.id} value={p.id}>{p.name} - {p.companyName}</option>)}
            </select>
            {selectedProvider && (
              <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                <p><strong>Lugar:</strong> {selectedProvider.address}</p>
              </div>
            )}
          </fieldset>

          <fieldset className="border p-4 rounded-md">
            <legend className="text-lg font-semibold text-gray-700 px-2">Transporte</legend>
            <select name="transportId" value={formData.transportId} onChange={handleChange} className={`w-full ${inputClassStile}`}>
              <option value="">Seleccione un transporte</option>
              {transports.map(t => <option key={t.id} value={t.id}>{t.driver.fullName} - {t.vehicle.plate}</option>)}
            </select>
            {selectedTransport && (
              <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                <p><strong>Chofer:</strong> {selectedTransport.driver.fullName}</p>
                <p><strong>Vehículo:</strong> {selectedTransport.vehicle.brand} ({selectedTransport.vehicle.plate})</p>
              </div>
            )}
          </fieldset>

          <div>
            <Label>Precio Unitario (por Pie Tablar)</Label>
            <Input 
              type="number" 
              name="unitPrice"
              className={inputClassStile}
              step="0.01" 
              value={formData.unitPrice} 
              onChange={handleChange} 
            />
          </div>

          <fieldset className="border p-4 rounded-md">
            <legend className="text-lg font-semibold text-gray-700 px-2">Dimensiones de Unidades de Madera</legend>
            {formData.dimensions.map((dim, i) => (
              <DimensionInputGroup 
                key={i} 
                index={i} 
                dimension={dim} 
                onChange={handleDimensionChange} 
              />
            ))}
            <Button 
              onClick={handleAddDimension} 
              className={`mt-2 text-green-600 hover:text-green-800 text-sm ${buttonClassStile}`}
            >
              + Agregar otra dimensión
            </Button>
          </fieldset>

          <div>
            <Label>Costo Total (Calculado)</Label>
            <Input 
              type="text" 
              readOnly 
              value={`${totalCost.toFixed(2)}`} 
              className="bg-gray-100 text-xl font-bold" 
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button onClick={onClose} className={`bg-gray-500 hover:bg-gray-700 text-white ${buttonClassStile}`}>Cancelar</Button>
            <Button onClick={handleSubmit} className={`bg-green-500 hover:bg-green-700 text-white ${buttonClassStile}`}>Guardar Compra</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;