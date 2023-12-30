import Select from '@/components/form/Select';
import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import useSupaBaseData from '@/hooks/useSupaBaseData';
import { Brand } from '@/types/models.types';

const BrandPanel = () => {
  const { data: brands, isLoading } = useSupaBaseData('brands');

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
        <div className='flex items-center'>
          <span className='mr-auto'>Select brand</span>
          <span className='text-xs text-amber-500/40'>Add New</span>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Select options={options} name='brand' id='brand' />
        )}
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
