import Select from '@/components/form/Select';
import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import { SelectOption } from '@/types/app.types';
import { Brand } from '@/types/models.types';
import { fetchSupabaseData } from '@/utils';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const BrandPanel = () => {
  const { register } = useFormContext();

  const options: SelectOption[] = [
    { id: 'none', value: '', label: 'None' },
    ...(brands as Brand[]).map((brand) => ({
      id: brand.id.toString(),
      value: brand.id.toString(),
      label: brand.name,
    })),
  ];

  return (
    <Panel>
      <PanelHeader className='flex'>Brand</PanelHeader>
      <PanelBody>
        <div className='flex gap-8'>
          <Select
            options={options}
            id='brand'
            className='grow'
            {...register('brand')}
          />
          <button
            type='button'
            className='text-primary-500/80 text-xs min-w-fit'
          >
            New Brand
          </button>
        </div>
      </PanelBody>
    </Panel>
  );
};

async function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const data = await fetchSupabaseData('product_brands', ['id', 'name']);
}

export default BrandPanel;
