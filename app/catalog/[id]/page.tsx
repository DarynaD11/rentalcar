import CarDetails from "@/components/CarDetails/CarDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <CarDetails id={id} />;
}
