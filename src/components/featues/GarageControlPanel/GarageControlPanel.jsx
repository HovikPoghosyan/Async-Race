import React from 'react';

import ControlPanelLeftAside from 'components/commons/ControlPanelLeftAside/ControlPanelLeftAside';
import ControlPanelRightAside from 'components/commons/ControlPanelRightAside/ControlPanelRightAside';

import Button from 'components/commons/Button/Button';

import styles from './GarageControlPanel.module.scss';

function GarageControlPanel() {

   return(
      <div className = { styles.panel }>
         <Button style = { styles.bigButton } name = { <p>Generate <br />  Cars</p> } />
         <ControlPanelLeftAside />
         <ControlPanelRightAside />
      </div>
   )
}

export default GarageControlPanel;