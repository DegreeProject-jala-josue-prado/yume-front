import { DataPoint } from '../types';

export const allCategories = ['Pino', 'Roble', 'Nogal', 'Abeto'];
export type WoodCategory = typeof allCategories[number];

export const woodSummaryData: DataPoint[] = [
  { month: 'Enero', inStock: 0.59, sales: 2800, category: 'Pino' },
  { month: 'Febrero', inStock: 0.54, sales: 2650, category: 'Pino' },
  { month: 'Marzo', inStock: 0.56, sales: 2950, category: 'Pino' },
  { month: 'Abril', inStock: 0.48, sales: 2750, category: 'Pino' },
  { month: 'Mayo', inStock: 0.60, sales: 3000, category: 'Pino' },
  { month: 'Junio', inStock: 0.62, sales: 2500, category: 'Pino' },
  
  { month: 'Enero', inStock: 0.50, sales: 2200, category: 'Roble' },
  { month: 'Febrero', inStock: 0.42, sales: 2400, category: 'Roble' },
  { month: 'Marzo', inStock: 0.52, sales: 2100, category: 'Roble' },
  { month: 'Abril', inStock: 0.43, sales: 1900, category: 'Roble' },
  { month: 'Mayo', inStock: 0.60, sales: 2300, category: 'Roble' },
  { month: 'Junio', inStock: 0.40, sales: 1800, category: 'Roble' },
  
  { month: 'Enero', inStock: 0.32, sales: 1500, category: 'Nogal' },
  { month: 'Febrero', inStock: 0.40, sales: 1700, category: 'Nogal' },
  { month: 'Marzo', inStock: 0.36, sales: 1600, category: 'Nogal' },
  { month: 'Abril', inStock: 0.30, sales: 1750, category: 'Nogal' },
  { month: 'Mayo', inStock: 0.32, sales: 1850, category: 'Nogal' },
  { month: 'Junio', inStock: 0.37, sales: 1650, category: 'Nogal' },
  
  { month: 'Enero', inStock: 0.32, sales: 800, category: 'Abeto' },
  { month: 'Febrero', inStock: 0.34, sales: 950, category: 'Abeto' },
  { month: 'Marzo', inStock: 0.33, sales: 750, category: 'Abeto' },
  { month: 'Abril', inStock: 0.37, sales: 900, category: 'Abeto' },
  { month: 'Mayo', inStock: 0.35, sales: 1000, category: 'Abeto' },
  { month: 'Junio', inStock: 0.31, sales: 850, category: 'Abeto' }
];

export const getDataByCategory = (category: WoodCategory): DataPoint[] => {
  return woodSummaryData.filter(item => item.category === category);
};