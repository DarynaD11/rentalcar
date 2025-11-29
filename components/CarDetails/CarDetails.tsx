import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchCarById } from "@/lib/api/carsApi";
import css from "./CarDetails.module.css";
import FormOrder from "../FormOrder/FormOrder";

interface CarPageProps {
  id: string;
}

export default async function CarDetails({ id }: CarPageProps) {
  let car;
  try {
    car = await fetchCarById(id);
  } catch (error) {
    return notFound();
  }

  if (!car) return notFound();

  return (
    <section className={css.cont}>
      <div className={css.left_box}>
        <div className={css.img_box}>
          <Image
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            fill
            className={css.img}
            priority
          />
        </div>
        <div className={css.box_form}>
          <FormOrder />
        </div>
      </div>
      <div className={css.right_box}>
        <div className={css.title_box}>
          <h1 className={css.title}>
            {car.brand} {car.model}, {car.year}
          </h1>
          <p className={css.id}>Id: {car.id.slice(-4)}</p>
        </div>

        <div className={css.location_km}>
          <div className={css.location_svg_text}>
            <svg className={css.location_svg}>
              <use href="/icons/sprite.svg#icon-location"></use>
            </svg>
            <p className={css.address}>{car.address}</p>
          </div>
          <p className={css.address}>{car.mileage.toLocaleString()} km</p>
        </div>

        <p className={css.price}>${car.rentalPrice}</p>
        <p className={css.descr}>{car.description}</p>

        <div className={css.list_box}>
          <h3 className={css.title_list}>Rental Conditions:</h3>
          <ul>
            {car.rentalConditions.map((condition, index) => (
              <li key={index}>
                <svg className={css.li_icon}>
                  <use href="/icons/sprite.svg#icon-check"></use>
                </svg>
                {condition}
              </li>
            ))}
          </ul>
        </div>

        <div className={css.list_box}>
          <h3 className={css.title_list}>Car Specifications:</h3>
          <ul className={css.car_details}>
            <li>
              <svg className={css.li_icon}>
                <use href="/icons/sprite.svg#icon-calendar"></use>
              </svg>
              <p className={css.li_text}>Year: {car.year}</p>
            </li>
            <li>
              <svg className={css.li_icon}>
                <use href="/icons/sprite.svg#icon-car"></use>
              </svg>
              <p className={css.li_text}>Type: {car.type}</p>
            </li>
            <li>
              <svg className={css.li_icon}>
                <use href="/icons/sprite.svg#icon-fuel-pump"></use>
              </svg>
              <p className={css.li_text}>
                Fuel Consumption: {car.fuelConsumption}
              </p>
            </li>
            <li>
              <svg className={css.li_icon}>
                <use href="/icons/sprite.svg#icon-gear"></use>
              </svg>
              <p className={css.li_text}>Engine Size: {car.engineSize}</p>
            </li>
          </ul>
        </div>

        <div className={css.list_box}>
          <h3 className={css.title_list}>Accessories and functionalities:</h3>
          <ul>
            {car.accessories.map((item, index) => (
              <li key={index}>
                <svg className={css.li_icon}>
                  <use href="/icons/sprite.svg#icon-check"></use>
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
