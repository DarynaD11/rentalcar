export interface CarId {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}

export interface Cars {
  cars: CarId[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export interface Filter {
  brand?: string;
  rentalPrice?: string;
  mileageFrom?: string;
  mileageTo?: string;
}
