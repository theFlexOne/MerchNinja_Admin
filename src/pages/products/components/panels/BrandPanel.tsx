import Select from '@/components/form/Select';
import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import useSupaBaseData from '@/hooks/useSupaBaseData';
import { Brand } from '@/types/models.types';

const BrandPanel = () => {
  const { data: brands } = useSupaBaseData('brands');

  const options = [
    { value: '', label: 'None' },
    ...(brands as Brand[]).map((brand) => ({
      value: brand.id,
      label: brand.name,
    })),
  ];

  return (
    <Panel>
      <PanelHeader className='flex'>Brand</PanelHeader>
      <PanelBody>
        <div className='flex gap-8'>
          <Select options={options} name='brand' id='brand' className='grow' />
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
