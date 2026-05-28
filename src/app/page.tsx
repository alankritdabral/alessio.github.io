import Hero from "@/components/Hero";
import About from "@/components/About";
import Menu from "@/components/Menu";
import BookingForm from "@/components/BookingForm";
import Testimonials from "@/components/Testimonials";
import Locations from "@/components/Locations";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Menu />
      <BookingForm />
      <Testimonials />
      <Locations />
    </>
  );
}
