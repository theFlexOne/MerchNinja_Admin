import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/dashboard/Dashboard';
import ProductsProvider from './pages/products/ProductsProvider';
import ProductsList from './pages/products/ProductsList';
import Product from './pages/products/Product';
import AddProduct from './pages/products/AddProduct';
import EditProduct from './pages/products/EditProduct';

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
            element: <ProductsList />,
          },
          {
            path: ':id',
            element: <Product />,
          },
          {
            path: 'add',
            element: <AddProduct />,
          },
          {
            path: 'edit/:id',
            element: <EditProduct />,
          },
        ],
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
