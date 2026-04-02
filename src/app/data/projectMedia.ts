// Pantry Raid project
import gameplay from '../../assets/project-pages/pantry-raid/gameplay.gif';
import fastAction from '../../assets/project-pages/pantry-raid/FastAction.gif';
import replayability from '../../assets/project-pages/pantry-raid/Replayability.gif';
import spicyConcept from '../../assets/project-pages/pantry-raid/Spicy_Concept.png';
import sourConcept from '../../assets/project-pages/pantry-raid/Sour_Concept.png';
import savoryConcept from '../../assets/project-pages/pantry-raid/Savory_Concept.png';
import inGameDiner from '../../assets/project-pages/pantry-raid/InGame_Diner.png';
import inGameKitchen from '../../assets/project-pages/pantry-raid/InGame_Kitchen.png';
import inGameLighting from '../../assets/project-pages/pantry-raid/InGame_Lighting.png';
import mapIcy from '../../assets/project-pages/pantry-raid/Map_Icy.png';
import mapTreasure from '../../assets/project-pages/pantry-raid/Map_Treasure.png';
import bearFlex from '../../assets/project-pages/pantry-raid/Bear_Flex.png';
import scarecrow from '../../assets/project-pages/pantry-raid/Scarecrow_Textured.png';
import snail from '../../assets/project-pages/pantry-raid/Snail_Textured.png';
import initialSketch from '../../assets/project-pages/pantry-raid/InitialSketch.png';
import logoCaffiend from '../../assets/project-pages/pantry-raid/Logo-Caffiend-Desktop.png';
import logoPantryRaid from '../../assets/project-pages/pantry-raid/Logo-PantryRaid.svg';
import websitePantryRaid from '../../assets/project-pages/pantry-raid/caffiendSite.png';

// Misc projects
import coverImage from '../../assets/project-pages/freeze-grounders/CoverImage.png';
import TinkersTool from '../../assets/project-pages/misc-projects/TinkersToolOptim.gif';
import RoguelikePvPShooter from '../../assets/project-pages/misc-projects/RoguelikePvPShooter.gif';
import AsteroidsClone from '../../assets/project-pages/misc-projects/AsteroidsClone.gif';
import LuftrausersClone from '../../assets/project-pages/misc-projects/LuftrausersClone.gif';

// website
import HeroNew from '../../assets/project-pages/website/Hero-New.png';
import HeroOld from '../../assets/project-pages/website/Hero-Old.png';
import ConceptFull from '../../assets/project-pages/website/Website-Concept-Full.jpg';
import ConceptPC from '../../assets/project-pages/website/Website-Concept-PC.jpg';
import ConceptMobile from '../../assets/project-pages/website/Website-Concept-Mobile.jpg';
import LivingDex from '../../assets/project-pages/website/LivingDex.png';

// Keep project media grouped per project so projects.ts stays readable as content grows.
export const pantryRaidMedia = {
    gameplay,
    fastAction,
    replayability,
    spicyConcept,
    sourConcept,
    savoryConcept,
    inGameDiner,
    inGameKitchen,
    inGameLighting,
    mapIcy,
    mapTreasure,
    bearFlex,
    scarecrow,
    snail,
    initialSketch,
    logoCaffiend,
    logoPantryRaid,
    websitePantryRaid
} as const;

export const freezeGroundersMedia = {
    coverImage
} as const

export const miscProjectsMedia = {
    TinkersTool,
    RoguelikePvPShooter,
    AsteroidsClone,
    LuftrausersClone
} as const;

export const websiteMedia = {
    HeroNew,
    HeroOld,
    ConceptFull,
    ConceptPC,
    ConceptMobile,
    LivingDex
} as const;