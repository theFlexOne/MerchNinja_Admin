import { Tab } from '@/pages/admin/products/pages/components/panels/GeneralInfoPanel';
import cn from '@/utils/cn';
import { HTMLProps, useState } from 'react';

const Tabs = ({
  tabs,
  activeTab,
  onChange,
  defaultTab,
  className,
}: TabsProps) => {
  const [localActiveTab, setLocalActiveTab] = useState(activeTab ?? defaultTab);

  const handleTabClick = (name: string) => () => {
    const tab = tabs.find((tab) => tab.name === name);
    if (!tab) return;
    setLocalActiveTab(tab);
    onChange?.(tab);
  };

  return (
    <div className={cn(['flex grow justify-center', className])}>
      {tabs.map((tab) => (
        <button
          key={tab.name}
          type='button'
          className={cn([
            'grow',
            'py-2 px-4 text-sm font-medium',
            'items-center',
            'transition-colors duration-200 ease-in-out',
            'border-b-2 border-transparent',
            { 'border-l border-l-neutral-600/25': tab !== tabs[0] },
            {
              'text-primary/70 border-b-primary/60': tab === localActiveTab,
            },
          ])}
          onClick={handleTabClick(tab.name)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

type TabsProps = Omit<HTMLProps<HTMLDivElement>, 'onChange'> & {
  tabs: Tab[];
  activeTab?: Tab;
  onChange?: (tab: Tab) => void;
  defaultTab?: Tab;
};

export default Tabs;
