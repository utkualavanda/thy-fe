import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { LazySomethingWentWrongPage } from '../features/Error/pages/LazySomethingWentWrongPage';
import { LazyFlightBookingResultPage } from '../features/Flight/pages/FlightBookingResultPage/LazyFlightBookingResultPage';
import { LazyFlightListPage } from '../features/Flight/pages/FlightListPage/LazyFlightListPage';
import { LazySearchFlightPage } from '../features/Flight/pages/SearchFlightPage/LazySearchFlightPage';
import { ROUTES } from './routeNames';

const routeObject: RouteObject[] = [
  {
    children: [
      { element: <LazyFlightBookingResultPage />, path: ROUTES['/flights/result'] },
      {
        element: <LazyFlightListPage />,
        path: ROUTES['/flights'],
      },

      { element: <LazySearchFlightPage />, path: ROUTES['/'] },
    ],
    path: ROUTES['/'],
    errorElement: <LazySomethingWentWrongPage />,
  },
  {
    path: '*',
    element: <>sayfa bulunamadı</>,
  },
];

export const router = createBrowserRouter(routeObject);
