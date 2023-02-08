import React, { useEffect, useContext } from 'react';
import { useState, useCallback } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  DirectionsService,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import Image from 'next/image';
import { Coordinates, CreatePointData, List } from '../types/types';
import { MapContext } from '../contexts/MapContext';
import LoadingSpinner from './LoadingSpinner';
import PointMarker from './MapMarkers/PointMarker';
import { DisplayedPointsContext } from '../contexts/DisplayedPointsContext';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useUserData } from '../hooks/useUserData';
import useCreatePoint from '../hooks/useCreatePoint';
import { RoutesContext } from '../contexts/RoutesContext';
import homeMarker from '../public/home-marker.png';
import SmallLoadingSpinner from './SmallLoadingSpinner';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const newPointDefaultData: CreatePointData = {
  title: '',
  description: '',
  isPublic: false,
  imagePath: '',
  listId: 0,
  markerPath:
    'http://res.cloudinary.com/dlshfgwja/image/upload/v1675763079/idm32m9zbvuzc94way5g.png',
  lat: 0,
  lng: 0,
};

// interface MapProps {
//   urlCoord: Coordinates;
// }

function Map() {
  const [currentUserLocation, setCurrentUserLocation] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>();
  const [prevDestination, setPrevDestination] = useState<Coordinates>({
    lat: 0,
    lng: 0,
  });
  const { showCrosshair, setMap, setCurrentUserPosition, pointWeWantToSee } =
    useContext(MapContext);
  const { user } = useUser();
  const { data } = useUserData(user!);
  const { displayedPoints } = useContext(DisplayedPointsContext);
  const { destinationService } = useContext(RoutesContext);
  const { setDestinationService } = useContext(RoutesContext);
  const mutation = useCreatePoint();

  const userDefaultList = data.ownLists.find(
    (list: List) => list.title === 'My Points'
  );

  console.log('map prop', { pointWeWantToSee });

  useEffect(() => {
    getUserPosition();
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY!,
  });

  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      const bounds = new window.google.maps.LatLngBounds(currentUserLocation);
      map.setZoom(16);
      if (setMap) {
        setMap(map);
      }
    },
    [currentUserLocation, setMap]
  );

  setCurrentUserPosition && setCurrentUserPosition(currentUserLocation);

  const onUnmount = useCallback(
    function callback(map: google.maps.Map) {
      if (setMap) {
        setMap(null);
      }
    },
    [setMap]
  );

  function getUserPosition() {
    navigator.geolocation.getCurrentPosition((geolocation) => {
      const { latitude, longitude } = geolocation.coords;
      setCurrentUserLocation({ lat: latitude, lng: longitude });
    });
  }

  const handleDoubleClick = (e: google.maps.MapMouseEvent) => {
    const newPoint = {
      ...newPointDefaultData,
      listId: userDefaultList.id,
      lat: e.latLng!.lat(),
      lng: e.latLng!.lng(),
    };
    mutation.mutate(newPoint);
    setDestinationService &&
      setDestinationService((destService) => ({
        ...destService,
        showRoute: false,
      }));
  };

  if (!currentUserLocation) {
    return <LoadingSpinner />;
  }

  // -------- routes -----------

  const travelMode: google.maps.TravelMode =
    window.google?.maps?.TravelMode?.WALKING;

  const directionsCallback = (
    response: google.maps.DirectionsResult | null,
    status: string
  ) => {
    if (status === 'OK' && hasDestinationchanged()) {
      setPrevDestination((prevDestination) => ({
        ...prevDestination,
        lat: destinationService.destination.lat,
        lng: destinationService.destination.lng,
      }));
      setDirectionsResponse(response);
    }
  };

  function hasDestinationchanged() {
    if (
      prevDestination.lat !== destinationService.destination.lat ||
      prevDestination.lng !== destinationService.destination.lng
    ) {
      return true;
    }
    return false;
  }
  if (pointWeWantToSee.lat === 0) {
    return <LoadingSpinner />;
  }

  return isLoaded ? (
    <div className="fixed flex justify-center items-center h-full w-full top-0 left-0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={pointWeWantToSee}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onDblClick={handleDoubleClick}
        options={{
          streetViewControl: false,
          fullscreenControl: false,
          rotateControl: false,
          disableDoubleClickZoom: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER,
          },
          mapTypeControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER,
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          },
          mapTypeId: 'satellite',
        }}
      >
        {displayedPoints.map((point) => {
          return <PointMarker key={point.id} point={point} />;
        })}
        <Marker
          position={currentUserLocation}
          icon={{
            url: homeMarker.src,
            scaledSize: new google.maps.Size(40, 40),
          }}
        ></Marker>
        <InfoWindow
          position={{
            lat: currentUserLocation.lat + 0.0007,
            lng: currentUserLocation.lng,
          }}
        >
          <h3 className="text-black text-base">
            You are here:{' '}
            <span className="font-bold text-light-green-900">Double tap</span>{' '}
            or <span className="font-bold text-light-green-900">press new</span>{' '}
            to create points 🤞🏼
          </h3>
        </InfoWindow>
        <DirectionsService
          options={{
            destination: {
              lat: destinationService.destination.lat,
              lng: destinationService.destination.lng,
            },
            travelMode,
            origin: currentUserLocation,
          }}
          callback={directionsCallback}
        />
        {destinationService.showRoute && directionsResponse && (
          <DirectionsRenderer options={{ directions: directionsResponse }} />
        )}
        {mutation.isLoading && (
          <div className="h-full flex justify-center items-center">
            <SmallLoadingSpinner size={50} />
          </div>
        )}
      </GoogleMap>
      {showCrosshair && (
        <div className="absolute z-20">
          <Image src="/crosshair.png" alt="crosshair" width={40} height={40} />
        </div>
      )}
    </div>
  ) : (
    <LoadingSpinner />
  );
}

export default React.memo(Map);
