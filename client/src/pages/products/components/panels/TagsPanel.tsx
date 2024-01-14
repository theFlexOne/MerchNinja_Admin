import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import { useEffect, useState } from 'react';
// import Tooltip from '@/components/overlay/ToolTip';
import Tags from '@/components/form/Tags';
import TagInput from '@/components/form/TagInput';
import TagList from '@/components/form/TagList';
import { useFormContext } from 'react-hook-form';

const TagsPanel = () => {
  const [tags, setTags] = useState<string[]>([]);
  // const [errors, setErrors] = useState<{ exists: boolean }>({ exists: false });

  const { register, setValue } = useFormContext();

  const handleAddTag = (tagValue: string): boolean => {
    if (tags.includes(tagValue)) {
      // setErrors({ exists: true });
      return false;
    }
    const allTags = [...tags, tagValue.trim()];
    setTags(allTags);
    setValue('tags', allTags);
    // setErrors({ exists: false });
    return true;
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const allTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(allTags);
    setValue('tags', allTags);
  };

  useEffect(() => {
    register('tags', { value: [] });
  }, [register]);

  return (
    <Panel>
      <PanelHeader>Tags</PanelHeader>
      <PanelBody>
        <Tags>
          {/* <Tooltip isVisible={errors.exists} message='Tag already exists'> */}
          <TagInput handleAddTag={handleAddTag} />
          {/* </Tooltip> */}
          <TagList tags={tags} handleRemoveTag={handleRemoveTag} />
        </Tags>
      </PanelBody>
    </Panel>
  );
};

export default TagsPanel;
