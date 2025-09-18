import React from 'react';

import CarIcon from 'assets/icons/CarIcon/CarIcon';

import Pagination from 'components/commons/Pagination/Pagination';

import styles from './WinnersTable.module.scss';

function WinnersTable() {

   return(
      <>
         <table className = { styles.table } >
            <tr>
               <th>No</th>
               <th>Car</th>
               <th>Name</th>
               <th>Wins</th>
               <th>Best Time</th>
            </tr>
            <tr>
               <td>97</td>
               <td>
                  <CarIcon height = { 42 }  fill = "#ccc" /></td>
               <td>Tesla Model 3</td>
               <td>2</td>
               <td>2.37</td>
            </tr>
            <tr>
               <td>97</td>
               <td>
                  <CarIcon width = { 100 } height = { 42 }  fill = "#ccc" /></td>
               <td>Tesla Model 3</td>
               <td>2</td>
               <td>2.37</td>
            </tr>
            <tr>
               <td>97</td>
               <td>
                  <CarIcon width = { 100 } height = { 42 }  fill = "#ccc" /></td>
               <td>Tesla Model 3</td>
               <td>2</td>
               <td>2.37</td>
            </tr>
            <tr>
               <td>97</td>
               <td>
                  <CarIcon width = { 100 } height = { 42 }  fill = "#ccc" /></td>
               <td>Tesla Model 3</td>
               <td>2</td>
               <td>2.37</td>
            </tr>
            <tr>
               <td>97</td>
               <td>
                  <CarIcon width = { 100 } height = { 42 }  fill = "#ccc" /></td>
               <td>Tesla Model 3</td>
               <td>2</td>
               <td>2.37</td>
            </tr>
            <tr>
               <td>97</td>
               <td>
                  <CarIcon width = { 100 } height = { 42 }  fill = "#ccc" /></td>
               <td>Tesla Model 3</td>
               <td>2</td>
               <td>2.37</td>
            </tr>
            <tr>
               <td>97</td>
               <td>
                  <CarIcon width = { 100 } height = { 42 }  fill = "#ccc" /></td>
               <td>Tesla Model 3</td>
               <td>2</td>
               <td>2.37</td>
            </tr>
         </table>
         <Pagination />
      </>

   )
}

export default WinnersTable;