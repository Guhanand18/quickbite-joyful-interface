import React from 'react';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const locations = [
  {
    id: 1,
    city: "Mumbai",
    address: "Shop 4, Bandra West, Mumbai - 400050",
    coordinates: [72.8347, 19.0544],
  },
  {
    id: 2,
    city: "Delhi",
    address: "Block C, Connaught Place, New Delhi - 110001",
    coordinates: [77.2090, 28.6139],
  },
  {
    id: 3,
    city: "Bangalore",
    address: "12th Main Road, Indiranagar, Bangalore - 560038",
    coordinates: [77.6406, 12.9716],
  },
  {
    id: 4,
    city: "Hyderabad",
    address: "Road No. 36, Jubilee Hills, Hyderabad - 500033",
    coordinates: [78.4867, 17.4123],
  },
];

const KioskLocations = () => {
  const navigate = useNavigate();

  return (
    <div className="py-20 bg-neutral dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair font-bold text-3xl md:text-4xl text-center mb-12 dark:text-white">
          Our Kiosk Locations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {locations.map((location) => (
            <div
              key={location.id}
              onClick={() => navigate(`/order?location=${location.id}`)}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-6 h-6 text-primary" />
                <h3 className="font-playfair font-semibold text-xl dark:text-white">
                  {location.city}
                </h3>
              </div>
              <p className="font-montserrat text-gray-600 dark:text-gray-300">
                {location.address}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KioskLocations;