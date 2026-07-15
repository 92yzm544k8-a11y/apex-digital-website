"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating?: number;
  project?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}

export function Testimonials({
  testimonials,
  title = "What Our Clients Say",
  subtitle = "Don't just take our word for it. Hear from the businesses we've helped transform.",
}: TestimonialsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          containerRef.current!.querySelectorAll(".testimonial-card"),
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
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

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  return (
    <section
      ref={containerRef}
      className="section bg-neutral-50 dark:bg-neutral-950"
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        <header className="section-header mb-12">
          <h2 id="testimonials-heading" className="heading-2 text-neutral-900 dark:text-neutral-100">
            {title}
          </h2>
          <p className="body-lg text-neutral-600 dark:text-neutral-400">
            {subtitle}
          </p>
        </header>

        <div className="relative">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            role="list"
            aria-label="Client testimonials"
          >
            {testimonials.map((testimonial, index) => (
              <article
                key={testimonial.id}
                className={`testimonial-card card p-6 lg:p-8 relative ${index === currentIndex ? "ring-2 ring-primary-500/50" : ""}`}
                role="listitem"
                aria-hidden={index !== currentIndex}
              >
                <div className="flex items-center gap-1 mb-4" aria-label={`${testimonial.rating || 5} out of 5 stars`}>
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="body-lg text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <footer className="flex items-center gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  {testimonial.avatar && (
                    <img
                      src={testimonial.avatar}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                      aria-hidden="true"
                    />
                  )}
                  <div className="min-w-0">
                    <cite className="not-italic font-semibold text-neutral-900 dark:text-neutral-100 block">
                      {testimonial.author}
                    </cite>
                    <p className="text-sm text-neutral-500 dark:text-neutral-500 truncate">
                      {testimonial.role} at {testimonial.company}
                    </p>
                    {testimonial.project && (
                      <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">
                        Project: {testimonial.project}
                      </p>
                    )}
                  </div>
                </footer>
              </article>
            ))}
          </div>

          {testimonials.length > 3 && (
            <div className="flex justify-center gap-3 mt-10" role="tablist" aria-label="Testimonial navigation">
              <button
                type="button"
                onClick={prevSlide}
                className="p-3 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-700 transition-all"
                aria-label="Previous testimonial"
                role="tab"
                aria-selected={false}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial indicators">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goToSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-primary-600 w-8"
                        : "bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500"
                    }`}
                    role="tab"
                    aria-selected={index === currentIndex}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextSlide}
                className="p-3 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-700 transition-all"
                aria-label="Next testimonial"
                role="tab"
                aria-selected={false}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Apex Digital transformed our outdated platform into a modern, scalable solution that increased our conversion rate by 40%. Their attention to detail and technical expertise is unmatched.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechFlow Inc.",
    rating: 5,
    project: "E-commerce Platform Redesign",
  },
  {
    id: "2",
    quote: "Working with Apex was a game-changer for our startup. They didn't just build our app—they became true partners, guiding us through product strategy and helping us raise our Series A.",
    author: "Marcus Johnson",
    role: "Founder & CEO",
    company: "HealthSync",
    rating: 5,
    project: "Mobile Health Application",
  },
  {
    id: "3",
    quote: "The design system Apex created for us has become the foundation of our entire product suite. It's saved us countless hours and ensured consistency across all our digital touchpoints.",
    author: "Emily Rodriguez",
    role: "VP of Product",
    company: "FinanceFirst",
    rating: 5,
    project: "Design System & UI Library",
  },
  {
    id: "4",
    quote: "Their strategic approach to our digital transformation was exactly what we needed. They understood our business goals and delivered a roadmap that aligned perfectly with our vision.",
    author: "David Park",
    role: "Chief Digital Officer",
    company: "GlobalLogistics",
    rating: 5,
    project: "Digital Transformation Strategy",
  },
  {
    id: "5",
    quote: "The team at Apex Digital is professional, creative, and incredibly responsive. Our new brand identity has received overwhelmingly positive feedback from both customers and investors.",
    author: "Lisa Thompson",
    role: "Marketing Director",
    company: "GreenEarth Solutions",
    rating: 5,
    project: "Complete Rebrand",
  },
  {
    id: "6",
    quote: "From concept to launch, Apex delivered excellence at every stage. Our new customer portal reduced support tickets by 60% and significantly improved customer satisfaction scores.",
    author: "Robert Kim",
    role: "Head of Customer Experience",
    company: "EduTech Academy",
    rating: 5,
    project: "Customer Portal Development",
  },
];