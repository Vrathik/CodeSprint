"use client"

import { MapPin } from 'lucide-react';
import React from 'react';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

interface Coordinates {
  lat: number;
  lng: number;
}

interface GoogleAddressSearchProps {
  selectedAddress: (address: any) => void;  // Replace 'any' with proper type from the library if available
  setCoordinates: (coordinates: Coordinates) => void;
}

interface PlaceResult {
  label: string;
  value: {
    description: string;
    place_id: string;
    reference: string;
    structured_formatting: {
      main_text: string;
      secondary_text: string;
    };
    terms: Array<{
      offset: number;
      value: string;
    }>;
    types: string[];
  };
}

const GoogleAddressSearch: React.FC<GoogleAddressSearchProps> = ({ 
  selectedAddress, 
  setCoordinates 
}) => {
  const handleChange = async (place: PlaceResult) => {
    console.log(place);
    selectedAddress(place);
    try {
      const results = await geocodeByAddress(place.label);
      const { lat, lng } = await getLatLng(results[0]);
      setCoordinates({ lat, lng });
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  return (
    <div className='flex items-center w-full'>
      <MapPin className='h-10 w-10 p-2 rounded-l-lg text-primary bg-purple-200'/>
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        selectProps={{
          placeholder: 'Search Location',
          isClearable: true,
          className: 'w-full',
          onChange: (newValue) => {
            if (newValue) {
              handleChange(newValue as PlaceResult);
            }
          }
        }}
      />
    </div>
  );
};

export default GoogleAddressSearch;