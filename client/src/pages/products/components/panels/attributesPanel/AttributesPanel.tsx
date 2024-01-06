import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import { ProductAttribute, ProductGroup } from '@/types/models.types';
import { useState } from 'react';
import ProductGroupSelect from './ProductGroupSelect';
import AttributesList from './AttributesList';
import TextInput from '@/components/form/TextInput';
import InputFieldWrapper from '@/components/form/InputFieldWrapper';

const AttributesPanel = () => {
  const [attributeList, setAttributeList] = useState<ProductAttribute[]>([]);
  const [selectedProductGroup, setSelectedProductGroup] =
    useState<ProductGroup | null>(null);

  const handleAddAttribute = (name: string, value: string) => {
    if (attributeList.some((attribute) => attribute.name === name))
      return false;
    setAttributeList((prev) => [...prev, { name, value }]);
    return true;
  };

  const handleDeleteAttribute = (name: string) => {
    setAttributeList((prev) =>
      prev.filter((attribute) => attribute.name !== name)
    );
  };

  const handleProductGroupChange = (productGroup: ProductGroup | null) => {
    setSelectedProductGroup(productGroup);
  };

  console.log('selectedProductGroup', selectedProductGroup);

  return (
    <Panel>
      <PanelHeader>Product Attributes</PanelHeader>
      <PanelBody>
        <ProductGroupSelect onChange={handleProductGroupChange} />
        <div className='grid grid-cols-[1fr,1fr,auto] gap-y-4'>
          {!!attributeList.length && (
            <AttributesList
              attributes={attributeList}
              onDeleteAttribute={handleDeleteAttribute}
            />
          )}
          {selectedProductGroup ? (
            <ProductGroupAttributeList
              selectedProductGroup={selectedProductGroup}
            />
          ) : (
            <AttributeList
              handleAttributeChange={() => {}}
              attributes={attributeList}
            />
          )}
        </div>
      </PanelBody>
    </Panel>
  );
};

function ProductGroupAttributeList({
  selectedProductGroup,
}: {
  selectedProductGroup: ProductGroup;
}) {
  return selectedProductGroup.attributes.map((attribute) => (
    <div className='flex gap-4' key={attribute.id ?? attribute.name}>
      <InputFieldWrapper label='Name' className='text-sm text-center'>
        <p>{attribute.name}</p>
      </InputFieldWrapper>
      <InputFieldWrapper label='Value'>
        <TextInput
          type='text'
          placeholder='Value'
          className='text-sm'
          containerProps={{ className: 'w-auto' }}
        />
      </InputFieldWrapper>
    </div>
  ));
}

function AttributeList({
  attributes,
  handleAttributeChange,
}: {
  attributes: ProductAttribute[];
  handleAttributeChange: (
    attributeId: string,
    key: string,
    value: string
  ) => void;
}) {
  return <p>Attributes List</p>;
}

export default AttributesPanel;
