import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/dashboard/Dashboard';
import ProductsProvider from './pages/products/ProductsProviderPage';
import ProductsListPage from './pages/products/ProductsListPage';
import ProductPage from './pages/products/ProductPage';
import AddProductPage from './pages/products/AddProductPage';
import EditProductPage from './pages/products/EditProductPage';
import TestPage from './pages/test/TestPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to='/dashboard' replace={true} />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'products',
        element: <ProductsProvider />,
        children: [
          {
            index: true,
            element: <ProductsListPage />,
          },
          {
            path: ':id',
            element: <ProductPage />,
          },
          {
            path: 'add',
            element: <AddProductPage />,
          },
          {
            path: 'edit/:id',
            element: <EditProductPage />,
          },
        ],
      },
      {
        path: 'test',
        element: <TestPage />,
      },
    ],
  },
  {
    path: 'error',
    element: <div>Error</div>,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
