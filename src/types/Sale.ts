interface Sale {
  id: number | string;
  species: string;
  productType: string;
  saleDate: string;
  client: string;
  clientLocation: string;
  totalAmount: number;
}

export default Sale;