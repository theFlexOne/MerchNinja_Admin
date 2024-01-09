import Button from '@/components/Button';
import Form from '@/components/form/Form';
import BasicInfoPanel from '@products/components/panels/BasicInfoPanel';
import ImagesPanel from '@products/components/panels/ImagesPanel';
import MoreInfoPanel from '@products/components/panels/MoreInfoPanel';
import StatusPanel from '@products/components/panels/StatusPanel';
import CategoryPanel from '@products/components/panels/CategoryPanel';
import TagsPanel from '@products/components/panels/TagsPanel';
import BrandPanel from '@products/components/panels/BrandPanel';
import AddProductPageHeader from './components/AddProductPageHeader';
import AttributesPanel from './components/panels/attributesPanel/AttributesPanel';
import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import TextInput from '@/components/form/TextInput';
import { useForm } from 'react-hook-form';
import ProductSetSelect from './components/ProductSetSelect';
import { FullProductSet } from '@/types/models.types';
import { createContext, useState } from 'react';
import useProductSetContext from './hooks/useProductSetContext';

export const ProductSetContext = createContext<ProductSetContextValue | null>(
  null
);

export default function AddProductPage() {
  const methods = useForm<Record<string, unknown>>();
  const [productSet, setProductSet] = useState<FullProductSet | null>(null);

  const handleSubmit = (data: Record<string, unknown>) => {
    console.log(data);
  };

  const handleProductSetChange = (productSet: FullProductSet | null) => {
    console.log(productSet);
    setProductSet(productSet);
  };

  // const handleSaveDraft = () => {};

  return (
    <div className='grow flex flex-col gap-6'>
      <AddProductPageHeader saved={true}>
        <span className=''>Create Product</span>
      </AddProductPageHeader>
      <ProductSetContext.Provider
        value={{
          productSet,
          updateProductSet: handleProductSetChange,
        }}
      >
        <Form
          className='grid grid-cols-[1fr,1fr] gap-6 max-w-screen-2xl mx-auto px-6'
          onSubmit={handleSubmit}
          methods={methods}
          devtools={true}
        >
          <div className='flex flex-col gap-6'>
            {/* <ProductNamePanel /> */}
            <BasicInfoPanel />
            {/* <AttributesPanel /> */}
            {/* <ImagesPanel /> */}
            {/* <MoreInfoPanel /> */}
          </div>
          <div className='flex flex-col gap-6'>
            {/* <StatusPanel /> */}
            <CategoryPanel />
            {/* <TagsPanel /> */}
            <BrandPanel />
          </div>
          <Button className='col-span-full' type='submit'>
            Submit
          </Button>
        </Form>
      </ProductSetContext.Provider>
    </div>
  );
}

function ProductNamePanel() {
  const productSetContext = useProductSetContext();
  const onProductSetChange = (productSet: FullProductSet | null) => {
    productSetContext.updateProductSet(productSet);
  };
  return (
    <Panel className='p-2'>
      <PanelBody>
        <div className='flex gap-12'>
          <TextInput
            containerProps={{
              className: 'max-w-[400px] grow mr-auto px-8 py-1',
            }}
            placeholder='Product Name'
            name='name'
          />
          <ProductSetSelect
            className='ml-auto w-auto'
            onChange={onProductSetChange}
          />
        </div>
      </PanelBody>
    </Panel>
  );
}

type ProductSetContextValue = {
  productSet: FullProductSet | null;
  updateProductSet: (productSet: FullProductSet | null) => void;
};
