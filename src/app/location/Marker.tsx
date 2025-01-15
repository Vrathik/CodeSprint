import { MarkerF, OverlayView } from '@react-google-maps/api';
import React, { useState, useCallback } from 'react';
import MarkerListingItem from './MarkerListingItem';

interface Bin {
    id: number;
    location: string;
    latitude: number;
    longitude: number;
    fillPercentage: number;
    active: boolean;
}

interface MarkerItemProps {
    bin: Bin;
}

function MarkerItem({ bin }: MarkerItemProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    const position = {
        lat: bin.latitude,
        lng: bin.longitude
    };

    const handleClick = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    return (
        <MarkerF
            position={position}
            onClick={handleClick}
            icon={{
                url: '/pin.png',
                scaledSize: new google.maps.Size(50, 50),
            }}
        >
            {isOpen && (
                <OverlayView
                    position={position}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    getPixelPositionOffset={(width, height) => ({
                        x: -(width / 2),
                        y: -height,
                    })}
                >
                    <div className="relative" style={{ transform: 'translate(0, -20px)' }}>
                        <MarkerListingItem bin={bin} closeHandler={() => setIsOpen(false)} />
                    </div>
                </OverlayView>
            )}
        </MarkerF>
    );
}

export default MarkerItem;
