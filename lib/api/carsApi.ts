import api from "@/lib/api/api";
import { CarId, Cars, Filter } from "@/types/types";

interface FetchParams {
  page?: number;
  limit?: number;
  filters?: Filter;
}

export const fetchCars = async ({
  page = 1,
  limit = 12,
  filters,
}: FetchParams = {}): Promise<Cars> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (filters?.brand) {
    params.append("brand", filters.brand);
  }
  if (filters?.rentalPrice) {
    params.append("rentalPrice", filters.rentalPrice);
  }

  if (filters?.mileageFrom) {
    params.append("minMileage", filters.mileageFrom);
  }

  if (filters?.mileageTo) {
    params.append("maxMileage", filters.mileageTo);
  }

  const { data } = await api.get<Cars>(`/cars?${params.toString()}`);

  return data;
};

export const fetchCarById = async (id: string): Promise<CarId> => {
  const { data } = await api.get<CarId>(`/cars/${id}`);
  return data;
};

export const fetchBrands = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>("/brands");
  return data;
};
