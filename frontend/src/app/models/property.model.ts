export interface Property {
  id?: number; 
  propertyType: string;
  numberOfRooms: number;
  numberOfBathrooms: number;
  hasBalcony: boolean;
  squareMeters: number;
  address: string;
  price: number;
  status: string;
}