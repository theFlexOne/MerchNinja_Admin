import Select from '@/components/form/Select';
import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import supabase from '@/lib/supabase/supabaseClient';
import { SelectOption } from '@/types/app.types';
import { Category } from '@/types/models.types';
import { useEffect, useState } from 'react';

const CategoryPanel = () => {
  const [categories, setCategories] = useState<
    { id: number; name: string; parentId: number | null }[]
  >([]);
  const options: SelectOption[] = [
    { id: 'none', value: '', label: 'None' },
    ...(categories as Category[]).map((category) => ({
      id: category.id.toString(),
      value: category.id.toString(),
      label: category.name,
    })),
  ];

  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
  }, []);

  console.log('categories', categories);

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

async function fetchCategories() {
  try {
    const { data } = await supabase
      .from('product_categories')
      .select('id,name,parentId:parent_id')
      .throwOnError();
    return data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

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
