import { ProductAttribute } from '@/types/models.types';
import { cn } from '@/utils/cn';
import { IoClose as DeleteIcon } from 'react-icons/io5';

export default function AttributesList({
  attributes,
  onDeleteAttribute,
}: {
  attributes: ProductAttribute[];
  onDeleteAttribute: (name: string) => void;
}) {
  return (
    <div className='subgrid-col-full border border-neutral-100/20'>
      {attributes.map((attribute) => (
        <div key={attribute.name} className='subgrid-col-full'>
          <span className='px-2 py-1 border border-neutral-100/20'>
            {attribute.name}
          </span>
          <span className='px-2 py-1 border border-neutral-100/20'>
            {attribute.value}
          </span>
          <span
            className={cn([
              'border border-neutral-100/20',
              'grid place-content-center',
            ])}
          >
            <button
              onClick={() => onDeleteAttribute(attribute.name)}
              className={cn([
                'text-lg',
                'mx-auto p-1 rounded-md',
                'hover:text-primary-500/70',
                'transition-colors duration-150 ease-in-out',
              ])}
            >
              <DeleteIcon />
            </button>
          </span>
        </div>
      ))}
    </div>
  );
}
