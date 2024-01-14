import { createProduct } from '@/utils/productService';
import { FieldValues } from 'react-hook-form';
import PageHeader from './components/PageHeader';
import ProductForm from './components/ProductForm';
import { useNavigate } from 'react-router-dom';
import Page from './components/Page';

export default function AddProductPage() {
  const navigate = useNavigate();

  const handleSubmit = (data: FieldValues) => {
    console.log('formData', { ...data });
    createProduct(data).then((productId) => {
      if (!productId) {
        navigate('/error');
        return;
      }
      console.log('productId', productId);
      navigate('..');
    });
  };

  return (
    <Page>
      <PageHeader className='w-full' saved={true}>
        <span className=''>Create Product</span>
      </PageHeader>
      <ProductForm handleSubmit={handleSubmit} />
    </Page>
  );
}
