import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, X, Image as ImageIcon } from "lucide-react";
import React from "react";

interface Report {
  id: number;
  location: string;
  wasteType: string;
  imageUrl: string | null;
  status: string;
}

interface MarkerListingItemProps {
  bin: Report;
  closeHandler: () => void;
}

const MarkerListingItem: React.FC<MarkerListingItemProps> = ({ bin, closeHandler }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card 
      className="w-72 relative shadow-lg" 
      style={{
        zIndex: 1000,
        transform: "translate(-50%, -100%)",
      }}
    >
      <button
        onClick={closeHandler}
        className="absolute right-2 top-2 p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
      >
        <X className="h-4 w-4 text-gray-500" />
      </button>

      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold text-lg text-gray-900">Waste Report</h2>
            <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{bin.location}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Badge variant="secondary" className="font-normal">
              {bin.wasteType}
            </Badge>
            <Badge 
              variant="secondary"
              className={`font-normal ${getStatusColor(bin.status)}`}
            >
              {bin.status}
            </Badge>
          </div>

          {bin.imageUrl && (
            <div className="relative h-32 w-full overflow-hidden rounded-md bg-gray-50">
              <img 
                src={bin.imageUrl} 
                alt="Waste" 
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button className="w-full gap-2">
          View Details
          <span className="sr-only">about waste report</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MarkerListingItem;