import { createBrowserRouter } from 'react-router';
import { DefaultLayout } from '../layouts/Default';
import Parts from '../pages/Parts';
import Index from '../pages/Index';

export const router = createBrowserRouter([
  {
    Component: DefaultLayout,
    children: [
      {
        index: true,
        Component: Index,
      },
      {
        path: 'parts/:partNumber',
        Component: Parts,
      },
    ],
  },
]);
