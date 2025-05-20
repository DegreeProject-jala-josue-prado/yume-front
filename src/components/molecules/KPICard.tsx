interface Props {
  totalSales: number;
  avgInventory: number;
}

export const KPICards: React.FC<Props> = ({ totalSales, avgInventory }) => {
  return (
    <div className="flex justify-around my-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold">{totalSales.toFixed(2)} mil</h2>
        <p className="text-gray-500">Ventas ($)</p>
      </div>
      <div className="text-center">
        <h2 className="text-4xl font-bold">{avgInventory.toFixed(2)} mil</h2>
        <p className="text-gray-500">Inventario promedio ($)</p>
      </div>
    </div>
  );
};
