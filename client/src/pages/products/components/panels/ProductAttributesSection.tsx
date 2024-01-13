import { BiTrash as DeleteIcon } from 'react-icons/bi';
import { AiFillEdit as EditIcon } from 'react-icons/ai';
import Button from '@/components/Button';
import TextInput from '@/components/form/TextInput';
import { useRef, useState } from 'react';
import { AttributeNameType } from './VariantsPanel';

export default function ProductAttributesSection({
  attributeList,
  addAttribute,
  removeAttribute,
  editAttribute,
}: {
  attributeList: AttributeNameType[];
  addAttribute: (attributeName: string) => void;
  removeAttribute: (attributeId: string) => void;
  editAttribute: (attribute: AttributeNameType) => void;
}) {
  const [currentAttributeNameValue, setCurrentAttributeNameValue] =
    useState<string>('');

  function handleAttributeNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentAttributeNameValue(e.target.value);
  }

  function handleAddAttribute() {
    if (!currentAttributeNameValue) return;
    addAttribute(currentAttributeNameValue);
    setCurrentAttributeNameValue('');
  }

  function handleRemoveAttribute(attributeId: string) {
    removeAttribute(attributeId);
  }

  function handleEditAttribute(oldAttribute: string, newAttribute: string) {
    if (oldAttribute === newAttribute) return;
    const attribute = attributeList.find((attr) => attr.name === oldAttribute);
    if (!attribute) return;
    editAttribute({ ...attribute, name: newAttribute });
  }

  console.log(attributeList);

  return (
    <div className='px-6'>
      <div className='flex gap-2 items-center'>
        <TextInput
          value={currentAttributeNameValue}
          onChange={handleAttributeNameChange}
        />
        <Button className='p-1 ml-auto' onClick={handleAddAttribute}>
          Add
        </Button>
      </div>
      <ul className='flex flex-col gap-2'>
        {attributeList.map((attr) => (
          <AttributeListItem
            key={attr.id}
            name={attr.name}
            onRemove={handleRemoveAttribute}
            updateAttribute={handleEditAttribute}
          />
        ))}
      </ul>
    </div>
  );
}

function AttributeListItem({
  name,
  onRemove,
  updateAttribute,
}: {
  name: string;
  onRemove: (name: string) => void;
  updateAttribute: (oldAttribute: string, newAttribute: string) => void;
}) {
  const [editable, setEditable] = useState<boolean>(false);
  const prevName = useRef<string>(name);

  function handleEditAttribute() {
    setEditable(true);
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    setEditable(false);
    const newName = e.target.value;
    updateAttribute(prevName.current, newName);
    prevName.current = newName;
  }

  return (
    <li className='flex p-2'>
      {editable ? (
        <TextInput defaultValue={name} onBlur={handleBlur} autoFocus />
      ) : (
        <span>{name}</span>
      )}
      <div className='ml-auto'>
        <button type='button' onClick={handleEditAttribute}>
          <EditIcon />
        </button>
        <button type='button' onClick={() => onRemove(name)}>
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
}
