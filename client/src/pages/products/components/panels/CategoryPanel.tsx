import Select from '@/components/form/Select';
import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import supabase from '@/lib/supabase/supabaseClient';
import { SelectOptionType } from '@/types/app.types';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function CategoryPanel() {
  return (
    <Panel>
      <PanelHeader className='flex'>Category</PanelHeader>
      <PanelBody>
        <div className='flex gap-8'>
          <CategorySelect />
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
}

function CategorySelect() {
  const [categories, setCategories] = useState<
    {
      id: number;
      name: string;
      subcategories: { id: number; name: string }[];
    }[]
  >([]);

  const { register } = useFormContext();

  const options: SelectOptionType[] = [
    { id: 'none', value: '', label: 'None' },
    ...categories.map((category) => ({
      id: category.id.toString(),
      value: category.id.toString(),
      label: category.name,
      children: category.subcategories.map((subcategory) => ({
        id: subcategory.id.toString(),
        value: subcategory.id.toString(),
        label: subcategory.name,
      })),
    })),
  ];

  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
  }, []);

  return (
    <Select
      options={options}
      id='category'
      className='grow'
      {...register('subcategory_id')}
    />
  );
}

async function fetchCategories() {
  try {
    const { data } = await supabase
      .from('categories')
      .select('id,name,subcategories(id,name)')
      .throwOnError();
    return data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
