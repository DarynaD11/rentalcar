"use client";

import Image from "next/image";
import Link from "next/link";
import { useCarStore } from "@/lib/store/carStore";
import { CarId } from "@/types/types";
import css from "./CardItem.module.css";

interface Props {
  car: CarId;
}

export default function CarCard({ car }: Props) {
  const toggleFavorite = useCarStore((state) => state.toggleFavorite);
  const favorites = useCarStore((state) => state.favorites);

  const isFavorite = favorites.some((fav) => fav.id === car.id);

  return (
    <div className={css.card}>
      <div className={css.imgWrapper}>
        <Image
          src={car.img}
          alt={car.brand}
          fill
          className={css.cardImg}
          priority={false}
        />
        <button className={css.heartBtn} onClick={() => toggleFavorite(car)}>
          <svg
            className={isFavorite ? css.heartIconActive : css.heartIcon}
            width="18"
            height="18"
          >
            <use
              href={`/icons/sprite.svg#${
                isFavorite ? "icon-heart-active" : "icon-heart-default"
              }`}
            />
          </svg>
        </button>
      </div>

      <div className={css.cardContent}>
        <div className={css.cardHeader}>
          <h3 className={css.cardTitle}>
            {car.brand} <span className={css.model}>{car.model},</span>{" "}
            {car.year}
          </h3>
          <span className={css.cardPrice}>${car.rentalPrice}</span>
        </div>

        <div className={css.tags}>
          <span>{car.address.split(",")[1]}</span>
          <span className={css.divider}>|</span>
          <span>{car.address.split(",")[2]}</span>
          <span className={css.divider}>|</span>
          <span>{car.rentalCompany}</span>
          <span className={css.divider}>|</span>
          <span>{car.type}</span>
          <span className={css.divider}>|</span>
          <span>
            {car.mileage.toLocaleString("en-US").replace(/,/g, " ")} km
          </span>{" "}
        </div>

        <Link href={`/catalog/${car.id}`} className={css.learnMoreBtn}>
          Read more
        </Link>
      </div>
    </div>
  );
}
