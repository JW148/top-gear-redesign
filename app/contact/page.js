import ContactForm from "../ui/contactForm";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col  items-center m-20">
      <h1 className="text-4xl font-light text-gray-700 mb-4">Contact</h1>
      <ContactForm />
    </main>
  );
}
