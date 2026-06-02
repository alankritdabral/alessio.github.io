import BookingForm from "@/components/BookingForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Reservations",
  description: "Book a table or get in touch with Alessio's Cafe in Raipur, Dehradun.",
  alternates: {
    canonical: "https://alessio.github.io/contact",
  },
};

export default function ContactPage() {
  return <BookingForm />;
}
