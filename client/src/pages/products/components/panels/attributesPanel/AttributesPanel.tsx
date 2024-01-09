import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import { ProductAttribute, FullProductSet } from '@/types/models.types';
import { useState } from 'react';
import ProductSetSelect from '../../ProductSetSelect';
import AttributesList from './AttributesList';
import TextInput from '@/components/form/TextInput';
import InputFieldWrapper from '@/components/form/InputFieldWrapper';

const AttributesPanel = () => {
  const [attributeList, setAttributeList] = useState<ProductAttribute[]>([]);
  const [selectedProductSet, setSelectedProductSet] =
    useState<FullProductSet | null>(null);

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

  const handleProductSetChange = (productSet: FullProductSet | null) => {
    setSelectedProductSet(productSet);
  };

  console.log('selectedProductSet', selectedProductSet);

  return (
    <Panel>
      <PanelHeader>Product Attributes</PanelHeader>
      <PanelBody>
        <ProductSetSelect onChange={handleProductSetChange} />
        <div className='grid grid-cols-[1fr,1fr,auto] gap-y-4'>
          {!!attributeList.length && (
            <AttributesList
              attributes={attributeList}
              onDeleteAttribute={handleDeleteAttribute}
            />
          )}
          {selectedProductSet ? (
            <ProductSetAttributeList selectedProductSet={selectedProductSet} />
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

function ProductSetAttributeList({
  selectedProductSet,
}: {
  selectedProductSet: FullProductSet;
}) {
  return selectedProductSet.attributes.map((attribute) => (
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
