import Input from '../atoms/Input';
import Label from '../atoms/Label';

interface Dimension {
  diameter: number;
  length: number;
}

interface DimensionInputGroupProps {
  index: number;
  dimension: Dimension;
  onChange: (index: number, field: keyof Dimension, value: number) => void;
}

const DimensionInputGroup = ({ index, dimension, onChange }: DimensionInputGroupProps) => {
  const calculateBoardFoot = (diameter: number, length: number) => {
    return (diameter * diameter * length) / 144;
  };

  const boardFoot = calculateBoardFoot(dimension.diameter, dimension.length);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2 border-b pb-4 mb-4">
      <div>
        <Label>Diámetro (pulgadas)</Label>
        <Input 
          type="number" 
          step="0.1" 
          value={dimension.diameter} 
          onChange={e => onChange(index, 'diameter', parseFloat(e.target.value))} 
        />
      </div>
      <div>
        <Label>Largo (Pies)</Label>
        <Input 
          type="number" 
          step="0.1" 
          value={dimension.length} 
          onChange={e => onChange(index, 'length', parseFloat(e.target.value))} 
        />
      </div>
      <div>
        <Label>Pie Tablar (Calculado)</Label>
        <Input 
          type="text" 
          readOnly 
          value={0.0514 * dimension.length * dimension.diameter * dimension.diameter } 
          className="bg-gray-100" 
        />
      </div>
      <div>
        <Label>Costo (Calculado)</Label>
        <Input 
          type="text" 
          readOnly 
          value={`${(boardFoot).toFixed(2)}`}
          className="bg-gray-100" 
        />
      </div>
    </div>
  );
};

export default DimensionInputGroup;