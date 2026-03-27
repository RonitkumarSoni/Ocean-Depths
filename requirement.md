📄 PRD – INTO THE ABYSS (Ocean Depth Experience)
🧭 1. Product Overview

Product Name: Into the Abyss
Type: Interactive Storytelling Website
Goal:
Create a cinematic, scroll-driven web experience where users virtually dive into ocean depths, exploring different zones through animation, interaction, and narrative storytelling.

Core Idea:

“Scrolling = Descending into the ocean”

🎯 2. Objectives
Primary Goals
Build an Awwwards-level immersive website
Deliver cinematic storytelling using scroll
Achieve high engagement (visual + emotional)
Success Criteria
Smooth scroll animations (no lag)
Seamless transitions between sections
Strong storytelling impact
Fully responsive (mobile + desktop)
👤 3. Target Users
Students / Developers (hackathon judges)
Creative designers
General users exploring web experiences
🧠 4. Core Experience Flow

User journey:

Lands on website
Sees ocean surface
Scrolls → dives deeper
Experiences environment change
Ends with emotional message

💡 Feeling:

“I am going deeper into the ocean”

🧩 5. Features & Requirements
🌊 5.1 HERO (Surface Section)

Goal: First impression + hook

Features:

Canvas-based animation (sequence-1)
Floating particles
Smooth scroll start

Text:

“How deep can you go?”
“The ocean hides more than we know.”
🐠 5.2 SUNLIGHT ZONE

Goal: Show life & beauty

Features:

Fish animations (parallax)
Hover interactions
Bubble animation

Interactions:

Hover → show fish info
Click → detail card

Text:

“Here, life thrives.”
“Light still reaches.”
🌌 5.3 TWILIGHT ZONE

Goal: Transition to mystery

Features:

Canvas animation (sequence-2)
Sticky storytelling text
Light fade effect

Text:

“Light begins to fade.”
“Silence grows deeper.”
🌑 5.4 MIDNIGHT ZONE

Goal: Unknown + survival

Features:

Dark UI
Bioluminescent glow particles
Minimal elements

Text:

“Darkness takes over.”
“Only the adapted survive.”
🌀 5.5 ABYSS

Goal: Emotional + depth

Features:

Deep dark background
Vortex/trench animation (sequence-4)

Text:

“The unknown begins here.”
“Infinite pressure. Infinite silence.”
💬 5.6 FINAL SECTION

Goal: Impact + message

Features:

Minimal UI
Fade to black

Text:

“We know more about space than our oceans.”

CTA:

Explore More
Protect the Ocean
🎨 6. Design Requirements
🎨 Color System
Zone	Color
Surface	#AEEFFF
Sunlight	#4FA3C4
Mid	#1B3C73
Deep	#0A0F2C
Abyss	#000000

👉 Must transition smoothly (no sudden jumps)

🔤 Typography
Headings: Bold, cinematic
Body: Clean sans-serif
Large spacing
Apple-style layout
🧱 Layout
Fullscreen sections (100vh)
Sticky scroll sections (300–400vh)
Minimal UI
Centered storytelling
🎞️ 7. Animation Requirements
Required Animations
Scroll → frame sequence animation
Parallax (fish, bubbles, particles)
Fade-in text
Glow pulsing
Bubble rising
Animation Rules
Smooth (no jitter)
No abrupt transitions
Natural motion (physics-like)
🧠 8. Interaction Requirements
Interactions
Hover hotspots (fish)
Clickable cards
Depth progress indicator
Optional sound toggle
⚙️ 9. Technical Requirements
Stack
React + Vite
Tailwind CSS
GSAP + ScrollTrigger
Framer Motion
Lenis
Core Logic
Scroll progress → frame index
Canvas rendering
requestAnimationFrame
Performance
Preload images
Optimize images (WebP)
GPU animations (transform, opacity)
Lazy loading
📱 10. Responsive Requirements
Desktop
Full cinematic experience
Mobile
Reduced animations
Optimized layout
Smooth scroll preserved
📁 11. File Structure (High Level)
src/
  components/
  sections/
  hooks/
  assets/
public/
  seq-1/
  seq-2/
  seq-3/
  seq-4/
⚡ 12. Performance Requirements
60 FPS animation
Fast load (<3s initial)
No lag during scroll
🧪 13. Testing Requirements
Smooth scroll check
Mobile responsiveness
Cross-browser support
Performance test (Lighthouse)
🏁 14. Deliverables
GitHub repo
Live link (Vercel)
PRD document
Demo video
🧠 15. Future Scope (Bonus)
Sound design (underwater ambience)
WebGL effects
Interactive exploration mode