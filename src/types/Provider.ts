export interface WoodSpeciesOffering {
  id: number; // ID único para la oferta (para la key de React)
  woodTypeId: number; // CLAVE: El ID que lo vincula al WoodType maestro
  woodTypeName: string; // Guardamos el nombre para mostrarlo fácilmente
  pricePerBoardFoot: number; // Precio unitario específico de este proveedor
}


export type ProviderType = 'company' | 'individual';

export interface Provider {
  id: number;
  providerType: ProviderType;
  name: string;
  companyName?: string;
  phone: string;
  address: string;
  species: WoodSpeciesOffering[]; // El array ahora contiene la nueva estructura
}