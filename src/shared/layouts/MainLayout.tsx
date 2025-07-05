import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import type { ReactNode } from 'react';

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex">{children}</main>
      <Footer />
    </div>
  );
};
