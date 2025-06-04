import Product from "../../types/Product";
import Input from "../atoms/Input";
import Label from "../atoms/Label";

interface InputGroupProps {
  index: number;
  product: Product;
  onChange: (index: number, field: keyof Product, value: number) => void;
}

const inputClassStile = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

const InputGroup = ({ index, product, onChange }: InputGroupProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
    <div>
      <Label>Cantidad</Label>
      <Input type="number" className={inputClassStile} step="1" value={product.quantity} onChange={e => onChange(index, 'quantity', +e.target.value)} />
    </div>
    <div>
      <Label>Precio Unitario</Label>
      <Input type="number" className={inputClassStile} step="0.01" value={product.unitPrice} onChange={e => onChange(index, 'unitPrice', +e.target.value)} />
    </div>
    <div>
      <Label>Subtotal (Calculado)</Label>
      <Input type="text" className={`${inputClassStile} bg-gray-100`} readOnly value={`${(product.quantity * product.unitPrice).toFixed(2)}`} />
    </div>
  </div>
);

export default InputGroup;