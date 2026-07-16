"use client";
import { useState, FormEvent } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          containerRef.current!.querySelectorAll(".form-field"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          containerRef.current!.querySelectorAll(".contact-info-item"),
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "El nombre es obligatorio";
        if (value.trim().length < 2) return "El nombre debe tener al menos 2 caracteres";
        break;
      case "email":
        if (!value.trim()) return "El correo es obligatorio";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Ingresa un correo válido";
        break;
      case "message":
        if (!value.trim()) return "El mensaje es obligatorio";
        if (value.trim().length < 10) return "El mensaje debe tener al menos 10 caracteres";
        break;
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    let hasErrors = false;

    (["name", "email", "message"] as const).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "",
          budget: "",
          timeline: "",
          message: "",
        });
      } else {
        throw new Error("Failed to submit");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectTypes = [
    { value: "", label: "Selecciona tipo de proyecto" },
    { value: "web-3d", label: "Desarrollo Web 3D" },
    { value: "ux-ui", label: "Diseño UX/UI" },
    { value: "animation", label: "Animación Digital" },
    { value: "branding", label: "Estrategia de Marca" },
    { value: "webgl", label: "WebGL y Visualización" },
    { value: "web-dev", label: "Desarrollo Web Full-Stack" },
    { value: "other", label: "Otro" },
  ];

  const budgets = [
    { value: "", label: "Selecciona rango de presupuesto" },
    { value: "10k-25k", label: "$10,000 - $25,000 MXN" },
    { value: "25k-50k", label: "$25,000 - $50,000 MXN" },
    { value: "50k-100k", label: "$50,000 - $100,000 MXN" },
    { value: "100k+", label: "$100,000+ MXN" },
    { value: "not-sure", label: "Aún no lo sé" },
  ];

  const timelines = [
    { value: "", label: "Selecciona tiempo estimado" },
    { value: "asap", label: "Lo antes posible" },
    { value: "1-2-months", label: "1-2 meses" },
    { value: "3-4-months", label: "3-4 meses" },
    { value: "5-6-months", label: "5-6 meses" },
    { value: "flexible", label: "Flexible" },
  ];

  return (
    <section
      ref={containerRef}
      className="section bg-neutral-50 dark:bg-neutral-950"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <header className="section-header text-center mb-12">
          <h2 id="contact-heading" className="heading-2 text-neutral-900 dark:text-neutral-100">
            Implementa Eryon en tu Negocio
          </h2>
          <p className="body-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Cuéntanos a qué te dedicas y en menos de 24 horas te presentamos la vertical que necesitas con una demo funcional.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="heading-3 text-neutral-900 dark:text-neutral-100 mb-6">
                  Contáctanos
                </h3>
                <div className="space-y-6" role="list" aria-label="Contact information">
                  <div className="contact-info-item flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400" aria-hidden="true">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="heading-4 text-neutral-900 dark:text-neutral-100">Escríbenos</h4>
                      <a href="mailto:eryon.mx@outlook.com" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        eryon.mx@outlook.com
                      </a>
                      <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-1">Respondemos en menos de 24 horas</p>
                    </div>
                  </div>

                  <div className="contact-info-item flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400" aria-hidden="true">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="heading-4 text-neutral-900 dark:text-neutral-100">Llámanos</h4>
                      <a href="tel:+525542342675" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        +52 (55) 4234 2675
                      </a>
                      <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-1">Respuesta en minutos en horario laboral</p>
                    </div>
                  </div>

                  <div className="contact-info-item flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400" aria-hidden="true">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="heading-4 text-neutral-900 dark:text-neutral-100">Ubicación</h4>
                      <address className="not-italic text-neutral-600 dark:text-neutral-400">
                        San Luis Potosí, México
                      </address>
                      <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-1">Disponibles para reuniones presenciales y virtuales</p>
                    </div>
                  </div>

                  <div className="contact-info-item flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400" aria-hidden="true">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="heading-4 text-neutral-900 dark:text-neutral-100">Horario</h4>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Lun - Vie: 10:00 AM - 6:00 PM CST
                      </p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-1">Cerrado fines de semana y festivos</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center text-white" aria-hidden="true">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="heading-4 text-neutral-900 dark:text-neutral-100">¿Prefieres una llamada?</h4>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-1">Agenda una consultoría gratuita de 30 minutos</p>
                    <a href="/contact#schedule" className="inline-flex items-center gap-2 mt-3 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                      Agenda una Llamada
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {submitStatus === "success" ? (
              <div className="glass-card p-8 text-center" role="alert">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-6" aria-hidden="true">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="heading-2 text-neutral-900 dark:text-neutral-100 mb-3">¡Mensaje Enviado!</h3>
                <p className="body-lg text-neutral-600 dark:text-neutral-400 mb-6">
                  Gracias por contactarnos. Te responderemos en menos de 24 horas.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitStatus("idle")}
                  className="btn btn-primary"
                >
                  Enviar Otro Mensaje
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="glass-card p-6 lg:p-8"
                noValidate
                aria-label="Contact form"
              >
                {submitStatus === "error" && (
                  <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400" role="alert">
                    <p className="font-medium">Algo salió mal</p>
                    <p className="text-sm mt-1">Intenta de nuevo más tarde o escríbenos directamente a eryon.mx@outlook.com</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-field">
                    <label htmlFor="name" className="label">
                      Nombre Completo <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                      placeholder="Tu nombre"
                      aria-describedby={errors.name ? "name-error" : undefined}
                      aria-invalid={errors.name ? "true" : "false"}
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1.5 text-sm text-red-500" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="form-field">
                    <label htmlFor="email" className="label">
                      Correo Electrónico <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                      placeholder="correo@empresa.com"
                      aria-describedby={errors.email ? "email-error" : undefined}
                      aria-invalid={errors.email ? "true" : "false"}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-sm text-red-500" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="form-field">
                    <label htmlFor="company" className="label">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="input"
                      placeholder="Tu empresa"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="projectType" className="label">
                      Tipo de Proyecto
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="input"
                      disabled={isSubmitting}
                    >
                      {projectTypes.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="budget" className="label">
                      Presupuesto
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="input"
                      disabled={isSubmitting}
                    >
                      {budgets.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="timeline" className="label">
                      Tiempo Estimado
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="input"
                      disabled={isSubmitting}
                    >
                      {timelines.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-field mt-6">
                  <label htmlFor="message" className="label">
                      Detalles del Proyecto <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    className={`input resize-y ${errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                    placeholder="Cuéntanos sobre tu proyecto, objetivos y requerimientos..."
                    aria-describedby={errors.message ? "message-error" : "message-hint"}
                    aria-invalid={errors.message ? "true" : "false"}
                    disabled={isSubmitting}
                  />
                  <p id="message-hint" className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-500">
                    Mínimo 10 caracteres
                  </p>
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-sm text-red-500" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="form-field mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full md:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      "Enviar Mensaje"
                    )}
                  </button>
                </div>

                <p className="text-xs text-neutral-500 dark:text-neutral-500 text-center mt-4">
                  Al enviar este formulario, aceptas nuestra{" "}
                  <a href="/privacy" className="underline hover:text-primary-600 dark:hover:text-primary-400">Política de Privacidad</a>
                  {" y "}
                  <a href="/terms" className="underline hover:text-primary-600 dark:hover:text-primary-400">Términos del Servicio</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}