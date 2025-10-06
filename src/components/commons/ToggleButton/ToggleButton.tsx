import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './ToggleButton.module.scss';

interface ToggleButtonProps {
   name: string;
   valueOne: string;
   valueTwo: string;
   startValue: string | null;
   onToggle: (value: string | null) => void;
   uncheckedValue?: string | null;
}

function ToggleButton({ name, valueOne, valueTwo, startValue, onToggle, uncheckedValue = null }: ToggleButtonProps) {
   const [selectedValue, setSelectedValue] = useState<string | null>(null);
   useEffect(() => {
      setSelectedValue(startValue);
   }, [startValue]);
   const toggle = (value: string) => {
      const newValue = selectedValue === value ? startValue : value;
      setSelectedValue(newValue);
      onToggle(selectedValue === value ? uncheckedValue : value);
   };
   return (
      <div className={styles.toggle}>
         <input
            name={name}
            type="radio"
            id={valueOne}
            className={styles.toggleInput}
            onClick={() => toggle(valueOne)}
            checked={selectedValue === valueOne}
            readOnly
         />
         <label htmlFor={valueOne} className={classNames(styles.toggleBtn, styles.leftBtn)}>
            {valueOne}
         </label>

         <input
            name={name}
            type="radio"
            id={valueTwo}
            className={styles.toggleInput}
            onClick={() => toggle(valueTwo)}
            checked={selectedValue === valueTwo}
            readOnly
         />
         <label htmlFor={valueTwo} className={classNames(styles.toggleBtn, styles.rightBtn)}>
            {valueTwo}
         </label>
      </div>
   );
}

export default ToggleButton;
