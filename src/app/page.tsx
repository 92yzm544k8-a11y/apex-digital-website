import { GSAPProvider } from "@/lib/gsap-hooks";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { About } from "@/components/about";
import { Portfolio } from "@/components/portfolio";
import { Services, defaultServices } from "@/components/services";
import { Testimonials, defaultTestimonials } from "@/components/testimonials";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";

const features = [
  {
    title: "Lightning Fast Performance",
    description: "Optimized code, efficient algorithms, and modern infrastructure ensure your digital products load instantly and scale effortlessly.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    link: "/services/performance",
  },
  {
    title: "Beautiful User Experience",
    description: "Human-centered design that delights users and drives engagement. Every interaction is crafted with intention and tested for accessibility.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17a.002.002 0 11-.004-.004.002.002 0 01.004.004z" />
      </svg>
    ),
    link: "/services/design",
  },
  {
    title: "Scalable Architecture",
    description: "Future-proof systems built with clean architecture principles. Microservices, serverless, and cloud-native patterns that grow with your business.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    link: "/services/architecture",
  },
  {
    title: "Continuous Innovation",
    description: "Stay ahead with our R&D approach. We explore emerging technologies and apply them practically to give you a competitive edge.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    link: "/services/innovation",
  },
];

const projects = [
  {
    id: "1",
    title: "FinTech Dashboard",
    category: "Web Development",
    description: "Real-time financial analytics platform with advanced charting, customizable widgets, and secure data visualization for enterprise clients.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["React", "TypeScript", "D3.js", "Node.js"],
    results: [
      { label: "faster load times", value: "40%" },
      { label: "user adoption", value: "85%" },
    ],
    caseStudyLink: "/work/fintech-dashboard",
  },
  {
    id: "2",
    title: "HealthTrack Mobile App",
    category: "Mobile Apps",
    description: "Cross-platform health monitoring application with AI-powered insights, wearable integration, and HIPAA-compliant data handling.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    tags: ["React Native", "Python", "AWS", "TensorFlow"],
    results: [
      { label: "downloads in 6 months", value: "150K+" },
      { label: "user retention", value: "92%" },
    ],
    caseStudyLink: "/work/healthtrack",
  },
  {
    id: "3",
    title: "EcoCommerce Platform",
    category: "E-commerce",
    description: "Sustainable marketplace connecting eco-conscious brands with consumers. Features carbon footprint tracking and green certifications.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["Next.js", "PostgreSQL", "Stripe", "Vercel"],
    results: [
      { label: "conversion increase", value: "60%" },
      { label: "revenue growth", value: "300%" },
    ],
    caseStudyLink: "/work/ecocommerce",
  },
  {
    id: "4",
    title: "Enterprise Design System",
    category: "UI/UX Design",
    description: "Comprehensive design system with 200+ components, documentation, and governance tools for a Fortune 500 company's digital transformation.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138eddea?w=800&h=600&fit=crop",
    tags: ["Figma", "Storybook", "React", "Design Tokens"],
    results: [
      { label: "design consistency", value: "100%" },
      { label: "development speed", value: "2.5x" },
    ],
    caseStudyLink: "/work/design-system",
  },
  {
    id: "5",
    title: "SaaS Analytics Suite",
    category: "Web Development",
    description: "Business intelligence platform with custom dashboards, automated reporting, and predictive analytics for SaaS companies.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
    tags: ["Vue.js", "Go", "ClickHouse", "Kubernetes"],
    results: [
      { label: "query performance", value: "10x" },
      { label: "customer satisfaction", value: "4.9/5" },
    ],
    caseStudyLink: "/work/saas-analytics",
  },
  {
    id: "6",
    title: "Brand Identity Overhaul",
    category: "Branding",
    description: "Complete rebranding for a global logistics company including logo, visual language, brand guidelines, and multi-channel rollout.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    tags: ["Brand Strategy", "Visual Identity", "Guidelines", "Marketing"],
    results: [
      { label: "brand recognition", value: "45%" },
      { label: "employee pride", value: "91%" },
    ],
    caseStudyLink: "/work/logistics-rebrand",
  },
];

export default function HomePage() {
  return (
    <GSAPProvider>
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
    </GSAPProvider>
  );
}