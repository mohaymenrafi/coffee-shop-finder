import { useState } from 'react';

const useTrackLocation = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [latlong, setLatlong] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const success = (position) => {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    setLatlong(`${latitude},${longitude}`);
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
    latlong,
    errorMessage,
    isLoadingLocation,
  };
};
export default useTrackLocation;
