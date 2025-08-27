import { lazy } from 'react';
import { WithSuspense } from '../../../../components/WithSuspense/WithSuspense';

export const LazyFlightListPage = WithSuspense({
  Component: lazy(async () =>
    import('./FlightListPage').then(({ FlightListPage }) => ({
      default: FlightListPage,
    }))
  ),
});
