"use client";
import React, { useState } from 'react';
import GoogleMapSection from './GoogleMapSection';

const dummyBins = [
    {
        id: 1,
        location: "Hampankatta, Mangalore",
        latitude: 12.8741,
        longitude: 74.8433,
        fillPercentage: 75,
        active: true,
    },
    {
        id: 2,
        location: "Panambur Beach Road, Mangalore",
        latitude: 12.9372,
        longitude: 74.8013,
        fillPercentage: 45,
        active: true,
    },
    {
        id: 3,
        location: "St Aloysius College, Light House Hill Road , Mangalore",
        latitude: 12.8723,
        longitude: 74.8462,
        fillPercentage: 25,
        active: true,
    },
];

function MapView() {
    const [bins] = useState(dummyBins);
    const [coordinates] = useState({
        lat: 12.9141, // Mangalore city center
        lng: 74.8560
    });

    return (
        <div className='mt-20 ml-20'>
            <div>

            <GoogleMapSection
                bins={bins}
                coordinates={coordinates}
                />
                </div>
        </div>
    );
}

export default MapView;
