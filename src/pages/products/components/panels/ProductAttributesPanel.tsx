import Select from '@/components/form/Select';
import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import useSupaBaseData from '@/hooks/useSupaBaseData';
import { ProductGroup } from '@/types/models.types';
import { useFormContext } from 'react-hook-form';

const OPTIONS = [
  {
    label: 'None',
    value: '',
  },
  {
    label: 'Product Group 1',
    value: 'product-group-1',
  },
  {
    label: 'Product Group 2',
    value: 'product-group-2',
  },
];

const ProductAttributesPanel = () => {
  const { data: productGroups, isLoading } = useSupaBaseData('productGroups');

  return (
    <Panel>
      <PanelHeader>Product Group</PanelHeader>
      <PanelBody>
        <ProductGroupSelect />
      </PanelBody>
    </Panel>
  );
};

function ProductGroupSelect({
  onChange,
}: {
  onChange?: (productGroupName: string) => void;
}) {
  const { register, getValues } = useFormContext();

  const { onChange: onChangeForm, ...rest } = register('productGroup');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
    onChangeForm(e);
  };

  return (
    <Select
      value={getValues('productGroup')}
      options={OPTIONS}
      onChange={handleChange}
      {...rest}
    />
  );
}

export default ProductAttributesPanel;
