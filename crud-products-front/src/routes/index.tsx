import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Products } from '../pages/Products';
import { NewProduct } from '../pages/NewProduct';
import { EditProduct } from '../pages/EditProduct';
import { DefaultLayout } from '../layouts/DefaultLayout';

export function Routes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: '/',
          element: <Products />,
        },
        {
          path: '/new',
          element: <NewProduct />,
        },
        {
          path: '/update/:productId',
          element: <EditProduct />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
