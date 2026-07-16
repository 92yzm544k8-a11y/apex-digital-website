import { Navigation } from "@/components/navigation";
import { Services } from "@/components/services";
import { Footer } from "@/components/footer";
import ThreeBackground from "@/components/ThreeBackground";
import LenisProvider from "@/components/LenisProvider";
import Cursor from "@/components/Cursor";

export const metadata = {
  title: "Verticales",
  description: "16 sistemas especializados para tu industria. Elige la tuya.",
};

export default function ServicesPage() {
  return (
    <LenisProvider>
      <ThreeBackground />
      <Cursor />
      <Navigation />
      <main id="main-content" className="flex-1">
        <Services />
      </main>
      <Footer />
    </LenisProvider>
  );
}
