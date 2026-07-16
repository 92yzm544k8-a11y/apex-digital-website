---
neuron_type: note
layer: cortex
column_role: spoke
title: APEX DIGITAL - COMPREHENSIVE SITE AUDIT
tags: []
created: 2026-07-15
status: active
---

# APEX DIGITAL - COMPREHENSIVE SITE AUDIT
## vs. Award-Winning Standards (Fable, Framer, Vercel, Stripe, Linear)

---

### 🔴 CRITICAL - Missing Core "Award-Winning" Features

#### 1. **No 3D/WebGL Layer** (Fable/Framer standard)
- **Current**: Pure 2D DOM + CSS transforms
- **Required**: Three.js scene with WebGL renderer, shaders, post-processing
- **Impact**: Zero depth, zero immersion, feels "template"

#### 2. **No Cursor-Aware Interactions**
- **Current**: Zero cursor tracking
- **Required**: 
  - Custom cursor with trailing particles
  - Magnetic buttons (attract cursor within radius)
  - Cursor-following 3D elements (parallax on mousemove)
  - Click ripple/burst effects

#### 3. **No Authentic Scroll Experience**
- **Current**: Basic ScrollTrigger fade-in-up only
- **Required**:
  - Scroll velocity → physics-based animations
  - Scroll progress driving 3D scene (camera, objects, shaders)
  - Horizontal scroll sections with snap
  - Scroll-triggered timeline (GSAP) choreographed to scroll position
  - Parallax layers with different speeds (true 3D parallax)

#### 4. **No Kinetic Typography**
- **Current**: Static text, basic fade-in
- **Required**:
  - Per-character/word scroll reveal (SplitText)
  - Text that responds to cursor proximity
  - Variable font weight/width animation
  - Text path following (curved text on scroll)

#### 5. **No Custom Cursor System**
- **Current**: Default browser cursor
- **Required**:
  - Dual-cursor (dot + ring) with spring physics
  - Context-aware states (hover link = expand, hover button = magnetic, hover text = I-beam)
  - Click feedback (scale pulse, particle burst)

#### 6. **No Particle/Field Systems**
- **Current**: 6 static CSS "shapes" with basic keyframe animation
- **Required**:
  - WebGL particle field (10k+ particles) reacting to cursor
  - Flow field / noise field background
  - Scroll-triggered particle bursts
  - Interactive noise/shader background

#### 7. **No Magnetic/Physics UI**
- **Current**: Basic hover states only
- **Required**:
  - Magnetic buttons (spring to cursor)
  - Draggable cards with momentum
  - Spring-based transitions everywhere
  - Inertia scrolling sections

#### 8. **Generic Visual Language**
- **Current**: Stock Unsplash photos, standard Tailwind colors, Inter font
- **Required**:
  - Custom art direction / 3D assets
  - Variable font (e.g. Space Grotesk, Sohne, or custom)
  - Custom color palette with semantic meaning
  - Unique icon system (not Heroicons/Lucide)

#### 9. **No Page Transitions / View Transitions API**
- **Current**: Hard navigation reload
- **Required**:
  - Shared element transitions
  - View Transition API for SPA-like feel
  - Animate between pages with scroll position memory

#### 10. **No Sound Design**
- **Current**: Silent
- **Required**:
  - Subtle UI sounds (hover, click, scroll milestones)
  - Web Audio API context
  - Respect prefers-reduced-motion + prefers-reduced-data

---

### 🟠 HIGH - UX/Performance/Accessibility Gaps

#### 11. **Images Not WebGL-Ready**
- `<img>` tags instead of Three.js textures
- No lazy-loading with blur placeholder
- No WebP/AVIF with fallbacks
- Images not power-of-2 for GPU textures

#### 12. **Form Experience is Basic**
- No field focus animations
- No progressive disclosure
- No auto-save to localStorage
- No haptic feedback on mobile
- Submit button not magnetic

#### 13. **Reduced Motion = Broken Experience**
- Current: `animation-duration: 0.01ms` kills everything
- Required: Alternative 3D experience (static but beautiful), not broken

