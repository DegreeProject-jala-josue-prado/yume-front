import { useState } from 'react';
import { KPICards } from '../components/molecules/KPICard';
import { CategoryFilter } from '../components/organisms/CategoryFinter';
import { InventorySalesChart } from '../components/organisms/InventorySalesChart';
import { allCategories, woodSummaryData } from '../utils/WoodSummaryData';

export default function ReportPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Pino']);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const filteredData = woodSummaryData.filter(d => selectedCategories.includes(d.category));
  const totalSales = filteredData.reduce((sum, item) => sum + item.sales, 0) / 1_000_00;
  const avgInventory = filteredData.length > 0
    ? filteredData.reduce((sum, item) => sum + item.inStock, 0) / filteredData.length
    : 0;


  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Ventas vs Nivel de inventario</h1>
      <KPICards totalSales={totalSales} avgInventory={avgInventory} />
      <CategoryFilter 
        categories={allCategories}
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
      />
      <InventorySalesChart data={filteredData} />
    </div>
  );
}
