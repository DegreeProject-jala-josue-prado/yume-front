interface Purchase {
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
  woodState?: 'tronca' | 'seca_tablones';
  dimensions?: {
    diameter: number;
    length: number;
    boardFoot: number;
    costPerBoardFoot: number;
  }[];
}

interface PurchaseFormData {
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
  woodState: 'tronca' | 'seca_tablones';
  unitPrice: number;
  dimensions: {
    diameter: number;
    length: number;
  }[];
}

export type {Purchase, PurchaseFormData}; 
