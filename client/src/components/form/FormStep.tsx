import cn from '@/utils/cn';

const FormStep = ({ children }: { children: React.ReactNode }) => {
  return <div className={cn(['grow'])}>{children}</div>;
};

export default FormStep;
