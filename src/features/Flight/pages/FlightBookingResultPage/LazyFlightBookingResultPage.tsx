import { lazy } from 'react';
import { WithSuspense } from '../../../../components/WithSuspense/WithSuspense';

export const LazyFlightBookingResultPage = WithSuspense({
  Component: lazy(async () =>
    import('./FlightBookingResultPage').then(({ FlightBookingResultPage }) => ({
      default: FlightBookingResultPage,
    }))
  ),
});
