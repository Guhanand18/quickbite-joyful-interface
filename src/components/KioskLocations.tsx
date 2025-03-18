
import React from 'react';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const locations = [
  {
    id: 1,
    city: "Mumbai",
    address: "Shop 4, Chhatrapati Shivaji Terminus, Mumbai - 400050",
    coordinates: [72.8347, 19.0544],
    type: "Railway Station",
    specialties: ["Street Food", "Breakfast Bowls", "Local Favorites"]
  },
  {
    id: 2,
    city: "Delhi",
    address: "Terminal 3, Indira Gandhi International Airport, New Delhi - 110001",
    coordinates: [77.2090, 28.6139],
    type: "Airport",
    specialties: ["Protein Bowls", "Travel Snacks", "Global Cuisine"]
  },
  {
    id: 3,
    city: "Bangalore",
    address: "Majestic Bus Station, Bangalore - 560038",
    coordinates: [77.6406, 12.9716],
    type: "Bus Station",
    specialties: ["South Indian", "Healthy Wraps", "Fresh Juices"]
  },
  {
    id: 4,
    city: "Hyderabad",
    address: "Secunderabad Railway Station, Hyderabad - 500033",
    coordinates: [78.4867, 17.4123],
    type: "Railway Station",
    specialties: ["Hyderabadi Specials", "Breakfast Options", "Diet Meals"]
  }
];

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 20.5937,
  lng: 78.9629
};

const KioskLocations = () => {
  const navigate = useNavigate();

  const handleLocationClick = (locationId: number) => {
    navigate(`/order?location=${locationId}`);
  };

  return (
    <div className="py-20 bg-neutral dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair font-bold text-3xl md:text-4xl text-center mb-12 dark:text-white">
          Our Kiosk Locations
        </h2>
        
        <div className="mb-12">
          <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={5}
              options={{
                styles: [
                  {
                    featureType: "all",
                    elementType: "all",
                    stylers: [
                      { saturation: -100 }
                    ]
                  }
                ]
              }}
            >
              {locations.map((location) => (
                <Marker
                  key={location.id}
                  position={{
                    lat: location.coordinates[1],
                    lng: location.coordinates[0]
                  }}
                  onClick={() => handleLocationClick(location.id)}
                  title={location.city}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {locations.map((location) => (
            <div
              key={location.id}
              onClick={() => handleLocationClick(location.id)}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-6 h-6 text-primary" />
                <h3 className="font-playfair font-semibold text-xl dark:text-white">
                  {location.city}
                </h3>
              </div>
              <p className="font-montserrat text-gray-600 dark:text-gray-300 mb-2">
                {location.address}
              </p>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm mb-3">
                {location.type}
              </span>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialties:</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400">
                  {location.specialties.map((specialty, idx) => (
                    <li key={idx} className="mb-1">• {specialty}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KioskLocations;
