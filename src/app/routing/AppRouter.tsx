import { appRoutes } from '@/pages/routes';
import { BrowserRouter, Routes, Route } from 'react-router';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {appRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
