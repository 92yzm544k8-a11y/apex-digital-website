"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  href?: string;
}

interface ServicesProps {
  services: Service[];
  title?: string;
  subtitle?: string;
}

const serviceIcons = {
  web: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  mobile: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  design: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17a.002.002 0 11-.004-.004.002.002 0 01.004.004z" />
    </svg>
  ),
  branding: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.21 8.21a4 4 0 015.66 0M12 14a4 4 0 00-5.66-5.66 4 4 0 107.07 7.07 4 4 0 00-1.41-1.41" />
    </svg>
  ),
  ecommerce: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  strategy: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
};

export function Services({
  services,
  title = "Verticales",
  subtitle = "16 sistemas especializados para tu industria. Elige la tuya.",
}: ServicesProps) {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !gridRef.current) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          gridRef.current!.querySelectorAll(".service-card"),
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          containerRef.current!.querySelectorAll(".service-card .feature-item"),
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.05,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="section"
      aria-labelledby="services-heading"
    >
      <div className="container">
        <header className="section-header">
          <h2 id="services-heading" className="heading-2 text-neutral-900 dark:text-neutral-100">
            {title}
          </h2>
          <p className="body-lg text-neutral-600 dark:text-neutral-400">
            {subtitle}
          </p>
        </header>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          role="list"
          aria-label="Services"
        >
          {services.map((service, index) => (
            <article
              key={service.id}
              className="service-card card glass-card p-6 lg:p-8 group relative overflow-hidden"
              role="listitem"
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6 group-hover:scale-110 transition-transform duration-300"
                  aria-hidden="true"
                >
                  {service.icon}
                </div>

                <h3 className="heading-3 text-neutral-900 dark:text-neutral-100 mb-3">
                  {service.title}
                </h3>

                <p className="body text-neutral-600 dark:text-neutral-400 mb-6">
                  {service.description}
                </p>

                <ul className="space-y-3" role="list" aria-label={`${service.title} features`}>
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={feature}
                      className="feature-item flex items-start gap-3 text-neutral-600 dark:text-neutral-400"
                    >
                      <svg
                        className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="body-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {service.href && (
                  <a
                    href={service.href}
                    className="inline-flex items-center gap-2 mt-6 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors group"
                  >
                    Saber más
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export const defaultServices: Service[] = [
  {
    id: "legalops",
    title: "Eryon LegalOps",
    description: "Gestión operativa integral para despachos jurídicos. Control de expedientes, diligencias, documentos, facturación y privacidad de datos.",
    icon: serviceIcons.web,
    features: [
      "Front desk y recepción",
      "Expedientes digitales",
      "Gestión de documentos",
      "Diligencias y calendario",
      "Reportes y métricas",
      "Control de privacidad",
    ],
    href: "/services/legalops",
  },
  {
    id: "civicops",
    title: "Eryon CivicOps",
    description: "Sistema de gestión integral para asociaciones civiles, ONGs y fundaciones. Administración de beneficiarios, donadores y proyectos productivos.",
    icon: serviceIcons.design,
    features: [
      "Dashboard con KPIs",
      "Beneficiarios y expedientes",
      "Donadores y campañas",
      "Proyectos productivos",
      "Finanzas transparentes",
      "Comunicación con familias",
    ],
    href: "/services/civicops",
  },
  {
    id: "dealerops",
    title: "Eryon DealerOps",
    description: "Plataforma completa para agencias automotrices. Gestión de inventario, compra, valuación, taller de reacondicionamiento y CRM de ventas.",
    icon: serviceIcons.mobile,
    features: [
      "Inventario de unidades",
      "CRM con pipeline Kanban",
      "Valuación y reacondicionamiento",
      "Documentación REPUVE/NOM-122",
      "Finanzas y P&L",
      "Multi-sucursal",
    ],
    href: "/services/dealerops",
  },
  {
    id: "retailops",
    title: "Eryon RetailOps",
    description: "Sistema de gestión operativa y comercial para tiendas y comercios minoristas. Control de inventario, ventas, proveedores y clientes.",
    icon: serviceIcons.ecommerce,
    features: [
      "Punto de venta",
      "Inventario y almacenes",
      "CRM de clientes",
      "Proveedores y compras",
      "Promociones y descuentos",
      "Reportes de ventas",
    ],
    href: "/services/retailops",
  },
  {
    id: "gastroops",
    title: "Eryon GastroOps",
    description: "Gestión operativa completa para restaurantes, bares y negocios de alimentos. Menú digital, comandas, inventario de cocina y turnos.",
    icon: serviceIcons.branding,
    features: [
      "Menú digital y comandas",
      "Inventario de cocina",
      "Reservaciones y mesas",
      "Pedidos a domicilio",
      "Turnos de empleados",
      "Costos y rentabilidad",
    ],
    href: "/services/gastroops",
  },
  {
    id: "mediops",
    title: "Eryon MediOps",
    description: "Plataforma administrativa y operativa para clínicas, consultorios y centros de salud. Agendas, expedientes clínicos y facturación.",
    icon: serviceIcons.strategy,
    features: [
      "Agenda de citas",
      "Expediente clínico",
      "Facturación electrónica",
      "Inventario de insumos",
      "Recetas y estudios",
      "Dashboard de indicadores",
    ],
    href: "/services/mediops",
  },
  {
    id: "eduops",
    title: "Eryon EduOps",
    description: "Sistema de gestión administrativa y académica para instituciones educativas. Control de alumnos, calificaciones, horarios y pagos.",
    icon: serviceIcons.web,
    features: [
      "Control de alumnos",
      "Calificaciones y reportes",
      "Horarios y grupos",
      "Pagos y colegiaturas",
      "Comunicación con padres",
      "Plataforma de cursos",
    ],
    href: "/services/eduops",
  },
  {
    id: "finops",
    title: "Eryon FinOps",
    description: "Gestión operativa para despachos contables y asesorías financieras. Control de clientes, declaraciones, nóminas y contabilidad.",
    icon: serviceIcons.strategy,
    features: [
      "Expedientes de clientes",
      "Declaraciones y avisos",
      "Contabilidad electrónica",
      "Nóminas y CFDI",
      "Calendario fiscal",
      "Reportes financieros",
    ],
    href: "/services/finops",
  },
  {
    id: "realtyops",
    title: "Eryon RealtyOps",
    description: "CRM inmobiliario completo para agencias y asesores. Catálogo de propiedades, seguimiento de leads, citas y cierre de ventas.",
    icon: serviceIcons.design,
    features: [
      "Catálogo de propiedades",
      "CRM con pipeline",
      "Agenda de citas",
      "Contratos digitales",
      "Marketing de propiedades",
      "Dashboard de comisiones",
    ],
    href: "/services/realtyops",
  },
  {
    id: "manufops",
    title: "Eryon ManufOps",
    description: "Control operativo de producción y manufactura ligera. Órdenes de trabajo, inventario de materiales, control de calidad y tiempos.",
    icon: serviceIcons.mobile,
    features: [
      "Órdenes de producción",
      "Inventario de materiales",
      "Control de calidad",
      "Tiempos y productividad",
      "Proveedores",
      "Costos unitarios",
    ],
    href: "/services/manufops",
  },
  {
    id: "logiops",
    title: "Eryon LogiOps",
    description: "Gestión operativa para empresas de logística y transporte. Rutas, flotilla, tracking de envíos y documentación.",
    icon: serviceIcons.ecommerce,
    features: [
      "Flotilla y mantenimiento",
      "Rutas y optimización",
      "Tracking de envíos",
      "Documentación y Carta Porte",
      "Choferes y turnos",
      "Dashboard de eficiencia",
    ],
    href: "/services/logiops",
  },
  {
    id: "salonops",
    title: "Eryon SalonOps",
    description: "Sistema de gestión para salones de belleza, barberías y spas. Agenda, inventario de productos, comisiones y fidelización de clientes.",
    icon: serviceIcons.branding,
    features: [
      "Agenda de citas",
      "Perfil de clientes",
      "Inventario de productos",
      "Comisiones y cortesías",
      "Programa de fidelización",
      "Dashboard de ingresos",
    ],
    href: "/services/salonops",
  },
  {
    id: "fitops",
    title: "Eryon FitOps",
    description: "Gestión operativa y comercial para gimnasios y centros de fitness. Control de membresías, rutinas, asistencias y pagos.",
    icon: serviceIcons.mobile,
    features: [
      "Membresías y planes",
      "Control de asistencias",
      "Rutinas y progreso",
      "Pagos y renovaciones",
      "Instructores y horarios",
      "Dashboard de retención",
    ],
    href: "/services/fitops",
  },
  {
    id: "hotelops",
    title: "Eryon HotelOps",
    description: "Plataforma administrativa para hoteles y hospedaje. Gestión de reservas, check-in/out, housekeeping y tarifas dinámicas.",
    icon: serviceIcons.web,
    features: [
      "Reservas y disponibilidad",
      "Check-in / Check-out",
      "Housekeeping",
      "Tarifas dinámicas",
      "Facturación y POS",
      "Canal de venta directa",
    ],
    href: "/services/hotelops",
  },
  {
    id: "constops",
    title: "Eryon ConstOps",
    description: "Control de proyectos de construcción y remodelación. Presupuestos, avances de obra, proveedores y documentación técnica.",
    icon: serviceIcons.design,
    features: [
      "Presupuestos de obra",
      "Avances y bitácora",
      "Proveedores y subcontratos",
      "Documentación técnica",
      "Control de gastos",
      "Dashboard de proyecto",
    ],
    href: "/services/constops",
  },
  {
    id: "cleanops",
    title: "Eryon CleanOps",
    description: "Gestión operativa para empresas de servicios de limpieza y mantenimiento. Órdenes de servicio, rutas, insumos y clientes.",
    icon: serviceIcons.strategy,
    features: [
      "Órdenes de servicio",
      "Rutas y programación",
      "Insumos y almacén",
      "Clientes y contratos",
      "Personal y turnos",
      "Dashboard de calidad",
    ],
    href: "/services/cleanops",
  },
];