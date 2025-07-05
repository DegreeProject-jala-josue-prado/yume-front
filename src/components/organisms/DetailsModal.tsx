import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Colores para el gráfico interno
const MODAL_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: any;
  type: 'list' | 'chart' | 'text'; // Nuevo: define qué renderizar
}

const DetailsModal: React.FC<DetailsModalProps> = ({ isOpen, onClose, title, data, type }) => {
  if (!isOpen) return null;

  // Función para preparar los datos para el gráfico de torta
  const formatDataForPieChart = (chartData: object) => {
    // Transforma { "Tronco": 10, "Tablón seco": 12 } a [{ name: "Tronco", value: 10 }, ...]
    return Object.entries(chartData)
      .filter(([key]) => key !== 'semana') // Excluimos la clave 'semana'
      .map(([name, value]) => ({ name, value }));
  };

  const renderContent = () => {
    switch (type) {
      case 'list':
        return (
          <ul className="list-disc list-inside space-y-2">
            {Array.isArray(data) ? (
              data.map((item, index) => <li key={index}>{item}</li>)
            ) : <p>No hay detalles en la lista.</p>}
          </ul>
        );
      
      case 'chart':
        { const chartData = formatDataForPieChart(data);
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={MODAL_COLORS[index % MODAL_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ); }

      case 'text':
      default:
        return <p>{data}</p>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">×</button>
        </div>
        <div className="mt-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default DetailsModal;