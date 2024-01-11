import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import StatusSelect from '../StatusSelect';

export default function StatusPanel() {
  return (
    <Panel>
      <PanelHeader>Status</PanelHeader>
      <PanelBody>
        <StatusSelect />
      </PanelBody>
    </Panel>
  );
}
