import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DataPoint } from '../../types';

interface Props {
  data: DataPoint[];
}

export const InventorySalesChart: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis 
          yAxisId="left" 
          label={{
            value: 'Ventas ($)',
            angle: -90, 
            position: 'left',
            offset: -10, 
            style: { 
              textAnchor: 'middle',
            }
          }}
          domain={[0, 1]} 
          tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} 
        />
        <YAxis 
          yAxisId="right" 
          orientation="right" 
          label={{
            value: 'En Invetario ($)',
            angle: 90, 
            position: 'right',
            offset: 0, 
            style: { 
              textAnchor: 'middle',
            }
          }}
          domain={[600, 4000]} 
          tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`} 
        />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="inStock" stroke="#8884d8" name="En-Inventario %" />
        <Line yAxisId="right" type="monotone" dataKey="sales" stroke="#82ca9d" name="Ventas ($)" />
      </LineChart>
    </ResponsiveContainer>
  );
};
