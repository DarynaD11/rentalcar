"use client";

import { useState, useEffect } from "react";
import css from "./SearchFilter.module.css";
import { useCarStore } from "@/lib/store/carStore";
import { Filter } from "@/types/types";

const prices = Array.from({ length: 18 }, (_, i) => (i + 3) * 10);

export default function SearchFilter() {
  const { brands, loadBrands, setAllFilters } = useCarStore();

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [mileageFrom, setMileageFrom] = useState("");
  const [mileageTo, setMileageTo] = useState("");

  useEffect(() => {
    loadBrands();
  }, [loadBrands]);

  const handleSearch = () => {
    const filters: Partial<Filter> = {};

    if (selectedBrand) filters.brand = selectedBrand;
    if (selectedPrice) filters.rentalPrice = selectedPrice;
    if (mileageFrom) filters.mileageFrom = mileageFrom;
    if (mileageTo) filters.mileageTo = mileageTo;

    setAllFilters(filters);
  };

  return (
    <div className={css.container}>
      <div className={css.inputGroup}>
        <label className={css.label}>Car brand</label>
        <select
          className={css.select}
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">Choose a brand</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className={css.inputGroup}>
        <label className={css.label}>Price/ 1 hour</label>
        <select
          className={css.select}
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
        >
          <option value="">Choose a price</option>
          {prices.map((price) => (
            <option key={price} value={price}>
              {price}$
            </option>
          ))}
        </select>
      </div>

      <div className={css.inputGroup}>
        <label className={css.label}>Сar mileage / km</label>
        <div className={css.mileageWrapper}>
          <div className={css.mileageInputBox}>
            <span className={css.prefix}>From</span>
            <input
              type="number"
              className={css.mileageInput}
              value={mileageFrom}
              onChange={(e) => setMileageFrom(e.target.value)}
            />
          </div>
          <div className={`${css.mileageInputBox} ${css.borderLeft}`}>
            <span className={css.prefix}>To</span>
            <input
              type="number"
              className={css.mileageInput}
              value={mileageTo}
              onChange={(e) => setMileageTo(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button className={css.searchBtn} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
