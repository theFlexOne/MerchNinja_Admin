import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/dashboard/Dashboard';
import ProductsProvider from './pages/products/ProductsProviderPage';
import ProductListPage from './pages/products/ProductListPage';
import ProductPage from './pages/products/ProductPage';
import AddProductPage from './pages/products/AddProductPage';
import EditProductPage from './pages/products/EditProductPage';
import TestPage from './pages/test/TestPage';
import PageNotFoundPage from './pages/PageNotFoundPage';

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
            element: <ProductListPage />,
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
    path: '*',
    element: <PageNotFoundPage errorCode={404} />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
