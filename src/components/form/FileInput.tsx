import React, { forwardRef } from 'react';

const FileInput = forwardRef(
  (
    { name, onChange, onBlur, className = '' }: FileInputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return <div></div>;
  }
);

type FileInputProps = React.HTMLProps<HTMLInputElement> & {
  name: string;
};

export default FileInput;
