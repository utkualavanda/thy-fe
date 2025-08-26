import { type ComponentType, Suspense } from 'react';

import { Spinner } from '../Spinner/Spinner';

export const WithSuspense =
  <T extends object>({ Component }: { Component: ComponentType<T> }) =>
  (props: T) => (
    <Suspense fallback={<Spinner sx={{ marginY: 10 }} />}>
      <Component {...props} />
    </Suspense>
  );
