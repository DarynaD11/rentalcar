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
          {/* <Image
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            fill
            className={css.img}
            priority
          /> */}
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
          <svg>
            <use></use>
          </svg>
          <p>{car.address}</p>
          <span>{car.mileage.toLocaleString()} km</span>
        </div>

        <p style={{ lineHeight: "1.6", marginBottom: "20px" }}>
          {car.description}
        </p>

        <h3 style={{ marginBottom: "10px" }}>Accessories:</h3>
        <ul style={{ marginBottom: "20px", paddingLeft: "20px" }}>
          {car.accessories.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h3 style={{ marginBottom: "10px" }}>Rental Conditions:</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "30px",
          }}
        >
          {car.rentalConditions.map((condition, index) => (
            <span
              key={index}
              style={{
                background: "#f9f9f9",
                border: "1px solid #ddd",
                padding: "8px 14px",
                borderRadius: "35px",
              }}
            >
              {condition}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#3470FF",
              }}
            >
              ${car.rentalPrice}
            </span>
            <span style={{ color: "#888" }}> / hour</span>{" "}
            {/* Або day, як в API */}
          </div>

          <button
            style={{
              background: "#3470FF",
              color: "white",
              padding: "12px 50px",
              borderRadius: "12px",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Rental Car
          </button>
        </div>
      </div>
    </section>
  );
}
