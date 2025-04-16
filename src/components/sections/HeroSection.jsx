import { motion } from 'framer-motion';
import { FaArrowRight, FaRobot } from 'react-icons/fa';

const HeroSection = ({ handleNav }) => {
  return (
    <section className="py-16 sm:py-24 bg-gray-900 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                The AI Assistant That <span className="text-blue-400">Revolutionizes</span> Your Work
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                XYZ helps you automate tasks, analyze data, and generate insights faster than ever before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => handleNav('join')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-lg transition-colors flex items-center justify-center"
                >
                  Get Started
                  <FaArrowRight className="ml-2" />
                </button>
                
              </div>
            </motion.div>
          </div>
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-blue-900 rounded-full blur-xl opacity-30"></div>
              <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-24 h-24 bg-indigo-900 rounded-full blur-xl opacity-30"></div>
              
              <div className="relative z-10 bg-gray-800 p-4 rounded-xl border border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center mr-3">
                    <FaRobot className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-200">Re-Assistant</h3>
                    <p className="text-xs text-gray-400">Online • Prompt response</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="bg-gray-700 p-3 rounded-lg rounded-tl-none inline-block mb-3">
                    <p className="text-sm text-gray-200">How can I analyze this dataset to find key trends?</p>
                  </div>
                  
                  <div className="bg-blue-900 p-3 rounded-lg rounded-tr-none inline-block ml-auto mb-3">
                    <p className="text-sm text-gray-200">I'll help you analyze that. First, let's identify the main variables and their relationships. Then we can visualize the key trends using time series analysis.</p>
                  </div>
                  
                  <div className="bg-blue-900 p-3 rounded-lg rounded-tr-none inline-block ml-auto">
                    <p className="text-sm text-gray-200">Here's a summary of the top 3 trends I've identified:</p>
                    <ul className="text-sm text-gray-200 mt-2 list-disc list-inside">
                      <li>Seasonal pattern with peaks in Q3</li>
                      <li>15% year-over-year growth</li>
                      <li>Strong correlation with market index</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 relative">
                  <input 
                    type="text" 
                    placeholder="Ask me anything..."
                    className="w-full p-3 pr-10 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;