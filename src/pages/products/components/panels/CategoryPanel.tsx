import Select from '@/components/form/Select';
import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import useSupaBaseData from '@/hooks/useSupaBaseData';
import { Category, SelectOption } from '@/types/app.types';
import { useEffect, useState } from 'react';

const CategoryPanel = () => {
  const { data: categories, error, isLoading } = useSupaBaseData('categories');

  console.log(categories);

  const options: SelectOption[] = [
    { value: '', label: 'None' },
    ...(categories as Category[]).map((category) => ({
      value: category.id,
      label: category.name,
    })),
  ];

  if (error) {
    console.error(error);
    return <div>Error</div>;
  }

  return (
    <Panel>
      <PanelHeader className='flex'>Category</PanelHeader>
      <PanelBody>
        <div className='flex items-center'>
          <span className='mr-auto'>Select category</span>
          <span className='text-xs text-amber-500/40'>Add New</span>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Select options={options} name='category' id='category' />
        )}
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
