
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How does QuickBite work?",
      answer: "QuickBite allows you to order food from our menu and pick it up from your nearest kiosk. Simply select your items, customize them if needed, and choose your preferred pickup time and location.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards, UPI, net banking, and digital wallets for your convenience.",
    },
    {
      question: "How long does it take to prepare my order?",
      answer: "Most orders are prepared within 15-20 minutes. However, you can select your preferred pickup time while placing the order.",
    },
    {
      question: "Can I modify or cancel my order?",
      answer: "You can modify or cancel your order within 5 minutes of placing it. After that, please contact our customer support for assistance.",
    },
    {
      question: "How do I know my order is ready?",
      answer: "You'll receive real-time updates about your order status. Once ready, you can use the QR code provided to pick up your order from the selected kiosk.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm"
              >
                <AccordionTrigger className="px-6 text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
