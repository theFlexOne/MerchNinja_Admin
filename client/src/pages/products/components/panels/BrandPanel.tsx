import Select from '@/components/form/Select';
import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import { SelectOption } from '@/types/app.types';
import { Brand } from '@/types/models.types';
import { fetchSupabaseData } from '@/utils';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const BrandPanel = () => {
  const { register } = useFormContext();
  const brands: BrandDisplay[] = useBrands() as BrandDisplay[];

  const options: SelectOption[] = [
    { id: 'none', value: '', label: 'None' },
    ...brands.map((brand) => ({
      id: brand.id.toString(),
      value: brand.id.toString(),
      label: brand.name,
    })),
  ];

  console.log('brands', brands);

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

function useBrands(): Partial<Brand>[] {
  const [brands, setBrands] = useState<Partial<Brand>[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const data = await fetchSupabaseData<Partial<Brand>>('product_brands', [
        'id',
        'name',
      ]);
      setBrands(data);
    };
    fetchBrands();
  }, []);

  return brands;
}

type BrandDisplay = {
  id: number;
  name: string;
};

export default BrandPanel;
