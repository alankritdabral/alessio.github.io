import Menu from "@/components/Menu";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Online",
  description: "Order your favorite Italian dishes online from Alessio's Cafe & Pizzeria.",
  alternates: {
    canonical: "https://alessio.github.io/order",
  },
};

export default function OrderPage() {
  return <Menu isOrdering={true} />;
}
