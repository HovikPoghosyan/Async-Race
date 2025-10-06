import React, { ChangeEvent } from 'react';

import Button from 'components/commons/Button/Button';

import styles from './ControlPanelFormRow.module.scss';

interface ControlPanelFormRowProps {
   namePlaceholder: string;
   name: string;
   color: string;
   handleName: (event: ChangeEvent<HTMLInputElement>) => void;
   handleColor: (event: ChangeEvent<HTMLInputElement>) => void;
   handleSubmit: () => void;
   btnName: string;
   isDisable: boolean;
}

function ControlPanelFormRow({
   namePlaceholder,
   name,
   color,
   handleName,
   handleColor,
   handleSubmit,
   btnName,
   isDisable,
}: ControlPanelFormRowProps) {
   return (
      <div className={styles.row}>
         <input placeholder={namePlaceholder} value={name} onChange={handleName} className={styles.nameInput} />
         <input type="color" value={color} onChange={handleColor} className={styles.colorBox} />
         <Button
            name={btnName}
            isDisable={isDisable}
            functionality={(event) => {
               event.preventDefault();
               handleSubmit();
            }}
         />
      </div>
   );
}

export default ControlPanelFormRow;
