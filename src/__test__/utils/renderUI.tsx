import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

const Wrapper = ({ children }: { children: ReactNode }, options?: { route: string }) => {
  return (
    <RecoilRoot>
      <MemoryRouter initialEntries={[options?.route ?? '/']}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </MemoryRouter>
    </RecoilRoot>
  );
};

// const Wrapper = ({ children }: { children: ReactNode }) => {
//   return (
//     <RecoilRoot>
//       <BrowserRouter>
//         <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//       </BrowserRouter>
//     </RecoilRoot>
//   );
// };

export default Wrapper;
