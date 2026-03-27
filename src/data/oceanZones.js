export const oceanZones = [
  {
    id: "surface",
    name: "The Surface",
    depthRange: "0m",
    color: "#00f2fe",
    creatures: [],
  },
  {
    id: "sunlight",
    name: "The Sunlight Zone",
    depthRange: "0m - 200m",
    color: "#4facfe",
    creatures: [
      {
        id: "turtle",
        name: "Green Sea Turtle",
        x: "20%",
        y: "40%",
        fact: "Highly dependent on sunlight to warm their bodies."
      },
      {
        id: "manta",
        name: "Giant Manta Ray",
        x: "70%",
        y: "60%",
        fact: "Filter feeds near the surface where plankton thrive."
      }
    ],
  },
  {
    id: "twilight",
    name: "The Twilight Zone",
    depthRange: "200m - 1000m",
    color: "#1a2a6c",
    creatures: [
      {
        id: "shark",
        name: "Great White Silhouette",
        fact: "Hunts in the dim light where counter-shading hides them."
      },
      {
        id: "sperm-whale",
        name: "Sperm Whale",
        fact: "Dives deep into the twilight zone to hunt giant squid."
      }
    ],
  },
  {
    id: "midnight",
    name: "The Midnight Zone",
    depthRange: "1000m - 4000m",
    color: "#0f2027",
    cards: [
      {
        id: "c1",
        title: "The Inhabitants",
        icon: "🌊",
        image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=800&auto=format&fit=crop",
        content: "Here, creatures like the Vampire Squid and Dumbo Octopus thrive in freezing, lightless water. They navigate using sensory organs adapted to complete darkness."
      },
      {
        id: "c2",
        title: "Hidden Wonders",
        icon: "🌋",
        image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=800&auto=format&fit=crop",
        content: "Hydrothermal vents spew superheated, mineral-rich water. Giant tubeworms rely on chemosynthetic bacteria to turn these toxic chemicals into energy."
      },
      {
        id: "c3",
        title: "Protecting the Future",
        icon: "🌍",
        image: "https://images.unsplash.com/photo-1530053969600-caed2596d242?q=80&w=800&auto=format&fit=crop",
        content: "Deep-sea mining threatens to destroy fragile ecosystems that take thousands of years to regrow. Protecting the deep means protecting Earth's ultimate frontier."
      }
    ]
  },
  {
    id: "abyss",
    name: "The Abyss",
    depthRange: "4000m+",
    color: "#000000",
    creatures: [
      {
        id: "anglerfish",
        name: "Anglerfish",
        x: "30%",
        y: "50%",
        fact: "Uses a bioluminescent lure to draw prey into its massive jaws."
      },
      {
        id: "gulper-eel",
        name: "Gulper Eel",
        x: "70%",
        y: "30%",
        fact: "Has a massive mouth capable of swallowing prey larger than itself."
      }
    ],
  }
];
