import Link from "next/link";
import css from "./Hero.module.css";
import Image from "next/image";

export default function Hero() {
  return (
    <section className={css.section}>
      <Image
        src="/images/picture@2x.png"
        alt="Car rental background"
        fill
        style={{ objectFit: "cover" }}
        priority
        quality={90}
      />

      <div className={css.content}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.text}>Reliable and budget-friendly rentals for any journey</p>
        <Link className={css.btn} href="/catalog">View Catalog</Link>
      </div>
    </section>
  );
}
