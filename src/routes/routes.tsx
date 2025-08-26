import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { LazySomethingWentWrongPage } from '../features/Error/pages/LazySomethingWentWrongPage';
import { LazySearchFlightPage } from '../features/SearchFlight/pages/LazySearchFlightPage';
import { ROUTES } from './routeNames';

const routeObject: RouteObject[] = [
  {
    children: [{ element: <LazySearchFlightPage />, path: ROUTES['/'] }],
    path: ROUTES['/'],
    errorElement: <LazySomethingWentWrongPage />,
  },
  {
    path: '*',
    element: <>sayfa bulunamadı</>,
  },
];

export const router = createBrowserRouter(routeObject);
