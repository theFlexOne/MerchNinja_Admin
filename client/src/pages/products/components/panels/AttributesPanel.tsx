import { BiTrash as DeleteIcon } from 'react-icons/bi';
import { AiFillEdit as EditIcon } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import TextInput from '@/components/form/TextInput';
import Button from '@/components/Button';
import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import { useFormContext } from 'react-hook-form';

export default function AttributesPanel() {
  const [currentAttributeNameValue, setCurrentAttributeNameValue] =
    useState<string>('');
  const [attributes, setAttributes] = useState<string[]>([]);
  const { register, setValue } = useFormContext();

  function addAttribute() {
    if (attributes.includes(currentAttributeNameValue)) return;
    const newAttributes = [...attributes, currentAttributeNameValue];
    setAttributes(newAttributes);
    setValue('attributes', newAttributes);
    setCurrentAttributeNameValue('');
  }

  function removeAttribute(index: number) {
    return () => {
      const newAttributes = [...attributes];
      newAttributes.splice(index, 1);
      setAttributes(newAttributes);
      setValue('attributes', newAttributes);
    };
  }

  function editAttribute(index: number) {
    return (attribute: string) => {
      const newAttributes = [...attributes];
      newAttributes[index] = attribute;
      setAttributes(newAttributes);
      setValue('attributes', newAttributes);
    };
  }

  function handleAttributeNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentAttributeNameValue(e.target.value);
  }

  useEffect(() => {
    register('attributes', { value: [] });
  }, [register]);

  return (
    <Panel>
      <PanelHeader>Attributes</PanelHeader>
      <PanelBody>
        <div className='px-6 flex flex-col items-center'>
          <div className='flex gap-2 items-center'>
            <TextInput
              value={currentAttributeNameValue}
              onChange={handleAttributeNameChange}
            />
            <Button color='tertiary' className='p-1' onClick={addAttribute}>
              Add
            </Button>
          </div>
          <ul className='flex flex-col gap-2'>
            {attributes.map((attr, i) => (
              <AttributeListItem
                key={attr}
                attribute={attr}
                onRemove={removeAttribute(i)}
                updateAttribute={editAttribute(i)}
              />
            ))}
          </ul>
        </div>
      </PanelBody>
    </Panel>
  );
}

function AttributeListItem({
  attribute,
  onRemove,
  updateAttribute,
}: {
  attribute: string;
  onRemove: () => void;
  updateAttribute: (newAttribute: string) => void;
}) {
  const [editable, setEditable] = useState<boolean>(false);

  function handleEditAttribute() {
    setEditable(true);
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    setEditable(false);
    const newName = e.target.value;
    attribute = newName;
    updateAttribute(newName);
  }

  return (
    <li className='flex p-2'>
      {editable ? (
        <TextInput defaultValue={attribute} onBlur={handleBlur} autoFocus />
      ) : (
        <span>{attribute}</span>
      )}
      <div className='flex gap-px ml-8'>
        <button type='button' className='p-1' onClick={handleEditAttribute}>
          <EditIcon />
        </button>
        <button type='button' className='p-1' onClick={() => onRemove()}>
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
}
