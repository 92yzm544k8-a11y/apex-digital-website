import { Navigation } from "@/components/navigation";
import { Testimonials } from "@/components/testimonials";
import { Footer } from "@/components/footer";
import ThreeBackground from "@/components/ThreeBackground";
import LenisProvider from "@/components/LenisProvider";
import Cursor from "@/components/Cursor";

const testimonials = [
  { id: "1", quote: "Eryon DealerOps transformó por completo nuestra operación. Pasamos de 5 sistemas aislados a una sola plataforma que controla inventario, taller, CRM y finanzas. Nuestro equipo vende el doble en la mitad del tiempo.", author: "Roberta Martínez", role: "Directora, Grupo Automotriz MX" },
  { id: "2", quote: "Llevábamos años buscando un sistema que entendiera cómo opera una asociación civil. Eryon CivicOps no solo nos dio control financiero total, sino que nos permitió conectar a nuestras familias, donadores y proyectos en un solo lugar.", author: "Andrés González", role: "Director, Intégrame Down AC" },
  { id: "3", quote: "Eryon LegalOps transformó la operación de nuestro despacho. Control de expedientes, diligencias automatizadas, facturación electrónica y dashboard de métricas en un solo sistema. Lo que antes nos tomaba días ahora lo hacemos en horas.", author: "Alejandro Villarreal", role: "Socio Director, AVK LegalOps" },
];

export const metadata = {
  title: "Eryon",
  description: "Eryon — El Sistema Operativo de tu Negocio.",
};

export default function AboutPage() {
  return (
    <LenisProvider>
      <ThreeBackground />
      <Cursor />
      <Navigation />
      <main id="main-content" className="flex-1">
        <section id="about" style={{ padding: "160px 24px 80px" }}>
          <div className="section-inner">
            <div className="section-header">
              <div className="label">Eryon</div>
              <h2>El Sistema Operativo<br /><span className="gradient-text">de tu Negocio</span></h2>
              <p>En Eryon creemos que cada negocio merece un sistema operativo diseñado específicamente para su industria. No vendemos software genérico: implementamos la Plataforma que transforma tu operación.</p>
            </div>
          </div>
        </section>
        <Testimonials testimonials={testimonials} />
      </main>
      <Footer />
    </LenisProvider>
  );
}
