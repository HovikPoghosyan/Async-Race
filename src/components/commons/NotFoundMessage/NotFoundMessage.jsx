import React from 'react';

import styles from './NotFoundMessage.module.scss';

function NotFoundMessage({ message }) {
   return <p className={styles.message}>{message}</p>;
}

export default NotFoundMessage;
