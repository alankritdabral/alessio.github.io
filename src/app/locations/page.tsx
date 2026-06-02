import Locations from "@/components/Locations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Locations",
  description: "Find Alessio's Cafe in Raipur, Dehradun. Visit us for an authentic Italian dining experience.",
  alternates: {
    canonical: "https://alessio.github.io/locations",
  },
};

export default function LocationsPage() {
  return <Locations />;
}
