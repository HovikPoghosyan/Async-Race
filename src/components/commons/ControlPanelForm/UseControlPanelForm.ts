import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks/hooks';

import { addNewCar, updateCar, setSelectedCar, Car, CarData } from 'store/modules/garageListReducer';

interface UseControlPanelFormReturn {
   newCar: CarData;
   updatedCar: Car;
   handleNewCar: (newData: Partial<CarData>) => void;
   handleUpdatedCar: (newData: Partial<Car>) => void;
   submitNewCar: () => void;
   submitUpdatedCar: () => void;
   updateBtnDisable: boolean;
}

function UseControlPanelForm(): UseControlPanelFormReturn {
   const dispatch = useAppDispatch();
   const selectedCar = useAppSelector((store) => store.garageList.selectedCar);
   const [newCar, setNewCar] = useState<CarData>({ name: '', color: '#48bfee' });
   const [updatedCar, setUpdatedCar] = useState<Car>({ name: '', color: '#48bfee', id: 0 });
   const [updateBtnDisable, setUpdateBtnDisable] = useState(true);

   useEffect(() => {
      if (selectedCar) setUpdatedCar({ name: selectedCar.name, color: selectedCar.color, id: selectedCar.id });
      else setUpdatedCar({ name: '', color: '#48bfee', id: 0 });
   }, [selectedCar]);

   const submitNewCar = () => {
      dispatch(addNewCar(newCar));
      setNewCar({ name: '', color: '#48bfee' });
   };

   const submitUpdatedCar = () => {
      dispatch(updateCar({ ...selectedCar, ...updatedCar }));
      setUpdatedCar({ name: '', color: '#48bfee', id: 0 });
      dispatch(setSelectedCar(undefined));
   };

   const handleNewCar = (newData: Partial<CarData>) => setNewCar({ ...newCar, ...newData });
   const handleUpdatedCar = (newData: Partial<Car>) => setUpdatedCar({ ...updatedCar, ...newData });
   useEffect(() => {
      if (selectedCar && (updatedCar.name !== selectedCar.name || updatedCar.color !== selectedCar.color)) {
         setUpdateBtnDisable(false);
      } else setUpdateBtnDisable(true);
   }, [updatedCar]);

   return { newCar, updatedCar, handleNewCar, handleUpdatedCar, submitNewCar, submitUpdatedCar, updateBtnDisable };
}

export default UseControlPanelForm;