#### 14. **No Scroll Progress Indicator**
- User has no sense of page length or position

#### 15. **Performance: Not 60fps Ready**
- Next.js hydration + GSAP on main thread
- No `will-change` optimization
- No `content-visibility: auto` for offscreen`
- Bundle includes unused GSAP plugins

#### 16. **Accessibility Gaps**
- No focus trap for mobile menu
- No `aria-live` for form errors
- Skip link only targets main
- No keyboard shortcuts (Cmd+K search)

#### 17. **No Dark Mode Toggle**
- Only system preference, no user control

#### 18. **Footer Links Broken**
- Links to `/features`, `/pricing`, `/integrations` etc. don't exist

---

### 🟡 MEDIUM - Polish & Differentiation

#### 19. **No Easter Eggs / Delight**
- Konami code, hidden interactions, cursor trails on special dates

#### 20. **No Data Visualization**
- Stats are static counters, not animated charts

#### 21. **No CMS/Blog Integration**
- "Blog" in footer but no blog exists

#### 22. **No Internationalization**
- Hardcoded English only

#### 23. **No Analytics/Error Tracking**
- No Vercel Analytics, Sentry, PostHog

#### 24. **SEO: Missing Structured Data**
- No JSON-LD for Organization, Service, Testimonial

---

### 📋 SPECIFIC FILE-BY-FILE ISSUES

| File | Line | Issue |
|------|------|-------|
| `hero.tsx` | 175-181 | 6 CSS divs as "shapes" - should be Three.js meshes |
| `hero.tsx` | 105-113 | `gsap.to` on `.shape-float` - CPU animation, not GPU |
| `navigation.tsx` | - | No magnetic logo, no scroll-hide/show |
| `features.tsx` | - | Cards have no 3D tilt on hover |
| `about.tsx` | - | Image is `<Image>`, not WebGL plane with displacement |
| `portfolio.tsx` | - | Filter tabs don't animate with FLIP |
| `services.tsx` | - | No hover 3D rotation, no cursor parallax |
| `testimonials.tsx` | - | Carousel is basic, no 3D card stack |
| `contact-form.tsx` | - | No field focus animations, submit not magnetic |
| `footer.tsx` | - | Links to non-existent pages |
| `globals.css` | - | No custom cursor CSS variables |
| `layout.tsx` | - | No View Transition API setup |

---

### 🎯 REFERENCE IMPLEMENTATIONS TO MATCH

| Feature | Reference | Tech Stack |
|---------|-----------|------------|
| 3D Scroll | fable.app | Three.js + GSAP ScrollTrigger + custom shaders |
| Magnetic UI | framer.com | Framer Motion + useTransform |
| Cursor Particles | vercel.com/design | Canvas 2D + requestAnimationFrame |
| Kinetic Type | stripe.com | SplitText + ScrollTrigger |
| Scroll Velocity | linear.app | Custom scroll controller |
| Page Transitions | vercel.com | View Transition API + Framer |
| WebGL Background | shaders | Three.js + Post-processing (EffectComposer) |

---

### ✅ PRIORITY ORDER FOR REBUILD

1. **Three.js Scene Setup** - Renderer, camera, scene, resize, render loop
2. **Custom Cursor System** - Dot + ring + spring physics + states
3. **Scroll Controller** - Lenis or custom, velocity, progress, direction
4. **GSAP ScrollTrigger + Three.js Bridge** - Scroll → uniform updates
5. **Magnetic Button Component** - Reusable, spring physics
6. **Hero 3D Scene** - Floating meshes, shader materials, cursor parallax
7. **Particle Field Background** - GPU particles, noise, cursor interaction
8. **Kinetic Typography** - SplitText, per-char scroll reveal
9. **Page Transitions** - View Transition API + shared elements
10. **Form & Contact** - Magnetic submit, field animations, WebGL input focus
11. **Performance** - `will-change`, `content-visibility`, lazy Three.js
12. **Accessibility** - Reduced motion 3D fallback, focus management
13. **Polish** - Sound, easter eggs, loading sequence, error boundaries