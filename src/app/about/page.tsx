import About from "@/components/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Alessio's Cafe, our passion for Italian cuisine, and our journey in Raipur, Dehradun.",
  alternates: {
    canonical: "https://alessio.github.io/about",
  },
};

export default function AboutPage() {
  return <About />;
}
