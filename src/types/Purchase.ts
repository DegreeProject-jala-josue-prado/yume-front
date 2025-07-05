export interface Purchase {
  id: number;
  species: string;
  PurchaseDate: string;
  supplier: string;
  supplierLocation: string;
  extractor: string;
  driver: string;
  plate: string;
  brand: string;
  cefo: string;
  totalCost: number;
  woodState: 'tronca' | 'seca_tablones';
  dimensions: { 
    diameter: number;
    length: number;
    boardFoot: number;
  }[];
}

export interface PurchaseFormData {
  species: string;
  PurchaseDate: string;
  providerId: string; 
  transportId: string;
  cefo: string;
  woodState: 'tronca' | 'seca_tablones';
  unitPrice: number;
  dimensions: {
    diameter: number;
    length: number;
  }[];
}