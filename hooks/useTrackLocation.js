import { useState, useContext } from 'react';
import { StoreContext, ACTION_TYPES } from '../StoreContext/storeContext';

const useTrackLocation = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { dispatch } = useContext(StoreContext);

  const success = (position) => {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    dispatch({
      type: ACTION_TYPES.SET_LATLONG,
      payload: { latlong: `${latitude},${longitude}` },
    });
    setErrorMessage('');
    setIsLoadingLocation(false);
  };
  const error = () => {
    setErrorMessage('Unable to retrive your location');
    setIsLoadingLocation(false);
  };

  const handleTrackLocation = () => {
    setIsLoadingLocation(true);
    if (!navigator.geolocation) {
      setErrorMessage('Geolocation is not supported by your browser');
      setIsLoadingLocation(false);
    } else {
      // status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
  return {
    handleTrackLocation,
    errorMessage,
    isLoadingLocation,
  };
};
export default useTrackLocation;
