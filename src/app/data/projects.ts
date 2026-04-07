import pantryRaidGameplay from '../../assets/project-pages/pantry-raid/gameplay.gif';
import pantryRaidFastAction from '../../assets/project-pages/pantry-raid/FastAction.gif';
import pantryRaidReplayability from '../../assets/project-pages/pantry-raid/Replayability.gif';
import pantryRaidSpicyConcept from '../../assets/project-pages/pantry-raid/Spicy_Concept.png';
import pantryRaidSourConcept from '../../assets/project-pages/pantry-raid/Sour_Concept.png';
import pantryRaidSavoryConcept from '../../assets/project-pages/pantry-raid/Savory_Concept.png';
import pantryRaidInGameDiner from '../../assets/project-pages/pantry-raid/InGame_Diner.png';
import pantryRaidInGameKitchen from '../../assets/project-pages/pantry-raid/InGame_Kitchen.png';
import pantryRaidInGameLighting from '../../assets/project-pages/pantry-raid/InGame_Lighting.png';
import pantryRaidMapIcy from '../../assets/project-pages/pantry-raid/Map_Icy.png';
import pantryRaidMapTreasure from '../../assets/project-pages/pantry-raid/Map_Treasure.png';
import pantryRaidBearFlex from '../../assets/project-pages/pantry-raid/Bear_Flex.png';
import pantryRaidScarecrow from '../../assets/project-pages/pantry-raid/Scarecrow_Textured.png';
import pantryRaidSnail from '../../assets/project-pages/pantry-raid/Snail_Textured.png';
import pantryRaidInitialSketch from '../../assets/project-pages/pantry-raid/InitialSketch.png';
import pantryRaidLogoCaffiend from '../../assets/project-pages/pantry-raid/Logo-Caffiend-Desktop.png';

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
  detailContent?: ProjectBlock[];
}

export type ProjectBlock =
  | { type: 'text'; title?: string; content: string }
  | { type: 'features'; title: string; features: string[] }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'two-column'; imageLeft: boolean; imageSrc: string; imageAlt: string; title: string; content: string }
  | { type: 'gallery'; columns: 2 | 3; images: { src: string; alt: string }[] }
  | { type: 'quote'; quote: string; author: string }
  | { type: 'video'; src: string; caption: string; autoPlay?: boolean }
  | { type: 'code'; title: string; language: string; code: string };

export const allProjects: Project[] = [
  {
    id: 1,
    title: "Pantry Raid",
    description:
      "A food-themed roguelike built around replayable, ever-changing runs.\nFast-paced gameplay with randomized elements and evolving strategies.\nQuirky culinary theme paired with tight combat and progression.",
    date: "2024-12-15",
    image: pantryRaidGameplay,
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
    detailContent: [
      {
        type: 'text',
        title: 'Overview',
        content: `Pantry Raid is a 3D food-themed roguelike built as the capstone project for the Game Development Advanced Diploma at Algonquin College. You're dropped into a kitchen gone wrong, fighting through waves of rogue food enemies across randomized runs that never quite play out the same way twice.

The goal was straightforward: make something fun, polished, and actually shippable. We got it on Steam.`,
      },
      {
        type: 'two-column',
        imageLeft: false,
        imageSrc: pantryRaidFastAction,
        imageAlt: 'Fast-paced combat in Pantry Raid',
        title: 'Fast-Paced Action',
        content: `Combat moves fast. Enemies push you to keep moving, and standing still is rarely an option. Between dodging attacks and managing your buff loadout, there's always something demanding your attention.

It's the kind of game where you feel the improvement run over run, and where a good rhythm feels genuinely satisfying to hit.`,
      },
      {
        type: 'two-column',
        imageLeft: true,
        imageSrc: pantryRaidReplayability,
        imageAlt: 'Replayable run variety in Pantry Raid',
        title: 'Replayability',
        content: `No two runs play out the same. Level layouts shift, buff drops vary, and as you unlock new recipes the possible build paths keep expanding. You can play a dozen runs and still be figuring out new strategies.

That was the goal: keep the game fresh even after you've seen most of the pieces.`,
      },
      {
        type: 'text',
        title: 'The Buff System',
        content: `Each buff ties to a food flavor. Spicy pushes fire attacks, Salty tightens ice defenses, and so on. The interesting part is when two buffs stack in ways you didn't see coming. Some combinations are obvious, others take a few runs to stumble onto. Getting a strong synergy going mid-run and riding it to the end is one of those moments the game is built around.`,
      },
      {
        type: 'gallery',
        columns: 3,
        images: [
          { src: pantryRaidSpicyConcept, alt: 'Spicy buff concept art' },
          { src: pantryRaidSourConcept, alt: 'Sour buff concept art' },
          { src: pantryRaidSavoryConcept, alt: 'Savory buff concept art' },
        ],
      },
      {
        type: 'text',
        title: 'Environments',
        content: `The kitchen setting gave us a lot of room to work with when it came to lighting and atmosphere. From the greasy warmth of the diner to the cold snap of the ice maps, each environment has its own feel, and that influenced how we tuned enemy behavior within them.`,
      },
      {
        type: 'gallery',
        columns: 3,
        images: [
          { src: pantryRaidInGameDiner, alt: 'In-game diner environment' },
          { src: pantryRaidInGameKitchen, alt: 'In-game kitchen environment' },
          { src: pantryRaidInGameLighting, alt: 'In-game lighting showcase' },
          { src: pantryRaidMapIcy, alt: 'Icy map layout' },
          { src: pantryRaidMapTreasure, alt: 'Treasure map layout' },
        ],
      },
      {
        type: 'text',
        title: 'Characters & Enemies',
        content: `Character and enemy design stayed true to the food theme throughout: quirky, readable, and distinct enough that you can identify a threat at a glance. Below are some of the textured models that made it into the final build.`,
      },
      {
        type: 'gallery',
        columns: 3,
        images: [
          { src: pantryRaidBearFlex, alt: 'Bear character model' },
          { src: pantryRaidScarecrow, alt: 'Scarecrow enemy model' },
          { src: pantryRaidSnail, alt: 'Snail enemy model' },
        ],
      },
      {
        type: 'two-column',
        imageLeft: true,
        imageSrc: pantryRaidInitialSketch,
        imageAlt: 'Initial concept sketches for Pantry Raid',
        title: 'From Sketch to Screen',
        content: `Early in production we spent a lot of time in concept art, particularly to nail down the visual language of the flavor system. Each damage type needed to read clearly at a glance, so we gave every one a distinct color palette and shape language before any modelling started.

Getting that foundation right early saved a lot of back-and-forth later in the pipeline.`,
      },
      {
        type: 'text',
        title: 'The Team: Caffiend',
        content: `Caffiend is an 11-person indie team that came together at Algonquin College for our final project. The name was ours from day one: half caffeine, half fiend, which pretty well described the last few months of crunch.

Getting a game shipped to Steam as students isn't something everyone gets to do, and it meant a lot to see it through as a group.`,
      },
      {
        type: 'image',
        src: pantryRaidLogoCaffiend,
        alt: 'Caffiend team logo',
        caption: 'Caffiend, Algonquin College Game Development, 2024',
      },
      {
        type: 'text',
        title: 'Development',
        content: `The project ran on Unity and C#. My responsibilities spanned gameplay programming, UI/UX implementation, project management, and managing the build and Steam release pipeline.

Coordinating 11 people through a full production cycle, from whiteboard pitch to a live store page, was as much of a learning experience as any of the technical work.`,
      },
    ],
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
