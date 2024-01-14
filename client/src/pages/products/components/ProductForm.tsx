import Form from '@/components/form/Form';
import BasicInfoPanel from './panels/BasicInfoPanel';
import AttributesPanel from './panels/AttributesPanel';
import MetadataPanel from './panels/MetadataPanel';
import StatusPanel from './panels/StatusPanel';
import CategoryPanel from './panels/CategoryPanel';
import TagsPanel from './panels/TagsPanel';
import BrandPanel from './panels/BrandPanel';
import Button from '@/components/Button';
import { useForm } from 'react-hook-form';

export default function ProductForm({
  handleSubmit,
}: {
  handleSubmit: (data: Record<string, unknown>) => void;
}) {
  const methods = useForm<Record<string, unknown>>();

  return (
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
  );
}
