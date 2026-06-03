import Menu from "@/components/Menu";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Our Menu",
  description: "Explore our authentic Italian menu featuring artisan pizzas, fresh pasta, and delicious shakes.",
  alternates: {
    canonical: "https://alessio.github.io/menu",
  },
};

export default function MenuPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Menu isOrdering={false} />
    </Suspense>
  );
}
