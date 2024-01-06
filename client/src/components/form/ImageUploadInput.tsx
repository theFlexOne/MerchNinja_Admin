import { HTMLProps, forwardRef } from 'react';

const ImageUploadInput = forwardRef<
  HTMLInputElement,
  HTMLProps<HTMLInputElement>
>(({ className, ...rest }, ref) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <label
        htmlFor='image-upload'
        className='flex flex-col items-center justify-center cursor-pointer'
      >
        <span className='text-neutral-400 text-sm'>Upload image</span>
        <input
          type='file'
          id='image-upload'
          className='hidden'
          {...rest}
          ref={ref}
        />
      </label>
    </div>
  );
});

export default ImageUploadInput;
