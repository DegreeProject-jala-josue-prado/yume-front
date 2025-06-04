import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Label from '../atoms/Label';

const buttonClassStile = "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
const inputClassStile = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

interface FilterFormProps {
  filters: {
    species: string;
    date: string;
  };
  onChange: (key: keyof FilterFormProps['filters'], value: string) => void;
  onFilter: () => void;
}

const PurchaseFilterForm = ({ filters, onChange, onFilter }: FilterFormProps) => (
  <div className="mb-6 p-4 bg-white shadow rounded-lg">
    <h2 className="text-xl font-semibold mb-4 text-gray-700">Filtrar Compras</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label htmlFor="species">Especie de Madera</Label>
        <Input 
          id="species" 
          className={inputClassStile}
          value={filters.species} 
          onChange={e => onChange('species', e.target.value)} 
          placeholder="Ej: Roble" 
        />
      </div>  
      <div>
        <Label htmlFor="date">Fecha de Registro</Label>
        <Input 
          id="date" 
          type="date" 
          className={inputClassStile}
          value={filters.date} 
          onChange={e => onChange('date', e.target.value)} 
        />
      </div>
      <div className="flex items-end">
        <Button 
          className={`bg-blue-500 hover:bg-blue-700 text-white w-full md:w-auto ${buttonClassStile}`} 
          onClick={onFilter}
        >
          Buscar / Filtrar
        </Button>
      </div>
    </div>
  </div>
);

export default PurchaseFilterForm;