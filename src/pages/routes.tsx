import { MainLayout } from '@/shared/layouts';
import { AuthPage } from './auth/ui';
import { HomePage } from './home/ui';
import { DeckPage } from './deck/ui';
import { CompleteRegistrationPage } from './completeRegistartion/ui';

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
    path: 'complete-registration',
    element: <CompleteRegistrationPage />,
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
