import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { About } from "@/components/about";
import { Portfolio } from "@/components/portfolio";
import { Services, defaultServices } from "@/components/services";
import { Testimonials, defaultTestimonials } from "@/components/testimonials";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import ThreeBackground from "@/components/ThreeBackground";
import LenisProvider from "@/components/LenisProvider";
import Cursor from "@/components/Cursor";

const features = [
  {
    title: "Modular y Escalable",
    description: "Más de 260 módulos funcionales en catálogo. Tu sistema crece contigo: empieza con lo esencial y agrega módulos cuando los necesites.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    link: "/services",
  },
  {
    title: "Control de Acceso por Roles",
    description: "Cada usuario ve solo lo que necesita. Permisos granulares por módulo: dueño, gerente, vendedor, operativo, cliente. Seguridad desde el diseño.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    link: "/services",
  },
  {
    title: "Demo Funcional en Días",
    description: "SPA vanilla con Liquid Glass UI, datos semilla y estado reiniciable. Implementamos tu vertical y la ponemos en tus manos para prueba en tiempo récord.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    link: "/services",
  },
  {
    title: "Lista para Producción",
    description: "Arquitectura PWA desplegable en Cloudflare Pages o Netlify. De la demo a producción sin fricción. Backend real cuando lo necesites.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    link: "/services",
  },
];

const projects = [
  {
    id: "1",
    title: "SemiPro — Eryon DealerOps",
    category: "Agencias Automotrices",
    description: "Sistema de gestión integral para agencias de autos seminuevos. Inventario, CRM con pipeline Kanban, taller de reacondicionamiento, documentación REPUVE/NOM-122, finanzas y multi-sucursal.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["SPA Vanilla", "Liquid Glass UI", "localStorage", "15 Módulos"],
    results: [
      { label: "módulos funcionales", value: "15" },
      { label: "roles de usuario", value: "6" },
    ],
    caseStudyLink: "/work/semipro",
  },
  {
    id: "2",
    title: "Intégrame Down AC — Eryon CivicOps",
    category: "Asociaciones Civiles",
    description: "Plataforma integral para asociación civil que conecta familias, donadores, staff y proyectos productivos. Incluye Academia21, Japi Helados, Laboral21 y SublimaT en un solo sistema.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    tags: ["SPA Vanilla", "Teal Theme", "8 Grupos", "40+ Módulos"],
    results: [
      { label: "módulos funcionales", value: "40+" },
      { label: "usuarios simultáneos", value: "9" },
    ],
    caseStudyLink: "/work/integrame",
  },
  {
    id: "3",
    title: "Eryon RetailOps",
    category: "Comercio Minorista",
    description: "Sistema de gestión operativa y comercial para tiendas y comercios minoristas. Punto de venta, inventario, CRM de clientes, proveedores, promociones y reportes de ventas. Listo para implementar.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["En Cartera", "Módulos Definidos", "Disponible"],
    results: [
      { label: "módulos planeados", value: "10" },
      { label: "estado", value: "Listo" },
    ],
    caseStudyLink: "/work/retailops",
  },
  {
    id: "4",
    title: "Eryon GastroOps",
    category: "Restaurantes / Alimentos",
    description: "Gestión operativa completa para restaurantes, bares y negocios de alimentos. Menú digital, comandas, inventario de cocina, reservaciones, pedidos a domicilio y finanzas.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138eddea?w=800&h=600&fit=crop",
    tags: ["En Cartera", "Módulos Definidos", "Disponible"],
    results: [
      { label: "módulos planeados", value: "10" },
      { label: "estado", value: "Listo" },
    ],
    caseStudyLink: "/work/gastroops",
  },
  {
    id: "5",
    title: "Eryon MediOps",
    category: "Clínicas / Salud",
    description: "Plataforma administrativa y operativa para clínicas, consultorios y centros de salud. Agenda de citas, expediente clínico, facturación electrónica, inventario de insumos y dashboard de indicadores.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
    tags: ["En Cartera", "Módulos Definidos", "Disponible"],
    results: [
      { label: "módulos planeados", value: "10" },
      { label: "estado", value: "Listo" },
    ],
    caseStudyLink: "/work/mediops",
  },
  {
    id: "6",
    title: "Eryon EduOps",
    category: "Educación / Academias",
    description: "Sistema de gestión administrativa y académica para instituciones educativas. Control escolar, calificaciones, horarios, pagos de colegiaturas y comunicación con padres.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    tags: ["En Cartera", "Módulos Definidos", "Disponible"],
    results: [
      { label: "módulos planeados", value: "11" },
      { label: "estado", value: "Listo" },
    ],
    caseStudyLink: "/work/eduops",
  },
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
        <About />
        <Portfolio projects={projects} />
        <Services services={defaultServices} />
        <Testimonials testimonials={defaultTestimonials} />
        <ContactForm />
      </main>
      <Footer />
    </LenisProvider>
  );
}
