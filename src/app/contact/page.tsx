import { Navigation } from "@/components/navigation";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import ThreeBackground from "@/components/ThreeBackground";
import LenisProvider from "@/components/LenisProvider";
import Cursor from "@/components/Cursor";

export const metadata = {
  title: "Contacto",
  description: "Solicita un diagnóstico gratuito. Implementamos Eryon en tu negocio.",
};

export default function ContactPage() {
  return (
    <LenisProvider>
      <ThreeBackground />
      <Cursor />
      <Navigation />
      <main id="main-content" className="flex-1" style={{ paddingTop: "120px" }}>
        <ContactForm />
      </main>
      <Footer />
    </LenisProvider>
  );
}
