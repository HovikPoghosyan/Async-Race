import React, { FC, MouseEventHandler, CSSProperties } from 'react';
import classnames from 'classnames';

import styles from './Button.module.scss';

interface ButtonProps {
   name?: React.ReactNode;
   functionality?: MouseEventHandler<HTMLButtonElement>;
   isDisable?: boolean;
   style?: CSSProperties | string;
   isActive?: boolean;
}

function Button({ name, functionality, isDisable = false, style, isActive = false }: ButtonProps) {
   return (
      <button
         disabled={isDisable || isActive}
         onClick={functionality}
         className={classnames({ [styles.isActive]: isActive }, styles.button, style)}
      >
         {name}
      </button>
   );
}

export default Button;
