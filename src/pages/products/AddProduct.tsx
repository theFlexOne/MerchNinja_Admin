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

export default function AddProduct() {
  function handleSubmit(formObject: Record<string, unknown>) {
    console.log('formObject', formObject);
  }

  // const handleSaveDraft = () => {};

  return (
    <div className='grow flex flex-col gap-6'>
      <AddProductHeader saved={true}>
        <span className=''>Create Product</span>
      </AddProductHeader>
      <Form
        className='grid grid-cols-[3fr,1fr] gap-6 max-w-screen-2xl mx-auto px-6'
        onSubmit={handleSubmit}
        devtools={true}
      >
        <div className='flex flex-col gap-6'>
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
      </Form>
    </div>
  );
}
