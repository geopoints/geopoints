import { createContext, useState, Dispatch, SetStateAction } from 'react';

import { Coordinates, Point } from '../types/types';

interface MapContext {
  map: google.maps.Map | null;
  setMap: Dispatch<google.maps.Map | null> | null;
  showCrosshair: boolean;
  setShowCrosshair: Dispatch<SetStateAction<boolean>> | null;
  currentUserPosition: Coordinates;
  pointWeWantToSee: Coordinates;
  setCurrentUserPosition: Dispatch<SetStateAction<Coordinates>> | null;
  setPointWeWantToSee: Dispatch<SetStateAction<Coordinates>> | null;
}

const MapContext = createContext<MapContext>({
  map: null,
  setMap: null,
  showCrosshair: false,
  setShowCrosshair: null,
  currentUserPosition: { lat: 0, lng: 0 },
  setCurrentUserPosition: null,
  pointWeWantToSee: { lat: 0, lng: 0 },
  setPointWeWantToSee: null,
});

function MapContextProvider({ children }: any) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [showCrosshair, setShowCrosshair] = useState(false);
  const [currentUserPosition, setCurrentUserPosition] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });
  const [pointWeWantToSee, setPointWeWantToSee] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });

  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
        showCrosshair,
        setShowCrosshair,
        currentUserPosition,
        setCurrentUserPosition,
        pointWeWantToSee,
        setPointWeWantToSee,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export { MapContext, MapContextProvider };
