import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       retry: 0,
//     },
//   },
// });

const Wrapper = ({ children }: { children: ReactNode }, options?: { route: string }) => {
  return (
    <RecoilRoot>
      <MemoryRouter initialEntries={[options?.route ?? '/']}>
        {children}
        {/* <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> */}
      </MemoryRouter>
    </RecoilRoot>
  );
};

export default Wrapper;
