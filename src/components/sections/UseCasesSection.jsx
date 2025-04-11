import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const UseCasesSection = () => {
  const useCases = [
    {
      title: "Research & Academia",
      description: "Accelerate literature reviews, analyze research data, and generate paper summaries.",
      image: "/api/placeholder/600/400",
    },
    {
      title: "Financial Services",
      description: "Analyze market trends, generate reports, and automate compliance documentation.",
      image: "/api/placeholder/600/400",
    },
    {
      title: "Healthcare",
      description: "Summarize patient records, assist with research, and streamline documentation.",
      image: "/api/placeholder/600/400",
    },
    {
      title: "Legal",
      description: "Review contracts, conduct legal research, and draft standard documents.",
      image: "/api/placeholder/600/400",
    },
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Use Cases</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how different industries are leveraging our AI assistant
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row border border-gray-700"
            >
              <div className="md:w-2/5">
                <div className="h-full bg-blue-900">
                  <div 
                    className="h-48 md:h-full bg-cover bg-center opacity-80" 
                    style={{ backgroundImage: `url('${useCase.image}')` }}
                  ></div>
                </div>
              </div>
              <div className="md:w-3/5 p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{useCase.title}</h3>
                <p className="text-gray-300 mb-4">{useCase.description}</p>
                <button className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center">
                  Learn more
                  <FaArrowRight className="ml-2 text-sm" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;