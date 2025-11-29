"use client";

import { useEffect } from "react";
import css from "./Catalog.module.css";
import CarCard from "@/components/CardItem/CardItem";
import { useCarStore } from "@/lib/store/carStore";
import SearchFilter from "@/components/SearchFilter/SearchFilter";

export default function Catalog() {
  const { cars, isLoading, loadCars, page, totalPages } =
    useCarStore();

  useEffect(() => {
    if (cars.length === 0) {
      loadCars();
    }
  }, [loadCars, cars.length]);

  const handleLoadMore = () => {
    loadCars(true);
  };

  return (
    <div className={css.catalogSection}>
      <SearchFilter />

      <ul className={css.grid}>
        {cars.map((car) => (
          <li key={car.id}>
            <CarCard car={car} />
          </li>
        ))}
      </ul>

      {isLoading && <p className={css.loader}>Loading...</p>}

      {page < totalPages && !isLoading && (
        <button className={css.loadMoreBtn} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </div>
  );
}
