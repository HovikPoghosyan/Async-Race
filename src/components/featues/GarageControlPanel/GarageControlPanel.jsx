import React from 'react';

import ControlPanelForm from 'components/commons/ControlPanelForm/ControlPanelForm';
import ControlPanelRightAside from 'components/commons/ControlPanelRightAside/ControlPanelRightAside';

import styles from './GarageControlPanel.module.scss';

function GarageControlPanel() {
   return (
      <div className={styles.panel}>
         <ControlPanelForm />
         <ControlPanelRightAside />
      </div>
   );
}

export default GarageControlPanel;
