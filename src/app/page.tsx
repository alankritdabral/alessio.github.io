import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import About from "@/components/About";
import Menu from "@/components/Menu";
import BookingForm from "@/components/BookingForm";
import Testimonials from "@/components/Testimonials";
import Locations from "@/components/Locations";
import Slideshow from "@/components/Slideshow";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://alessio.github.io",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Testimonials />
      <Slideshow />
      <About />
      <Suspense fallback={<div className="container text-center py-5">Loading menu...</div>}>
        <Menu isOrdering={false} />
      </Suspense>
      <BookingForm />
      <Locations />
    </>
  );
}
