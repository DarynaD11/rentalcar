import { CarId, Filter } from "@/types/types";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { fetchBrands, fetchCars } from "../api/carsApi";

interface CarState {
  cars: CarId[];
  favorites: CarId[];
  brands: string[];
  isLoading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  filters: Filter;

  loadCars: (isLoadMore?: boolean) => Promise<void>;
  loadBrands: () => Promise<void>;
  setFilter: (key: keyof Filter, value: string) => void;
  toggleFavorite: (car: CarId) => void;
  resetCars: () => void;
}

export const carStore = create<CarState>()(
  devtools(
    persist(
      (set, get) => ({
        cars: [],
        favorites: [],
        brands: [],
        isLoading: false,
        error: null,
        page: 1,
        totalPages: 1,
        filters: {},

        loadCars: async (isLoadMore = false) => {
          set({ isLoading: true, error: null });
          const { page, filters, cars } = get();

          try {
            const data = await fetchCars({ page, filters });

            const newCars = data.cars || data;
            const totalPages = data.totalPages || 1;

            set({
              cars: isLoadMore ? [...cars, ...newCars] : newCars,
              page: isLoadMore ? page + 1 : page,
              totalPages: totalPages,
              isLoading: false,
            });
          } catch (err) {
            let message = "Something went wrong";

            if (err instanceof Error) {
              message = err.message;
            }

            set({ error: message, isLoading: false });
          }
        },

        loadBrands: async () => {
          try {
            const brands = await fetchBrands();
            set({ brands });
          } catch (error) {
            console.error(error);
          }
        },

        setFilter: (key, value) => {
          set((state) => ({
            filters: { ...state.filters, [key]: value },
            page: 1,
          }));
          get().loadCars(false);
        },

        toggleFavorite: (car) => {
          set((state) => {
            const isFav = state.favorites.some((c) => c.id === car.id);
            if (isFav) {
              return {
                favorites: state.favorites.filter((c) => c.id !== car.id),
              };
            }
            return { favorites: [...state.favorites, car] };
          });
        },

        resetCars: () => set({ cars: [], page: 1 }),
      }),
      {
        name: "rental-car-storage",
        partialize: (state) => ({ favorites: state.favorites }),
      }
    )
  )
);
