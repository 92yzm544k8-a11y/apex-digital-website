import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Portfolio } from "@/components/portfolio";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import ThreeBackground from "@/components/ThreeBackground";
import LenisProvider from "@/components/LenisProvider";
import Cursor from "@/components/Cursor";

const features = [
  {
    icon: "🧩", title: "Modular y Escalable",
    description: "Más de 260 módulos funcionales en catálogo. Tu sistema crece contigo: empieza con lo esencial y agrega módulos cuando los necesites, sin límites.",
  },
  {
    icon: "🔐", title: "Control de Acceso por Roles",
    description: "Cada usuario ve solo lo que necesita. Permisos granulares por módulo: dueño, gerente, vendedor, operativo, cliente. Seguridad desde el diseño.",
  },
  {
    icon: "📊", title: "Datos que gobiernan",
    description: "Catálogos con 30 industrias y 453 comercios. KPIs contextuales, paneles dinámicos y herramientas de inteligencia de negocio integradas en cada módulo.",
  },
  {
    icon: "⚡", title: "Demo Funcional en Días",
    description: "SPA vanilla con Liquid Glass UI, datos semilla y estado reiniciable. Implementamos tu vertical y la ponemos en tus manos para prueba en tiempo récord.",
  },
  {
    icon: "🎨", title: "Liquid Glass UI",
    description: "Interfaz moderna con efectos de vidrio, navegación responsive (sidebar + bottom nav) y experiencia de usuario premium en desktop y móvil.",
  },
  {
    icon: "🚀", title: "Lista para Producción",
    description: "Arquitectura PWA desplegable en Cloudflare Pages o Netlify. De la demo a producción sin fricción. Backend real cuando lo necesites (Supabase, Postgres + RLS).",
  },
];

const projects = [
  { id: "1", title: "Eryon DealerOps", description: "Sistema para agencias automotrices — SemiPro", gradient: "linear-gradient(135deg,#1B3A4B,#1E7A9A)", hint: "Ver proyecto" },
  { id: "2", title: "Eryon CivicOps", description: "Sistema para asociaciones civiles — Intégrame Down AC", gradient: "linear-gradient(135deg,#2d6a4f,#52b788)", hint: "Ver proyecto" },
  { id: "3", title: "Tu Vertical Aquí", description: "Cualquiera de las 14 restantes — Personalizada para ti", gradient: "linear-gradient(135deg,#343440,#8c6b42)", hint: "Disponible" },
  { id: "4", title: "¿Otra Industria?", description: "Construimos la vertical que tu negocio necesita", gradient: "linear-gradient(135deg,#8c6b42,#f2df80)", hint: "Contáctanos" },
];

export default function HomePage() {
  return (
    <LenisProvider>
      <ThreeBackground />
      <Cursor />
      <Navigation />
      <main id="main-content" className="flex-1">
        <Hero />
        <Features features={features} />
        <Portfolio projects={projects} />
        <Services />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </LenisProvider>
  );
}
