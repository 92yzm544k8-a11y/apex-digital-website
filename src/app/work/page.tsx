import { Navigation } from "@/components/navigation";
import { Portfolio } from "@/components/portfolio";
import { Footer } from "@/components/footer";
import ThreeBackground from "@/components/ThreeBackground";
import LenisProvider from "@/components/LenisProvider";
import Cursor from "@/components/Cursor";

export const metadata = {
  title: "Casos",
  description: "Verticales en acción. Conoce nuestras implementaciones.",
};

export default function WorkPage() {
  return (
    <LenisProvider>
      <ThreeBackground />
      <Cursor />
      <Navigation />
      <main id="main-content" className="flex-1">
        <Portfolio />
      </main>
      <Footer />
    </LenisProvider>
  );
}
