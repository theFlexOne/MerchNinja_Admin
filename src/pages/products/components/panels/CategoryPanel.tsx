import Select from '@/components/form/Select';
import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import useSupaBaseData from '@/hooks/useSupaBaseData';
import { SelectOption } from '@/types/app.types';
import { Category } from '@/types/models.types';

const CategoryPanel = () => {
  const { data: categories } = useSupaBaseData('categories');

  const options: SelectOption[] = [
    { id: 'none', value: '', label: 'None' },
    ...(categories as Category[]).map((category) => ({
      id: category.id.toString(),
      value: category.id.toString(),
      label: category.name,
    })),
  ];

  return (
    <Panel>
      <PanelHeader className='flex'>Category</PanelHeader>
      <PanelBody>
        <div className='flex gap-8'>
          <Select
            options={options}
            name='category'
            id='category'
            className='grow'
          />
          <button
            type='button'
            className='text-primary-500/80 text-xs min-w-fit'
          >
            New Category
          </button>
        </div>
      </PanelBody>
    </Panel>
  );
};

export default CategoryPanel;

// const categories = [
//   { value: 'electronics', label: 'Electronics' },
//   { value: 'fashion', label: 'Fashion' },
//   { value: 'food', label: 'Food' },
//   { value: 'health', label: 'Health' },
//   { value: 'sports', label: 'Sports' },
//   { value: 'outdoor', label: 'Outdoor' },
//   { value: 'home', label: 'Home' },
//   { value: 'other', label: 'Other' },
// ];
