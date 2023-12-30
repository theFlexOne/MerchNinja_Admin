import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import { useState } from 'react';
import Pill from '@/components/Pill';
import InputFieldWrapper from '@/components/form/InputFieldWrapper';
import { IoAddSharp as AddIcon } from 'react-icons/io5';
import cn from '@/utils/cn';
import Tooltip from '@/components/overlay/ToolTip';

const TagsPanel = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState<string>('');
  const [errors, setErrors] = useState<{ exists: boolean }>({ exists: false });

  const handleAddTag = () => {
    if (tags.includes(tagValue)) {
      setErrors({ exists: true });
      return;
    }
    setTags([...tags, tagValue]);
    setTagValue('');
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((pill) => pill !== tag));
  };

  return (
    <Panel>
      <PanelHeader>Tags</PanelHeader>
      <PanelBody>
        <Tooltip isVisible={errors.exists} message='Tag already exists'>
          <InputFieldWrapper className='flex relative'>
            <input
              name='tags'
              type='email'
              id='tags'
              className='bg-transparent border-none outline-none placeholder-neutral-200 grow px-2 py-1 text-sm placeholder:text-neutral-400/70'
              value={tagValue}
              onChange={(e) => setTagValue(e.target.value)}
              placeholder='Add a tag'
            />
            <button
              type='button'
              disabled={!tagValue}
              className={cn([
                'group',
                'bg-neutral-100/10 text-primary p-2 ml-auto rounded',
                'disabled:text-neutral-400/70 disabled:bg-transparent',
                'hover:bg-neutral-100/20',
              ])}
              onClick={handleAddTag}
            >
              <AddIcon className='text-lg group-hover:scale-125' />
            </button>
          </InputFieldWrapper>
        </Tooltip>
        <div className='p-2 border-2 border-neutral-500/20 rounded-sm basis-20'>
          {tags.map((pill, i) => (
            <Pill
              key={pill}
              index={i % tags.length}
              removePill={() => handleRemoveTag(pill)}
            >
              {pill}
            </Pill>
          ))}
        </div>
      </PanelBody>
    </Panel>
  );
};

export default TagsPanel;
