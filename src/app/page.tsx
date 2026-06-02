import Hero from "@/components/Hero";
import About from "@/components/About";
import Menu from "@/components/Menu";
import BookingForm from "@/components/BookingForm";
import Testimonials from "@/components/Testimonials";
import Locations from "@/components/Locations";
import Slideshow from "@/components/Slideshow";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://alessio.github.io",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Testimonials />
      <Slideshow />
      <About />
      <Menu isOrdering={false} />
      <BookingForm />
      <Locations />
    </>
  );
}
