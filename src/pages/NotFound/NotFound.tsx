import React from 'react';

import NotFoundMessage from 'components/commons/NotFoundMessage/NotFoundMessage';

import styles from './NotFound.module.scss';


function NotFound() {
   
   return (
      <main>
         <h2 className = { styles.title }>404 – Lost in traffic.</h2>
         <NotFoundMessage message='We couldn’t find the page you were looking for.'/>
      </main>
   )
}

export default NotFound;
