// GoogleMapSection.tsx
"use client";
import React, { useCallback, useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"; // Ensure this import is correct
import MarkerItem from "./Marker";
import { getPendingReports } from "@/utils/db/actions";

const containerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: 10,
};

interface Coordinates {
  lat: number;
  lng: number;
}

interface Report {
  id: number;
  location: string;
  wasteType: string;
  amount: string;
  imageUrl: string | null;
  coordinates: { latitude: number; longitude: number };
  active: boolean;
  verificationResult: any;
  status: string;
  createdAt: string;
  collectorId: number | null;
}

function GoogleMapSection(): JSX.Element {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Ensure the key is set
  });

  const [center, setCenter] = useState<Coordinates>({ lat: 12.9141, lng: 74.856 });
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const fetchedReports = await getPendingReports();
        console.log("Fetched Reports from API:", fetchedReports);

        const processedReports = fetchedReports.map((report) => {
          const { coordinates, ...rest } = report;
          const { latitude, longitude } = coordinates || {};
          if (!latitude || !longitude) {
            console.error(`Missing coordinates for report ID: ${report.id}`);
          }
          return {
            ...rest,
            latitude,
            longitude,
          };
        });

        setReports(processedReports);

        if (processedReports.length > 0) {
          const bounds = new window.google.maps.LatLngBounds();
          processedReports.forEach((report) => {
            console.log("Processed Report Coordinates:", report.latitude, report.longitude);
            bounds.extend({ lat: report.latitude, lng: report.longitude });
          });
          const mapCenter = bounds.getCenter();
          setCenter({ lat: mapCenter.lat(), lng: mapCenter.lng() });
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  const onLoad = useCallback(
    (mapInstance: google.maps.Map) => {
      if (reports.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        reports.forEach((report) =>
          bounds.extend({ lat: report.latitude, lng: report.longitude })
        );
        mapInstance.fitBounds(bounds);
      } else {
        mapInstance.setCenter(center);
        mapInstance.setZoom(15);
      }
    },
    [reports, center]
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
      {reports.map((report) => (
        <MarkerItem key={report.id} bin={report} />
      ))}
    </GoogleMap>
  );
}

export default GoogleMapSection;
