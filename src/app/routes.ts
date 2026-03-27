import { createBrowserRouter } from 'react-router';
import Home from './pages/Home';
import AllProjects from './pages/AllProjects';
import ProjectDetail from './pages/ProjectDetail';
import PokemonLivingDex from './pages/PokemonLivingDex';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/projects',
    Component: AllProjects,
  },
  {
    path: '/projects/:id',
    Component: ProjectDetail,
  },
  {
    // Secret page — not linked from the main navigation
    path: '/pokemon-livingdex-progress',
    Component: PokemonLivingDex,
  },
]);
