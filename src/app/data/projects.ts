import {miscProjectsMedia, pantryRaidMedia} from './projectMedia';
import {freezeGroundersMedia} from "./projectMedia";
import {websiteMedia} from "./projectMedia";

export interface Project {
    id: number;
    title: string;
    description: string;
    date: string;
    image: string;
    tags: string[];
    demoLink?: string;
    demoLinkLabel?: string;
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

const parseProjectDate = (value: string): number => {
    const yearMonthDay = /^(\d{4})-(\d{2})-(\d{2})$/;
    const yearMonth = /^(\d{4})-(\d{2})$/;

    const fullMatch = value.match(yearMonthDay);
    if (fullMatch) {
        const [, year, month, day] = fullMatch;
        return Date.UTC(Number(year), Number(month) - 1, Number(day));
    }

    const monthMatch = value.match(yearMonth);
    if (monthMatch) {
        const [, year, month] = monthMatch;
        return Date.UTC(Number(year), Number(month) - 1, 1);
    }

    const fallback = Date.parse(value);
    return Number.isNaN(fallback) ? 0 : fallback;
};

export const allProjects: Project[] = [
    {
        id: 1,
        title: "Pantry Raid",
        description:
            "A food-themed roguelike built around replayable, ever-changing runs.\nFast-paced gameplay with randomized elements and evolving strategies.\nQuirky culinary theme paired with tight combat and progression.",
        date: "2025-04",
        image: pantryRaidMedia.gameplay,
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
        demoLinkLabel: "View on Steam",
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
                imageSrc: pantryRaidMedia.fastAction,
                imageAlt: 'Fast-paced combat in Pantry Raid',
                title: 'Fast-Paced Action',
                content: `Combat moves fast. Enemies push you to keep moving, and standing still is rarely an option. Between dodging attacks and managing your buff loadout, there's always something demanding your attention.

It's the kind of game where you feel the improvement run over run, and where a good rhythm feels genuinely satisfying to hit.`,
            },
            {
                type: 'two-column',
                imageLeft: true,
                imageSrc: pantryRaidMedia.inGameKitchen,
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
                    {src: pantryRaidMedia.spicyConcept, alt: 'Spicy buff concept art'},
                    {src: pantryRaidMedia.sourConcept, alt: 'Sour buff concept art'},
                    {src: pantryRaidMedia.savoryConcept, alt: 'Savory buff concept art'},
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
                    {src: pantryRaidMedia.inGameDiner, alt: 'In-game diner environment'},
                    {src: pantryRaidMedia.inGameKitchen, alt: 'In-game kitchen environment'},
                    {src: pantryRaidMedia.inGameLighting, alt: 'In-game lighting showcase'},
                    {src: pantryRaidMedia.mapIcy, alt: 'Icy map layout'},
                    {src: pantryRaidMedia.mapTreasure, alt: 'Treasure map layout'},
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
                    {src: pantryRaidMedia.bearFlex, alt: 'Bear character model'},
                    {src: pantryRaidMedia.scarecrow, alt: 'Scarecrow enemy model'},
                    {src: pantryRaidMedia.snail, alt: 'Snail enemy model'},
                ],
            },
            {
                type: 'two-column',
                imageLeft: true,
                imageSrc: pantryRaidMedia.initialSketch,
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
                src: pantryRaidMedia.logoCaffiend,
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
        title: "Freeze Grounders",
        description:
            "A 2D Canadian schoolyard game, one player is \"It\" and plays with their eyes closed.",
        date: "2026-03-08",
        image: freezeGroundersMedia.coverImage,
        tags: ["Unity", "C#", "2D", "Pixel Art", "Game Jam"],
        demoLink: "https://zend-ry.itch.io/freeze-grounders",
        demoLinkLabel: "View on itch.io",
        featured: false,
        detailContent: [
            {
                type: 'text',
                title: 'Overview',
                content: `Grounders is a popular Canadian schoolyard game, one player is "It" and plays with their eyes closed.

The players have to move carefully around them and not get tagged,  if the "It" player believes there is someone on the ground, calling "Grounders!" causes them to be tagged.

This was James and I's first Game Jam, this game was made in 13 hours for the Mini Jame Gam #52 hosted on Itch.io.
There was more I was excited to add to this project, but for the time we had making it and I'm proud of how much we got done in such a short time frame.`,
            }
        ]
    },
    {
        id: 3,
        title: "Caffiend Games website",
        description:
            "The website used to promote Pantry Raid, built with React and TypeScript.",
        date: "2025-04",
        image: pantryRaidMedia.websitePantryRaid,
        tags: ["React", "TypeScript", "HTML", "CSS / SCSS", "Web Design"],
        demoLinkLabel: "Visit website",
        detailContent: [
            {
                type: 'text',
                title: 'Overview',
                content: `The Caffiend Games website was built to promote our game, Pantry Raid. It was built with mainly with TypeScript and experimented with React, features a custom design that reflects the quirky, food-themed aesthetic of the game.
The site includes an overview of the game, a gallery of screenshots and concept art, and links to our Steam page and social media. It was designed to be responsive and accessible, ensuring a great experience for all visitors.

The website is no longer live, but it was a fun project to work on and a great way to practice web development skills while supporting our game release.

The site was built in a way that allowed us to easily update content and add new features as needed, which was especially important during the lead-up to our game launch when we were frequently adding new media and information about the game.`,
            }
        ]
    },
    {
        id: 4,
        title: "Tinker's Tool Optimizer",
        description:
            "A tool to optimize Tinker's Construct loadouts for Minecraft, built with C# and XAML. Designed to calculate optimal material combinations for durability, speed, and other attributes based on user-selected materials and tools.",
        date: "2024-04",
        image: miscProjectsMedia.TinkersTool,
        tags: ["C#", "XAML", "Front-End Development", "Application Development", "Minecraft Modding"],
        featured: true,
        detailContent: [
            {
                type: 'text',
                title: 'Overview',
                content: `This application was developed in collaboration with my friend during a 2-week Minecraft phase. The tool is designed to optimize the creation process of tools for a Minecraft mod known as Tinkers' Construct. It allows users to select various materials and which tool desired, and will calculate the optimal combinations for durability, speed, and other attributes. The application was built using C# and XAML, showcasing my ability to create user-friendly interfaces and implement complex logic.`
            }
        ]
    },
    {
        id: 5,
        title: "Roguelike PVP Shooter",
        description: "An online multiplayer roguelike shooter built in Unreal Engine. Players compete with generated weapons, battling each other.",
        date: "2024-04",
        image: miscProjectsMedia.RoguelikePvPShooter,
        tags: ["Unreal Engine", "C++", "Multiplayer Networking", "Game Design"],
        detailContent: [
            {
                type: 'text',
                title: 'Overview',
                content: `This project is a networked roguelike PvP shooter developed in Unreal Engine 5.3, where two players compete against each other in round based combat, the loser of the round would receive an option to upgrade their weapon, changing the visual as rounds progress. I was responsible for leading the group and for implementing the core weapon mechanics, projectiles, and modularity. The project showcases my ability to work with Unreal Engine and C++ to create engaging gameplay experiences.`
            }
        ]
    },
    {
        id: 6,
        title: "Asteroids Clone",
        description: "A classic Asteroids clone built in Unity. Players control a spaceship, shooting asteroids while avoiding collisions.",
        date: "2023-06",
        image: miscProjectsMedia.AsteroidsClone,
        tags: ["Proprietary Engine", "C++", "2D Game Development"],
        detailContent: [
            {
                type: 'text',
                title: 'Overview',
                content: 'This project is a clone of the classic Asteroids game, developed in GameDev2D, a proprietary game engine provided by Algonquin College written in C++. The game features classic gameplay mechanics, including player movement, shooting, and enemy spawning. I was responsible for implementing the core gameplay logic, including collision detection and game state management.'
            }]
    },
    {
        id: 7,
        title: "Luftrauser-Inspired Dogfighting Game",
        description: "A 2D dogfighting game inspired by Luftrausers. Players control a customizable plane, engaging in fast-paced aerial combat.",
        date: "2023-04",
        image: miscProjectsMedia.LuftrausersClone,
        tags: ["GDI+", "C++", "2D Game Development", "Game Design"],
        detailContent: [
            {
                type: 'text',
                title: 'Overview',
                content: 'This fast-paced 2D aerial combat game was developed as my final project for Programming Essentials II, using C++ and the GDI+ library. Inspired by LUFTRAUSERS, I created all the artwork and implemented core gameplay mechanics such as physics-based movement, shooting, and enemy AI.'
            }]
    },
    {
        id: 8,
        title: "Portfolio website",
        description: "The website you're on right now! Built with React and TypeScript, showcasing my projects and skills in game development. The website has gone through many iterations, and this is the latest version.",
        date: "2026-04-01",
        image: websiteMedia.HeroNew,
        featured: true,
        tags: ["HTML", "CSS", "TypeScript", "Tailwind", "React", "Sqlite3", "Back-End Development", "Web Design"],
        detailContent: [
            {
                type: 'text',
                title: 'Overview',
                content: `This website has gone through many iterations, some I have lost, others I have screenshots of. This is the latest version, built with React, Typescript, Tailwind, and Sqlite3. It serves as a general portfolio of all my development work, with a focus on game development.`
            },
            {
                type: 'text',
                title: 'Concept & Design',
                content: `The first design was created in reference to other portfolios, referencing other sites such as brittanychiang.com and remi.works, however, I didn't love that it felt too much like a copy and wasn't my own design. I later got help from my girlfriend and she helped me create a design that I felt was more my own, and that I was really happy with. The design is clean and simple, and I have really come to love the colours chosen.`,
            },
            {
                type: 'image',
                src: websiteMedia.ConceptPC,
            },
            {
                type: 'two-column',
                imageLeft: true,
                imageSrc: websiteMedia.ConceptMobile,
                imageAlt: 'Full website concept design',
                title: 'Full Concept Design',
                content: `The full concept design includes the mobile version of the site, which I also really like. I wanted to make sure the site was responsive and looked good on all devices, and I think this design achieves that.`
            },
            {
                type: 'text',
                title: 'Development',
                content: `I originally started developing the site during my schooling in plain HTML, CSS, and JavaScript, but I quickly realized that I wanted to use React and TypeScript to make development easier and more efficient. I also wanted to use Tailwind for styling, but was overwhelmed by the sheer amount of classes given by Tailwind, so I opted for creating my own "Tailwind-Like" structure. The at it's core led to the previous iteration of the website.`
            },
            {
                type: 'two-column',
                imageLeft: false,
                imageSrc: websiteMedia.HeroOld,
                imageAlt: 'Previous iteration of the website',
                title: 'Creation of the Website',
                content: `The previous iteration of the website was a bit more basic, but I still really liked it. It followed the concept design pretty closely although there were some differences, but something I learned during the development process was that I struggled with scaling stuff such as text and ui elements. This continues to be a struggle at the time of writing but I am slowly getting better with it.`,
            },
            {
                type: 'text',
                title: 'Reiteration & Improvements',
                content: `The current iteration of the website is a visual rework from the ground up and I am really happy with how it turned out. I also took the time to learn some new skills during the process, setting up a backend and learning to use Sqlite3 for the first time to store the Pokedex completion tracking. You can find access to the webpage in the About Me section.`
            },
            {
                type: 'image',
                src: websiteMedia.LivingDex,
                alt: 'Living Dex completion tracking feature',
            }
        ]
    }
].sort((a, b) => parseProjectDate(b.date) - parseProjectDate(a.date));
