import { Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment: "The ordering process was so smooth! Love being able to pick up my healthy meal without any wait.",
    date: "March 15, 2024"
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    comment: "Great variety of healthy options. The QR code pickup system is genius!",
    date: "March 14, 2024"
  },
  {
    id: 3,
    name: "Emma Davis",
    rating: 4,
    comment: "Fresh ingredients and convenient pickup. Perfect for my busy schedule.",
    date: "March 13, 2024"
  }
];

const UserReviews = () => {
  return (
    <section className="py-16 bg-neutral dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-playfair font-bold text-center mb-12 dark:text-white">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform hover:scale-105"
            >
              <div className="flex items-center mb-4">
                {[...Array(review.rating)].map((_, index) => (
                  <Star
                    key={index}
                    className="w-5 h-5 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{review.comment}</p>
              <div className="flex justify-between items-center">
                <span className="font-montserrat font-semibold dark:text-white">
                  {review.name}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserReviews;