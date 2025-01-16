"use client";
import React, { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import MarkerItem from "./Marker";
import { useGoogleMaps } from "@/components/providers/GoogleMapsProvider";

const containerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: 10,
};

interface Coordinates {
  lat: number;
  lng: number;
}

interface Bin {
  id: number;
  location: string;
  latitude: number;
  longitude: number;
  fillPercentage: number;
  active: boolean;
}

interface GoogleMapSectionProps {
  coordinates: Coordinates;
  bins: Bin[];
}

function GoogleMapSection({
  coordinates,
  bins,
}: GoogleMapSectionProps): JSX.Element {
  const { isLoaded } = useGoogleMaps();

  const [center, setCenter] = useState(coordinates);

  const onLoad = useCallback(
    (mapInstance: google.maps.Map) => {
      if (bins.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        bins.forEach((bin) =>
          bounds.extend({ lat: bin.latitude, lng: bin.longitude }),
        );
        mapInstance.fitBounds(bounds);
      } else {
        mapInstance.setCenter(coordinates);
        mapInstance.setZoom(15);
      }
    },
    [bins, coordinates],
  );

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
    >
      {bins.map((bin) => (
        <MarkerItem key={bin.id} bin={bin} />
      ))}
    </GoogleMap>
  );
}

export default GoogleMapSection;
