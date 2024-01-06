import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import { useState } from 'react';
import { useFormContext, useController, FieldValues } from 'react-hook-form';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import ImageUploadInput from '@/components/form/ImageUploadInput';
import ImageGallery from '@products/components/ImageGallery';

const ImagesPanel = () => {
  const { control, setFocus } = useFormContext<FieldValues>();
  const { field } = useController({
    name: 'thumbnail',
    control,
  });
  const { onChange, ...rest } = field;

  const [thumbnailUrl, setThumbnailUrl] = useState<string>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setThumbnailUrl(url);
    onChange(url);
    setFocus('thumbnail');
  };

  return (
    <Panel>
      <PanelHeader>
        <span className=''>Image Gallery</span>
      </PanelHeader>
      <PanelBody>
        <div
          className='relative flex flex-col gap-2'
          style={{ aspectRatio: '16/9' }}
        >
          <span className='text-neutral-400 text-sm'>Thumbnail</span>
          {thumbnailUrl ? (
            <div className='relative group hover:opacity-80 opacity-100 transition-opacity duration-200 ease-in-out'>
              <img
                src={thumbnailUrl as string}
                alt='Thumbnail'
                className='max-w-1/2 mx-auto max-h-[4000px]'
              />
              <div className='absolute top-1 right-1 group-hover:opacity-100 opacity-0 transition-opacity duration-200 ease-in-out cursor-pointer'>
                X
              </div>
            </div>
          ) : (
            <ImageUploadInput
              className='max-h-[290px]'
              onChange={handleChange}
              value={thumbnailUrl}
              ref={rest.ref}
              onBlur={rest.onBlur}
              name={rest.name}
            />
          )}
          <ImageGallery images={[]} />
        </div>
      </PanelBody>
    </Panel>
  );
};

export default ImagesPanel;
