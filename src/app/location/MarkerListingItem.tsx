import { Button } from '@/components/ui/button';
import { MapPin, X } from 'lucide-react';
import React from 'react';

interface Bin {
    id: number;
    location: string;
    fillPercentage: number;
    active: boolean;
}

interface MarkerListingItemProps {
    bin: Bin;
    closeHandler: () => void;
}

const MarkerListingItem: React.FC<MarkerListingItemProps> = ({ bin, closeHandler }) => {
    return (
        <div
            className="bg-white shadow-lg rounded-lg overflow-hidden w-64 p-4 relative"
            style={{
                zIndex: 1000,
                transform: 'translate(-50%, -100%)', // Position above the marker
            }}
        >
            <button
                onClick={closeHandler}
                className="absolute right-2 top-2 p-1 bg-gray-200 rounded-full z-10"
            >
                <X className="h-4 w-4" />
            </button>
            <div className="p-2">
                <h2 className="font-bold text-lg">Smart Bin</h2>
                <p className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 font-bold " />
                    <span className='text-md font-bold'>{bin.location}</span>
                </p>
                <p className="text-lg text-gray-500 font-bold">Fill: {bin.fillPercentage}%</p>
                
            </div>
        </div>
    );
};

export default MarkerListingItem;
