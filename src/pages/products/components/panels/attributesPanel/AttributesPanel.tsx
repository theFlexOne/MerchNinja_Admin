import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import useSupaBaseData from '@/hooks/useSupaBaseData';
import { SelectOption } from '@/types/app.types';
import { ProductAttribute } from '@/types/models.types';
import { useState } from 'react';
import ProductGroupSelect from './ProductGroupSelect';
import AttributesList from './AttributesList';
import AttributeInputs from './AttributeInputs';

const AttributesPanel = () => {
  const [attributesList, setAttributesList] = useState<ProductAttribute[]>([]);
  const { data: productGroups } = useSupaBaseData('productGroups');

  const options: SelectOption[] = productGroups?.map((productGroup) => ({
    label: productGroup.name as string,
    value: productGroup.id as string,
  }));

  const handleAddAttribute = (name: string, value: string) => {
    if (attributesList.some((attribute) => attribute.name === name))
      return false;
    setAttributesList((prev) => [...prev, { name, value }]);
    return true;
  };

  const handleDeleteAttribute = (name: string) => {
    setAttributesList((prev) =>
      prev.filter((attribute) => attribute.name !== name)
    );
  };

  return (
    <Panel>
      <PanelHeader>Product Attributes</PanelHeader>
      <PanelBody>
        <ProductGroupSelect options={options} />
        <div className='grid grid-cols-[1fr,1fr,auto] gap-y-4'>
          {!!attributesList.length && (
            <AttributesList
              attributes={attributesList}
              onDeleteAttribute={handleDeleteAttribute}
            />
          )}
          <AttributeInputs onAddAttribute={handleAddAttribute} />
        </div>
      </PanelBody>
    </Panel>
  );
};

export default AttributesPanel;
