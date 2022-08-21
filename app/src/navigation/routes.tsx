import { Navigate, RouteObject } from 'react-router-dom';
import { Paths } from './paths';
import { BasicLayout } from '../layouts';
import { WelcomePage, MintCharactePage, BattlePage } from '../pages';

const routes: RouteObject[] = [
  {
    element: <BasicLayout />,
    children: [
      {
        path: Paths.WELCOME,
        element: <WelcomePage />,
      },
      {
        path: Paths.MINT_CHARACTER,
        element: <MintCharactePage />,
      },
      {
        path: Paths.BATTLE,
        element: <BattlePage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={Paths.WELCOME} />,
  },
];

export { routes };
