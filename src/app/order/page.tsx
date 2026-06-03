import Menu from "@/components/Menu";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Order Online",
  description: "Order your favorite Italian dishes online from Alessio's Cafe & Pizzeria.",
  alternates: {
    canonical: "https://alessio.github.io/order",
  },
};

export default function OrderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Menu isOrdering={true} />
    </Suspense>
  );
}
