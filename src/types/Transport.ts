export interface Transport {
  id: number;
  driver: {
    fullName: string;
    idNumber: string;
    contact: string;
  };
  vehicle: {
    plate: string;
    brand: string;
    vin: string; 
  };
}