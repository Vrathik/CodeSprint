"use client";
import React, { useEffect, useState } from "react";
import GoogleMapSection from "./GoogleMapSection";
import { getPendingReports } from "@/utils/db/actions"; // Importing the function from action.ts

interface Report {
  id: number;
  location: string;
  wasteType: string;
  amount: string;
  imageUrl: string | null;
  verificationResult: any; // Adjust based on your JSON structure
  status: string;
  createdAt: string;
  collectorId: number | null;
}

function MapView() {
  const [reports, setReports] = useState<Report[]>([]);
  const [coordinates] = useState({
    lat: 12.9141, // Default center (e.g., Mangalore city center)
    lng: 74.8560,
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // Fetch pending reports using the action.ts function
        const pendingReports = await getPendingReports();
        setReports(pendingReports);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="mt-20 mr-20">
      <GoogleMapSection
        reports={reports}
        coordinates={coordinates}
      />
    </div>
  );
}

export default MapView;
