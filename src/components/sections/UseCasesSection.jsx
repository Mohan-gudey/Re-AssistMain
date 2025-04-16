import { motion } from 'framer-motion';
import { FaArrowRight, FaBookOpen, FaChartLine, FaSearch, FaFileAlt } from 'react-icons/fa';

const UseCasesSection = () => {
  const researchFeatures = [
    {
      icon: <FaBookOpen className="text-blue-400 text-xl" />,
      title: "Literature Review",
      description: "Save countless hours by automatically extracting key findings and insights from hundreds of research papers.",
    },
    {
      icon: <FaChartLine className="text-blue-400 text-xl" />,
      title: "Data Analysis",
      description: "Analyze complex research data sets and identify patterns that might otherwise be missed.",
    },
    {
      icon: <FaSearch className="text-blue-400 text-xl" />,
      title: "Research Assistance",
      description: "Generate hypotheses, design experiments, and refine methodologies based on existing literature.",
    },
    {
      icon: <FaFileAlt className="text-blue-400 text-xl" />,
      title: "Publication Support",
      description: "Draft research summaries, create abstracts, and polish manuscripts for journal submission.",
    }
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Research & Academia</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Accelerate your academic work and breakthrough research with our specialized AI assistant
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 p-1 rounded-xl shadow-lg">
              <div 
                className="h-64 lg:h-96 w-full bg-cover bg-center rounded-xl" 
                style={{ backgroundImage: `url('/api/placeholder/600/400')` }}
              ></div>
            </div>
          </motion.div>
          
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 p-6"
            >
              <h3 className="text-2xl font-semibold text-white mb-6">Transforming Academic Workflows</h3>
              
              <div className="grid gap-6 mb-6">
                {researchFeatures.map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="mr-4 mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-1">{feature.title}</h4>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-700 bg-opacity-30 p-4 rounded-lg border border-gray-600">
                  <p className="text-gray-300 italic mb-3">
                    "This AI assistant reduced our literature review time by 70% and helped us discover critical connections we would have otherwise missed."
                  </p>
                  {/* <p className="text-blue-400 font-medium">— Dr. Sarah Chen, Molecular Biology Department</p> */}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-6"
              >
                {/* <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded-lg inline-flex items-center">
                  See success stories
                  <FaArrowRight className="ml-2 text-sm" />
                </button> */}
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          {/* <h3 className="text-2xl font-semibold text-white mb-6">Trusted by leading academic institutions</h3>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            <div className="w-32 h-12 bg-gray-500 rounded"></div>
            <div className="w-32 h-12 bg-gray-500 rounded"></div>
            <div className="w-32 h-12 bg-gray-500 rounded"></div>
            <div className="w-32 h-12 bg-gray-500 rounded"></div>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default UseCasesSection;