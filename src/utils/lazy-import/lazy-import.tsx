import * as React from 'react';

import {Pending} from '@/app/general';

import {retry} from '../retry';

interface LazyImportOptions {
  fallback: React.ReactNode;
}

type Unpromisify<T> = T extends Promise<infer P> ? P : never;

type ImportFunc<U> = () => Promise<{default: U}>;

export const lazyImport = <
  T extends Promise<any>,
  U extends React.ComponentType<any>,
>(
  importFunc: () => T,
  selectorFunc?: (s: Unpromisify<T>) => U,
  opts: LazyImportOptions = {fallback: null},
) => {
  // eslint-disable-next-line fp/no-let
  let lazyFactory: ImportFunc<U> = () => retry<{default: U}>(importFunc);

  if (selectorFunc) {
    lazyFactory = () =>
      importFunc().then(module => ({default: selectorFunc(module)}));
  }

  const LazyComponent = React.lazy(lazyFactory);

  return (props: React.ComponentProps<U>): JSX.Element => (
    <React.Suspense fallback={opts.fallback ?? <Pending />}>
      {/* <Page> */}
      <LazyComponent {...props} />
      {/* </Page> */}
    </React.Suspense>
  );
};
