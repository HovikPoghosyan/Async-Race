import React, { FC } from 'react';

import styles from './NotFoundMessage.module.scss';

interface NotFoundMessageProps {
   message: string;
}

function NotFoundMessage({ message }: NotFoundMessageProps) {
   return <p className={styles.message}>{message}</p>;
}

export default NotFoundMessage;
