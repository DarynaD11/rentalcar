import { Metadata } from "next";
import Catalog from "./Catalog.client";

export const metadata: Metadata = {
  title: "Catalog | Rental Car",
  description: "Choose your best car for rent",
};

export default function CatalogPage() {
  return (
    <main>
      <Catalog />
    </main>
  );
}
