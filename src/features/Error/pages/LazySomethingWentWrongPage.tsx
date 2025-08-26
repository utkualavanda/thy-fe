import { lazy } from 'react';
import { WithSuspense } from '../../../components/WithSuspense/WithSuspense';

export const LazySomethingWentWrongPage = WithSuspense({
  Component: lazy(async () =>
    import('./SomethingWentWrongPage').then(({ SomethingWentWrongPage }) => ({
      default: SomethingWentWrongPage,
    }))
  ),
});
