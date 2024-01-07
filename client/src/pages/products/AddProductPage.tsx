import Button from '@/components/Button';
import Form from '@/components/form/Form';
import BasicInfoPanel from '@products/components/panels/BasicInfoPanel';
import ImagesPanel from '@products/components/panels/ImagesPanel';
import MoreInfoPanel from '@products/components/panels/MoreInfoPanel';
import StatusPanel from '@products/components/panels/StatusPanel';
import CategoryPanel from '@products/components/panels/CategoryPanel';
import TagsPanel from '@products/components/panels/TagsPanel';
import BrandPanel from '@products/components/panels/BrandPanel';
import AddProductHeader from './components/AddProductHeader';
import AttributesPanel from './components/panels/attributesPanel/AttributesPanel';
import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import TextInput from '@/components/form/TextInput';
import { useForm } from 'react-hook-form';
import ProductGroupSelect from './components/panels/attributesPanel/ProductGroupSelect';
import { ProductGroup } from '@/types/models.types';
import { createContext } from 'react';

export const ProductGroupContext = createContext<ProductGroupContextValue | null>(
  null
);

export default function AddProductPage() {
  const methods = useForm<Record<string, unknown>>();

  const handleSubmit = (data: Record<string, unknown>) => {
    console.log(data);
  };

  const handleProductGroupChange = (productGroup: ProductGroup | null) => {
    console.log(productGroup);
  };

  // const handleSaveDraft = () => {};

  return (
    <div className='grow flex flex-col gap-6'>
      <AddProductHeader saved={true}>
        <span className=''>CREATE Product</span>
      </AddProductHeader>
      <Form
        className='grid grid-cols-[3fr,1fr] gap-6 max-w-screen-2xl mx-auto px-6'
        onSubmit={handleSubmit}
        methods={methods}
        devtools={true}
      >
        <ProductGroupContext.Provider
          value={{
            productGroup: null,
            changeProductGroup: handleProductGroupChange,
          }}
        >
          <div className='flex flex-col gap-6'>
            <ProductNamePanel onProductGroupChange={handleProductGroupChange} />
            <BasicInfoPanel />
            <AttributesPanel />
            <ImagesPanel />
            <MoreInfoPanel />
          </div>
          <div className='flex flex-col gap-6'>
            <StatusPanel />
            <CategoryPanel />
            <TagsPanel />
            <BrandPanel />
          </div>
          <Button className='col-span-full' type='submit'>
            Submit
          </Button>
        </ProductGroupContext.Provider>
      </Form>
    </div>
  );
}

function ProductNamePanel({
  onProductGroupChange,
}: {
  onProductGroupChange: (productGroup: ProductGroup | null) => void;
}) {
  return (
    <Panel>
      <PanelBody>
        <div>
          <TextInput
            // containerProps={{ className: 'w-[300px]' }}
            placeholder='Product Name'
            name='name'
          />
          <ProductGroupSelect
            className='ml-auto'
            onChange={onProductGroupChange}
          />
        </div>
      </PanelBody>
    </Panel>
  );
}

type ProductGroupContextValue = {
  productGroup: ProductGroup | null;
  changeProductGroup: (productGroup: ProductGroup | null) => void;
};
