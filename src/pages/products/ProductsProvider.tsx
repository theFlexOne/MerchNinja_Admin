import { Outlet } from 'react-router-dom';

const ProductsProvider = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProductsProvider;
