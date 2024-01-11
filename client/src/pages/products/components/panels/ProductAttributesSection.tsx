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
    <div>
      <div>
        <TextInput
          value={currentAttributeNameValue}
          onChange={handleAttributeNameChange}
        />
        <Button onClick={handleAddAttribute}>Add</Button>
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
  const editableRef = useRef<HTMLSpanElement>(null);

  function handleEditAttribute() {
    if (!editableRef.current) return;
    editableRef.current.contentEditable = 'true';
    editableRef.current.focus();

    editableRef.current.addEventListener('blur', () => {
      if (!editableRef.current) return;
      editableRef.current?.removeAttribute('contenteditable');
      updateAttribute(name, editableRef.current.textContent ?? '');
    });
  }

  return (
    <li className='flex'>
      <span ref={editableRef}>{name}</span>
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
