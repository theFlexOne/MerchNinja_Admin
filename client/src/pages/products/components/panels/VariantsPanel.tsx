import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import Tab from '@/components/navigation/Tab';
import Tabs from '@/components/navigation/Tabs';
import { useState } from 'react';
import {} from 'react-router-dom';
import ProductAttributesSection from './ProductAttributesSection';

const tabs = ['Attributes', 'Variants'];

export default function VariantsPanel() {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const [attributeList, setAttributeList] = useState<AttributeNameType[]>([]);

  function handleTabClick(e: React.MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLButtonElement;
    const tab = tabs.find((tab) => tab === target.textContent);
    if (tab) {
      setActiveTab(tab);
    }
  }

  function addAttribute(attributeName: string) {
    if (attributeList.find((attr) => attr.name === attributeName)) {
      return;
    }
    setAttributeList([
      ...attributeList,
      { id: crypto.randomUUID(), name: attributeName },
    ]);
  }

  function removeAttribute(attributeId: string) {
    setAttributeList(attributeList.filter((attr) => attr.id !== attributeId));
  }

  function editAttribute(attribute: AttributeNameType) {
    const index = attributeList.findIndex((attr) => attr.id === attribute.id);
    const newList = [...attributeList];
    newList[index] = attribute;
    setAttributeList(newList);
  }

  return (
    <Panel>
      <PanelHeader>Inventory</PanelHeader>
      <PanelBody>
        <Tabs>
          <Tab
            id={tabs[0].toUpperCase()}
            name={tabs[0]}
            onClick={handleTabClick}
            active={activeTab === tabs[0]}
          >
            {tabs[0]}
          </Tab>
          <Tab
            id={tabs[1]}
            name={tabs[1]}
            onClick={handleTabClick}
            active={activeTab === tabs[1]}
          >
            {tabs[1]}
          </Tab>
        </Tabs>
        {activeTab === tabs[0] && (
          <ProductAttributesSection
            attributeList={attributeList}
            addAttribute={addAttribute}
            removeAttribute={removeAttribute}
            editAttribute={editAttribute}
          />
        )}
        {activeTab === tabs[1] && <div>Variants</div>}
      </PanelBody>
    </Panel>
  );
}

export type AttributeNameType = {
  id: string;
  name: string;
};
