
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation } from 'lucide-react';

interface Location {
  id: number;
  city: string;
  distance: number;
  type: string;
}

const locations = [
  {
    id: 1,
    city: "Mumbai",
    address: "Shop 4, Chhatrapati Shivaji Terminus, Mumbai - 400050",
    coordinates: [72.8347, 19.0544],
    type: "Railway Station"
  },
  {
    id: 2,
    city: "Delhi",
    address: "Terminal 3, Indira Gandhi International Airport, New Delhi - 110001",
    coordinates: [77.2090, 28.6139],
    type: "Airport"
  },
  {
    id: 3,
    city: "Bangalore",
    address: "Majestic Bus Station, Bangalore - 560038",
    coordinates: [77.6406, 12.9716],
    type: "Bus Station"
  },
  {
    id: 4,
    city: "Hyderabad",
    address: "Secunderabad Railway Station, Hyderabad - 500033",
    coordinates: [78.4867, 17.4123],
    type: "Railway Station"
  }
];

const KioskLocationsBar: React.FC = () => {
  const navigate = useNavigate();
  const [nearbyLocations, setNearbyLocations] = useState<Location[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Get user's location if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Use default location if user location not available
          calculateDistances(null);
        }
      );
    } else {
      calculateDistances(null);
    }
  }, []);

  useEffect(() => {
    calculateDistances(userLocation);
  }, [userLocation]);

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return Math.round(d);
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const calculateDistances = (userCoords: [number, number] | null) => {
    let locationsWithDistance: Location[] = [];

    if (userCoords) {
      // Calculate actual distances
      locationsWithDistance = locations.map(location => ({
        id: location.id,
        city: location.city,
        distance: calculateDistance(
          userCoords[1], 
          userCoords[0], 
          location.coordinates[1], 
          location.coordinates[0]
        ),
        type: location.type
      }));
    } else {
      // Use mock distances if user location not available
      locationsWithDistance = locations.map((location, index) => ({
        id: location.id,
        city: location.city,
        distance: 2 + index * 3, // Mock distances: 2, 5, 8, 11 km
        type: location.type
      }));
    }

    // Sort by distance
    locationsWithDistance.sort((a, b) => a.distance - b.distance);
    
    // Take top 3
    setNearbyLocations(locationsWithDistance.slice(0, 3));
  };

  const handleLocationClick = (locationId: number) => {
    navigate(`/order?location=${locationId}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md py-2 sticky top-16 z-40 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="mr-4 text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
            <MapPin className="w-4 h-4 mr-1 text-primary" />
            <span>Nearby kiosks:</span>
          </div>
          <div className="overflow-x-auto flex-1 flex gap-4">
            {nearbyLocations.map((location) => (
              <div
                key={location.id}
                onClick={() => handleLocationClick(location.id)}
                className="flex items-center whitespace-nowrap cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-md transition-colors"
              >
                <Navigation className="w-3 h-3 text-primary mr-1" />
                <span className="text-sm font-medium">
                  {location.city} ({location.type})
                </span>
                <span className="text-xs ml-1 text-gray-500 dark:text-gray-400">
                  {location.distance} km away
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KioskLocationsBar;
