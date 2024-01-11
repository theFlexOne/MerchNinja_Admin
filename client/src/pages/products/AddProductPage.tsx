import Button from '@/components/Button';
import Form from '@/components/form/Form';
import BasicInfoPanel from '@products/components/panels/BasicInfoPanel';
import ImagesPanel from '@products/components/panels/ImagesPanel';
// import MoreInfoPanel from '@products/components/panels/MoreInfoPanel';
import StatusPanel from '@products/components/panels/StatusPanel';
import CategoryPanel from '@products/components/panels/CategoryPanel';
import TagsPanel from '@products/components/panels/TagsPanel';
import BrandPanel from '@products/components/panels/BrandPanel';
import AddProductPageHeader from './components/AddProductPageHeader';
import { useForm } from 'react-hook-form';
import VariantsPanel from './components/panels/VariantsPanel';

export default function AddProductPage() {
  const methods = useForm<Record<string, unknown>>();

  const handleSubmit = (data: Record<string, unknown>) => {
    console.log(data);
  };

  // const handleSaveDraft = () => {};

  return (
    <div className='grow flex flex-col gap-6'>
      <AddProductPageHeader saved={true}>
        <span className=''>Create Product</span>
      </AddProductPageHeader>
      <Form
        className='grid grid-cols-[1fr,1fr] gap-6 max-w-screen-2xl mx-auto px-6'
        onSubmit={handleSubmit}
        methods={methods}
        devtools={true}
      >
        <div className='flex flex-col gap-6'>
          <BasicInfoPanel />
          <ImagesPanel />
          <VariantsPanel />
          {/* <MoreInfoPanel /> */}
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
