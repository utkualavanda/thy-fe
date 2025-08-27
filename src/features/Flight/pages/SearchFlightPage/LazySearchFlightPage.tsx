import { lazy } from 'react';
import { WithSuspense } from '../../../../components/WithSuspense/WithSuspense';

export const LazySearchFlightPage = WithSuspense({
  Component: lazy(async () =>
    import('./SearchFlightPage').then(({ SearchFlightPage }) => ({
      default: SearchFlightPage,
    }))
  ),
});
