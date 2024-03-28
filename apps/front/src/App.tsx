import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IndexPage } from './pages/Index/index';
import { Navbar } from './components/Navbar/Navbar';
import { trpc, client } from './trpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <trpc.Provider client={client} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter future={{ v7_startTransition: true }}>
          <Navbar />
          <div className="container mx-auto">
            <Routes>
              <Route path="/" Component={IndexPage} />
            </Routes>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
