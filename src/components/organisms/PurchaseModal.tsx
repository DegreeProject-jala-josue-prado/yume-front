import { useState, useMemo } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import { PurchaseFormData } from '../../types/Purchase';
import DimensionInputGroup from '../molecules/DimensionInputGroup';

const inputClassStile = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
const buttonClassStile = "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

interface PurchaseModalProps {
  onClose: () => void;
  onSave: (purchaseData: {
    id: number;
    species: string;
    PurchaseDate: string;
    supplier: string;
    supplierLocation: string;
    extractor: string;
    entryDate: string;
    driver: string;
    plate: string;
    brand: string;
    cefo: string;
    totalCost: number;
    woodState: 'tronca' | 'seca_tablones';
  }) => void;
}

const PurchaseModal = ({ onClose, onSave }: PurchaseModalProps) => {
  const [formData, setFormData] = useState<PurchaseFormData>({
    species: '',
    PurchaseDate: new Date().toISOString().split('T')[0],
    supplier: '',
    supplierLocation: '',
    extractor: '',
    entryDate: '',
    driver: '',
    plate: '',
    brand: '',
    cefo: '',
    woodState: 'tronca',
    unitPrice: 0,
    dimensions: [{ diameter: 0, length: 0 }]
  });

  const totalCost = useMemo(() => {
    const boardFeet = formData.dimensions.reduce(
      (sum, dim) => sum + (dim.diameter * dim.diameter * dim.length) / 144, 
      0
    );
    return boardFeet * formData.unitPrice;
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
    onSave({
      id: Date.now(),
      species: formData.species,
      PurchaseDate: formData.PurchaseDate,
      supplier: formData.supplier,
      supplierLocation: formData.supplierLocation,
      extractor: formData.extractor,
      entryDate: formData.entryDate,
      driver: formData.driver,
      plate: formData.plate,
      brand: formData.brand,
      cefo: formData.cefo,
      totalCost,
      woodState: formData.woodState
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-start pt-10 z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Registrar Nueva Compra</h2>
          <button 
            onClick={onClose} 
            className={`text-xl font-bold text-gray-600 hover:text-gray-900 ${buttonClassStile}`}
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <Label>Especie de Madera</Label>
            <select 
              name="species"
              className={`w-full ${inputClassStile}`} 
              value={formData.species}
              onChange={handleChange}
            >
              <option value="">Seleccione una especie</option>
              <option value="Roble">Roble</option>
              <option value="Pino">Pino</option>
              <option value="Cedro">Cedro</option>
            </select>
          </div>

          <div>
            <Label>Estado de Madera</Label>
            <div className="flex items-center space-x-4 mt-1">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="woodState" 
                  value="tronca" 
                  checked={formData.woodState === 'tronca'}
                  onChange={() => setFormData(prev => ({ ...prev, woodState: 'tronca' }))}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">Tronca (materia prima)</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="woodState" 
                  value="seca_tablones" 
                  checked={formData.woodState === 'seca_tablones'}
                  onChange={() => setFormData(prev => ({ ...prev, woodState: 'seca_tablones' }))}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">Madera seca / Tablones</span>
              </label>
            </div>
          </div>

          <fieldset className="border p-4 rounded-md">
            <legend className="text-lg font-semibold text-gray-700 px-2">Proveedor</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <Label>Nombre del Proveedor</Label>
                <Input 
                  name="supplier"
                  className={inputClassStile}
                  value={formData.supplier} 
                  onChange={handleChange} 
                />
              </div>
              <div>
                <Label>Lugar</Label>
                <Input 
                  name="supplierLocation"
                  className={inputClassStile}
                  value={formData.supplierLocation} 
                  onChange={handleChange} 
                />
              </div>
              <div>
                <Label>Extractor</Label>
                <Input 
                  name="extractor"
                  className={inputClassStile}
                  value={formData.extractor} 
                  onChange={handleChange} 
                />
              </div>
              <div>
                <Label>Fecha de Ingreso</Label>
                <Input 
                  type="date" 
                  name="entryDate"
                  className={inputClassStile}
                  value={formData.entryDate} 
                  onChange={handleChange} 
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="border p-4 rounded-md">
            <legend className="text-lg font-semibold text-gray-700 px-2">Datos de Transporte</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <Label>Chofer</Label>
                <Input 
                  name="driver"
                  className={inputClassStile}
                  value={formData.driver} 
                  onChange={handleChange} 
                />
              </div>
              <div>
                <Label>Número de Placa</Label>
                <Input 
                  name="plate"
                  className={inputClassStile}
                  value={formData.plate} 
                  onChange={handleChange} 
                />
              </div>
              <div>
                <Label>Marca</Label>
                <Input 
                  name="brand"
                  className={inputClassStile}
                  value={formData.brand} 
                  onChange={handleChange} 
                />
              </div>
              <div>
                <Label>Número de CEFO</Label>
                <Input 
                  name="cefo"
                  className={inputClassStile}
                  value={formData.cefo} 
                  onChange={handleChange} 
                />
              </div>
            </div>
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
            <Button 
              onClick={onClose} 
              className={`bg-gray-500 hover:bg-gray-700 text-white ${buttonClassStile}`}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit} 
              className={`bg-green-500 hover:bg-green-700 text-white ${buttonClassStile}`}
            >
              Guardar Compra
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;