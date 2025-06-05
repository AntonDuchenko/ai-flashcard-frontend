import { MainLayout } from '@/shared/layouts';
import { AuthPage } from './auth/ui';
import { HomePage } from './home/ui';
import { DeckPage } from './deck/ui';

export const appRoutes = [
  {
    path: '/',
    element: (
      <MainLayout>
        <HomePage />
      </MainLayout>
    ),
  },
  {
    path: 'deck/:id',
    element: (
      <MainLayout>
        <DeckPage />
      </MainLayout>
    ),
  },
  {
    path: 'sign-in',
    element: <AuthPage />,
  },
  {
    path: 'sign-up',
    element: <AuthPage />,
  },
];
