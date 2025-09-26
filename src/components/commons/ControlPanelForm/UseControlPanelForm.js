import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNewCar, updateCar } from 'store/modules/listReducer';
import { setSelectedCar } from 'store/modules/listReducer';

function UseControlPanelForm() {
   const dispatch = useDispatch();
   const selectedCar = useSelector((store) => store.list.selectedCar);
   const [newCar, setNewCar] = useState({ name: '', color: '#48bfee' });
   const [updatedCar, setUpdatedCar] = useState({ name: '', color: '#48bfee' });
   const [updateBtnDisable, setUpdateBtnDisable] = useState(true);

   useEffect(() => {
      if (!!selectedCar)
         setUpdatedCar({ name: selectedCar.name, color: selectedCar.color });
      else setUpdatedCar({ name: '', color: '#48bfee' });
   }, [selectedCar]);

   const submitNewCar = () => {
      dispatch(addNewCar(newCar));
      setNewCar({ name: '', color: '#48bfee' });
   };
   const submitUpdatedCar = () => {
      dispatch(updateCar({ ...selectedCar, ...updatedCar }));
      setUpdatedCar({ name: '', color: '#48bfee' });
      dispatch(setSelectedCar(undefined));
   };

   const handleNewCar = (newData) => setNewCar({ ...newCar, ...newData });
   const handleUpdatedCar = (newData) =>
      setUpdatedCar({ ...updatedCar, ...newData });

   useEffect(() => {
      if (
         selectedCar &&
         (updatedCar.name !== selectedCar.name ||
            updatedCar.color !== selectedCar.color)
      ) {
         setUpdateBtnDisable(false);
      } else setUpdateBtnDisable(true);
   }, [updatedCar]);

   return {
      newCar,
      updatedCar,
      handleNewCar,
      handleUpdatedCar,
      submitNewCar,
      submitUpdatedCar,
      updateBtnDisable,
   };
}

export default UseControlPanelForm;
