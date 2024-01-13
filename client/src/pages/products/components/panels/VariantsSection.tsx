import { useState } from 'react';
import { AttributeNameType } from './VariantsPanel';
import set from 'lodash.set';
import TextInput from '@/components/form/TextInput';
import Button from '@/components/Button';
export default function VariantsSection({
  attributes,
}: {
  attributes: AttributeNameType[];
}) {
  const [variants, setVariants] = useState<VariantType[]>([]);

  function updateVariant(variantId: string) {
    return function (variant: VariantType) {
      const index = variants.findIndex((v) => v._formId === variantId);
      const newVariants = [...variants];
      newVariants[index] = variant;
      setVariants(newVariants);
    };
  }

  return (
    <div>
      <div className='flex flex-wrap -mx-3 mb-6'>
        {variants.map((variant) => (
          <VariantInputs
            attributes={attributes}
            update={updateVariant(variant._formId)}
          />
        ))}
        <Button
          onClick={() => {
            setVariants([
              ...variants,
              {
                _formId: crypto.randomUUID(),
                id: '',
                price: 0,
                sku: '',
                quantity: 0,
                attributes: {},
              },
            ]);
          }}
        >
          Add Variant
        </Button>
      </div>
    </div>
  );
}

function VariantInputs({
  attributes,
  update,
}: {
  attributes: AttributeNameType[];
  update: (variant: VariantType) => void;
}) {
  const [variantValues, setVariantValues] = useState<VariantType>({
    _formId: crypto.randomUUID(),
    id: '',
    price: 0,
    sku: '',
    quantity: 0,
    attributes: {},
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    const newVariant = set({ ...variantValues }, name, value);
    setVariantValues(newVariant);
    update(newVariant);
  }

  return (
    <div className='w-full flex flex-wrap'>
      <TextInput
        label='Price'
        name='price'
        value={variantValues.price}
        onChange={handleChange}
      />
      <TextInput
        label='SKU'
        name='sku'
        value={variantValues.sku}
        onChange={handleChange}
      />
      <TextInput
        label='Quantity'
        name='quantity'
        value={variantValues.quantity}
        onChange={handleChange}
      />
      <div>
        <span>Attributes</span>
        <div>
          {attributes.map((attribute) => (
            <TextInput
              label={attribute.name}
              name={`attributes.${attribute.name}`}
              value={variantValues.attributes[attribute.name]}
              onChange={handleChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type VariantType = {
  _formId: string;
  id: string;
  price: number;
  sku: string;
  quantity: number;
  attributes: {
    [key: string]: string;
  };
};
