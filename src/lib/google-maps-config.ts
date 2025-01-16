// src/lib/google-maps-config.ts
import { Libraries } from "@react-google-maps/api";

export const libraries: Libraries = ["places"];

export const googleMapsConfig = {
  id: "google-map-script",
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  libraries,
  version: "weekly",
  language: "en",
  region: "US",
} as const;
