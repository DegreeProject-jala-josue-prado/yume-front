import { useMemo, useState } from "react";
import Product from "../../types/Product";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import InputGroup from "../molecules/ItemGroup";
import Client from "../../types/Client";
import MetaData from "../../types/MetaData";

type ProductField = keyof Pick<Product, 'quantity' | 'unitPrice'>;
const inputClassStile = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
const buttonClassStile = "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

interface SaleModalProps {
  onClose: () => void;
  onSave: (saleData: {
    id: number;
    species: string;
    productType: string;
    saleDate: string;
    client: string;
    clientLocation: string;
    totalAmount: number;
  }) => void;
}

const SaleModal = ({ onClose, onSave }: SaleModalProps) => {
  const [product, setProduct] = useState<Product[]>([{ quantity: 0, unitPrice: 0 }]);
  const [client, setClient] = useState<Client>({ name: '', location: '' });
  const [meta, setMeta] = useState<MetaData>({ date: '', species: '', type: '' });

  const totalAmount = useMemo(
    () => product.reduce((sum, p) => sum + p.quantity * p.unitPrice, 0),
    [product]
  );

  const handleChange = (i: number, field: ProductField, value: number) => {
    const updated = [...product];
    updated[i] = {
      ...updated[i],
      [field]: value,
    };
    setProduct(updated);
  };

  const handleAddProduct = () => {
    setProduct([...product, { quantity: 0, unitPrice: 0 }]);
  };

  const handleSubmit = () => {
    onSave({
      id: Date.now(),
      species: meta.species,
      productType: meta.type,
      saleDate: meta.date,
      client: client.name,
      clientLocation: client.location,
      totalAmount,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-start pt-10 z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Registrar Nueva Venta</h2>
          <button onClick={onClose} className={`text-xl font-bold text-gray-600 hover:text-gray-900 ${buttonClassStile}`}>×</button>
        </div>
        <div className="space-y-4">
          <div>
            <Label>Producto / Especie</Label>
            <select 
              className="w-full border rounded p-2" 
              value={meta.species}
              onChange={e => setMeta({ ...meta, type: 'Tablon', species: e.target.value })}
            >
              <option value="">Seleccione un producto</option>
              <option value="Roble">Tablones de Roble</option>
              <option value="Pino">Tablones de Pino</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Cliente</Label>
              <Input 
                className={inputClassStile} 
                value={client.name} 
                onChange={e => setClient({ ...client, name: e.target.value })} 
              />
            </div>
            <div>
              <Label>Ubicación</Label>
              <Input 
                className={inputClassStile} 
                value={client.location} 
                onChange={e => setClient({ ...client, location: e.target.value })} 
              />
            </div>
          </div>
          <div>
            <Label>Fecha de Venta</Label>
            <Input 
              className={inputClassStile} 
              type="date" 
              value={meta.date} 
              onChange={e => setMeta({ ...meta, date: e.target.value })} 
            />
          </div>
          <fieldset className="border p-4 rounded-md">
            <legend className="text-lg font-semibold text-gray-700 px-2">Detalles del Producto</legend>
            {product.map((p, i) => (
              <InputGroup key={i} index={i} product={p} onChange={handleChange} />
            ))}
            <Button 
              onClick={handleAddProduct} 
              className={`mt-2 text-green-600 hover:text-green-800 text-sm ${buttonClassStile}`}
            >
              + Agregar otro producto
            </Button>
          </fieldset>
          <div>
            <Label>Monto Total Venta</Label>
            <Input 
              type="text" 
              readOnly 
              value={`${totalAmount.toFixed(2)}`} 
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
              Guardar Venta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleModal;