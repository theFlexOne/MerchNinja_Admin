import Button from '@/components/Button';
import Form from '@/components/form/Form';
import BasicInfoPanel from '@products/components/panels/BasicInfoPanel';
import StatusPanel from '@products/components/panels/StatusPanel';
import CategoryPanel from '@products/components/panels/CategoryPanel';
import TagsPanel from '@products/components/panels/TagsPanel';
import BrandPanel from '@products/components/panels/BrandPanel';
import AddProductPageHeader from './components/AddProductPageHeader';
import { FieldValues, useForm } from 'react-hook-form';
import AttributesPanel from './components/panels/AttributesPanel';
import MetadataPanel from './components/panels/MetadataPanel';
import createNewProduct, {
  ProductCreationData,
} from '@/utils/createNewProduct';

export default function AddProductPage() {
  const methods = useForm<Record<string, unknown>>();

  const handleSubmit = (data: FieldValues) => {
    console.log(data);
    createNewProduct(data);
  };

  // const handleSaveDraft = () => {};

  return (
    <div className='grow flex flex-col gap-6 items-center'>
      <AddProductPageHeader className='w-full' saved={true}>
        <span className=''>Create Product</span>
      </AddProductPageHeader>
      <Form
        className='grid grid-cols-[1fr,auto] gap-6 max-w-screen-xl w-full px-6'
        onSubmit={handleSubmit}
        methods={methods}
        devtools={true}
      >
        <div className='flex flex-col gap-6'>
          <BasicInfoPanel />
          <AttributesPanel />
          <MetadataPanel />
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
      </Form>
    </div>
  );
}
