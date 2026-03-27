export interface Project {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  tags: string[];
  demoLink?: string;
  githubLink?: string;
  featured?: boolean;
}

export const allProjects: Project[] = [
  {
    id: 1,
    title: "Pantry Raid",
    description:
      "A food-themed roguelike built around replayable, ever-changing runs.\nFast-paced gameplay with randomized elements and evolving strategies.\nQuirky culinary theme paired with tight combat and progression.",
    date: "2024-12-15",
    image:
      "https://images.unsplash.com/photo-1765196176394-e028da216775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXhlbCUyMGFydCUyMGdhbWUlMjBzY3JlZW5zaG90fGVufDF8fHx8MTc3NDIzMDE2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: [
      "Unity",
      "C#",
      "3D",
      "UI/UX",
      "Project Management",
      "Team Leadership",
      "Programming",
    ],
    demoLink: "https://store.steampowered.com/app/3582510/Pantry_Raid/",
    featured: true,
  },
  {
    id: 2,
    title: "Space Explorer",
    description:
      "A 3D space exploration game featuring realistic physics and beautiful procedural planets.",
    date: "2024-09-22",
    image:
      "https://images.unsplash.com/photo-1676263813382-bb5ba4b63f91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml0eSUyMGdhbWUlMjBlbmdpbmUlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzc0MjMwMTY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Unreal Engine", "C++", "3D"],
    demoLink: "#",
    githubLink: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Puzzle Quest",
    description:
      "An innovative puzzle game that combines match-3 mechanics with RPG progression systems.",
    date: "2024-06-10",
    image:
      "https://images.unsplash.com/photo-1665142726875-f931a29dcee3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZSUyMGdhbWUlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NzQyMjUyOTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Unity", "C#", "Mobile"],
    demoLink: "#",
    githubLink: "#",
    featured: true,
  },
  {
    id: 4,
    title: "Dungeon Crawler RPG",
    description:
      "Classic dungeon crawler with procedural level generation and deep character customization.",
    date: "2024-03-18",
    tags: ["Godot", "GDScript", "2D", "Pixel Art"],
    image:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdW5nZW9uJTIwZ2FtZXxlbnwxfHx8fDE3NzQyMzAxNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    githubLink: "#",
  },
  {
    id: 5,
    title: "Rhythm Runner",
    description:
      "Music-based endless runner where the environment and obstacles sync with the beat.",
    date: "2023-11-05",
    tags: ["Unity", "C#", "Audio", "Mobile", "Game Design"],
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGdhbWV8ZW58MXx8fHwxNzc0MjMwMTY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    demoLink: "#",
    githubLink: "#",
  },
  {
    id: 6,
    title: "Tower Defense Tactics",
    description:
      "Strategic tower defense with unique tower synergies and branching upgrade paths.",
    date: "2023-08-20",
    tags: ["Unity", "C#", "Strategy", "UI/UX"],
    image:
      "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3dlciUyMGRlZmVuc2UlMjBnYW1lfGVufDF8fHx8MTc3NDIzMDE2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    githubLink: "#",
  },
];
