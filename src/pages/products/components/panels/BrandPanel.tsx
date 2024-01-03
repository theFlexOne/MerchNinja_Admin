import Select from '@/components/form/Select';
import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import useSupaBaseData from '@/hooks/useSupaBaseData';
import { SelectOption } from '@/types/app.types';
import { Brand } from '@/types/models.types';
import { useFormContext } from 'react-hook-form';

const BrandPanel = () => {
  const { data: brands } = useSupaBaseData('brands');
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

export default BrandPanel;

// const brands = [
//   { value: '', label: 'None' },
//   { value: 'apple', label: 'Apple' },
//   { value: 'samsung', label: 'Samsung' },
//   { value: 'huawei', label: 'Huawei' },
//   { value: 'xiaomi', label: 'Xiaomi' },
//   { value: 'oppo', label: 'Oppo' },
//   { value: 'vivo', label: 'Vivo' },
//   { value: 'realme', label: 'Realme' },
//   { value: 'oneplus', label: 'OnePlus' },
//   { value: 'sony', label: 'Sony' },
//   { value: 'nokia', label: 'Nokia' },
//   { value: 'lg', label: 'LG' },
//   { value: 'other', label: 'Other' },
// ];
