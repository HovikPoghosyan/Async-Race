import React from 'react';

import ControlPanelLeftAside from 'components/commons/ControlPanelLeftAside/ControlPanelLeftAside';
import ControlPanelRightAside from 'components/commons/ControlPanelRightAside/ControlPanelRightAside';

import styles from './GarageControlPanel.module.scss';

function GarageControlPanel() {

   return(
      <div className = { styles.panel }>
         <ControlPanelLeftAside />
         <ControlPanelRightAside />
      </div>
   )
}

export default GarageControlPanel;