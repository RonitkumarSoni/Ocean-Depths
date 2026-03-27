# Hackathon Submission: Into The Abyss

**Title:** Into The Abyss – The Interactive Depth Experience
**Deployment Link:** [Your Vercel/Netlify Link Here]
**GitHub Repo:** [Your Repo Link Here]

## Project Description (Summary)

*Into the Abyss* is an interactive, cinematic web experience designed to simulate a harrowing descent into the deepest parts of our oceans. Inspired by high-end, Apple-style product storytelling and digital art exhibitions found on Awwwards, the project abandons the traditional "static website" model in favor of an immersive, scroll-driven narrative journey.

Our core philosophy was "Scrolling = Descending." Starting from the sunlit surface mapped to an ultra-smooth, 60fps canvas sequence, the user physically scrolls downward through five distinct biological zones: Sunlight, Twilight, Midnight, and The Abyss, concluding with a powerful conservation message. 

To achieve a premium, weighted feel, we engineered a custom architecture syncing **ReactLenis** smooth scrolling directly to the **GSAP ScrollTrigger** ticker. This eliminates the standard jitter found in most pinned-layout sites, providing a flawless sense of mass and inertia. The experience features an interactive Boids simulation in the Sunlight Zone (where bio-luminescent fish scatter via mouse repulsion), high-performance `yPercent` CSS parallax in the Twilight Zone to preserve layout integrity, and a custom CSS flashlight mask in the Abyss that reacts to cursor proximity. 

The aesthetic is heavily driven by minimalist "industrial" web design principles: nested "Double-Bezel" components, custom `cubic-bezier` spring physics, fluid-island navigation, and GPU-accelerated glassmorphism. It serves not just as an educational tool about marine depths, but as a technical demonstration of modern, uncompromised front-end motion choreography and visceral digital storytelling.
