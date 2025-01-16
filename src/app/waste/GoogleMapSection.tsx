"use client";
import React, { useCallback, useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  LoadScriptProps,
} from "@react-google-maps/api";
import MarkerItem from "./Marker";
import { getPendingReports } from "@/utils/db/actions";
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
  latitude?: number;
  longitude?: number;
}

const defaultCenter: Coordinates = { lat: 12.9141, lng: 74.856 };

function GoogleMapSection(): JSX.Element {
  const { isLoaded } = useGoogleMaps();

  const [center, setCenter] = useState<Coordinates>(defaultCenter);
  const [reports, setReports] = useState<Report[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const fetchedReports = await getPendingReports();
        console.log("Fetched Reports from API:", fetchedReports);

        const processedReports = fetchedReports
          .map((report: Report) => {
            const { coordinates, ...rest } = report;
            const { latitude, longitude } = coordinates || {};

            if (!latitude || !longitude) {
              console.warn(`Missing coordinates for report ID: ${report.id}`);
              return null;
            }

            return {
              ...rest,
              latitude,
              longitude,
            };
          })
          .filter((report): report is Report => report !== null);

        setReports(processedReports);

        if (processedReports.length > 0 && window.google) {
          const bounds = new window.google.maps.LatLngBounds();
          processedReports.forEach((report) => {
            if (report.latitude && report.longitude) {
              bounds.extend({ lat: report.latitude, lng: report.longitude });
            }
          });
          const mapCenter = bounds.getCenter();
          setCenter({ lat: mapCenter.lat(), lng: mapCenter.lng() });
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
        setError("Failed to fetch reports. Please try again later.");
      }
    };

    fetchReports();
  }, []);

  const onLoad = useCallback(
    (mapInstance: google.maps.Map) => {
      if (reports.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        reports.forEach((report) => {
          if (report.latitude && report.longitude) {
            bounds.extend({ lat: report.latitude, lng: report.longitude });
          }
        });
        mapInstance.fitBounds(bounds);
      } else {
        mapInstance.setCenter(center);
        mapInstance.setZoom(15);
      }
    },
    [reports, center],
  );

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!isLoaded) {
    return <div className="p-4">Loading map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      options={{
        fullscreenControl: true,
        streetViewControl: true,
        mapTypeControl: true,
      }}
    >
      {reports.map((report) => (
        <MarkerItem key={report.id} bin={report} />
      ))}
    </GoogleMap>
  );
}

export default GoogleMapSection;
